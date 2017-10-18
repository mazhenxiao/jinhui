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
        var th =this;
      
        iss.ajax({
            type:"post",
            url:th.state.url,
            success(da){
                th.ele.tree("loadData",da);
                iss.id=da[0];
            },
            error(e){

            }
        })
    }
    togo(node){ //跳转
       
      
    }
    bindTree(ele,callback) { //绑定数据后回调
        var th = this;
        this.ele = $(ele);
        let trees = this.ele.tree({
            parentField:"pid",
            idFiled:"id",
            textFiled:"name",
            data: th.data,
            onClick(node){
              
               // trees.tree("toggle",node.target);
                callback(node);    
            
            }
        });
        setTimeout(arg=>{
            th.bindScroll();
        })

        $(window).on("treeLoad",arg=>{
            th.getAjax();
        })
    }
    bindScroll() {
        var th = this;
        let pa = this.ele.parent(),
            id = pa.attr("id") || "tree-" + new Date().getTime();
            pa.attr("id",id);
            pa.mCustomScrollbar({
                autoDraggerLength:true,
                scrollButtons:{enable:true}
                                });
                

    }

}

let tree = new $tree();
export default tree

