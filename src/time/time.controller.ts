import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { register } from 'prom-client';

import { TimeService } from './time.service';
import { ResponseService } from '../response/response.service';
import { GetServerTimeResponse } from '../response/schema/time/GetServerTimeResponse';
import { GetMetricsResponse } from '../response/schema/time/GetMetricsResponse';

@ApiTags('TIME')
@Controller('time')
export class TimeController {
  constructor(private readonly timeService: TimeService, private readonly responseService: ResponseService) {}

  @ApiOkResponse({ status: 200, description: 'gets the server time', schema: GetServerTimeResponse })
  @Get('/server')
  async getServerTime() {
    const result = await this.timeService.getServerTime();
    const response = { statusCode: 200, data: result, message: 'The current server time, in epoch seconds, at time of processing the request' };
    return this.responseService.compile(response, GetServerTimeResponse);
  }

  @ApiOkResponse({ status: 200, description: 'get the metrics', schema: GetMetricsResponse })
  @Get('/metrics')
  async getMetrics() {
    const result = await register.getMetricsAsJSON();
    const response = { statusCode: 200, data: result, message: 'The metrics' };
    return this.responseService.compile(response, GetMetricsResponse);
  }
}
