import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as path from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Permitir CORS
  app.enableCors();
  
  // const logPath = path.resolve(__dirname, '..', 'backend-started.txt');
  const logPath = `C:/Users/guilh/Documents/nest-teste/log-${(new Date()).toLocaleTimeString().replace(/:/g, '-')}.txt`
  
  fs.writeFileSync(
    logPath,
    `Backend iniciado com sucesso!\nData/Hora: ${new Date().toLocaleString()}`,
    'utf-8',
  );

  // Configura o prefixo global para todas as rotas de API
  app.setGlobalPrefix('api');

  // Servir arquivos estáticos do frontend
  app.useStaticAssets(join(__dirname, '..', 'frontend-dist'));

  // Middleware para redirecionar todas as requisições que não sejam "/api" para o frontend
  app.use((req, res, next) => {
    // Verifica se a rota começa com "/api" para não ser redirecionada
    console.log(req.path)
    if (req.path.startsWith('/api')) {
      next(); // Deixa o NestJS processar as rotas da API
    } else {
      // Redireciona todas as outras rotas para o arquivo index.html do frontend
      res.sendFile(join(__dirname, '..', 'frontend-dist', 'index.html'));
    }
  });

  await app.listen(3000);
}
bootstrap();
