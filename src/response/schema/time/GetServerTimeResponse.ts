const GetServerTimeResponse = {
  type: 'object',
  additionalProperties: false,
  properties: {
    status: {
      type: 'string',
      example: 'success',
    },
    statusCode: {
      type: 'number',
      example: '200',
    },
    message: {
      type: 'string',
      example: 'The current server time, in epoch seconds, at time of processing the request',
    },
    data: {
      type: 'object',
      additionalProperties: false,
      properties: {
        epoch: {
          type: 'number',
          example: '1684177691',
        },
      },
    },
  },
};

export { GetServerTimeResponse };
