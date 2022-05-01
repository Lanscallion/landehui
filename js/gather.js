// 查询字符串转成对象
function parseQueryString(query) {
    var obj = {}
    query.split('&').forEach(function (item) {
        var s = item.split('=')
        obj[s[0]] = s[1]
    })
    return obj
}

// 对象转化成查询字符串
function queryStringify(obj) {
    var str = ''
    for (var k in obj) {
        str += k + '=' + obj[k] + '&'
    }
    return str.slice(0, -1)
}

// 求范围内的随机整数
function rounderNum(min, max) {
    return Math.floor(Math.random() * (Math.abs(max - min) + 1)) + Math.min(min, max)
}

// 随机的颜色字符串

function color() {
    return color = `rgb(${rounderNum(0, 255)},${rounderNum(0, 255)},${rounderNum(0, 255)})`
}

// 获取时间差
function diffTime(time1, time2) {
    var s = Math.ceil(Math.abs(time2 - time1) / 1000)
    return {
        day: parseInt(s / (60 * 60 * 24)),
        hours: parseInt(s % (60 * 60 * 24) / (60 * 60)),
        minutes: parseInt(s % (60 * 60) / 60),
        seconds: s % 60
    }
}

// 运动函数
function move(ele, options, fn) {
    let count = 0
    for (let k in options) {
        count++
        if (k === 'opacity') {
            options[k] = options[k] * 100
        }
        let time = setInterval(function () {
            let start
            if (k === 'opacity') {
                start = window.getComputedStyle(ele)[k] * 100
            } else {
                start = parseInt(window.getComputedStyle(ele)[k])
            }
            let moveStance = (options[k] - start) / 10
            if (moveStance > 0) {
                moveStance = Math.ceil((options[k] - start) / 10)
            } else {
                moveStance = Math.floor((options[k] - start) / 10)
            }
            if (start === options[k]) {
                clearInterval(time)
                count--
                if (count === 0) fn && fn()
            } else {
                if (k === 'opacity') {
                    ele.style[k] = (start + moveStance) / 100
                } else {
                    ele.style[k] = start + moveStance + 'px'
                }
            }
        }, 30)
    }
}




// ajax封装
function ajax(options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') throw new Error('您传递的不是一个对象,这里需要传递一个对象')
    const { url, method, async, data, headers, dataType, success, error } = options
    if (!url || typeof url !== 'string') throw new Error('ur不能为空而且必须是一个字符串')
    if (!(method === undefined || /^(get|post)$/i.test(method))) throw new Error('请求方式要传递必须是get或者post')
    if (!(async === undefined || typeof async === 'boolean')) throw new Error('是否异步必须是一个布尔值')
    if (!(data === undefined || typeof data === 'string' || Object.prototype.toString.call(data) === '[object Object]')) throw new Error('data 必须是一个字符串或者对象')
    if (!(headers === undefined || Object.prototype.toString.call(headers) === '[object Object]')) throw new Error('headers 必须是一个对象')
    if (!(dataType === undefined || /^(string|json)$/i.test(dataType))) throw new Error('dataType 必须是sting或者json')
    if (!(success === undefined || typeof success === 'function')) throw new Error('success 必须是函数')
    if (!(error === undefined || typeof error === 'function')) throw new Error('error 必须是函数')

    const _default = {
        url: url,
        method: method || 'GET',
        async: typeof async === 'boolean' ? async : true,
        data: data || '',
        headers: { 'content-type': 'application/x-www-form-urlencoded', ...headers },
        dataType: dataType || 'string',
        success: success || function () { },
        error: error || function () { },
    }
    if (typeof data === 'object') {
        _default.data = queryStringify(data)
    }
    if (/^get$/i.test(_default.method) && data) {
        _default.url = _default.url + '?' + _default.data
    }
    let xhr = new XMLHttpRequest()
    xhr.open(_default.method, _default.url, _default.async)
    xhr.onload = function () {
        let res = xhr.responseText
        if (_default.dataType === 'json') {
            res = JSON.parse(xhr.responseText)
            try {
                _default.success(res)
            } catch (err) {
                _default.error(err)
            }
        } else {
            _default.success(res)
        }
    }
    for (let k in _default.headers) {
        xhr.setRequestHeader(k, _default.headers[k])
    }
    if (/^get$/i.test(_default.method)) {
        xhr.send()
    } else {
        xhr.send(_default.data)
    }
}


// 通过promise再次封装ajax

function pAjax(options) {
    // 实例化一个promise对象
    const p = new Promise(function (resolved, rejected) {
        ajax({
            // url: 'http://localhost:8888'
            url: options.url,
            data: options.data,
            async: options.async,
            method: options.method,
            headers: options.headers,
            dataType: options.dataType,
            success(res) {
                resolved(res)
            },
            error(err) {
                rejected(err)
            }
        })
    })
    // 返回这个promise对象
    return p
}