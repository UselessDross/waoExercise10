// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  order  ]

import { Router, json } from 'express';

import * as order from './endpoints'

const router = Router()


router.get(''        ,         order.endpointlist  );
router.post(''       ,         order.endpointPost  );   
router.get(   '/:uid', json(), order.endpointGetID );
router.put(   '/:uid', json(), order.endpointPutID );
router.patch( '/:uid', json(), order.endpointPatch );
router.delete('/:uid', json(), order.endpointDelete);

export { router };