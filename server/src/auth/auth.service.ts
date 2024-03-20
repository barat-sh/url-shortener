/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, SignupDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwt_secret } from 'src/utils/constants';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async signup(dto: SignupDto, res: Response) {
        const {email, password, firstname, lastname} = dto
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            await this.prisma.user.create({
                data: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    passwors: hashedPassword
                }
            })
            res.json({message: 'User created'})
        }catch(err) {
            res.send(`Email already exists.. -> ${err}`)
        }
    }
    async login(dto: LoginDto, res: Response) {
        const {email, password} = dto;
        const userExists = await this.prisma.user.findUnique({ where: { email }});
        if (!userExists) {
            res.json({message: `User doesnot exists...`})
        }
        const comparedPassword = await bcrypt.compare(password, userExists.passwors);

        if (!comparedPassword) {
            throw new UnauthorizedException();
        }
        try{
            const token = await this.signJwtToken({
                id: userExists.id.toString()
            });
            
            res.cookie('token', token);

            res.json({message: `user logged in successfully...`, userExists})
        }catch(err) {
            res.json({message: 'Error while logging in...'})
        }        
    }

    async logout(res: Response) {
        res.clearCookie('token')
        res.json({message: "User logged out..."})
    }

    async signJwtToken(asrgs: {id: string}){
        const payload = asrgs;
        return this.jwt.sign(payload, {secret: jwt_secret});
    }
}