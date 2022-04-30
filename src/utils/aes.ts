import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';
import { AxiosResponse } from 'axios';
import { getRealKey } from '@/utils/rsa';
import localCache from './cache';

export default {
  // AES加密
  encryptAes(data: any) {
    const aesKey = getRealKey();
    if (aesKey && data) {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      const result: any = {};
      // eslint-disable-next-line no-restricted-syntax
      for (const KEY in data) {
        if ((KEY === 'pageNum' || KEY === 'pageSize' || !data[KEY]) && data[KEY] !== 0) {
          result[KEY] = data[KEY];
        } else {
          result[KEY] = CryptoJS.AES.encrypt(Base64.encode(data[KEY]), key, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7,
          }).toString();
        }
      }
      return result;
    }
    return data;
  },
  encryptAesBody(data: any, url: string) {
    const aesKey = getRealKey();
    const key = CryptoJS.enc.Utf8.parse(aesKey);
    if (data && !url.includes('/system/file/upload')) {
      const result = CryptoJS.AES.encrypt(Base64.encode(JSON.stringify(data)), key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      return result;
    }
    return data;
  },
  encryptAesConfig(config: any) {
    let Type = null;
    config.headers.Authorization = localCache.getCache('token') ?? '';
    Object.prototype.toString.call(config.data) === '[object String]'
      ? (Type = 'application/x-www-form-urlencoded')
      : (Type = 'application/json');
    config.headers['Content-Type'] = Type;
    config.data = this.encryptAesBody(config.data, config.url);
    config.params ? (config.params = this.encryptAes(config.params)) : '';
    return config;
  },
  decryptAes(response: AxiosResponse) {
    const aesKey = getRealKey();
    if (aesKey && response.data) {
      const key = CryptoJS.enc.Utf8.parse(aesKey);
      const decrypt = CryptoJS.AES.decrypt(response.data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      response.data = JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
      return response;
    }
  },
};
