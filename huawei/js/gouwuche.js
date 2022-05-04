const boxObj=document.querySelector(".box");
console.log(boxObj);
const smallObj=document.querySelector(".small");
console.log(smallObj);
const maskObj=document.querySelector(".mask");
console.log(maskObj);
const bigObj=document.querySelector(".big"),
bigImg=bigObj.lastElementChild;
console.log(bigImg);
smallObj.onmouseenter=function()
{
maskObj.style.display="block";
bigObj.style.display="block";
}
smallObj.onmouseleave=function(){
maskObj.style.display="none";
bigObj.style.display="none";
}
let boxT=boxObj.offsetTop;
let boxL=boxObj.offsetLeft;
// console.log(boxT,boxL);
smallObj.onmousemove=function(eve){
let cX=eve.pageX;
let cY=eve.pageY;//获取鼠标相当于可视区的坐标

let maskW=maskObj.offsetWidth;
let maskH=maskObj.offsetHeight;//默认mas的属性是display为none，获取不到，获取mask的宽和高

let maskL=cX-boxL-maskW/2;
let maskT=cY-boxT-maskH/2;
// console.log(maskL,maskT);sss

if(maskL<0)maskL=0;
if(maskT<0)maskT=0;
let maxMaskL=smallObj.offsetWidth-maskW;
let maxMaskT=smallObj.offsetHeight-maskH;
if(maskL>maxMaskL)maskL=maxMaskL;
if(maskT>maxMaskT)maskT=maxMaskT;

maskObj.style.left=maskL+"px";
maskObj.style.top=maskT+"px"

let bigMaxLeft=bigImg.offsetWidth-bigObj.offsetWidth;
let bigMaxTop=bigImg.offsetHeight-bigObj.offsetHeight;
// console.log(bigMaxLeft,bigMaxTop);
let tmpBigImgLeft=maskL/maxMaskL*bigMaxLeft;
let tmpBigImgTop=maskT/maxMaskT*bigMaxTop;
console.log(tmpBigImgLeft,tmpBigImgTop);
bigImg.style.left=-tmpBigImgLeft+"px"
bigImg.style.top=-tmpBigImgTop+"px"
}