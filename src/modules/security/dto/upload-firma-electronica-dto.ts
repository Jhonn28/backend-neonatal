import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadFirmaElectronicaDto {
  @ApiProperty({
    description: 'Nombre de la tabla',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  path: string;

  @ApiProperty({
    description: 'Campo primario de la tabla',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  ide_srfiel: number;

  /* @ApiProperty({
    description: 'Campo primario de la tabla',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  multinacional: number;

  @ApiProperty({
    description: 'Campo primario de la tabla',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  empresa: number;

  @ApiProperty({
    description: 'Campo primario de la tabla',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  sucursal: number; */


}

