import { Controller, Get, Param } from '@nestjs/common';

import { XkcdComicsService } from './xkcd-comics.service';

@Controller('xkcd-comics')
export class XkcdComicsController {
  constructor(private readonly xkcdComicsService: XkcdComicsService) {}

  @Get('random')
  getRandom() {
    return this.xkcdComicsService.getRandom();
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.xkcdComicsService.getById(id);
  }

  @Get()
  getCurrent() {
    return this.xkcdComicsService.getCurrent();
  }
}
