const ullisObj = document.querySelectorAll(".banner ul li");
const ollisObj = document.querySelectorAll(".banner ol li");
const erol = document.querySelectorAll(".diergelunbo-center ol li");
const erul = document.querySelectorAll(".diergelunbo-center ul li");
const zANniu = document.querySelector("#banner-left");
const yANniu = document.querySelector("#banner-right");
const zANniu2 = document.querySelector("#banner-left2");
const yANniu2 = document.querySelector("#banner-right2");
const bodyObj = document.querySelector("body");
const mm = document.querySelector('.eight-s_1')
const ms = document.querySelector(".six-center-S");
// bindList()
// async function bindList() {
//     let www = await pAjax({
//         url: '/qw',
//         dataType: 'json'
//     })
//     console.log(www);
//     // let str1 = ``
//     mm.innerHTML = `<div class="eight-s_1"><img src="${www.data.homeMetaVO.homeFloorList[0].elementList[0].picSrc}" alt=""></div>`

// // }
// bindList2()
// async function bindList2() {
//     let tja = await pAjax({
//         url: '/tj',
//         dataType: 'json'
//     })
//     console.log(tja)
//     let str1 = `<div class="six-center-S"></div>`;
//     tja.data.dataList.forEach(function (item) {
//         str1 += `
//         <a href="">
//             <img src="${item.images[0].bigPic}" alt="">
//             <p class="n_1mc"><span></span>HUAWEI P50</p>
//             <p class="n_1pc_1">$4988</p>

//         </a>`
//     })
//     ms.innerHTML += str1;
// }



let xs = document.querySelectorAll(".xs");
let fz = document.querySelectorAll(".fz");
let mz = document.querySelectorAll(".mz");
const box4 = document.querySelector(".box4");
let t = 21600;
let str = "";
let time;
var box4Top = box4.offsetTop;
document.addEventListener("scroll", function () {
    if (window.pageYOffset >= box4Top) {
        box4.style.display = "block"
    } else {
        box4.style.display = "none"
    }
});
time = setInterval(function () {
    let h = Math.floor(t / 60 / 60);
    h = h >= 10 ? h : "0" + h;
    let m = parseInt((t - (h * 60 * 60)) / 60);
    m = m >= 10 ? m : "0" + m;
    let s = t % 60;
    s = s >= 10 ? s : "0" + s;
    xs[0].innerHTML = `${h}`;
    xs[1].innerHTML = `${h}`;
    fz[0].innerHTML = `${m}`;
    fz[1].innerHTML = `${m}`;
    mz[1].innerHTML = `${s}`;
    mz[0].innerHTML = `${s}`;
    t--;
}, 1000)
let index1 = 0;
let lastIndex1 = 0;
let times1;
let index = 0;
let lastIndex = 0;
let times
ollisObj.forEach((li, key) => {
    // console.log(li);
    li.onclick = function () {
        lastIndex = index;
        index = key;
        // console.log(11);
        change();
    }
})
function change() {
    ollisObj[lastIndex].className = "";
    ullisObj[lastIndex].className = "";
    ollisObj[index].className = "ac";
    ullisObj[index].className = "ac";
}
function atuo() {
    times = setInterval(() => {
        yANniu.onclick();
    }, 800)
}
atuo();
yANniu.onclick = function () {
    lastIndex = index;
    index++;
    if (index > ollisObj.length - 1) {
        index = 0;
    }
    change();
}
zANniu.onclick = function () {
    lastIndex = index;
    index--;
    if (index < 0) {
        index = ollisObj.length - 1;
    }
    change();
}
zANniu.parentNode.onmouseover = function () {
    clearInterval(times);
}
zANniu.parentNode.onmouseout = function () {
    atuo();
}
// 第二套轮播图
erul.forEach((li, key) => {
    li.onclick = function () {
        lastIndex1 = index1;
        index1 = key;
        // console.log(1111);
        change2();
    }
})
function change2() {
    erol[lastIndex1].className = "";
    erul[lastIndex1].className = "";
    erol[index1].className = "ac";
    erul[index1].className = "ac";
}
function atuo2() {
    times1 = setInterval(() => {
        yANniu2.onclick();
        // console.log(666)
    }, 2000)
}
atuo2();
yANniu2.onclick = function () {
    lastIndex1 = index1;
    index1++;
    // console.log(2222);
    if (index1 > erol.length - 1) {
        index1 = 0;
    }
    change2();
}
zANniu2.onclick = function () {
    lastIndex1 = index1;
    index1--;
    // console.log(3333333);
    if (index1 < 0) {
        index1 = erol.length - 1;
    }
    change2();
}
zANniu2.parentNode.onmouseover = function () {
    clearInterval(times1);
}

zANniu2.parentNode.onmouseout = function () {
    atuo2();
}