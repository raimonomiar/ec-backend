const swaggerJSDoc = require('swagger-jsdoc');
const config = require('config');

function load() {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: config.get('app.name'),
        description: config.get('app.description'),
        version: 'v1',
      },
      servers: [
        {
          url: config.get('env.swaggerAPIURL'),
          variables: {
            scheme: {
              description: 'The Data Set API is accessible via https and http',
              enum: [
                'https', 'http',
              ],
              default: 'http',
            },
          },
        },
      ],

      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
      security: [
        {
          Bearer: [],
        },
      ],
    },
    apis: ['./src/router/**/*.yaml',
    ], // Path to the API docs
  };

  const swaggerSpec = swaggerJSDoc(options);
  return swaggerSpec;
}

module.exports = {
  load,
};
