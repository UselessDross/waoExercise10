#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

/*
Note that we declare the queue here, as well. Because we might start the consumer before the publisher, we want to make sure the queue exists before we try to consume messages from it.
*/
amqp.connect('amqp://localhost', function(error0, connection) {
                                                              if (error0) { throw error0; }
                                                              connection.createChannel(function(error1, channel) {
                                                                                                                if (error1) { throw error1; }
                                                                                                                var queue = 'hello';
                                                                                                                channel.assertQueue(queue, { durable: false });
                                                                                                                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
                                                                                                                channel.consume(queue, function(msg) { console.log(" [x] Received %s", msg.content.toString()); }, { noAck: true });
                                                                                                                });
                                                            });