import { PoolModule } from '@modules/pool/pool.module';
import { Module } from '@nestjs/common';
import { TalentoHumanoController } from './talento-humano.controller';
import { TalentoHumanoService } from './talento-humano.service';

@Module({
  imports:[
    PoolModule
  ],
  controllers: [TalentoHumanoController],
  providers: [TalentoHumanoService]
})
export class TalentoHumanoModule {}
