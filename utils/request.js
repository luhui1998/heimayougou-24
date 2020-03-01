/**
 * 异步请求函数
 * @参数：config | 传入的配置
 * @例子：{
 *  url: ""
 *  method: "get" | "post",
 *  ...
 * }
 */
let request = null;

request = (config) => {

  if (!config.url) {
    throw new Error("url不能为空!");
    return;
  }

  let { url, ...props } = config;

  url = url.search(/^http+?/) > -1 ? url : request.defaults.baseURL + url;

  config = {
    url,
    method: "GET",
    ...props
  }

  return new Promise((resolve, reject) => {
    wx.request({
      ...config,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject(err);
      },
      complete(res) {

        resolve(res);

        request.errors.forEach(cb => {
          cb(res);
        })
      }
    })
  })
}

/**
 * 默认配置
 */
request.defaults = {
  baseURL: "",
}

/**
 * 错误监听函数集合
 */
request.errors = [];

/**
 * 错误拦截
 * @参数: 回调函数
 */
request.onError = (callback) => {
  request.errors.push(callback);
}

export default request;