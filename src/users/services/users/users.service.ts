import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { encodePassword } from 'src/util/bcrypt';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../../../typeorm';
import { SerializedUser, User } from '../../types';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}
    private users: User[] = []
        // {
        //     id: 1,
        //     username: 'danny',
        //     password: 'danny'       //serialization -- It is a process to hide password and not let that shown on frontend  
        // },
        // {
        //     id: 2,
        //     username: 'akhil',
        //     password: 'akhil'
        // },
        // {
        //     id: 3,
        //     username: 'nokia',
        //     password: 'nokia'
        // },
        // {
        //     id: 4,
        //     username: 'apple',
        //     password: 'apple'
        // },  
    

    getUsers(){
        return this.users.map((user)=> plainToClass(SerializedUser, user));
    }
    getUserByUsername(username: string){
        return this.users.find((user)=> user.username === username);
    }
    getUserById(id: number){
        return this.users.find((user)=> user.id === id);
    }
    createUser(createUserDto: CreateUserDto){
        const password = encodePassword(createUserDto.password);
        const newUser = this.userRepository.create({...createUserDto, password});
        return this.userRepository.save(newUser);
    }
    findUserByUsername(username: string){
        return this.userRepository.findOne({username});
    }
    findUserById(id: number){
        return this.userRepository.findOne(id);
    }
}


