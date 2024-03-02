import express from "express";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());



/* connectQueue() // call connectQueue function
async function connectQueue() {
    try {

        connection = await amqp.connect("amqp://localhost:5672");
        channel = await connection.createChannel()
        
        // connect to 'test-queue', create one if doesnot exist already
        await channel.assertQueue("test-queue")
        
    } catch (error) {
        console.log(error)
    }
} */

export const sendData = async (data, channel, connection) => {
    // send data to queue
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
        
    // close the channel and connection
    await channel.close();
    await connection.close();
}

