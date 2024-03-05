#!/usr/bin/env node
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> recive <]
//                                                                L---------<#>[  dataModel  ]

import { schema              } from "../model/dataModel";
import { Connection, Channel } from "amqplib";

const mongoose     = require('mongoose');
const mongodbHost  = process.env.MONGODB_HOST || 'localhost'; // Default to 'localhost' if environment variable is not set
const mongoUrl     = `mongodb://${mongodbHost}:27017/test`;
const connection   = mongoose.createConnection(mongoUrl);
const model        = connection.model('wao10', schema)

export function consumeMessage(channel:Channel, connection:Connection){
    var Data:any;
    channel.consume("test-queue", async Data => {
                                           if (Data != null){
                                                            var obj = JSON.parse(Buffer.from(Data.content).toString());
                                                            console.log( obj);
                                                            await model.create(obj);
                                                            channel.ack(Data)
                                                            }
                                           });
return Data;
};
