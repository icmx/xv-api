import { Module } from '@nestjs/common';

import { XkcdComicsModule } from './xkcd-comics/xkcd-comics.module';

@Module({
  imports: [XkcdComicsModule],
})
export class AppModule {}
