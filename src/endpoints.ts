import { Request, Response } from "express";
import receiveMessage        from "./RabbitMQ/receive";
import sendMessage           from "./RabbitMQ/send";

const endpointPost = async (req: Request, res: Response) => {
                                                            const msg = req.body;
                                                            sendMessage(msg);
                                                            res.json({ message: "Message sent to RabbitMQ" });
                                                            };

const endpointGet = async (req: Request, res: Response) => {
                                                           const message = receiveMessage();
                                                           res.json({ message: message });
                                                           };

export {
       endpointPost,
       endpointGet,
       };
