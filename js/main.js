import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import iss from "./iss.js";//公共类
import rootRout from "./router.js";//路由
import toolsList from "../components/tools-list.js";//头部
import toolsTree from "../components/tools-leftTree.js";//左侧树形
/* 公共页面js */ 
class main{
  constructor(){
    var th = this;
    (!iss.userInfo)&&this.getUser(); //如果用户从没登陆过则ajax获取用户信息
    this.TransHeight();
    this.bindScroll();   
    this.bingBar();
    //document.addEventListener("fullscreenchange",th.TransHeight,false);
   // document.addEventListener("mozfullscreenchange",th.TransHeight,false);
   // document.addEventListener("msfullscreenchange",th.TransHeight,false);
     window.onresize = this.TransHeight; 
     
    
  }
  getUser(){  //获取登陆信息

     iss.ajax({
       url:"/Account/IGetUserInfo",
       success(da){
          iss.userInfo = da; //获取数据
          sessionStorage.setItem("userInfo",JSON.stringify(da));//存入session
       }
     })
  }
  TransHeight(){
    let JH_Nav = document.querySelector(".JH-Nav"),JH_Content = document.querySelector(".JH-Content"),h=640;
    let rh = JH_Content.offsetHeight,lh = JH_Nav.offsetHeight,$wh =Math.max(document.body.clientHeight,document.documentElement.clientHeight)-60;
    let $h = Math.max(rh,lh,$wh,640);
    JH_Nav.style.minHeight = $h+"px";
    JH_Content.style.minHeight = $h-10+"px";
  }
  bindScroll(){
    let JHNav = $(".JH-Nav"),win= $(window),bs = $(".icon-bar");
    window.onscroll = ev=>{
       let top =win.scrollTop(),left = win.scrollLeft(),icons = $(".icon-bar");
       
        if(top>=60){
        	/*如果左侧树，处于隐藏状态，则不固定*/
        //  if(JHNav.hasClass("active")) return false;
          JHNav.addClass("fixed");
        }else{
          JHNav.removeClass("fixed");
        }

    }
  }
  bingBar(){
      var cont =  $(".JH-RightBox"),icons = $(".icon-bar");
      icons.bind("click.bar",e=>{
         let el = $(e.currentTarget),
             pa = $(el.attr("target"));
             //if(pa.hasClass("fixed")) return false;
             
             if(pa.hasClass("active")){
             		pa.removeClass("active");
             		cont.removeClass("active");
             }else{
             		pa.addClass("active");
           			cont.addClass("active");
             }
             
           icons.trigger("EVENT_TOGGLEBAR");
      });
  }
}
new main();
