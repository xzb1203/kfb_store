import JSEncrypt from 'jsencrypt'

export function getRealKey() {
  let KEY: any = localStorage.getItem('cliKeys')
  const data: any = localStorage.getItem('serverKeys')
  KEY ? (KEY = KEY.substring(0, 4) + KEY.substring(5, KEY.length - 1)) : ''
  const jsencrypt = new JSEncrypt()
  jsencrypt.setPrivateKey(KEY) // key
  const result = jsencrypt.decrypt(data) // 加密内容

  return result
}
