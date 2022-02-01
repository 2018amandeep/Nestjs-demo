import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFoundException extends HttpException{
    constructor(msg?: string, status?: HttpStatus ){
        super(msg || 'user not found!!', status || HttpStatus.BAD_REQUEST)
    }
}