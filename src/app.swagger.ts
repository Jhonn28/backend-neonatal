import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
    //const url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http'
    const swaggerConfig = new DocumentBuilder()
        .setTitle('API REST')
        .setDescription('Documentación de la API para la aplicación “Registro del cumplimiento de indicadores materno neonatal” ')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

}
