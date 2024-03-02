import receiveMessage from "./RabbitMQ/receive";
import sendMessage from "./RabbitMQ/send";
const endpointPost = async (req, res) => {
    const msg = req.body;
    sendMessage(msg);
    res.json({ message: "Message sent to RabbitMQ" });
};
const endpointGet = async (req, res) => {
    const message = receiveMessage();
    res.json({ message: message });
};
export { endpointPost, endpointGet, };
