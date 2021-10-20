import { Tax, TaxModel } from "../schema";
import { NoRecordWithIdException, NotFoundException, UnauthorizedUserException } from "@libs/exceptions";

export class TaxRepo {
    public static async save(data: TaxModel) {
        const tax = new Tax(data)
        return tax.save()
    }

    public static async getAll(){
        const docs = await Tax.find()
        if(!docs) return []
        return docs
    }

    public static async update(id, data: TaxModel){
        const updatedDoc = await Tax.findByIdAndUpdate(id, {$set: data}, {new: true})
        if(!updatedDoc) throw new NoRecordWithIdException()
        return updatedDoc
    }
}