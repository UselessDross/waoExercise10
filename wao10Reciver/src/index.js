import express from "express";
const app = express();
app.use(express.json());

import { consumeMessage } from "./receive.js";

const PORT = process.env.PORT || 4002;

import  amqp from "amqplib";
var channel, connection;


connectQueue() // call connectQueue function
async function connectQueue() {
    try {
        connection = await amqp.connect("amqp://localhost:5672");
        channel    = await connection.createChannel()
        
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue("test-queue")
        

      
    } catch (error) {
        console.log(error)
    }
}



app.get("/recive-msg", (req, res) => {

    consumeMessage(channel, connection)
    
})









app.listen(PORT, () => console.log("Server running at port " + PORT));
