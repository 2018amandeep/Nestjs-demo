import { Exclude } from "class-transformer";

export interface User{
    id: number;
    username: string;
    password: string;
}

export class SerializedUser{
    id: number;
    user: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>){
        Object.assign(this, partial);
    }
}