import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { SharedModule } from 'src/shared/shared.module';
import { XkcdComicsController } from './xkcd-comics.controller';
import { XkcdComicsService } from './xkcd-comics.service';

@Module({
  imports: [
    HttpModule.register({ timeout: 8000, maxRedirects: 4 }),
    SharedModule,
  ],
  providers: [XkcdComicsService],
  controllers: [XkcdComicsController],
})
export class XkcdComicsModule {}
