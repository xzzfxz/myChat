import { ElMessage, MessageHandler, MessageParamsWithType } from 'element-plus';
import { AppContext } from 'vue';

enum MESSAGE_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
}

export class Message {
  static messageList: MessageHandler[] = [];
  static limit: number = 3;

  /**
   * @description: 判断是否超过最大数量
   * @return {*}
   */
  static judgeCount() {
    if (this.messageList.length >= this.limit) {
      // 超过最大数，关闭最先弹出的
      const firstInstance = this.messageList.shift();
      firstInstance?.close();
    }
  }

  /**
   * @description: 根据类型显示消息
   * @param {MESSAGE_TYPE} type 消息类型
   * @param {MessageParamsWithType} options 配置
   * @param {AppContext} appContext
   * @return {*}
   */
  static showMessageByType(
    type: MESSAGE_TYPE,
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    this.judgeCount();
    const instanse = ElMessage[type](options, appContext);
    this.messageList.push(instanse);
  }

  /**
   * @description: 成功消息
   * @return {*}
   */
  static success(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    this.showMessageByType(MESSAGE_TYPE.SUCCESS, options, appContext);
  }

  /**
   * @description: 警告
   * @return {*}
   */
  static warning(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    this.showMessageByType(MESSAGE_TYPE.WARNING, options, appContext);
  }

  /**
   * @description: 信息
   * @return {*}
   */
  static info(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    this.showMessageByType(MESSAGE_TYPE.INFO, options, appContext);
  }

  /**
   * @description: 错误
   * @return {*}
   */
  static error(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    this.showMessageByType(MESSAGE_TYPE.ERROR, options, appContext);
  }
}

export default Message;
