export class NoRecordWithIdException extends Error{
    code = 404
    message = 'no record with such id'
}
export class NotFoundException extends Error{
    code = 404
    constructor(message = 'not found'){
        super();
        this.message = message
    }
}
export class UnauthorizedUserException extends Error{
    code = 401
    constructor(message = 'Unauthorized user'){
        super()
        this.message = message
    }
}
export class MissingParameterException extends Error{
    code = 400
    message = 'missing request parameter'
}