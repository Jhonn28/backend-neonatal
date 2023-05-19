import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    //const url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http'
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API REST')
        .setDescription('\uD83C\uDDEA\uD83C\uDDE8 Esta es la documentación de la API para la aplicación Control de calidad de servicios de salud mental')
        .setVersion('1.0')
        .addTag('Contracts')
        .setContact('Jhonn Guashpa', 'https://github.com/Jhonn28', 'jhonnguashpa42@gmail.com')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

}
