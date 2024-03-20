import { Inject, Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'prisma/prisma.service';
import { LongUrl } from './dto/url.dto';
import * as shortid from 'shortid';
import { Cache } from 'cache-manager';

@Injectable()
export class UrlsService {
  constructor(
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
    private prisma: PrismaService,
  ) {}

  async getAllUrls(req: Request, res: Response, id: string) {
    const decodedUser = req.user as { id: string };
    if (!decodedUser) {
      //   throw new NotFoundException();
      console.log(decodedUser);
    }
    try {
      const listOfURLs = await this.prisma.user.findUnique({
        where: { id: id },
        select: {
          email: true,
          urls: true,
        },
      });
      res.status(200).send(listOfURLs);
    } catch (err) {
      res.send(err);
    }
  }

  async shortUrl(dto: LongUrl, req: Request, res: Response, id: string) {
    const { LongUrl } = dto;
    const shortId = shortid.generate().substr(0, 5);
    const shortenedUrl = `http://localhost:3005/urls/getUrl/${shortId}`;
    try {
      const newUrl = await this.prisma.urls.create({
        data: {
          shortUrl: shortId,
          longUrl: LongUrl,
          createrId: id,
        },
      });
      const data = newUrl;
      await this.cacheManager.set(shortId, newUrl.longUrl);
      res.status(200).json({ message: 'Url created', data, shortenedUrl });
    } catch (err) {
      res.status(400).json({ message: 'Error while creating url...' });
    }
  }

  async getUrl(req: Request, res: Response, urlid: string) {
    try {
      const cashedData: any = await this.cacheManager.get(urlid);
      if (cashedData?.longUrl) {
        console.log(cashedData);
        res.redirect(cashedData?.longUrl);
        return;
      }
      const data = await this.prisma.urls.findFirst({
        where: { shortUrl: urlid },
        select: {
          longUrl: true,
          shortUrl: true,
          createdAt: true,
          createrId: true,
        },
      });
      await this.cacheManager.set(urlid, data.longUrl);
      res.redirect(data.longUrl);
      // res.status(200).json({ menubar: 'Found URL', LongUrl: data.longUrl });
    } catch (err) {
      res.status(400).json({ message: 'Error while finding Url' });
    }
  }
}
