// 登录页的逻辑代码
const form =document.querySelector("form");
const nameInp=document.querySelector(".username");
const pawInp=document.querySelector(".password");
const errBox=document.querySelector(".errBox");
// console.log(errBox)
// 1.表单提交事件
// 不需要标的默认提交行为
// 而是我自己采集用户的信息
// 然后通过ajax进行提交
form.addEventListener("submit",e=>{
    // 处理事件对象兼容
    e=e||window.event;
    // 阻止默认行为
    try{e.preventDefault()}catch(err){e.returnValue=false}
    // 2.采集用户信息
    // 拿到用户在表单内填写的内容
    // 现在用户写的登录信息不需要去空格，用户怎么写就怎么提交
    const name=nameInp.value;
    const pwd=pawInp.value
    console.log(pwd)
    // 3.验证
    // 3-1非空验证 如果没写 不往服务器发送
    // 3-2正则验证 要求格式判断
    if(!name||!pwd)return alert("你个老六能不能把表单写完整");//name为空的时候
    // 4.把用户和密码发送给服务器
    // 按照接口文档进行发送
    const xhr=new XMLHttpRequest();
    xhr.open("post","http://localhost:8888/users/login");
    xhr.onload=function(){
        const res=JSON.parse(xhr.responseText);
        console.log(res);
        // res就能拿到登录成功或者失败的信息
        // 根据res内code的信息进行判断
        if(res.code===0){
            // 表示登录失败
            errBox.style.display="block";
            return
        }
        console.log(res)
        // 向localStorage 内存储一个信息 叫做token；
        // 向localStorage 内存储一个信息，叫做id
        window.localStorage.setItem("token",res.token);
        window.localStorage.setItem("id",res.user.id);

        // 代码来到这就代表登录成功
        window.location.href="./shopping.html";
        
    }
    // post请求带参数，说明
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    xhr.send(`username=${name}&password=${pwd}`);


    // console.log("后续代码");
})