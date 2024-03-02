// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  order  ]
import client, { Connection, Channel, ConsumeMessage } from "amqplib";
import { Request, Response }                           from "express";
import { schema }                                      from "./model/dataModel.js";
import { sendData }                                    from "./send.js";
import amqp                                            from "amqplib";
const mongoose      = require('mongoose');
const connection2   = mongoose.createConnection('mongodb://mongodb:27017/')

export const model = connection2.model('dataModel', schema)

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
                                                              const { f, t, m } = req.query;
                                                              console.log(f, t, m);
                                                              let filter = {}
                                                              if(m) {         filter = { name: m } } 
                                                              if(f && t) {    filter = { ...filter, timestamp: { $gt: f, $lt: t }}}
                                                               else { 
                                                                      if(f) { filter = { ...filter, timestamp: { $gt: f }} }
                                                                      if(t) { filter = { ...filter, timestamp: { $lt: t }} }
                                                                      }
                                                              res.json(await model.find(filter).lean())
                                                            };
  
const endpointPost = async (req: Request, res: Response) =>{
                                                            const data = {
                                                            title: "Six of Crows",
                                                            author: "Leigh Burdugo"
                                                            }
                                                            sendData(data, channel,connection);
                                                            console.log("A message is sent to queue")
                                                            res.send("Message Sent"); 
                                                            }
                                                           

const endpointGetID = async (req: Request, res: Response) =>{
                                                            const { uid } = req.params; 
                                                            res.json(await model.findById(uid).lean())
                                                            }



export {
        endpointPost,
        endpointGetID,
        endpointlist,
        }