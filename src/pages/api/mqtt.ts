import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        if (res.socket.server.io) {
            console.log('Socket.io server is running');
        } else {
            console.log('Socket.io server is not running');
        }
        const { message } = req.body;

        socket.emit('mqtt_publish', message);

        res.status(200).json({ message: 'Message sent to MQTT broker' });
    } else {
        res.status(400).json({ message: 'Invalid request method' });
    }
};

export default handler;

