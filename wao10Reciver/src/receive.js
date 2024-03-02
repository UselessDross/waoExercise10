#!/usr/bin/env node



 export function consumeMessage(channel, connection){
    var data;
    channel.consume("test-queue", data => {
                                           // console.log(data)
                                           console.log("Data received : ", `${Buffer.from(data.content)}` );
                                           channel.ack(data)
                                           })
return data;
};
