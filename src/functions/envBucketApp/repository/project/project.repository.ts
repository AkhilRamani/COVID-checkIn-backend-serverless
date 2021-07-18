import { NoRecordWithIdException } from "@libs/exceptions";
import { Project, ProjectModel } from "../../schema";

export class ProjectRepo{
    public static create(data: ProjectModel){
        const project = new Project(data)
        return project.save()
    }

    public static async update(id: string, data: ProjectModel){
        const updatedDoc = await Project.findByIdAndUpdate(id, { $set: data }, { new: true })
        if (!updatedDoc) throw new NoRecordWithIdException()
        return updatedDoc
    }

    public static async delete(id: string){
        const deletedDoc = await Project.findByIdAndDelete(id)
        if (!deletedDoc) throw new NoRecordWithIdException()

        //TODO: delete files stored on s3
        return deletedDoc
    }
}