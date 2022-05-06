

class L {
    constructor() {
        this.nb();
        this.$(".cont").addEventListener("mousemove",this.yiruFn.bind(this))
        this.$(".cont").addEventListener("click",this.gouwuche.bind(this))
    }
    async gouwuche(eve){
    console.log(eve.target);
    let token =localStorage.getItem("token");
    console.log(token);//token值
    if(eve.target.classList.contains("xiadan_gwc")){
        let lisObj=eve.target;
        console.log(lisObj);
        let goods=lisObj.dataset.id;
        console.log(goods);//商品id
        let userid=localStorage.getItem("id");
        if(!userid||!goods) alert("两个id存在问题");
        axios.defaults.headers.common["authorization"]=token;
        axios.defaults.headers['Content-Type']='application/x-www-form-urlencoded';
        let p=`id=${userid}&goodsId=${goods}`;
        // console.log(p); 拼接成功
        let {data,status}=await axios.post('http://localhost:8888/cart/add',p)
        if(status==200){
            if(data.code==1){
                location.assign('./cart.html')
            }
        }
    }
    }
    async nb(eve) {
        let goodsId = window.localStorage.getItem('sp_id');

        let { data, status } = await axios.get("http://localhost:8888/goods/item" + '?id=' + goodsId)
        console.log(data);
        console.log(this.$(".cont"));
        if (status == 200) {
            let str=``;
             str+=`
            <div class="box" >
            <div class="small">
                <img src="${data.info.img_big_logo}" width="100%" alt="">
                <div class="mask"></div>
            </div>
            <div class="big">
                <img src="${data.info.img_big_logo}" width="900" alt="" id="img">
            </div>
        </div>

        <div class="cont-right">
        <h1 class="h1">${data.info.title} </h1>
        <p class="qx">【全款预售】① 全款预售立省200元 | 5月6日10:08开启首销 ② 晒单限量抽智能插座</p>
        <div class="kuang">
            <p class="jiage">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;价&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>&nbsp;&nbsp;抢购价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;￥&nbsp;1314520.99&nbsp; &nbsp;</span><del>￥1.00</del></p>
            <p class="cuxiao">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;促&nbsp;&nbsp;&nbsp;&nbsp;销&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
            
        </div>
        <div class="xstj"><span>限时特价</span><em>限时降价200元</em></div>
        <div class="xstj1"><span>赠送积分</span><em>购买即赠商城积分,积分可抵现~</em></div>
        <div class="gang"></div>
        <div class="xzbb"></div>
        <div class="lsj">
            梁世杰版本:<span>250</span>
        </div>
        <div class="xiadan">
            <p data-id="${data.info.goods_id}" class="xiadan_gwc" style="background-color: orange;"><a href="#none">加入购物车</a></p>
            <p style="background-color: red;"><a href="#none">立即下单</a></p>
        </div>
    </div>
            `
        this.$(".cont").innerHTML=str;

        }
    }

    yiruFn(eve){
        const boxObj = document.querySelector(".box");
        // console.log(boxObj);
        const smallObj = document.querySelector(".small");
        // console.log(smallObj);
        const maskObj = document.querySelector(".mask");
        // console.log(maskObj);
        const bigObj = document.querySelector(".big"),
            bigImg = bigObj.lastElementChild;
        // console.log(bigImg);
        smallObj.onmouseenter = function () {
            maskObj.style.display = "block";
            bigObj.style.display = "block";
        }
        smallObj.onmouseleave = function () {
            maskObj.style.display = "none";
            bigObj.style.display = "none";
        }
        let boxT = boxObj.offsetTop;
        let boxL = boxObj.offsetLeft;
        // console.log(boxT,boxL);
        smallObj.onmousemove = function (eve) {
            let cX = eve.pageX;
            let cY = eve.pageY;//获取鼠标相当于可视区的坐标
        
            let maskW = maskObj.offsetWidth;
            let maskH = maskObj.offsetHeight;//默认mas的属性是display为none，获取不到，获取mask的宽和高
        
            let maskL = cX - boxL - maskW / 2;
            let maskT = cY - boxT - maskH / 2;
            // console.log(maskL,maskT);sss
        
            if (maskL < 0) maskL = 0;
            if (maskT < 0) maskT = 0;
            let maxMaskL = smallObj.offsetWidth - maskW;
            let maxMaskT = smallObj.offsetHeight - maskH;
            if (maskL > maxMaskL) maskL = maxMaskL;
            if (maskT > maxMaskT) maskT = maxMaskT;
        
            maskObj.style.left = maskL + "px";
            maskObj.style.top = maskT + "px"
        
            let bigMaxLeft = bigImg.offsetWidth - bigObj.offsetWidth;
            let bigMaxTop = bigImg.offsetHeight - bigObj.offsetHeight;
            // console.log(bigMaxLeft,bigMaxTop);
            let tmpBigImgLeft = maskL / maxMaskL * bigMaxLeft;
            let tmpBigImgTop = maskT / maxMaskT * bigMaxTop;
            // console.log(tmpBigImgLeft, tmpBigImgTop);
            bigImg.style.left = -tmpBigImgLeft + "px"
            bigImg.style.top = -tmpBigImgTop + "px"
        }
    }



    $(tag){
        let res=document.querySelectorAll(tag)
        return res.length==1?res[0]:res;
    }
}
new L


