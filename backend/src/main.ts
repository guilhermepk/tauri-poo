import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger(`MERCADINHO.SYSTEM`);

  let currentRoute = null;
  app.use((req, _, next) => {
    currentRoute = req.path;
    next();
  });

  app.use(cors({
    origin: function (origin, callback) {
      const whiteList = process.env.CORS_WHITELIST ? process.env.CORS_WHITELIST.split(',') : [];
      if (whiteList.includes(origin)|| !origin) {
        callback(null, true)
      } else {
        logger.error(`Origem não permitida através do CORS. Origem ${origin} na rota ${currentRoute}`);
      }
    },
      methods: [
        "GET",
        "POST",
        "PATCH",
        "DELETE"
      ],
      credentials: true,
  }));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, 
    forbidNonWhitelisted: true, 
    transform: true, 
  }));

  const port = process.env.port || 3000;

  logger.debug(`API rodando na porta ${port}`);

  await app.listen(port);
}
bootstrap();
