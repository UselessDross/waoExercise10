#!/usr/bin/env node
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> recive <]
//                                                                L---------<#>[  dataModel  ]

import { Connection, Channel, ConsumeMessage } from "amqplib";
const mongoose      = require('mongoose');
const connection   = mongoose.createConnection('mongodb://localhost:27017/test')
import { schema } from "../model/dataModel";
export const model = connection.model('Orders', schema)

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
