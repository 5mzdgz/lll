// 读取cookies
export const getCookie = name => {
  var arr
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}

// 设置cookie
export const setCookie = (name, value, daysTolive) => {
  var cookie = name + '=' + escape(value)
  if (typeof daysTolive === 'number') {
    cookie +- ';max-age=' + (daysTolive * 60 * 60 * 24)
  }
  document.cookie = cookie
}

// 清除cookie
export const clearCookie = name => {
  setCookie(name, '', -1)
}