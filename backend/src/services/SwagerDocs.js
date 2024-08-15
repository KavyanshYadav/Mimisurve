const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { swaggerDefinition } = require('../config/swager.config');


const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/routes/*.js'],
  };
  

const SwaggerInitialize = () =>{
    const swaggerSpec = swaggerJsdoc(options);
    return swaggerSpec

}
module.exports = {SwaggerInitialize}