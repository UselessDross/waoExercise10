// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]


import { Connection, Channel } from "amqplib";
import { router }   from "./router-controlls";
import express      from "express";
import amqp         from "amqplib";




const app  = express();
      app.use('/model', router)
      app.use(express.json());
const PORT = process.env.PORT || 4001;


/* app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
   */




var channel: Channel, connection: Connection;
connectQueue() // call connectQueue function
async function connectQueue() {
                                try {
                                     connection = await amqp.connect("amqp://localhost:5672");
                                     channel    = await connection.createChannel()
                                                  await channel.assertQueue("test-queue")
                                     } catch (error) { console.log(error) }
                              }
app.get("/send-msg", router);
app.listen(PORT, () => console.log("Server running at port " + PORT));