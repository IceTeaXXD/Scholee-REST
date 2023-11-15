import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

export const client = createClient({
    socket: {
        host: "127.0.0.1",
        port: 6379,
    }
});
