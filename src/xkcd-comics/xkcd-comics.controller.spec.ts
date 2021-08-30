import { Test, TestingModule } from '@nestjs/testing';
import { XkcdComicsController } from './xkcd-comics.controller';

describe('XkcdComicsController', () => {
  let controller: XkcdComicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XkcdComicsController],
    }).compile();

    controller = module.get<XkcdComicsController>(XkcdComicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
