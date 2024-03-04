"use strict";
// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const receive_1 = require("./receive");
const express_1 = __importDefault(require("express"));
const amqplib_1 = __importDefault(require("amqplib"));
const PORT = process.env.PORT || 4002;
const app = (0, express_1.default)();
app.use(express_1.default.json());
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
app.get("/recive-msg", (req, res) => {
    (0, receive_1.consumeMessage)(channel, connection);
});
app.listen(PORT, () => console.log("Server running at port " + PORT));
