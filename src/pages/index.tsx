import { useState } from 'react';
import axios from 'axios';
import { io, type Socket } from 'socket.io-client';
import type { NextPage } from 'next';

const socket: Socket = io('http://localhost:3000');

const Index: NextPage = () => {
    const [message, setMessage] = useState('');

    socket.on('connect', () => {
        console.log('Socket.io client connected');
    });

    socket.on('mqtt_message', (data: string) => {
        console.log(`MQTT message received: ${data}`);
        setMessage(data);
    });

    const handleClick = async () => {
        try {
            await axios.post('/api/mqtt', { message: 'Hello, MQTT!' });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={handleClick}>Send MQTT message</button>
        </div>
    );
}

export default Index;
