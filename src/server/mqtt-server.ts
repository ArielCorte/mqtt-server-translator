import mqtt from 'mqtt';
import { Server } from 'socket.io';

const client = mqtt.connect('mqtt://test.mosquitto.org');
const io = new Server({ cors: { origin: '*' } });
console.log('initializing mqtt server');

client.on('connect', () => {
    console.log('MQTT client connected');
    client.subscribe('test');
});

client.on('message', (topic, message) => {
    console.log(`MQTT message received: ${message.toString()}`);
    io.emit('mqtt_message', message.toString());
});

io.listen(3000, () => {
    console.log('Socket.io server listening on port 3000');
});

