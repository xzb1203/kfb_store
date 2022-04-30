import jsrsasign from 'jsrsasign';

import Encrypt from 'encryptlong'; // encryptlong是基于jsencrypt扩展的长文本分段加解密功能。
import loginApi from '@/api/modules/login';

export async function getRsaKeys() {
  const rsaKeypair = jsrsasign.KEYUTIL.generateKeypair('RSA', 500);
  const PRIVATE = jsrsasign.KEYUTIL.getPEM(rsaKeypair.prvKeyObj, 'PKCS8PRV');
  const PUBLIC = jsrsasign.KEYUTIL.getPEM(rsaKeypair.pubKeyObj);

  const data = {
    clientPublicKey: PUBLIC.substring(28, PUBLIC.length - 28)
      .replace(/\r\n/g, '')
      .replace(/\n/g, ''),
    clientPrivateKey: PRIVATE.substring(28, PRIVATE.length - 28).replace(/\r\n/g, ''),
  };

  localStorage.setItem(
    'cliKeys',
    `${data.clientPrivateKey.substring(0, 4)}v${data.clientPrivateKey.substring(4, data.clientPrivateKey.length - 1)}`,
  );
  const res: any = await loginApi.getCryptKey();
  console.log(res);
  const PUBLIC_KEY = res.data.datas.publicKey;
  const encryptor = new Encrypt();
  encryptor.setPublicKey(PUBLIC_KEY);
  const result = encryptor.encryptLong(data.clientPublicKey);
  const Response: any = await loginApi.getDeliverClientKey({ jsPublicKey: result });
  localStorage.setItem('serverKeys', Response.data.datas.encryptKey); // 后端的keys
}
