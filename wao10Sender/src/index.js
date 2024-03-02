import { sendData } from "./send.js";
import express      from "express";
import amqp         from "amqplib";
const PORT = process.env.PORT || 4001;
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



app.get("/send-msg", (req, res) => {
                                   const data = {
                                                 title: "Six of Crows",
                                                 author: "Leigh Burdugo"
                                                 }
                                   sendData(data,channel,connection);
                                   console.log("A message is sent to queue")
                                   res.send("Message Sent"); 
                                   })
app.listen(PORT, () => console.log("Server running at port " + PORT));