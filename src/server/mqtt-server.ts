// connect to mqtt server
import mqtt from 'mqtt';

export function connectToBroker() {
    console.log('connecting to mqtt server')
    const client = mqtt.connect('mqtt://test.mosquitto.org:1883')
    client.on('connect', () => {
        client.subscribe('lacienradioarielcorte', (err) => {
            if (err) return err
        })
    })
    client.on('message', (topic, message) => {
        console.log(`message received on topic ${topic}: `, message.toString())
        return message.toString()
    })
    return client
}

export function subscribeToTopic(client: mqtt.Client, topic: string, callback: (message: string) => void) {
    client.subscribe(topic, (err) => {
        if (err) return err
        callback('subscribed to topic')
        return 'success'
    })
}

export function publishToTopic(client: mqtt.Client, topic: string, message: string) {
    client.publish(topic, message)
}
