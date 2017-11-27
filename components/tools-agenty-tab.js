/* 代办头部 */
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class ToolsTtab extends React.Component {
    constructor(arg) {
        super(arg);
        this.bindLeftBart();
        this.state = {
            data:[
                { "guid":"1","text":"我的待审","tap":"agenty"},
                { "guid":"2","text":"我的申请","tap":"apply"},
                { "guid":"3","text":"我的草稿","tap":"draft"},
                { "guid":"4","text":"审批历史","tap":"approalHistory"}
            ]
        }
    }
    bindLeftBart(){
        $(".JH-Content").addClass("CLASS_AGENTY");
       setTimeout(a=>{
        $(window).trigger("EVENT_CLOSELEFTBAR");
       },1000)
    }
    /* 事件 */
    Event_click(data,ev){
      let el = $(ev.target);
          el.parent().find("li").removeClass("active");
          setTimeout(()=>{el.addClass("active")});
          switch(data){
             case "agenty":iss.hashHistory.push("agenty");break;
             case "apply":iss.hashHistory.push("apply");break;
             case "draft":iss.hashHistory.push("draft");break;
             case "approalHistory":iss.hashHistory.push("approalHistory");break;
          }
    }
    render() {
        var th = this,current = this.props.parent.location.pathname;
         var th;
        let list = this.state.data.map((da,ind)=>{
           
            if(current.indexOf(da.tap)>=0){
                return <li key={ind} className="J-List active" onClick={th.Event_click.bind(th,da.tap)}>{da.text}</li>
            }else{
            return <li key={ind} className="J-List" onClick={th.Event_click.bind(th,da.tap)}>{da.text}</li>
            }
        })
        return <header className="JH-HeadTab" >
            <ul className="JH-HeadList">
                {list}
            </ul>
            <div className="JH-RightFlot">
                <a className="btn-refish" href="javascript:;">刷新</a>
            </div>
        </header>
    
    }
}

export default ToolsTtab;


