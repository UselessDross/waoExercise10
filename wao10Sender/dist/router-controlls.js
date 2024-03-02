// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  order  ]
import { Router } from 'express';
import * as order from './endpoints';
const router = Router();
router.post('', order.endpointPost); // Route for adding data to RabbitMQ
router.get('', order.endpointGet); // Route for receiving messages from RabbitMQ
export { router };
