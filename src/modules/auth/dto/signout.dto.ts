import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignOutDto {
  @ApiProperty({
    description: 'uid user',
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  ide_segusu: number;

  @ApiProperty({
    description: 'device ip address',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  ip: string;

  @ApiProperty({
    description: 'Device',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  device: string;

  @ApiProperty({
    description: 'browser version',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  browser: string;

  @ApiProperty({
    description: 'userAgent',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userAgent: string;

}