"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointlist = exports.endpointPost = exports.model = void 0;
const dataModel_1 = require("./model/dataModel");
const send_1 = require("./send");
const amqplib_1 = __importDefault(require("amqplib"));
const mongoose = require('mongoose');
const connection2 = mongoose.createConnection('mongodb://localhost:27017/');
exports.model = connection2.model('wao10', dataModel_1.schema);
var channel, connection;
connectQueue(); // call connectQueue function
async function connectQueue() {
    try {
        connection = await amqplib_1.default.connect("amqp://localhost:5672");
        channel = await connection.createChannel();
        await channel.assertQueue("test-queue");
    }
    catch (error) {
        console.log(error);
    }
}
const endpointlist = async (req, res) => {
    res.json(await exports.model.find().lean());
};
exports.endpointlist = endpointlist;
const endpointPost = async (req, res) => {
    const data = {
        name: "John Smith",
        age: 32,
        level: 5,
    };
    (0, send_1.sendData)(data, channel, connection);
    console.log("A message is sent to queue");
    res.send("Message Sent");
};
exports.endpointPost = endpointPost;
