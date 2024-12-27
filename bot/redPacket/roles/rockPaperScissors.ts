import Fishpi, { ChatMsg, RedPacket } from "fishpi";
import { getRecord, guess, result, success, failed } from "@lib/guess";

const rps = [ '石头', '剪刀', '布' ];

function getRandomInt(min: any, max: any) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default {
  exec({ content: redpack, userName, oId }: ChatMsg, fishpi: Fishpi) {
    redpack = redpack as RedPacket;

    console.log(`${userName} 发送了猜拳红包，金额：${redpack.money}`);
    console.log(" ----------------------------------------------------------");
    let randomGuess = redpack.msg.includes('拳') ? true : false;

    // 预备猜拳
    let points = redpack.money;
    // 猜测
    let g = guess(userName);
    if (randomGuess) {
      switch (getRandomInt(0, 2)) {
        case 0:
          g = getRandomInt(1,3)-1;
          break;
        case 1:
          g = getRandomInt(0,2)+1;
          break;
        case 2:
          g = Math.floor(Math.random() * 3);
          break;
      }
      console.log(`【${userName}】猜拳，红包金额：${points}，我随机出拳 ${rps[g]}`);
    }else{
      if (g == null) return;
      console.log(`【${userName}】猜拳，红包金额：${points}，我觉得应该出 ${rps[g]}`);
    }
    // 等待猜拳
    if (points <= 0 || points > 128) return;
    setTimeout(() => {
      // 尝试猜拳
      fishpi.chatroom.redpacket.open(oId, g).then(async (data: any) => {
        try {
          let user = (await fishpi.account.info()).data;
          if (!data) return console.log(data.message);

          // 猜拳结果
          const isMeOpen = data?.who[0].userName == user?.userName
          let r = result(userName, data!, g, isMeOpen);

          // 打印结果
          if (!isMeOpen) console.log(`没抢到${userName}的猜拳红包，他出拳：${rps[r]}，我本来出拳${rps[g]}，差点${g == success[r] ? '赢' : g == failed[r] ? '输' : '平局'}了`)
          else console.log(`${userName}出拳：${rps[r]}，我出拳${rps[g]}, ${data?.who[0].userName}获得${data?.who[0].userMoney}积分`);

          user = (await fishpi.account.info()).data
          console.log(`剩余 ${user?.userPoint} 积分`)
        } catch (error: any) {
          console.error('Error: ', error.message);
        }
      });
    }, 2678);
  },
  enable: true,
}