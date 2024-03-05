// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]

import { schema              } from "../model/dataModel";
import { consumeMessage      } from "./receive";
import { Connection, Channel } from "amqplib";
import { Request, Response   } from "express";
import amqp                    from "amqplib";
const mongoose     = require('mongoose');
const rabbitmqHost = process.env.RABBITMQ_HOST || 'localhost'; // Default to localhost if environment variable is not set
const mongodbHost  = process.env.MONGODB_HOST  || 'localhost'; // Default to 'localhost' if environment variable is not set
const rabbitmqUrl  = `amqp://${rabbitmqHost}:5672`;
const mongoUrl     = `mongodb://${mongodbHost}:27017/test`;



var channel: Channel, connection: Connection;
connectQueue() // call connectQueue function
async function connectQueue() {
                                try {
                                     connection = await amqp.connect(rabbitmqUrl);
                                     channel    = await connection.createChannel()
                                                  await channel.assertQueue("test-queue")
                                     } catch (error) { console.log(error) }
                              }
const endpointGet = async (req: Request, res: Response) =>{ consumeMessage(channel, connection) };
export { endpointGet, }