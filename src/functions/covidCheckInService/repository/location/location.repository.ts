import { NoRecordWithIdException } from "@libs/exceptions";
import { LocationModel, Location } from "../../schema";

export class LocationRepo{
    public static async save(data: LocationModel){
        const location = new Location(data)
        return location.save()
    }

    public static async getById(id: string){
        const location = await Location.findById(id)
        if(!location) throw new NoRecordWithIdException('No location found')
        return location
    }

    public static getAll(){
        return Location.find()
    }
}