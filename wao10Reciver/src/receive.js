const amqplib = require("amqplib");
const defaultConnectionString = "amqp://localhost";


const queueName = "test_queue"; // create a function to initiate the connection
const createConnection = async () => { return amqplib.connect(defaultConnectionString); }; // Function to start receiving messages
const receiveMessages  = async () => { 
                                      const connection = await createConnection();         // making a connection to the queue
                                      const channel    = await connection.createChannel(); // creating a channel to communicate
                                      await channel.assertQueue(queueName);                // queue validity
                                      channel.consume(queueName, (msg)=>{ 
                                                                         const receivedMsg = msg.content.toString();
                                                                         console.log({receivedMsg})
                                                                        }
                                                      );
                                      };

export default receiveMessages();