import { NoRecordWithIdException } from "@libs/exceptions";
import { CheckInModel, CheckIn } from "../../schema";

export class CheckInRepo{
    public static save(data: CheckInModel){
        const checkIn = new CheckIn(data)
        return checkIn.save()
    }

    public static async update(id: string, data: CheckInModel){
        const updated = await CheckIn.findByIdAndUpdate(id, {$set: data}, {new: true})
        if(!updated) throw new NoRecordWithIdException()
        return updated
    }
    
    public static async updateCheckOut(id: string, endTime: Date){
        const updated = await CheckIn.findByIdAndUpdate(id, {$set: { to: endTime }}, {new: true})
        if(!updated) throw new NoRecordWithIdException()
        return updated
    }

    public static getAllById(id: string){
        return CheckIn.find({userId: id})        
    }
}