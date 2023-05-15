import helmet from 'helmet';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseDecorator } from './common/response-decorator/responseDecorator.interceptor';
import { Swagger } from './swagger/swagger';
import { HttpExceptionFilter } from './common/response-decorator/errorDecorator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true, bufferLogs: true });

  global['fetch'] = require('node-fetch');

  new Swagger(app).createDocument();

  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseDecorator());
  app.use(helmet({ crossOriginOpenerPolicy: false, crossOriginEmbedderPolicy: false, contentSecurityPolicy: false, crossOriginResourcePolicy: false }));

  /**
   * IP defined as 0.0.0.0, otherwise on the server side it will use the ipv6.
   */
  await app.listen(3000, '0.0.0.0', function () {
    // eslint-disable-next-line no-console
    console.log('Server has been started.');
  });
}
bootstrap();
