import Fishpi,{ClientType} from 'fishpi';
export default {
  name: '鸽鸽消息相关',
  /**
   * 任务执行时间
   */
  time: '09:00:00',
  /**
   * 任务执行
   * @param fireDate 任务执行时间
   * @param fishpi FishPi实例
   */
  async exec(fireDate: Date, fishpi: Fishpi) {
    fishpi.chatroom.send("鸽 行行好吧", ClientType.PC, "PC模拟网络");
  },
  /**
   * 是否启用
   */
  enable: true,
}