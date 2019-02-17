var md5 = require('md5-js')
const Base64 = require('js-base64').Base64

export default function encriptPwd(pwd) {
  return Base64.encode(md5(pwd))
}