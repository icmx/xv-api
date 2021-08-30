import { Test, TestingModule } from '@nestjs/testing';
import { XkcdComicsService } from './xkcd-comics.service';

describe('XkcdComicsService', () => {
  let service: XkcdComicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XkcdComicsService],
    }).compile();

    service = module.get<XkcdComicsService>(XkcdComicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
