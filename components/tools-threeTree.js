/*复选框==树结构*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class ThreeTree extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            threeData:[{
                "id":1,
                "text":"Foods",
                "children":[{
                    "id":2,
                    "text":"Fruits",
                    "state":"closed",
                    "children":[{
                        "text":"apple",
                        "checked":true
                    },{
                        "text":"orange"
                    }]
                },{
                    "id":3,
                    "text":"Vegetables",
                    "state":"open",
                    "children":[{
                        "text":"tomato",
                        "checked":true
                    },{
                        "text":"carrot",
                        "checked":true
                    },{
                        "text":"cabbage"
                    },{
                        "text":"potato",
                        "checked":true
                    },{
                        "text":"lettuce"
                    }]
                }]
            }]

        }
    }
    getAjax(){
        this.bindTree(this.state.threeData);
    }
    bindTree(da){
        var th = this;
        console.log(th.props.id);
        $(`#${th.props.id}`).tree({
            data:da,
            checkbox:true
        });
    this.props.callback(da);
    }
    componentDidMount(){
        var th = this;
        this.getAjax();
        //th.props.eveInitLoad();
    }
    render() {
  
        return (<ul id={this.props.id}></ul>);

    }
}

export default ThreeTree;