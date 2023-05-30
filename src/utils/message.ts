import { ElMessage, MessageHandler, MessageParamsWithType } from 'element-plus';
import { AppContext } from 'vue';

enum MESSAGE_TYPE {
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
}

const messageList: MessageHandler[] = [];
const limit: number = 3;

const createMessageInstance = () => {
  /**
   * @description: 判断是否超过最大数量
   * @return {*}
   */
  function judgeCount() {
    if (messageList.length >= limit) {
      // 超过最大数，关闭最先弹出的
      const firstInstance = messageList.shift();
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
  function showMessageByType(
    type: MESSAGE_TYPE,
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    judgeCount();
    const instanse = ElMessage[type](options, appContext);
    messageList.push(instanse);
  }

  function baseFunc(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    judgeCount();
    const instanse = ElMessage(options, appContext);
    messageList.push(instanse);
  }

  /**
   * @description: 成功消息
   * @return {*}
   */
  function success(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    showMessageByType(MESSAGE_TYPE.SUCCESS, options, appContext);
  }

  /**
   * @description: 警告
   * @return {*}
   */
  function warning(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    showMessageByType(MESSAGE_TYPE.WARNING, options, appContext);
  }

  /**
   * @description: 信息
   * @return {*}
   */
  function info(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    showMessageByType(MESSAGE_TYPE.INFO, options, appContext);
  }

  /**
   * @description: 错误
   * @return {*}
   */
  function error(
    options?: MessageParamsWithType,
    appContext?: AppContext | null | undefined
  ) {
    showMessageByType(MESSAGE_TYPE.ERROR, options, appContext);
  }

  baseFunc.success = success;
  baseFunc.warning = warning;
  baseFunc.info = info;
  baseFunc.info = info;

  return baseFunc;
};

export const Message = createMessageInstance();

export default Message;
