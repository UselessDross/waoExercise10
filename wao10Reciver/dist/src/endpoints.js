"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointGet = void 0;
const receive_1 = require("./receive");
const amqplib_1 = __importDefault(require("amqplib"));
const mongoose = require('mongoose');
const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'; // Default to localhost if environment variable is not set
const mongodbHost = process.env.MONGODB_HOST || 'localhost'; // Default to 'localhost' if environment variable is not set
const rabbitmqUrl = `amqp://${rabbitmqHost}:5672`;
const mongoUrl = `mongodb://${mongodbHost}:27017/test`;
var channel, connection;
connectQueue(); // call connectQueue function
async function connectQueue() {
    try {
        connection = await amqplib_1.default.connect(rabbitmqUrl);
        channel = await connection.createChannel();
        await channel.assertQueue("test-queue");
    }
    catch (error) {
        console.log(error);
    }
}
const endpointGet = async (req, res) => { (0, receive_1.consumeMessage)(channel, connection); };
exports.endpointGet = endpointGet;
