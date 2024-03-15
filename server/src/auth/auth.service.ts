/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/auth.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: SignupDto) {
        const {email, password, firstname, lastname} = dto
        // const newUser = {
        //     email: email,
        //     password: password,
        //     firstname: firstname,
        //     lastname: lastname
        // };

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
            return 'User created'
        }catch(err) {
            return `Email already exists.. -> ${err}`
        }
    }
    async login() {
        return 'login succed'
    }

    async logout() {
        return 'logout route'
    }
}