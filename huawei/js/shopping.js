// let shopul = document.querySelector(".shopp");
// console.log(shopul);


class A {
    constructor() {
        this.bindList3()
        this.$('.shop ul').addEventListener('click', this.addCartFn.bind(this))
        // this.$("")
    }
    async bindList3() {
        let { data, status } = await axios.get('http://localhost:8888/goods/list'+"?"+"&pagesize=900")
        // ({?current=1
        //     url: "/tj",
        //     dataType: "json"
        // })
        // console.log(shopA)
        // console.log(111)
        console.log(data);
        // console.log(shopA.data.data.dataList);
        if(status==200){
        let str = '';
        // ../index/gouwuche.html
        // Array.from(shopA.data.dataList)
        data.list.forEach(item=>{
            str += `
            <li data-id="${item.goods_id}">
                <a href="#none">
                    <img src="${item.img_big_logo}" alt=""> 
                </a>
                    <p class="p1">${item.title}</p>
                    <p class="p2">已售${item.sale_type}</p>
                    <p class="p3">￥${item.price}</p>
                    <a class="p4">立即抢购</a>
            </li>`
            // console.log(111);
            console.log(item.goods_id);
        })
        this.$('.shop ul').innerHTML = str
    }
    }
    async addCartFn(eve) {
        console.log(this);
        console.log(eve.target);
        let token = localStorage.getItem("token");
        console.log(token)
        // if (token) location.assign('./denglu.html?ReturnUrl=./shopping.html')
        // 获取商品id
        //如果用户登录了则讲数据信息添加到购物车中
        // 判断是否是a标签
        if (eve.target.classList.contains("p4")) {
            let lisObj = eve.target.parentNode;
            let goosId = lisObj.dataset.id;
            console.log(goosId);//获取到对应id 商品id
            let userId = localStorage.getItem('id')
            console.log(userId);//用户id
            // 两个id必须都有才能发送请求
            if (!userId || !goosId) throw new Error("两个id存在问题.打印查看");
            axios.defaults.headers.common['authorization'] = token;
            axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            // 数据必须以原生的方式拼接好
            let param = `id=${userId}&goodsId=${goosId}`;
            console.log(param);
            // 如果用户登录,则加数据信息添加到购物车中
            let { data, status } = await axios.post('http://localhost:8888/cart/add', param);
            console.log(data);
            if (status == 200) {
                // console.log(data);
                if (data.code == 1) {  //购买成功
                    layer.open({
                        content: '加入购物成功',
                        btn: ['去购物车结算', '留在当前页面']
                        , yes: function (index, layero) {
                            // 按钮【按钮一】的回调
                            location.assign('./cart.html')
                        }
                        , btn2: function (index, layero) {
                            //按钮【按钮二】的回调
                            //return false 开启该代码可禁止点击该按钮关闭
                        }
                    })
                }

            }
        }
    }

    $(tag) {
        let res = document.querySelectorAll(tag)
        return res.length == 1 ? res[0] : res;
    }
}

new A