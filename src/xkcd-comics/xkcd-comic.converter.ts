import { ComicDto } from 'src/shared/comic.dto';
import { XkcdComicDto } from './xkcd-comic.dto';

const createIsoDateString = (year: string, month: string, day: string) =>
  `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00+00:00`;

const createMediaUrl = (num: number, img: string) =>
  num > 1084 ? img.replace('.png', '_2x.png') : img;

export const convertXkcdComic = (xkcdComic: XkcdComicDto): ComicDto => ({
  id: xkcdComic.num.toString(),
  title: xkcdComic.title,
  caption: xkcdComic.alt,
  transcript: xkcdComic.transcript,
  created: createIsoDateString(xkcdComic.year, xkcdComic.month, xkcdComic.day),
  sourceUrl: `https://xkcd.com/${xkcdComic.num.toString()}`,
  mediaUrl: createMediaUrl(xkcdComic.num, xkcdComic.img),
});
