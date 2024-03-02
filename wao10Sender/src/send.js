#!/usr/bin/env node

import { connect } from 'http2';

var amqp = require('amqplib/callback_api');




const amqplib = require('amqplib');
const defaultConnectionString = "amqp://localhost";
const queueName = "test";// create a function to initiate the connection


const createConnection = async()=>{
    return amqplib.connect(defaultConnectionString)
};



const sendMessage = async (/** @type {WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>} */ msg ) => {
    const connection = await createConnection();             // making a connection to the queue
    const channel    = await connection.createChannel();     // create the chaneel
                       await channel.assertQueue(queueName); //validates the queue
    channel.sendToQueue(queueName, Buffer.from(msg));        // sending the data as a buffer

};



export default sendMessage();