const Base64 = require('js-base64').Base64

const tokenPrefix = process.env.TOKEN_PREFIX || ''
const TokenKey = tokenPrefix + 'user-key'

const RefreshTokenKey = tokenPrefix + 'refresh-key'

export function getToken() {
  return sessionStorage.getItem(TokenKey)
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey)
}

