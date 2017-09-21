/* import React from 'react';
import ReactDOM from 'react-dom'; */
import iss from "../js/iss.js";
class $tree {
    constructor(ele) {
        this.data = [{
            "id": 1,
            "text": "My Documents",
            "children": [{
                "id": 11,
                "text": "Photos",
                "state": "closed",
                "children": [{
                    "id": 111,
                    "text": "Friend"
                }, {
                    "id": 112,
                    "text": "Wife"
                }, {
                    "id": 113,
                    "text": "Company"
                }]
            }, {
                "id": 12,
                "text": "Program Files",
                "children": [{
                    "id": 121,
                    "text": "Intel"
                }, {
                    "id": 122,
                    "text": "Java",
                    "attributes": {
                        "p1": "Custom Attribute1",
                        "p2": "Custom Attribute2"
                    }
                }, {
                    "id": 123,
                    "text": "Microsoft Office"
                }, {
                    "id": 124,
                    "text": "Games",
                    "checked": true
                }]
            }, {
                "id": 13,
                "text": "index.html"
            }, {
                "id": 14,
                "text": "about.html"
            }, {
                "id": 15,
                "text": "welcome.html"
            }]
        }]

    }
    bindTree(ele) {
        var th = this;
        this.ele = $(ele);
        this.ele.tree({
            data: th.data
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

