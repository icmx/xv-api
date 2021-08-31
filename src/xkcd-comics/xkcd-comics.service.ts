import { BadGatewayException, Injectable, Logger } from '@nestjs/common';
import { catchError, map, Observable, tap } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { performance } from 'perf_hooks';
import { switchMap, take } from 'rxjs/operators';

import { ComicDto } from 'src/shared/comic.dto';
import { convertXkcdComic } from './xkcd-comic.converter';
import { XkcdComicDto } from './xkcd-comic.dto';

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export default random;

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

  getById(id?: string): Observable<ComicDto> {
    const resourceUrl = `${this.apiUrl}/${id ? id + '/' : ''}/info.0.json`;
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

  getCurrent(): Observable<ComicDto> {
    return this.getById();
  }

  getRandom(): Observable<ComicDto> {
    return this.getCurrent().pipe(
      take(1),
      switchMap((current) => {
        return this.getById(random(1, parseInt(current.id, 10)).toString());
      }),
    );
  }
}
