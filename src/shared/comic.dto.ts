export interface ComicDto {
  id: string;
  tag: 'xkcd';
  title: string;
  caption?: string;
  transcript?: string;
  created?: string;
  sourceUrl: string;
  mediaUrl: string;
}
