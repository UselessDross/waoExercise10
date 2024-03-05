// middle-were: [  index  ]--<#>[> router-controlls <]--<#>[  endpoints  ]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]


import { Router, json } from 'express';
import * as order       from './endpoints'
const router = Router()


router.get( '', order.endpointlist  );
router.post('', order.endpointPost  );   



export { router };