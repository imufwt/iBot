import Fishpi, { ChatMsg, ClientType } from "fishpi";
import { getRecord } from "@lib/guess";
import { elvesKey, iceKey, opArr, elvesAddr, iceAddr, secret } from "@/config.json";

export default [{
  match: [/^/],
  exec: async ( msg: ChatMsg, fishpi: Fishpi) => {
// 正则表达式匹配空行
const emptyLineRegex = /\n\s*\n/g;
// 正则表达式匹配span标签及其内容
const spanTagRegex = /<span[^>]*>.*?<\/span>/gi;
// 去掉DIV
const divTagRegex = /<div[^>]*>.*?<\/div>/gi;
// 正则表达式匹配以 > 开始的行
const regex = /^>.*$/gm;

// 替换空行
let result = msg.md.replace(emptyLineRegex, '\n');
// 替换span标签及其内容
result = result.replace(spanTagRegex, '');
// 替换DIV
result = result.replace(divTagRegex, '');
// // 替换以 > 开始的行
// result = result.replace(regex, '');
// 打印
console.log(msg.userNickname + "(" + msg.userName + ")\t" +timestampToDate(Number(msg.oId))+ "\t说:");
console.log(result);
console.log(" ----------------------------------------------------------");
if(opArr.includes(msg.userName) && result.includes("重启精灵")){
  const key = elvesKey;
  // 获取当前时间戳
  const timestamp = Date.now();
  // 拼接MD5
  const md5 = require('crypto-js');
  // 发起http请求
  const url = `${elvesAddr}?user=${secret}&time=${timestamp}&sign=${md5.MD5(secret + timestamp+key).toString()}`;
  fetch(url).then(data => {
    console.log(data);
    fishpi.chatroom.send("给了她一个爱的大逼斗, 稍等会儿看看吧~", ClientType.ElvesOnline, "精灵互联");
  });
}
if(opArr.includes(msg.userName) && result.includes("重启冰冰")){
  const key = iceKey;
  // 获取当前时间戳
  const timestamp = Date.now();
  // 拼接MD5
  const md5 = require('crypto-js');
  // 发起http请求
  const url = `${iceAddr}?user=${secret}&time=${timestamp}&sign=${md5.MD5(secret + timestamp+key).toString()}`;
  fetch(url).then(data => {
    console.log(data);
    fishpi.chatroom.send("给了她一个爱的大逼斗, 稍等会儿看看吧~", ClientType.IceNet, "小冰模拟网络");
  });
}
  },
  enable: true,
}]

function timestampToDate(timestamp: number): string {
  const date = new Date(timestamp); // 时间戳转换为Date对象
  const year = date.getFullYear(); // 获取年份
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份并补零
  const day = date.getDate().toString().padStart(2, '0'); // 获取日期并补零
  const hours = date.getHours().toString().padStart(2, '0'); // 获取小时并补零
  const minutes = date.getMinutes().toString().padStart(2, '0'); // 获取分钟并补零
  const seconds = date.getSeconds().toString().padStart(2, '0'); // 获取秒钟并补零

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // 返回格式化日期字符串
}