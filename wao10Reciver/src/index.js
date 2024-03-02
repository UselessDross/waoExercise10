import { consumeMessage } from "./receive.js";
import express            from "express";
import amqp               from "amqplib";
const PORT = process.env.PORT || 4002;
const app  = express();
      app.use(express.json());

      
var channel, connection;
connectQueue() // call connectQueue function
async function connectQueue() {
                               try {
                                    connection = await amqp.connect("amqp://localhost:5672");
                                    channel    = await connection.createChannel()
                                                 await channel.assertQueue("test-queue")
                                    } catch (error) { console.log(error) }
                               }
app.get("/recive-msg", (req, res) => { 
                                     consumeMessage(channel, connection) 
                                     })
app.listen(PORT, () => console.log("Server running at port " + PORT));
