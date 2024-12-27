import chat from "@/src/chat"
import Fishpi, { ChatMsg, RedPacketType } from "fishpi";
import { setKey, getKey } from "@lib/redis";
function getRandomInt(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default [{
  match: [/^.*\d*拳/],
  exec: async (msg: ChatMsg, fishpi: Fishpi) => {
    
    console.log(msg.md);

    const regex = /(\d+)拳/;
    const match = msg.md.match(regex);
    if (match) {
      const fistCount = parseInt(match[1]);
      console.log(fistCount);
      if(fistCount > 8){
        return false;
      }
    // 查询标识
    const key = await getKey("rps:key");
    // 查询 标识 如果没有标识，就创建一个
    if (key) {
      // 否则就提示已经存在
      // await chat.chatRoomSend("糟, 我CD了, 你们继续");
    } else {
      // 猜测
      let g = getRandomInt(0, 2);
      switch (g) {
        case 0:
          g = getRandomInt(1, 3) - 1;
          break;
        case 1:
          g = getRandomInt(0, 2) + 1;
          break;
        case 2:
          g = Math.floor(Math.random() * 3);
          break;
      }
      let m = '跟你'+fistCount+'拳！';
      if (msg.userName == 'vmet') {
        m = '看我给你'+fistCount+'拳！';
      }
      fishpi.chatroom.redpacket.send({
        money: 32 * fistCount,
        count: 1,
        gesture: g,
        type: RedPacketType.RockPaperScissors,
        recivers: [],
        msg: m
      })
      // 设置过期时间
      setKey("rps:key", g, 31);
    }
    } else {
      console.log("没有找到拳数");
    }
    return false;
  },
  enable: true,
}]