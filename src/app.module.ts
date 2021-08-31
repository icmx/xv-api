import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { XkcdComicsModule } from './xkcd-comics/xkcd-comics.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    XkcdComicsModule,
  ],
})
export class AppModule {}
