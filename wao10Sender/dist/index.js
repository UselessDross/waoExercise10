"use strict";
// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  send  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_controlls_1 = require("./router-controlls");
const express_1 = __importDefault(require("express"));
const amqplib_1 = __importDefault(require("amqplib"));
var connection;
var channel;
const PORT = process.env.PORT || 4001;
const app = (0, express_1.default)();
app.use('/model', router_controlls_1.router);
app.use(express_1.default.json());
connectQueue();
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
app.get("/send-msg", router_controlls_1.router);
app.listen(PORT, () => console.log("Server running at port " + PORT));
process.on("exit", async () => {
    console.log("Running channel.close()...");
    console.log("Running connection.close()...");
    await channel.close();
    await connection.close();
    console.log("Both closed successfully.");
});
