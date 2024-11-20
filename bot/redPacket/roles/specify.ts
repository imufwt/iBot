import Fishpi, { ChatMsg, RedPacket } from "fishpi";

let loginUser: string | null = null;
export default {
  async exec({ content: redpack, userName, oId }: ChatMsg, fishpi: Fishpi) {
    redpack = redpack as RedPacket;
    
    console.log(`${userName} 发送了专属红包，金额：${redpack.money}, 收件人：${redpack.recivers}`);
    console.log(" ----------------------------------------------------------");

    if (!loginUser) loginUser = await fishpi.account.info().then((data: any) => data.data.userName);
    if (redpack.money <= 0) return;
    if (!redpack.recivers?.includes(loginUser!)) return;
    setTimeout(() => {
      fishpi.chatroom.redpacket.open(oId);
    }, 3000)
  },
  enable: true,
}