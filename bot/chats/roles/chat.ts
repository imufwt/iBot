import chat from "@/src/chat";
import Fishpi, { ChatData } from "fishpi";
import { setKey, getKey } from "@lib/redis";

export default [{
  match: [/^行行好吧/],
  exec: async ({ markdown, senderUserName }: ChatData, fishpi: Fishpi) => {
    // 当前时间
    const now = new Date();
    // 第二天的0点时间
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    // 毫秒数差，并转换为秒 转化为整数
    const diff = (tomorrow.getTime() - now.getTime()) / 1000;
    // 查询标识
    const key = await getKey("chat:beg:user:" + senderUserName);
    // 查询 标识 如果没有标识，就创建一个
    if (key) {
      // 否则就提示已经存在
      await chat.sendTo(senderUserName, "诶嘿. 做人不能太贪心哦~");
    } else {
      await chat.sendTo(senderUserName, "诶嘿. 不应该是鸽行行好吧?");
      chat.chatRoomSend("凌 发红包 " + senderUserName + " " + (Math.floor(Math.random() * 64) + 1) + " 行行行,好好好!");
      // 设置标识 第二天0点过期
      setKey("chat:beg:user:" + senderUserName, "1", Math.floor(diff));
    }
  },
  enable: true,
}]