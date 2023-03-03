"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
//declare function require(name: string);
//const mqtt = require('mqtt')
const client = mqtt_1.default.connect('mqtt://test.mosquitto.org');
client.on('connect', function () {
    client.subscribe('presence', function (err) {
        if (!err) {
            client.publish('presence', 'Hello mqtt');
        }
    });
});
client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    client.end();
});
