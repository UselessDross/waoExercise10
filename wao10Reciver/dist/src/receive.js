#!/usr/bin/env node
"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> recive <]
//                                                                L---------<#>[  dataModel  ]
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeMessage = exports.model = void 0;
const mongoose = require('mongoose');
const connection = mongoose.createConnection('mongodb://localhost:27017/');
const dataModel_1 = require("../model/dataModel");
exports.model = connection.model('Orders', dataModel_1.schema);
function consumeMessage(channel, connection) {
    var Data;
    channel.consume("test-queue", async (Data) => {
        if (Data != null) {
            var obj = JSON.parse(Buffer.from(Data.content).toString());
            console.log(obj);
            await exports.model.create(obj);
            channel.ack(Data);
        }
    });
    return Data;
}
exports.consumeMessage = consumeMessage;
;
