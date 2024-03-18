import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(res: any, id: string, req: Request) {
    const decodedUser = req.user as { id: string };
    if (!decodedUser) {
      //   throw new NotFoundException();
      console.log(decodedUser);
    }
    try {
      const currentUser = await this.prisma.user.findUnique({
        where: { id: id },
        select: {
          id: true,
          email: true,
          firstname: true,
          lastname: true,
          createdAt: true,
          updatedAt: true,
        },
      });
      if (!currentUser) {
        res.send('Error while fetching user data...');
      }
      res.send(currentUser);
    } catch (err) {
      res.status(402).send('Unable to find user');
    }
  }
}
