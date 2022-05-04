class Lan{
    constructor(){
        this.get1();
        this.get2();
        this.get3();
        this.get4();
        this.get5();
        this.get6();
    }
    async get1(){
        let res=await axios.get("http://localhost:3000/goods")
        let aa=``
        // console.log(res);
        res.data.forEach(item=>{
            aa+=`<div class="five-center">
            <div class="five-center-S">
            <a href="../index/gouwuche.html">
                <img src="${item.img}" alt="">
            </a>
        </div>
        </div>`
        })
        this.$(".five-center").innerHTML=aa
        // console.log(this.$(".five-center"));
    }
    async get2(){
        let res=await axios.get("http://localhost:3000/miaosha")
        let aa=``;
        // console.log(res);
        res.data.forEach(item=>{
            
            aa+=`<div class="seven-s">
            <a href="../index/gouwuche.html">
                <img src="${item.img}"
                    alt="">
                <p class="n_1mc"><span></span>${item.name}</p>
                <p class="n_1pc_1">$${item.pic}</p>

            </a>
        </div>`
        })
        this.$(".seven-center").innerHTML=aa;
        // console.log(this.$(".six-center"));
    }
    async get3(){
        let res=await axios.get("http://localhost:3000/shouji");
        let aa1=``;
        // console.log(res)
        res.data.forEach(item=>{
            aa1+=`
            <div class="n_1">
                <a href="../index/gouwuche.html">
                    <img src="${item.img}"
                        alt="">
                    <p class="n_1mc"><span></span>${item.name}</p>
                    <p class="n_1pc">$${item.pic}</p>
                    <p class="n_1zs">赠送积分</p>
                </a>
            </div>
            `
        })
        this.$(".nnn_center").innerHTML=aa1;
        // console.log(this.$(".nnn_center"));
    }
    async get4(){
        let res=await axios.get('http://localhost:3000/shoubiao');
        let aa2=``;
        // console.log(res);
        res.data.forEach(item=>{
            aa2+=`<div class="n_1_1">
            <a href="../index/gouwuche.html">
                <img src="${item.img}"
                    alt="">
                <p class="n_1mc"><span></span>${item.name}</p>
                <p class="n_1ms">${item.ldh}</p>
                <p class="n_1pc_1">$&nbsp;${item.pic}</p>
                <p class="n_1zs_1">赠送积分</p>&nbsp;<span>123</span>
            </a>
        </div>`
        })
        this.$(".nnn_center_1").innerHTML=aa2;
    }
    async get5(){
        let res=await axios.get("http://localhost:3000/shengtai");
        let aa3=``;
        // console.log(res);
        res.data.forEach(item=>{
            aa3+=`
            <div class="n_1_2">
                <a href="../index/gouwuche.html">
                    <img src="${item.img}"
                        alt="">
                    <p class="n_1mc"><span></span>${item.name}</p>
                    <p class="n_1ms">${item.ldh}</p>
                    <p class="n_1pc_1">$${item.pic}</p>
                    <p class="n_1zs_1">赠送积分</p>
                </a>
            </div>
            `
        })
        this.$(".nnn_center_2").innerHTML=aa3;
    }
    async get6(){
        let res=await axios.get("http://localhost:3000/jiu");
        let aa=``;
        console.log(res);
        res.data.forEach(item=>{
            aa+=` <div class="n_1_5">
            <a href="../index/gouwuche.html">
                <img src="${item.img}"
                    alt="">
                <p class="n_1mc"><span></span>${item.name}</p>
                <p class="n_1pc_1">$${item.pic}</p>
            </a>
        </div>`
        })
        this.$(".nnn_center_5").innerHTML=aa;
    }
    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
    
}
new Lan