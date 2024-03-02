#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var amqp = require('amqplib/callback_api');
var _channel;
amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        var queue = 'hello';
        var msg = 'Hello World!';
        _channel = channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent %s", msg);
    });
    setTimeout(function () {
        connection.close();
        process.exit(0);
    }, 500);
});
function sendMessage(messages) {
    const queue = 'hello';
    channel.sendToQueue(queue, Buffer.from(messages));
}
exports.default = sendMessage;
