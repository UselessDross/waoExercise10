"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[> send <]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendData = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4001;
app.use(express_1.default.json());
const sendData = async (data, channel, connection) => {
    // send data to queue
    await channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));
    // close the channel and connection
    await channel.close();
    await connection.close();
};
exports.sendData = sendData;
