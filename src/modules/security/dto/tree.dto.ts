import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TreeDto {
  @ApiProperty({
    description: 'Nombre de la tabla',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tableName: string;

  @ApiProperty({
    description: 'Campo primario de la tabla',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  primaryField: string;

  @ApiProperty({
    description: 'You can use a valid email or an user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  nameField: string;

  @ApiProperty({
    description: 'You can use a valid email or an user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  fatherField: string;

  @ApiProperty({
    description: 'You can use a valid email or an user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  orderField: string;

  @ApiProperty({
    description: 'Your account password',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  condition: any;
}

