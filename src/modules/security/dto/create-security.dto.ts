import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateSecurityDto {
    @ApiProperty({
        description: 'You can use a valid email or an user',
        required: true,
      })
      @IsNumber()
      @IsNotEmpty()
      pageNumber: number;
    
      @ApiProperty({
        description: 'Your account password',
        required: true,
      })
      @IsNumber()
      @IsNotEmpty()
      pageSize: number;
}
