import { UnauthorizedUserException } from '@functions/envBucketApp/common/exceptions.common'
import * as jwt from 'jsonwebtoken'
import { UserModel, User } from '../../schema'

export class UserRepoHelper {
    public static async generateAuthToken(user: UserModel) {
        let token = jwt.sign({
            _id: user._id.toHexString(),
            access: user.type
        }, process.env.JWT_SECRET).toString()

        user.tokens.push({access: user.type, token})
        await user.save()
        return token
    }

    public static async findByToken(token: string){
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            _id: decoded['_id'],
            'tokens.token': token
        })
        
        if(!user) throw new UnauthorizedUserException()

        return user
    }
}