import Fishpi,{ClientType} from 'fishpi';
export default {
  name: '小冰消息相关',
  /**
   * 任务执行时间
   */
  time: '08:00:00',
  /**
   * 任务执行
   * @param fireDate 任务执行时间
   * @param fishpi FishPi实例
   */
  async exec(fireDate: Date, fishpi: Fishpi) {
    for (let i = 0; i < 6; i++) {
      let currIndex = i;
      if(currIndex === 0){
        fishpi.chatroom.send("小冰 去打劫", ClientType.IceNet, "小冰模拟网络");
      }else{
        setTimeout(() => {
          // 每隔三十秒 要一次红包 不管给不给
          fishpi.chatroom.send("小冰 来个红包", ClientType.IceNet, "小冰模拟网络");
        }, 30000 * currIndex);
      }
    }
  },
  /**
   * 是否启用
   */
  enable: true,
}