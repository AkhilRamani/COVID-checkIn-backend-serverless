import { NoRecordWithIdException } from "@libs/exceptions";
import { BirthCertificateModel, BirthCertificate } from "../schema";

export class BirthCertificateRepo{
    public static save(data: BirthCertificateModel){
        const certificate = new BirthCertificate(data)
        return certificate.save()
    }

    public static getAll(){
        return BirthCertificate.find()
    }

    public static async updateStatus(id: string, status: boolean){
        const updated = await BirthCertificate.findByIdAndUpdate(id, {$set: {status}}, {new: true})
        if(!updated) throw new NoRecordWithIdException()
        return updated
    }
}