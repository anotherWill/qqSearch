import qs from 'qs';

export function parseJSON(response) {
  return response.json();
}

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * 异步请求方法
 *
 * @param  {string} url       请求url
 * @param  {object} [options] 请求参数
 * @return {object}           返回值
 */
export default function request(url = '', options = { data: {} }) {
  // 配置默认headers
  const headers = Object.assign({
    // 'Content-Type': 'application/json;charset=UTF-8',
  }, options && options.headers);

  // 配置默认设置
  const settings = Object.assign({
    method: 'GET',
  }, options, { headers });

  let targetUrl = '';
  // 处理请求数据
  if (settings.method.toUpperCase() === 'GET' || settings.method.toUpperCase() === 'POST') {
    targetUrl = `${url}?${qs.stringify(settings.data)}`
  } 
  delete settings.data;

  // 非GET方式不允许缓存
  if (settings.method.toUpperCase() !== 'GET') {
    settings['Cache-Control'] = 'no-cache';
  }
  
  const controller = new AbortController();
  settings.signal = controller.signal;
  // 超时处理
  setTimeout(() => { controller.abort(); }, 30e3);
  return fetch(targetUrl, settings)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      return { data };
    })
    .catch((err) => {
      return err;
    });
}
