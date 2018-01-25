/* import React from 'react';
import ReactDOM from 'react-dom'; */
import iss from "../js/iss.js";
class $tree {
    constructor(ele) {
       
        this.state={
            url:"/Home/GetTreeInfo",
            treeDate:[]
        }
        this.getAjax();
    }
    getAjax(){
        
        let th =this,dataKey = this.getDataKey(); 
        
         iss.ajax({
            type:"post",
            url:th.state.url,
            data:{
                dataKey:dataKey
            },
            success(da){
                
            	th.setTreeState.call(th,da)
                
            },
            error(e){

            }
        }); 
    }
    setTreeState(da){
        let th = this;
        let top = document.querySelector("#mCSB_1_container");
            top = top? top.style.top:"0px";
        const {id,parentid} = iss.id;
        th.ele.tree("loadData",da);
        var Height = $(window).height()-80;
        $(".treeBox").height(Height)
        $(".JH-RightBox .JH-Content").height(Height);
        setTimeout(arg=>{
          document.querySelector("#mCSB_1_container").style.top=top;
          let me = th.ele.tree("find",id);
            if(me&&me["target"]){
                  th.ele.tree("expandTo",me.target).tree("select",me.target)
            }    
          
                 
        },1000)
    }
    getDataKey(){
        let hash = location.hash.split("?");
            hash =(hash&&hash.length>1)? eval(`({"`+hash[1].replace(/\&/ig,`","`).replace(/=/ig,`":"`)+`"})`)["dataKey"]:"";
        let dataKey = hash? hash:iss.id.id;
        return dataKey
     
    }
    filterTree(){

    }
    togo(node){ //跳转
       
      
    }
 /**
  * 根据dataKey定位显示展开当前树
  * @param {*string} dataKey 
  */
    show(dataKey){
        
    }
    bindTree(ele,callback) { //绑定数据后回调
        
        var th = this;
        th.ele = $(ele);
        let trees = th.ele.tree({
            parentField:"pid",
            idFiled:"id",
            textFiled:"text",
            data: th.data,
            formatter:function(node){
            	
            	var txt=node.text||"error projectName";
                var txtFormat="";
            	if(txt.length>11){
            		txtFormat=txt.slice(0,11)+"...";
            	}else{
            		txtFormat=txt;
            	}
            	return txtFormat;
            },
            onClick(node){
                callback(node);
            },
            onLoadSuccess:function(node,data){

            	$(".tree-node").each(function(index,element){
            		var me=element;
                    var node=th.ele.tree("getNode",me);
                    if(node.salestatus ==1){
                        $(me).addClass("unlock")
                    }else if(node.salestatus ==2){
                        $(me).addClass("lock")
                    }
                        $(me).attr("title",node.text||"");
                    
            		
                });
                let ele = $("#mCSB_1_container");
                    if(!ele.length){
                        setTimeout(arg=>{
                            th.bindScroll();
                        });
                    }  
            }
        });
     

        $(window).on("treeLoad",arg=>{
            th.getAjax();
 
        });
    }
    bindScroll() {
        
        var th = this;
        let pa = this.ele.parent(),
            id = pa.attr("id") || "tree-" + new Date().getTime();
            pa.attr("id",id);
            pa.mCustomScrollbar({
                autoDraggerLength:true,
                scrollButtons:{enable:true},
                scrollInertia:0,
                mouseWheelPixels:20
            });
         
                

    }

}

let tree = new $tree();
iss.tree = tree;  //甩出到全局统一管理
export default tree

