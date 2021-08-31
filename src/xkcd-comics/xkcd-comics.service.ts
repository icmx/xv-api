import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { catchError, map, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { performance } from 'perf_hooks';

import { convertXkcdComic } from './xkcd-comic.converter';
import { XkcdComicDto } from './xkcd-comic.dto';

@Injectable()
export class XkcdComicsService {
  private readonly logger: Logger;
  private readonly apiUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) {
    this.logger = new Logger('XkcdComicsService');
    this.apiUrl = this.config.get<string>('XKCD_API_URL');
  }

  findOne(id: string) {
    const resourceUrl = `${this.apiUrl}/${id}/info.0.json`;
    const from = performance.now();

    this.logger.debug(`Requesting ${resourceUrl}...`);

    return this.http.get<XkcdComicDto>(resourceUrl).pipe(
      map((response) => response.data),
      map((data) => convertXkcdComic(data)),
      tap(() => {
        this.logger.debug(
          `Request ${resourceUrl} done in ${performance.now() - from}`,
        );
      }),
      catchError((error) => {
        this.logger.error(error);
        throw new BadGatewayException();
      }),
    );
  }
}
