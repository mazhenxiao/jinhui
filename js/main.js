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
 
    this.TransHeight();
    this.bindScroll();
    this.bingBar();
    //document.addEventListener("fullscreenchange",th.TransHeight,false);
   // document.addEventListener("mozfullscreenchange",th.TransHeight,false);
   // document.addEventListener("msfullscreenchange",th.TransHeight,false);
     window.onresize = this.TransHeight;
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
          if(JHNav.hasClass("fixed")){return}
          JHNav.addClass("fixed");

        }else{
          JHNav.removeClass("fixed");
        }
        /* if(left>20){
          bs.addClass("hide")
        }else{
          bs.removeClass("hide")
        } */
    }
  }
  bingBar(){
      var cont =  $(".JH-RightBox"),icons = $(".icon-bar");
      icons.bind("click.bar",e=>{
         let el = $(e.currentTarget),
             pa = $(el.attr("target"));
             pa.toggleClass("active");
           cont.toggleClass("active");
           icons.trigger("EVENT_TOGGLEBAR");
      })
  }
}
new main();
