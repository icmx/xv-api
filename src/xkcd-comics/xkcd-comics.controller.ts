import { Controller, Get, Param } from '@nestjs/common';
import { XkcdComicsService } from './xkcd-comics.service';

@Controller('xkcd-comics')
export class XkcdComicsController {
  constructor(private readonly xkcdComicsService: XkcdComicsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.xkcdComicsService.findOne(id);
  }
}
