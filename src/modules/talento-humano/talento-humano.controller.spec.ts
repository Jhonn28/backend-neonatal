import { Test, TestingModule } from '@nestjs/testing';
import { TalentoHumanoController } from './talento-humano.controller';

describe('TalentoHumanoController', () => {
  let controller: TalentoHumanoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalentoHumanoController],
    }).compile();

    controller = module.get<TalentoHumanoController>(TalentoHumanoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
