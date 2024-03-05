// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]

import { Connection, Channel } from "amqplib";
import { router              } from "./router-controlls";
import   express               from "express";
import   amqp                  from "amqplib";


var connection: Connection;
var channel:    Channel;
const PORT = process.env.PORT || 4001;
const app  = express();
      app.use('/model', router);
      app.use(express.json());
      require('dotenv').config();



async function connectQueue() {
        try {
            const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'; // Default to localhost if environment variable is not set
            const rabbitmqUrl  = `amqp://${rabbitmqHost}:5672`; // Construct RabbitMQ URL using the environment variable
            const connection   = await new Promise<amqp.Connection>((resolve, reject) => {
                                                          amqp.connect(rabbitmqUrl, (error: Error, conn: amqp.Connection) => {
                                                                                                                             if (error) { reject(error); } 
                                                                                                                             else       { resolve(conn); }
                                                                                                                             });
                                                                                         });
            const channel      = await connection.createChannel();
            await channel.assertQueue("test-queue");
                          console.log("Connected to RabbitMQ successfully.");
        } catch (error) { console.log("Error connecting to RabbitMQ:", error); }
    }
connectQueue() 


app.get("/send-msg", router);
app.listen(PORT, () => console.log("Server running at port " + PORT));



process.on("exit",async () => {
  console.log("Running channel.close()...");
  console.log("Running connection.close()...");
  await channel.close();
  await connection.close();
  console.log("Both closed successfully.")
});