import express from "express";
const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());

import { sendData } from "./send.js";

import  amqp from "amqplib";
var channel, connection;


connectQueue() // call connectQueue function
async function connectQueue() {
    try {

        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel()
        
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue("test-queue")
        
    } catch (error) {
        console.log(error)
    }
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