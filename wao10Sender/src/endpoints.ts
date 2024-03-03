// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]

import { Connection, Channel, ConsumeMessage } from "amqplib";
import { Request, Response }                   from "express";
import { schema }                              from "./model/dataModel";
import { sendData }                            from "./send";
import amqp                                    from "amqplib";
       const mongoose      = require('mongoose');
       const connection2   = mongoose.createConnection('mongodb://mongodb:27017/')
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
const endpointlist = async (req: Request, res: Response) => {
                                                              res.json(await model.find().lean())
                                                            };
const endpointPost = async (req: Request, res: Response) =>{
                                                            const data = {
                                                            name:     "John Smith",
                                                            age:       32,
                                                            level:     5,
                                                            }
                                                            sendData(data, channel,connection);
                                                            console.log("A message is sent to queue")
                                                            res.send("Message Sent"); 
                                                            };
const endpointGetID = async (req: Request, res: Response) =>{
                                                            const { uid } = req.params; 
                                                            res.json(await model.findById(uid).lean())
                                                            };
export {
        endpointPost,
        endpointGetID,
        endpointlist,
        } //