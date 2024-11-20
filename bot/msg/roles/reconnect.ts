import Fishpi, { ChatMsg, RedPacketType } from "fishpi";
import { timeout } from "@/config.json";

export default [{
  match: [/你的连接被管理员断开，请重新连接。/],
  exec: async ({ userName, md }: ChatMsg, fishpi: Fishpi) => {
    if (userName !== '马库斯') return;
    if (!md.includes((await fishpi.account.info()).data!.userName)) return;
    // 将 timeout 转化为数字
    let to = Number(timeout);
    setTimeout(async () => {
      console.dir(await fishpi.chatroom.reconnect({ timeout : to}));
      console.log(`已重连`, new Date().toLocaleString())
    }, to * 1000);
  },
  enable: true,
}, {
  match: [/您超过6小时未活跃/],
  exec: async ({ userName }: ChatMsg, fishpi: Fishpi) => {
    if (userName !== '摸鱼派官方巡逻机器人') return;
    // 将 timeout 转化为数字
    let to = Number(timeout);
    setTimeout(async () => {
      console.dir(await fishpi.chatroom.reconnect({ timeout : to }));
      console.log(`已重连`, new Date().toLocaleString())
    }, to * 1000);
  },
  enable: true,
}]