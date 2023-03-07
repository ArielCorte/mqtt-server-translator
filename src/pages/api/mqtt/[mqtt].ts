import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { connectToBroker, publishToTopic } from '../../../server/mqtt-server';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    console.log('api executed')
    const client = connectToBroker()
    const topic = 'lacienradioarielcorte'
    const message = 'hello world'
    publishToTopic(client, topic, message)


    return res.status(200).json({ data: 'hey there' })
}

export default handler;

