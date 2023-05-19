import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ColumnDto {
  @ApiProperty({
    description: 'You can use a valid email or an user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  tablename: string;

  @ApiProperty({
    description: 'Your account password',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  tablenumber: number;

  @ApiProperty({
    description: 'Your account password',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  uidOption: number;
}

