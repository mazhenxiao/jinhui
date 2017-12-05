import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class OverviewTab extends React.Component {
    constructor(arg) {
        super(arg);
        this.bindTab();
        this.state = {
            data:[
                { "guid":"1","text":"项目概览","tap":"index"},
                { "guid":"2","text":"项目身份证","tap":"identity"},
                { "guid":"3","text":"供货","tap":"supply"},
                { "guid":"4","text":"签约与回款","tap":"signPayment"},
                { "guid":"5","text":"计划","tap":"plan"},
                { "guid":"6","text":"重点事项","tap":"matter"},
                { "guid":"7","text":"关键指标","tap":"keyPoint"}
            ]
        }
    }
    bindTab(prop){
        $(".JH-Content").removeClass("CLASS_AGENTY");
       // ReactDOM.render(<ToolsTtab parent={prop}/>,document.querySelector("#React-tools-tab"));
    }
    /* 事件 */
    Event_click(data,ev){
      let el = $(ev.target);
          el.parent().find("li").removeClass("active");
          setTimeout(()=>{el.addClass("active")});
          switch(data){
             case "index":iss.hashHistory.push("index",{"state":"001"});break;
             case "identity":iss.hashHistory.push("identity",{"state":"002"});break;
             case "supply":iss.hashHistory.push("supply",{"state":"002"});break;
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

export default OverviewTab;


