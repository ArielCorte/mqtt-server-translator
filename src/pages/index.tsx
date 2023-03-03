import { type NextPage } from "next";
const client = require("../server/mqtt-server")

const Home: NextPage = () => {
    console.log(client);
    return <div>Here is mqtt server</div>;
};
export default Home;
