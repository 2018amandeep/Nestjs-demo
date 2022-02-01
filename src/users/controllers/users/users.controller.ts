import { Body, ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, Param, ParseIntPipe, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/utils/LocalGuards';
import { CreateUserDto } from 'src/users/dto/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
    constructor(@Inject('USER_SERVICE') private readonly userService: UsersService,
    ){}
     @UseGuards(AuthenticatedGuard )
     @UseInterceptors(ClassSerializerInterceptor)
        @Get('')
        getUsers(){
            return this.userService.getUsers();
         }

         @UseInterceptors(ClassSerializerInterceptor)
         @Get('/username/:username')
         getByUsername(@Param('username') username:string){
             const user = this.userService.getUserByUsername(username);
             if(user) return new SerializedUser(user);
             else throw new HttpException('User not found!', HttpStatus.BAD_REQUEST);
         }

         @UseInterceptors(ClassSerializerInterceptor)
         @Get('/id/:id')
         getById(@Param('id', ParseIntPipe) id:number ){
             const user = this.userService.getUserById(id);
             if(user) return new SerializedUser(user);
             else {
                //  throw new UserNotFoundException(' not found');                   *exception created by us
                throw new UserNotFoundException();  //exception given by nest js
             }
         }

         @Post('create')
         @UsePipes(ValidationPipe)
         createUser(@Body() createUserDto: CreateUserDto){
            return this.userService.createUser(createUserDto);
         }
}
