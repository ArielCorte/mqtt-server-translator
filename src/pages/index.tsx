import { type NextPage } from "next";
import { useEffect } from "react";
import { client } from "../server/mqtt-server";


const Home: NextPage = () => {

    useEffect(() => {
        client.subscribe("test");
        client.on("message", (topic, message) => {
            console.log('Message received: ', message.toString());
        })
    }, []);
    return <div>Here is mqtt server</div>;
};
export default Home;
