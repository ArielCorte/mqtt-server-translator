import mqtt, { type MqttClient } from 'mqtt';
//declare function require(name: string);
//const mqtt = require('mqtt')
const client: MqttClient = mqtt.connect('mqtt://test.mosquitto.org:1883')

client.on('connect', () => {
    console.log('connected')
})

export { client }
