import { Module } from '@nestjs/common';
import { TimeController } from './time.controller';
import { TimeService } from './time.service';
import { ResponseModule } from '../response/response.module';

@Module({
  imports: [ResponseModule],
  providers: [TimeService],
  controllers: [TimeController],
  exports: [TimeService],
})
export class TimeModule {}
