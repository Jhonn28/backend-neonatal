import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Nueva contraseña',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;

}
