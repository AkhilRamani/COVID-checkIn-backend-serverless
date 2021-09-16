import { LocationModel, Location } from "../../schema";

export class LocationRepo{
    public static async save(data: LocationModel){
        const location = new Location(data)
        return location.save()
    }

    public static getAll(){
        return Location.find()
    }
}