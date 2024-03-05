

import express from "express";
import amqp    from "amqplib";

require('dotenv').config();

const app  = express();
app.use(express.json());



export async function connectQueue() {
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