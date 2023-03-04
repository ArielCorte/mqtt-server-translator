import type { NextApiRequest, NextApiResponse } from 'next'
import { subscribeToTopic } from '../../server/mqtt-server'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const client = subscribeToTopic('test');

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    req.socket.setTimeout(0);
    req.socket.setNoDelay(true);
    req.socket.setKeepAlive(true);

    req.socket.on('close', () => {
        console.log('Connection closed');
        client.end();
    })

    res.write('\n')
}
