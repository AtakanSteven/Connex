const GetMetricsResponse = {
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
      example: 'OK',
    },
    data: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          help: {
            type: 'string',
            example: 'The current server time in epoch seconds',
          },
          name: {
            type: 'string',
            example: 'server_time',
          },
          type: {
            type: 'string',
            example: 'counter',
          },
          values: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                value: {
                  type: 'number',
                  example: '1684186923',
                },
                labels: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    le: { type: 'number', example: '0.1' },
                    route: { type: 'string', example: 'time' },
                  },
                },
                metricName: {
                  type: 'string',
                  example: 'http_request_duration_seconds_bucket',
                },
              },
            },
          },
          aggregator: {
            type: 'string',
            example: 'sum',
          },
        },
      },
    },
  },
};

export { GetMetricsResponse };
