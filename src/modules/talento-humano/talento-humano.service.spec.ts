import { Test, TestingModule } from '@nestjs/testing';
import { TalentoHumanoService } from './talento-humano.service';

describe('TalentoHumanoService', () => {
  let service: TalentoHumanoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalentoHumanoService],
    }).compile();

    service = module.get<TalentoHumanoService>(TalentoHumanoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
