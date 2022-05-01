// 首页的业务逻辑
const offBox = document.querySelector(".off");
const onBox = document.querySelector(".on");
const nickBox=document.querySelector(".nickname");
// 1进行登录证明
// 如果没有登录，现实off盒子
// 如果登录了，现实on盒子
tesLogin()
function tesLogin() {
    // 1-1拿到localStorage内的 token和id的信息
    const id = window.localStorage.getItem("id");
    const token = window.localStorage.getItem("token");

    // 如果没有，表示曾经没有登录过，或者清除了浏览器数据或者缓存
    if (!id || !token) {
        // 直接return 让off盒子显示
        offBox.classList.add("active");
        onBox.classList.remove("active");
        return
    }
    // 代码能到这里，说明有 id和token
    // 证明增加登陆过，至于是否过期，或者被人修过
    // 需要请求一个需要登录后方可查看的接口
    // 如果能拿回来数据，说明 token没有问题
    // 如果拿不回来，说明token有问题
    const xhr=new XMLHttpRequest();
    xhr.open("get","http://localhost:8888/users/info?id="+id);
    xhr.onload=function(){
        const res=JSON.parse(xhr.responseText);
        console.log(res);
        if(res.code!==1){
            offBox.classList.add("active");
            onBox.classList.remove("active");
            return
        
        }
         // 代码执行到这，说明登录状态是在有效期内的
            // offBox.classList.remove("active");
            // nickBox.innerHTML=res.info.nickname;
            // onBox.classList.add("active");
    }
    // 需要在 请求内 设置一个信息，叫做authorization，把token 携带过去
    xhr.setRequestHeader("authorization",token);
    xhr.send();
}