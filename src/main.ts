import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe()) 
  app.useGlobalInterceptors(new TransformInterceptor());

	const config = new DocumentBuilder()
    .setTitle('Tasks Api')
    .setDescription('The Task API description')
    .setVersion('1.0')
    .addTag('tasks')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}
bootstrap();
