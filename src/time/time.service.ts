import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { GetServerTimeOutputInterface } from './interface/get.server.time.output.interface';
import { Counter, Gauge, Histogram, register } from 'prom-client';
import axios from 'axios';
import * as os from 'os';

@Injectable()
export class TimeService {
  private readonly httpRequestDurationHistogram: Histogram;
  private readonly serverTimeCounter: Counter;
  private readonly cpuUsageGauge: Gauge;

  constructor() {
    this.serverTimeCounter = new Counter({
      name: 'server_time',
      help: 'The current server time in epoch seconds',
    });
    this.cpuUsageGauge = new Gauge({
      name: 'cpu_usage',
      help: 'CPU usage in percentage',
    });
    this.httpRequestDurationHistogram = new Histogram({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['route'],
      buckets: [0.1, 0.5, 1, 2, 5, 10],
    });
    register.registerMetric(this.httpRequestDurationHistogram);
    register.registerMetric(this.serverTimeCounter);
    register.registerMetric(this.cpuUsageGauge);
  }

  /**
   * Get the current server time and collect some default metrics.
   */
  async getServerTime(): Promise<GetServerTimeOutputInterface> {
    const startTime = Date.now();
    try {
      const epoch = await this.fetchServerTime();
      this.serverTimeCounter.inc(epoch);
      const cpuUsage = this.getCpuUsage();
      this.cpuUsageGauge.set(cpuUsage);

      return { epoch };
    } catch (e) {
      if (e.status && e.status != 500) {
        throw e;
      }
      throw new InternalServerErrorException(e.message || e);
    } finally {
      const requestDuration = (Date.now() - startTime) / 1000;
      const route = 'time'; // Specify the route for the /time endpoint
      this.httpRequestDurationHistogram.observe({ route }, requestDuration);
    }
  }

  /**
   * Fetches the current server time by making an API call to an external time service.
   */
  private async fetchServerTime(): Promise<number> {
    const response = await axios.get('https://worldtimeapi.org/api/ip');
    return response.data.unixtime;
  }

  /**
   * Gets the current CPU usage of the system while sending a request.
   *
   * @private
   */
  private getCpuUsage(): number {
    const cpus = os.cpus();
    const totalIdle = cpus.reduce((acc, cpu) => acc + (cpu.times.idle || 0), 0);
    const totalTick = cpus.reduce((acc, cpu) => acc + cpu.times.user + cpu.times.nice + cpu.times.sys + cpu.times.idle, 0);
    const idlePercentage = (totalIdle / totalTick) * 100;
    return 100 - idlePercentage;
  }
}
