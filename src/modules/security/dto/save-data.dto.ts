import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveDataDto {

    @ApiProperty({
    description: 'List of sql',
    required: true,
  })
  @IsNotEmpty()
  listaSQL: any;

}

