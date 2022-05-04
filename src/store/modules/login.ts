import { defineStore } from 'pinia';
import { ElMessage } from 'element-plus';
import { useRequest } from 'vue-request';
import localCache from '@/utils/cache';
import router from '@/router';
import loginApi from '@/api/modules/login';

type useUserStoreType = {
  token: string;
  userInfo: any;
  storeInfo: any;
};
export const useUserStore = defineStore('user', {
  state: (): useUserStoreType => ({
    token: '',
    userInfo: localCache.getCache('userInfo') || {},
    storeInfo: localCache.getCache('storeInfo') || {},
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: any) {
      this.userInfo = userInfo;
    },
    handlePostLogin(data: any) {
      // 用户信息
      useRequest(loginApi.postLogin(data), {
        onSuccess: (res) => {
          this.setToken(res.data.datas.jwtValue);
          this.setUserInfo(res.data.datas);
          localCache.setCache('token', res.data.datas.jwtValue);
          localCache.setCache('userInfo', res.data.datas);
          this.handlePostStoreInfo();
          router.push({ name: 'index' });
        },
        onError: () => {
          ElMessage('请求错误!');
        },
      });
    },
    handlePostStoreInfo() {
      // 门店信息
      useRequest(loginApi.postStoreInfo(), {
        onSuccess: (res) => {
          console.log(res.data, '门店信息');

          this.storeInfo = res.data.additionalParameters;
          localCache.setCache('storeInfo', res.data.additionalParameters);
        },
        onError: () => {
          ElMessage('请求错误!');
        },
      });
    },
  },
});
