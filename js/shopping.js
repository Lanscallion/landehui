let shopul=document.querySelector(".shopp");
console.log(shopul);
bindList3()
async function bindList3(){
    let shopA =await pAjax({
        url:"/tj",
        dataType:"json"
    })
    console.log(shopA)
    console.log(111)
    let str='';
    shopA.data.dataList.forEach(function(item){
        str +=`
        <li>
            <a href="">
                <img src="${item.images[0].bigPic}" alt="">
                <p class="p1">${item.skuName}</p>
                <p class="p2">${item.promotion}${item.brief}</p>
                <p class="p3">￥${item.salePrice}</p>
            </a>
        </li>`
        console.log(111);

    })
    shopul.innerHTML=str
}