// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  order  ]

import { Router, json } from 'express';
import * as order       from './endpoints.js'
const router = Router()


router.get(''        ,         order.endpointlist  );
router.post(''       ,         order.endpointPost  );   
router.get('/:uid'   , json(), order.endpointGetID );


export { router };