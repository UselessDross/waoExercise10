"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[> endpoints <]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpointlist = exports.endpointGetID = exports.model = void 0;
const dataModel_js_1 = require("../model/dataModel.js");
const amqplib_1 = __importDefault(require("amqplib"));
const mongoose = require('mongoose');
const connection2 = mongoose.createConnection('mongodb://mongodb:27017/');
exports.model = connection2.model('dataModel', dataModel_js_1.schema);
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
const endpointlist = async (req, res) => { res.json(await exports.model.find().lean()); };
exports.endpointlist = endpointlist;
const endpointGetID = async (req, res) => {
    const { uid } = req.params;
    res.json(await exports.model.findById(uid).lean());
};
exports.endpointGetID = endpointGetID;
