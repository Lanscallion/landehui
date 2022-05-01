class axios {
  static get(url, data) {
    return axios.http('get', url, data);
  }
  static post(url, data, cb) {
    // 接收http的返回值,作为自己的返回值,继续返回
    return axios.http('post', url, data);
  }

  static http(type, url, data) {
    /*****将对象参数,处理为键值对*******/
    if (data) {
      let param = '';
      let paramArray = Object.entries(data);
      let dataLen = paramArray.length;
      paramArray.forEach((ele, key) => {
        param += ele[0] + '=' + ele[1];
        // 判断是否为最后一个元素,不是则添加 &
        key < (dataLen - 1) && (param = param + '&');
      });

      // get请求追加到url后面
      // post 请求,直接使用
      if (type == 'get') {
        url = url + '?' + param;
        param = null;
      }
    }
    // 返回promise 对象,状态为成功
    // 此时promise 必须有一个结果才会被放回出去
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(type, url);
      // post 请求设置header头
      type == 'post' && xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      xhr.send(data && param);
      //根据状态,判定ajax的成功和失败
      xhr.onreadystatechange = function () {
        // console.log(xhr.readyState);
        // console.log(xhr.status);

        // 先判断ajax的状态,
        // Promise 是不可逆的,
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {  // 成功
            // resolve(JSON.parse(xhr.response))
            // resolve(xhr.response)
            // 正常代码执行try
            // try 中报错,就使用catch
            try {
              resolve(JSON.parse(xhr.response))
            } catch  {
              resolve(xhr.response)
            }
          } else {
            reject('服务器状态异常...');
          }
        }
      }
    })

  }
}