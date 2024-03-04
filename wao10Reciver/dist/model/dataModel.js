"use strict";
// middle-were: [  index  ]--<#>[  router-controlls  ]--<#>[  endpoints  ]--<#>[  send  ]
//                                                                L---------<#>[> dataModel <]
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const mongoose_1 = require("mongoose");
exports.schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    level: { type: Number, required: true },
    timestamp: { type: Number, required: false },
});
