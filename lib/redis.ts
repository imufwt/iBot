import { createClient } from "redis";
import { redis } from "../config.json";

let client: any;
export const initRedis = async () => {
    if (client) return;
    client = await createClient({
        url: `redis://${redis.host}:${redis.port}`,
        password: redis.password,
        database: redis.db,
    })
        .on("error", function (err: any) {
            console.log("redis error: " + err);
        })
        .connect();
    return client;
};

export const setKey = async (key: string, value: any, exprires: any = null) => {
    key = key.toUpperCase();
    if (!client) await initRedis();
    value = JSON.stringify(value);
    const res = await client.set(key, value);
    //设置过期 单位：秒
    if (exprires !== null) {
        await client.expire(key, exprires);
    }
};
export const getKey = async (key: string) => {
    key = key.toUpperCase();
    if (!client) await initRedis();
    const value = await client.get(key);
    try {
        return value ? JSON.parse(value) : null;
    } catch (e) {
        return value;
    }
};

export const getKeys = async (key: string) => {
    key = key.toUpperCase();
    if (!client) await initRedis();
    const value = await client.keys(key);
    return value;
};

export const delKey = async (key: string) => {
    if (!client) await initRedis();
    await client.del(key);
};