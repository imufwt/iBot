import chat from "@/src/chat"
import Fishpi, { ChatMsg } from "fishpi";
import { elvesKey, opArr, elvesAddr, secret } from "@/config.json";

import crypto from "crypto";
function md5(data: string) {
  return crypto.createHash("md5").update(data).digest("hex");
}

export default [{
  match: [/^重启精灵/],
  exec: async (msg: ChatMsg, fishpi: Fishpi) => {
    if (opArr.includes(msg.userName)) {
      const key = elvesKey;
      // 获取当前时间戳
      const timestamp = Date.now();
      // 发起http请求
      const url = `${elvesAddr}?user=${secret}&time=${timestamp}&sign=${md5(secret + timestamp + key).toString()}`;
      fetch(url).then(data => {
        chat.chatRoomSend("给了她一个爱的大逼斗, 稍等会儿看看吧~");
      });
    }
    return false;
  },
  enable: true,
},{
  match: [/^重启冰冰/],
  exec: async (msg: ChatMsg, fishpi: Fishpi) => {
    if (opArr.includes(msg.userName)) {
      chat.chatRoomSend("凌 唤醒 冰冰");
    }
    return false;
  },
  enable: true,
},{
  match: [/^重启鸽鸽/],
  exec: async (msg: ChatMsg, fishpi: Fishpi) => {
    if (opArr.includes(msg.userName)) {
      chat.chatRoomSend("冰启鸽");
    }
    return false;
  },
  enable: true,
}]