import { Test, TestingModule } from '@nestjs/testing';
import { IndicadorController } from './indicador.controller';
import { IndicadorService } from './indicador.service';

describe('IndicadorController', () => {
  let controller: IndicadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndicadorController],
      providers: [IndicadorService],
    }).compile();

    controller = module.get<IndicadorController>(IndicadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
