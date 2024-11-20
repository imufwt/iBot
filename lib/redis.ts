import {createClient} from '@redis/client';
import { redisKey, redisDb } from "@/config.json";

// 创建一个Redis客户端

// 创建一个Redis客户端
const client = createClient({
    url: 'redis://:'+redisKey+'@127.0.0.1:6379/'+redisDb
});

client.on('connect', () => {
    console.log('Connected to Redis');
});

client.on('error', (err: any) => {
    console.error('Redis Error:', err);
});

// 连接Redis客户端
client.connect().then(() => {
    console.log('Redis client connected');
}).catch((err) => {
    console.error('Failed to connect to Redis:', err);
});

// 在应用关闭时断开连接
process.on('exit', () => {
    client.disconnect().then(() => {
        console.log('Redis client disconnected');
    }).catch((err) => {
        console.error('Failed to disconnect from Redis:', err);
    });
});

export { client };