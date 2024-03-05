// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]

import express                from "express";
import { router } from "./router-controlls";
import { connectQueue } from "./connectQueue";
const PORT = process.env.PORT || 4002;
const app  = express();
app.use(express.json());

require('dotenv').config();
connectQueue() 

app.get("/recive-msg", router);
app.listen(PORT, () => console.log("Server running at port " + PORT));
