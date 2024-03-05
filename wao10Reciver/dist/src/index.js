"use strict";
// middle-were: [> index <]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  recive  ]
//                                                                L---------<#>[  dataModel  ]
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_controlls_1 = require("./router-controlls");
const connectQueue_1 = require("./connectQueue");
const PORT = process.env.PORT || 4002;
const app = (0, express_1.default)();
app.use(express_1.default.json());
require('dotenv').config();
(0, connectQueue_1.connectQueue)();
app.get("/recive-msg", router_controlls_1.router);
app.listen(PORT, () => console.log("Server running at port " + PORT));
