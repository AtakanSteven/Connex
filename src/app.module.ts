import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthorizationMiddleware } from './common/auth-middleware/authorization.middleware';
import { TimeModule } from './time/time.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [TimeModule, ResponseModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthorizationMiddleware).forRoutes('*');
  }
}
