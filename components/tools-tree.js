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
      /*  this.data = [{
            "id": 1,
            "type":0,
            "text": "My Documents",
            "children": [{
                "id": 11,
                "type":1,
                "text": "Photos",
                "state": "closed",
                "children": [{
                    "id": 111,
                    "type":2,
                    "text": "Friend"
                }, {
                    "id": 112,
                    "type":2,
                    "text": "Wife"
                }, {
                    "id": 113,
                    "type":2,
                    "text": "Company"
                }]
            }, {
                "id": 12,
                "type":2,
                "text": "Program Files",
                "children": [{
                    "id": 121,
                    "type":3,
                    "text": "Intel"
                }, {
                    "id": 122,
                    "type":3,
                    "text": "Java",
                    "attributes": {
                        "p1": "Custom Attribute1",
                        "p2": "Custom Attribute2"
                    }
                }, {
                    "id": 123,
                    "type":3,
                    "text": "Microsoft Office"
                }, {
                    "id": 124,
                    "type":3,
                    "text": "Games",
                    "checked": true
                }]
            }, {
                "id": 13,
                "type":2,
                "text": "index.html"
            }, {
                "id": 14,
                "type":2,
                "text": "about.html"
            }, {
                "id": 15,
                "type":2,
                "text": "welcome.html"
            }]
        }]  */

    }
    getAjax(){
        var th =this;
      
        iss.ajax({
            type:"post",
            url:th.state.url,
            sucess(da){
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

