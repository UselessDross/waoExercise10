import express from "express";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());




export const sendData = async (data, channel, connection) => {
    // send data to queue
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
        
    // close the channel and connection
    await channel.close();
    await connection.close();
}

