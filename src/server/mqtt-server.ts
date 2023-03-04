import { type MqttClient, connect } from 'mqtt';
import { createServer } from 'http';
import { Server } from 'socket.io';

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    console.log('Client connected to MQTT endpoint');
    socket.on('disconnect', () => {
        console.log('Client disconnected from MQTT endpoint');
    });
});

subscribeToTopic('my/mqtt/topic');

httpServer.listen(3001, () => {
    console.log('Server listening on port 3000');
});

export function subscribeToTopic(topic: string): MqttClient {
    const client = connect('mqtt://test.mosquitto.org:1883');

    client.on('connect', () => {
        console.log('Connected to MQTT broker');
        client.subscribe(topic, (err) => {
            if (err) {
                console.log('Error subscribing to topic', err);
            } else {
                console.log('Subscribed to topic', topic);
            }
        })
    })

    client.on('message', (topic, message) => {
        console.log(`Received message on topic ${topic}:`, message.toString());
        io.emit('message', message.toString());
    })

    return client;
}
