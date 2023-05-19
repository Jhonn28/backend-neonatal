import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class PasswordDto {
    @ApiProperty({
        description: 'Nueva contraseña',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    nuevaPassword: string;

    @ApiProperty({
        description: 'Contraseña actual',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    passwordActual: string;

}

