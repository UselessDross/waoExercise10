// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]


import * as order       from './endpoints.js'
import { Router, json } from 'express';
const router = Router()

router.get(''     ,         order.endpointlist  );
router.get('/:uid', json(), order.endpointGetID );

export { router };