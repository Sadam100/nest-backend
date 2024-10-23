import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with custom options
  app.enableCors({
    origin: ['http://localhost:4200', 'http://example.com'], // Allow specific origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    allowedHeaders: 'Content-Type, Authorization', // Allowed headers
  });

  await app.listen(3000);
}
bootstrap();
