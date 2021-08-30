import { Module } from '@nestjs/common';
import { SharedModule } from 'src/shared/shared.module';
import { XkcdComicsService } from './xkcd-comics.service';
import { XkcdComicsController } from './xkcd-comics.controller';

@Module({
  imports: [SharedModule],
  providers: [XkcdComicsService],
  controllers: [XkcdComicsController],
})
export class XkcdComicsModule {}
