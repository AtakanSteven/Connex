import { Test, TestingModule } from '@nestjs/testing';
import { TimeService } from './time.service';
import { GetServerTimeOutputInterface } from './interface/get.server.time.output.interface';
import { Counter } from 'prom-client';

describe('TimeService', () => {
  let service: TimeService;
  let serverTimeCounter: Counter;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimeService],
    }).compile();

    service = module.get<TimeService>(TimeService);
    serverTimeCounter = service['serverTimeCounter'];
  });

  describe('getServerTime', () => {
    it('should increment the server time counter and return the epoch time', async () => {
      // Reset the counter before the test
      serverTimeCounter.reset();

      const result: GetServerTimeOutputInterface = await service.getServerTime();

      expect(result.epoch).toBeDefined();
      expect((await serverTimeCounter.get()).values[0].value).toBe(result.epoch);
    });
  });
});
