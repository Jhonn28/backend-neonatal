import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConsulTableDto {
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
  @IsString()
  @IsNotEmpty()
  orderfield: string;

  @ApiProperty({
    description: 'You can use a valid email or an user',
    required: true,
  })
  @IsString()
  query: string;

  @ApiProperty({
    description: 'Your account password',
    required: true,
  })
  @IsEmpty()
  condition: any;
}

