"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectQueue = void 0;
const express_1 = __importDefault(require("express"));
const amqplib_1 = __importDefault(require("amqplib"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
async function connectQueue() {
    try {
        const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'; // Default to localhost if environment variable is not set
        const rabbitmqUrl = `amqp://${rabbitmqHost}:5672`; // Construct RabbitMQ URL using the environment variable
        const connection = await new Promise((resolve, reject) => {
            amqplib_1.default.connect(rabbitmqUrl, (error, conn) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(conn);
                }
            });
        });
        const channel = await connection.createChannel();
        await channel.assertQueue("test-queue");
        console.log("Connected to RabbitMQ successfully.");
    }
    catch (error) {
        console.log("Error connecting to RabbitMQ:", error);
    }
}
exports.connectQueue = connectQueue;
