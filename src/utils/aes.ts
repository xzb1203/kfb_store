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
      console.log(data);
      const result = CryptoJS.AES.encrypt(Base64.encode(JSON.stringify(data)), key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }).toString();
      if (url === '/order/store/order/goods/unite/update') {
        console.log(result, '炸裂');
        return 'Dp7EY0RdclZhb/IOZh1CuamPQ/R5/CJyMnIFT+U3j5u4E6op7Rhdt5UI7Ita0bx2jQCPAGnWmvkBkXd6OecpE1l8mHhO/9yWlU7ZAonKNjpcsqdUwgQ1VLwLYOWJg0TK7iThtObRyGTtGCqpxM+HaWRA9M+biL804X9/LO9A62Ty3l/GT+Q1vZaQ88gRPa/ESgJY5fJI0cacB20KKCvW0oQw7Rdd4K5RGGxmR0aeC0o4eBrklnCgOVXO35f9RwIWkLrJwaMiwZqJLXEIJP7fkLq22fEgSj9qdQKfZ4bXnVdOfBkuhkEiL9JdM+O5Cksd7iXfgZSjMjwzmKgkarcwDW6GTC1xi7W1CW/tqdgrsMJAtN1gfivYIc27fgDwuI7WIpRpHthqJwU7qovdMYrN2gfqFk9Y+WSqkVNvHcfLQcsD4rcxp59hQ2pQENE7E0zLBwC5tZvdWJjhfdMbxBH5sk58GS6GQSIv0l0z47kKSx3uJd+BlKMyPDOYqCRqtzANboZMLXGLtbUJb+2p2CuwwhxyvVXro7vqvsPhk33JLhJWnph0q1uR89jbey2U3LmssOxJwZ9dPWAUP3i45nG+1Z+jhaiT3i6rTJrXPFXszic=';
      }
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
