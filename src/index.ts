// begining     [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  order  ]
//                   |                                           <^>
//                   +-------------<#>[  seed  ]------------------+

const express  = require('express')
import { router } from "./router-controlls";
const app = express()
import { seed } from './seed';

const port = process.env.PORT || 8080;
app.use('/orders', router)
app.get('/seed', seed)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
  