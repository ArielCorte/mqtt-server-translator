import { type NextPage } from "next";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io();

const Home: NextPage = () => {

    useEffect(() => {
        console.log('trying to connect to socket')
        socket.on("mqtt_message", (message) => {
            console.log('Received mqtt message: ', message);
        })
    }, []);
    return <div>Here is mqtt server</div>;
};
export default Home;
