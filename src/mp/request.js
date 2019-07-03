if (!wx.request) {
  throw new ReferenceError('`wx.request` 不存在，请检查是否是小程序环境')
}

let commonHost = ''
export function setCommonHost (host) {
  commonHost = host
}

const commonHeaders = {}

export function addCommonHeader (key, value) {
  commonHeaders[key] = value
}

export function delCommonHeader (key) {
  commonHeaders[key] = ''
}

function checkNetwork () {
  return new Promise(ok => {
    wx.getNetworkType({
      success (res) {
        if (res.networkType === 'none') {
          ok(false)
        } else {
          ok(true)
        }
      }
    })
  })
}

export async function fetch (path, data = {}, options = {
  method: 'GET',
  dataType: 'json',
  responseType: 'text'
}) {
  if (!await checkNetwork()) {
    return wx.showToast({ title: '好像网络不太好哦，请检查后重试...'})
  }

  return new Promise((ok, bad) => {
    let query = ''

    // 如果其他 method 也要使用 query 传递数据，可直接拼写在 path 上
    if (options.method === 'GET') {
      Object.keys(data).forEach(item => {
        query += `${item}=${data[item]}&`
      })
      if (query)
        query = '?' + query.substr(0, query.length - 1)
    }

    const url = `${options.host || commonHost}${path}${query}`
    options.headers = Object.assign(options.headers || {}, commonHeaders)

    wx.request({
      url,
      data,
      ...options,
      success: res => ok(res.data),
      fail: bad,
      complete: res => {
        // 服务端采用的是 200 报错方式，正常（包含错误）结果会从 success 返回，
        // 这里正好用系统 toast 来区分是服务器引擎还是 api 自身逻辑返回的错误
        if (res.statusCode !== 200) {
          wx.showToast({
            title: `statusCode: ${res.statusCode}`,
            icon: 'none'
          })
        }
      }
    })
  })
}

export async function upload (path, file, formData, options) {
  if (!await checkNetwork()) {
    return wx.showToast({ title: '好像网络不太好哦，请检查后重试...'})
  }

  return new Promise((ok, bad) => {
    const url = `${options.host || commonHost}${path}`
    options.headers = Object.assign(options.headers, commonHeaders)

    wx.uploadFile({
      url,
      formData,
      filePath: file.path,
      name: file.name,
      ...options,
      success: ok,
      fail: bad
    })
  })
}
