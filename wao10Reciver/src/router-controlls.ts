// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]


import * as order       from './endpoints'
import { Router, json } from 'express';
const router = Router()

router.get('', order.endpointGet );

export { router };