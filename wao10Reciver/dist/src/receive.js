#!/usr/bin/env node
"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> recive <]
//                                                                L---------<#>[  dataModel  ]
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessage = void 0;
const dataModel_1 = require("../model/dataModel");
const mongoose = require('mongoose');
const mongodbHost = process.env.MONGODB_HOST || 'localhost'; // Default to 'localhost' if environment variable is not set
const mongoUrl = `mongodb://${mongodbHost}:27017/test`;
const connection = mongoose.createConnection(mongoUrl);
const model = connection.model('wao10', dataModel_1.schema);
function consumeMessage(channel, connection) {
    var Data;
    channel.consume("test-queue", async (Data) => {
        if (Data != null) {
            var obj = JSON.parse(Buffer.from(Data.content).toString());
            console.log(obj);
            await model.create(obj);
            channel.ack(Data);
        }
    });
    return Data;
}
exports.consumeMessage = consumeMessage;
;
