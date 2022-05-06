// 注册的逻辑代码

const form = document.querySelector('form')
const nameInp = document.querySelector('.username')
const pwdInp = document.querySelector('.password')
const rpwdInp = document.querySelector('.rpassword')
const nickInp = document.querySelector('.nickname')
const errBox = document.querySelector('.error')
console.log(nickInp);
// 1. 表单提交事件
form.addEventListener('submit', e => {
    e = e || window.event
    try { e.preventDefault() } catch (err) { e.returnValue = false }
    // 2. 采集用户信息
    // 封装, 可以传递 对象数据类型 作为参数
    // 我们会直接以对象形式进行采集, 只要对象内的 key 和接口文档需要的参数一致就行了
    const info = {
        username: nameInp.value,
        password: pwdInp.value,
        rpassword: rpwdInp.value,
        nickname: nickInp.value
        
    }
    // 3-1. 非空验证
    if (!info.username || !info.password || !info.rpassword || !info.nickname) return alert('请完整填写表单 ^_^')
    // 3-2. 正则验证
    // 3-3. 重复密码验证
    if (info.password !== info.rpassword) return alert('两次密码输入不一致')

    // 4. 发送请求
    // 使用自己封装的 ajax 函数发送
    ajax({
        url: 'http://localhost:8888/users/register',
        method: 'POST',
        data: info,
        dataType: 'json',
        success(res) {
            // 通过判断 res 的 code 值, 决定注册成功还是失败
            if (res.code !== 1) return errBox.style.display = 'block'

            // 代码执行到这里, 说明注册成功了
            window.alert('注册成功, 点击确定跳转回登录页')
            // 跳转页面
            window.location.href = './denglu.html';
        }
    })
})
