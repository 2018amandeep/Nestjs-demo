import { Controller, Get, Post, Req, Request, Session, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { Request } from 'express';
import { AuthenticatedGuard, LocalGuards } from 'src/auth/utils/LocalGuards';
// import { User } from 'src/typeorm';

@Controller('auth')
export class AuthController {
    @UseGuards(LocalGuards)
    @Post('login')
    async login(@Request() req){}

    @Get('')
    async getAuthSession(@Session() session: Record<string, any>){
        console.log(session);
        session.authenticated = true;
        return session;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('status')
    async getAuthStatus(@Req() req: Request){
        // return user;
    }
}
