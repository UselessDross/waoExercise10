// begining     [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  order  ]
const express = require('express');
const { router } = require("./router-controlls");
const app = express();
const port = process.env.PORT || 8080;
app.use('/orders', router);
app.listen(port, () => { console.log(`Listening on port ${port}`); });
export {};
