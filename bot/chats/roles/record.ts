import Fishpi, { ChatData, ClientType } from "fishpi";
import { getRecord } from "@lib/guess";
import { client } from '@lib/redis';

export default [{
  match: [/^行行好吧/],
  exec: async ({ markdown, senderUserName }: ChatData, fishpi: Fishpi) => {
    await fishpi.chat.send(senderUserName, "诶嘿. 不应该去鸽行行好吧?");
    // 查询 标识
    client.get(senderUserName).then(async (key: string | null) => {
      // 如果没有标识，就创建一个
      if (!key) {
        fishpi.chatroom.send("凌 发红包 " + senderUserName + " 1 行行好!", ClientType.ElvesOnline, "精灵互联");
        await client.set(senderUserName, "1");
        await client.expire(senderUserName, 60 * 1);
        return;
      }
      // 否则就提示已经存在
      await fishpi.chat.send(senderUserName, "诶嘿. 做人不能太贪心哦~");
    })
    .catch((error) => {
      console.error('Redis error:', error);
    });
  },
  enable: true,
}]