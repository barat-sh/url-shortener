import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UrlsService } from './urls.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { LongUrl } from './dto/url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('api/getAllUrls/:id')
  getAllUrls(
    @Param() params: { id: string },
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    return this.urlsService.getAllUrls(req, res, params.id);
  }

  @Post('api/shortUrl/:id')
  shortUrl(
    @Body() longUrl: LongUrl,
    @Param() params: { id: string },
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    return this.urlsService.shortUrl(longUrl, req, res, params.id);
  }

  @Get('api/getUrl/:urlid')
  getUrl(
    @Param() params: { urlid: string },
    @Req() req,
    @Res({ passthrough: true }) res,
  ) {
    return this.urlsService.getUrl(req, res, params.urlid);
  }
}

// f9d86b39-8e2a-4e80-983a-afc520258198
