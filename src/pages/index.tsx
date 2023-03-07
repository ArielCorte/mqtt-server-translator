import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import type { NextPage } from 'next';
import { connectToBroker, subscribeToTopic } from '../server/mqtt-server';
import type { MqttClient } from 'mqtt';


const Index: NextPage = () => {
    const [message, setMessage] = useState('');
    const [client, setClient] = useState<MqttClient>();

    const handleClick = async () => {
        try {
            await axios.get('/api/mqtt/mqtt', {});
        } catch (err) {
            console.error(err);
        }
    };

    const callbackFunction = useCallback(
        () => {
            const message = 'callback mqtt'
            console.log(`received from frontend: ${message}`);
        },
        [],
    )

    const handleConnect = () => {
        connectToBroker();
    }

    const handleSubscribe = () => {
        if (!client) {
            console.log('client is undefined');
            return;
        }
        console.log('subscribing to topic');
        subscribeToTopic(client, 'arielcorte', callbackFunction);
    }

    return (
        <div>
            <h1>{message}</h1>
            <button onClick={handleClick}>Send MQTT message</button>
            <button onClick={handleConnect}>Connect to MQTT</button>
        </div>
    );
}

export default Index;
