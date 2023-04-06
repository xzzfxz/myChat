import { message } from 'ant-design-vue';
import axios, { AxiosRequestConfig } from 'axios';

export const instance = axios.create({
  timeout: 30000,
});

instance.interceptors.response.use(
  (response) => {
    const config: AxiosRequestConfig = response.config;
    const headers = config?.headers || {};
    if (headers.noCheckResult) {
      return response.data;
    }
    if (response.status === 200) {
      // 网络请求成功
      if (response.data.code === 200) {
        // 接口返回成功
        return response.data.result;
      }
      message.error('出现错误，请稍后重试');
      return Promise.reject('出现错误，请稍后重试');
    }
    return Promise.reject(response.statusText);
  },
  (error) => {
    const config: AxiosRequestConfig = error?.response?.config;
    const headers = config?.headers || {};
    if (headers.noCheckResult) {
      return error?.response?.data;
    }
    // 条件为不弹窗
    if (
      error?.message?.type !== 'cancel' && // 取消请求
      !error?.message?.includes('timeout') && // 连接超时
      error?.message !== 'Network Error' // 网络错误
    ) {
      message.error('出现错误，请稍后重试');
    }
    return Promise.reject(error);
  }
);

export default instance;
