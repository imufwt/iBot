import Fishpi, { ChatData, ClientType } from "fishpi";
import { getRecord } from "@lib/guess";

export default [{
  match: [/^行行好吧/],
  exec: async ({ markdown, senderUserName }: ChatData, fishpi: Fishpi) => {
    await fishpi.chat.send(senderUserName, "诶嘿. 不应该去鸽行行好吧?");
    fishpi.chatroom.send("凌 发红包 " + senderUserName + " 1 行行好!", ClientType.ElvesOnline, "精灵互联");
  },
  enable: true,
}]