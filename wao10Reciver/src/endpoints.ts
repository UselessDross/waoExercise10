// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]

import { Connection, Channel, ConsumeMessage } from "amqplib";
import { Request, Response }                   from "express";
import { schema }                              from "../model/dataModel.js";
import { consumeMessage }                      from "./receive.js";
import amqp                                    from "amqplib";
const mongoose             = require('mongoose');
const connection2          = mongoose.createConnection('mongodb://mongodb:27017/')
export const model         = connection2.model('dataModel', schema)

var channel: Channel, connection: Connection;

connectQueue() // call connectQueue function
async function connectQueue() {
                                try {
                                     connection = await amqp.connect("amqp://localhost:5672");
                                     channel    = await connection.createChannel()
                                                  await channel.assertQueue("test-queue")
                                     } catch (error) { console.log(error) }
                              }
const endpointlist = async (req: Request, res: Response) => { res.json(await model.find().lean()) };
const endpointGetID = async (req: Request, res: Response) =>{
                                                            const { uid } = req.params; 
                                                            res.json(await model.findById(uid).lean())
                                                            };
export {
        endpointGetID,
        endpointlist,
        }