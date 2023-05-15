import { HttpStatus } from '@nestjs/common';

export interface Response {
  status?: string;
  message?: string;
  data?: Record<string, unknown>;
}

export interface ControllerResponse {
  httpStatus?: HttpStatus;
  message?: string;
  statusCode?: string;
  data?: any;
}
