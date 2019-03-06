import Vue from 'vue'

// 2、传入 时间参数 返回 type 形式 String
// Vue.filter('dateFormat', function(value, type) {
//   // yyyyMMdd 转 yyyy-MM-dd
//   if (typeof value === 'string') {
//     if (type === 'HH:mm:ss' && value.length === 6) {
//       return value.substr(0, 2) + ':' + value.substr(2, 2) + ':' + value.substr(4, 6)
//     } else if (value.length === 8) {
//       return value.substr(0, 4) + '-' + value.substr(4, 2) + '-' + value.substr(6, 2)
//     }
//   }
//   // new Date 转 YYYY-MM-DD 或其他格式
//   if (type === 'YYYY-MM-DD') {
//     return type.replace(/([a-z]+)/gi, function(a, b, c, d) {
//       if (/Y{2,}/.test(b)) {
//         return b.length === 4
//           ? value.getFullYear()
//           : ('' + value.getFullYear()).substr(2)
//       } else if (/M{2}/.test(b)) {
//         return value.getMonth() + 1 < 10
//           ? '0' + (value.getMonth() + 1)
//           : value.getMonth() + 1
//       } else if (/D{2}/.test(b)) {
//         return value.getDate() < 10 ? '0' + value.getDate() : value.getDate()
//       } else if (/h{2}/.test(b)) {
//         return value.getHours() < 10 ? '0' + value.getHours() : value.getHours()
//       } else if (/m{2}/.test(b)) {
//         return value.getMinutes() < 10
//           ? '0' + value.getMinutes()
//           : value.getMinutes()
//       } else if (/s{2}/.test(b)) {
//         return value.getSeconds() < 10
//           ? '0' + value.getSeconds()
//           : value.getSeconds()
//       } else {
//         return 0
//       }
//     })
//   } else if (type === 'yyyyMMdd') {
//     var o = {
//       'M+': value.getMonth() + 1,
//       'd+': value.getDate(),
//       'h+': value.getHours(),
//       'm+': value.getMinutes(),
//       's+': value.getSeconds(),
//       'q+': Math.floor((value.getMonth() + 3) / 3),
//       S: value.getMilliseconds()
//     }
//     if (/(y+)/.test(value)) {
//       value = value.replace(
//         RegExp.$1,
//         (value.getFullYear() + '').substr(4 - RegExp.$1.length)
//       )
//     }
//     for (var k in o) {
//       if (new RegExp('(' + k + ')').test(value)) {
//         value = value.replace(
//           RegExp.$1,
//           RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
//         )
//       }
//     }
//     return value
//   } else if (type === 'YYYY-MM-DD 24hh:mm:ss') {
//     if (typeof value === 'string') {
//       return value.substr(0, 19)
//     }
//   }
// })

Vue.filter('dateFormat', function(value) {
  let time = new Date(value)
  return time.getFullYear()+ '-' + (time.getMonth() + 1) + '-' + time.getDate()
})

Vue.filter('priceFormat', function(value) {
	return value.toFixed(2)
})
