import { NoRecordWithIdException } from "@libs/exceptions";
import { OrganisationModel, Organisaton } from "../../schema";

export class OrganisationRepo{
    public static create(ownerId: string, data: OrganisationModel){
        const organisation = new Organisaton({ ...data, owner: ownerId })
        return organisation.save()
    }

    public static async update(id: string, data: OrganisationModel){
        const updatedDoc = await Organisaton.findByIdAndUpdate(id, {$set: data}, {new: true})
        if(!updatedDoc) throw new NoRecordWithIdException('Organisation with id not found')
        return updatedDoc
    }

    public static async delete(id: string){
        const deletedDoc = await Organisaton.findByIdAndDelete(id)
        if(!deletedDoc) throw new NoRecordWithIdException('Organisation with id not found')

        //TODO: delete org ids from its ursers
        return deletedDoc
    }

    public static async get(id: string){
        const doc = await Organisaton.findById(id)
        if(!doc) throw new NoRecordWithIdException()
        return doc
    }

    public static async getAllByUserId(userId: string){
        const docs = await Organisaton.find({ $or: [{users: userId}, {owner: userId}]})
        if(!docs) throw new NoRecordWithIdException()
        return docs
    }

    public static async addMember(orgId: string, userId: string){
        const doc = await Organisaton.findByIdAndUpdate(orgId, {$push: {users: userId}}, {new: true})
        if(!doc) throw new NoRecordWithIdException()
        return doc
    }
}