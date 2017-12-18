/* import React from 'react';
import ReactDOM from 'react-dom'; */
import iss from "../js/iss.js";
class $tree {
    constructor(ele) {
       
        this.state={
            url:"/Home/GetTreeInfo?Time="+new Date().getTime(),
            treeDate:[]
        }
        this.getAjax();
   
    }
    getAjax(){
        
        var th =this;
        iss.ajax({
            type:"post",
            url:th.state.url,
            success(da){
            	
                th.ele.tree("loadData",da);
                var Height = $(window).height()-80;
                $(".treeBox").height(Height)
                $(".JH-RightBox .JH-Content").height(Height)
            },
            error(e){

            }
        });
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
            		$(me).attr("title",node.text||"");
            	});
            }
        });
        setTimeout(arg=>{
            th.bindScroll();
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

