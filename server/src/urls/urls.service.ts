import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { LongUrl } from './dto/url.dto';
import * as shortid from 'shortid';

@Injectable()
export class UrlsService {
  constructor(private prisma: PrismaService) {}

  async getAllUrls(req: Request, res: Response, id: string) {
    const decodedUser = req.user as { id: string };
    if (!decodedUser) {
      //   throw new NotFoundException();
      console.log(decodedUser);
    }
    const listOfURLs = await this.prisma.user.findUnique({
      where: { id: id },
      select: {
        email: true,
        urls: true,
      },
    });
    res.status(200).send(listOfURLs);
  }

  async shortUrl(dto: LongUrl, req: Request, res: Response, id: string) {
    const { LongUrl } = dto;
    const shortId = shortid.generate().substr(0, 5);
    const shortenedUrl = `http://localhost:3000/${shortId}`;
    try {
      const newUrl = await this.prisma.urls.create({
        data: {
          shortUrl: shortId,
          longUrl: LongUrl,
          createrId: id,
        },
      });
      const data = {
        newUrl: newUrl,
        shortenedUrl: shortenedUrl,
      };
      res.status(200).json({ message: 'Url created', data });
    } catch (err) {
      res.status(400).json({ message: 'Error while creating url...' });
    }
  }

  async getUrl(req: Request, res: Response, urlid: string) {
    try {
      const data = await this.prisma.urls.findFirst({
        where: { shortUrl: urlid },
        select: {
          longUrl: true,
          shortUrl: true,
          createdAt: true,
          createrId: true,
        },
      });
      res.status(200).json({ menubar: 'Found URL', data });
    } catch (err) {
      res.status(400).json({ message: 'Error while finding Url' });
    }
  }
}
