import {Model, Schema, model, models} from 'mongoose'
import { UserModel } from './user.typedef'

import bcrypt from 'bcryptjs'
import * as _ from 'lodash'
// import jwt from 'jsonwebtoken'
// import uuid from 'uuid'

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        required: true
    },
    tokens: [{
        access: String,
        token: String
    }]
})

userSchema.pre('save', function(next){
    let user: any = this
    if(user.isModified('password')){
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(user.password, salt, (err, hash)=>{
                user.password= hash;
                next(); 
            });
        });
    }
    else next()
})

userSchema.methods.toJSON = function(){
    let user = this
    return _.pick(user.toObject(), ['name', 'email'])
}

// userSchema.methods.generateAuthToken = async function(access: string){
//     let user = this;
//     // let access = 'Auth';
//     console.log(user)
//     let token= jwt.sign({_id: user._id.toHexString(), access}, "JWT-SECRET").toString();
//     user.tokens.push({access, token});

//     const savedUser = await user.save()
//     return token
// };

userSchema.methods.removeToken = async function(token: string){
    let user = this
    return user.updateOne({
        $pull:{
            tokens: {token}
        }
    })
}

export const User: Model<UserModel> = models.user || model<UserModel>('user', userSchema)