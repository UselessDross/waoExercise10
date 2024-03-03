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
const app = (0, express_1.default)();
app.use('/model', router_controlls_1.router);
app.use(express_1.default.json());
const PORT = process.env.PORT || 4001;
/* app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
   */
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
app.get("/send-msg", router_controlls_1.router);
app.listen(PORT, () => console.log("Server running at port " + PORT));
