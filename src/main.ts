import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  
  const config = new DocumentBuilder()
  .setTitle('Mind Ease')
  .setDescription('The Mind Ease API description')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(8082);
}
bootstrap();
