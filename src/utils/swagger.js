// import basename from '../../utils.js';
import { basename } from './../../utils.js';

export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'API',
            version: '1.0.0',
            description: 'API description'
        }
    },
    apis: [`${basename}/docs/**/*.yaml`]
}