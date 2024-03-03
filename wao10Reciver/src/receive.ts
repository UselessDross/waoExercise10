#!/usr/bin/env node
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> recive <]
//                                                                L---------<#>[  dataModel  ]

import { Connection, Channel, ConsumeMessage } from "amqplib";


 export function consumeMessage(channel:Channel, connection:Connection){
    var Data:any;
    channel.consume("test-queue", Data => {
                                           // console.log(data)
                                           console.log("Data received : ", `${Buffer.from(Data.content)}` );
                                           channel.ack(Data)
                                           })
return Data;
};
