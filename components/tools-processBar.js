import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/tools-processBar.less");
class ProcessBar extends React.Component{
   constructor(arg){
       super(arg);
       this.state = {
        legend: [
            { "guid": "l1", "text": "未编制", "class": "legend-white" },
            { "guid": "l2", "text": "编制中", "class": "legend-blue" },
            { "guid": "l3", "text": "审批通过", "class": "legend-green" },
            { "guid": "l4", "text": "审批驳回", "class": "legend-red" },
        ],
        stage: [
            { "guid": "1", "text": "投决会", "tap": "priceInvestment", "class": "legend-blue" },
            { "guid": "2", "text": "产品定位会", "tap": "priceProductlocat", "class": "legend-green" },
            { "guid": "3", "text": "项目定位会", "tap": "priceProjectlocat", "class": "legend-white" },
            { "guid": "4", "text": "启动会", "tap": "priceStartup", "class": "legend-green" },
            { "guid": "5", "text": "工规证", "tap": "priceCertificate", "class": "legend-blue" },
            { "guid": "6", "text": "决策书", "tap": "priceDecision", "class": "legend-red" },
            { "guid": "7", "text": "预售证", "tap": "pricePresell", "class": "legend-white" },
            { "guid": "8", "text": "签约", "tap": "priceContract", "class": "legend-white" },
            { "guid": "9", "text": "交付", "tap": "priceDeliver", "class": "legend-white" }
        ]
    };
   }
   BIND_HEADER(){ //绑定头部内容
        return this.state.legend.map((el,ind)=>{
            return <li key={ind} data-guid={el.guid}  className={el.class}>{el.text}</li>
        })
   }
   EVENT_CLICK_LIST(da,ev){
       this.props["callback"]&&this.props["callback"](da);
       $(".processBar-List li").removeClass("active");
       $(ev.currentTarget).addClass("active");
      // $(ev.current)
   }
   BIND_LIST(){//绑定list表
    let len = this.state.stage.length;
    return this.state.stage.map((el,ind)=>{
        return <li style={{zIndex:len-ind}} onClick={this.EVENT_CLICK_LIST.bind(this,el)} key={ind} data-guid={el.guid} data-tap={el.tap} ><span className={el.class}></span>{el.text}</li>
    })
   }
   render(){
       return <div className="processBar">
           <ul className="processBar-header">{this.BIND_HEADER()}</ul>
           <ul className="processBar-List">{this.BIND_LIST()}</ul>
       </div>
   }
}

export default ProcessBar;