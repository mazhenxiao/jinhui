import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie

class PriceControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.bindTab();
        this.state = {
            legend: [
                { "guid": "l1", "text": "未编制", "class": "legend-white" },
                { "guid": "l2", "text": "编制中", "class": "legend-blue" },
                { "guid": "l3", "text": "审批通过", "class": "legend-green" },
                { "guid": "l4", "text": "审批驳回", "class": "legend-red" },
            ],
            stage: [
                { "guid": "s1", "text": "投决会", "tap": "priceInvestment", "class": "legend-blue" },
                { "guid": "s2", "text": "产品定位会", "tap": "priceProductlocat", "class": "legend-green" },
                { "guid": "s3", "text": "项目定位会", "tap": "priceProjectlocat", "class": "legend-white" },
                { "guid": "s4", "text": "启动会", "tap": "priceStartup", "class": "legend-green" },
                { "guid": "s5", "text": "工规证", "tap": "priceCertificate", "class": "legend-blue" },
                { "guid": "s6", "text": "决策书", "tap": "priceDecision", "class": "legend-red" },
                { "guid": "s7", "text": "预售证", "tap": "pricePresell", "class": "legend-white" },
                { "guid": "s6", "text": "签约", "tap": "priceContract", "class": "legend-white" },
                { "guid": "s6", "text": "交付", "tap": "priceDeliver", "class": "legend-white" }
            ]
        };
    }
    bindTab(prop) {
        $(".JH-Content").removeClass("CLASS_AGENTY");
        // ReactDOM.render(<ToolsTtab parent={prop}/>,document.querySelector("#React-tools-tab"));
    }
    /* 事件 */
    Event_Cutup(data, ev) {
        let el = $(ev.target);
        el.parent().find("li").removeClass("active");
        setTimeout(() => { el.addClass("active") });
        switch (data) {
            case "priceInvestment": iss.hashHistory.push("priceInvestment", { "state": "001" }); break;
            case "priceProductlocat": iss.hashHistory.push("priceProductlocat", { "state": "002" }); break;
            case "priceProjectlocat": iss.hashHistory.push("priceProjectlocat", { "state": "003" }); break;
            case "priceStartup": iss.hashHistory.push("priceStartup", { "state": "004" }); break;
            case "priceCertificate": iss.hashHistory.push("priceCertificate", { "state": "005" }); break;
            case "priceDecision": iss.hashHistory.push("priceDecision", { "state": "006" }); break;
            case "pricePresell": iss.hashHistory.push("pricePresell", { "state": "007" }); break;
            case "priceContract": iss.hashHistory.push("priceContract", { "state": "008" }); break;
            case "priceDeliver": iss.hashHistory.push("priceDeliver", { "state": "009" }); break;
        }
    }
    render() {
        var th = this;
        let legendlist = this.state.legend.map((da, ind) => {
            return <li key={ind} className="" ><i className={da.class}></i>{da.text}</li>
        });
        let stagelist = this.state.stage.map((da, ind) => {
            return <li key={ind} className="" onClick={th.Event_Cutup.bind(th,da.tap)}><i className={da.class}></i>{da.text}</li>
        })
        return <header className="price" >
            <ul className="price-legend">
                {legendlist}
            </ul>
            <ul className="price-stage price-left">
                {stagelist}
            </ul>
            <div className="price-right">
                <i className="addIcon"></i>
                <a className="btn-refish" href="javascript:;">生成新版本</a>
            </div>
            <i className="clearboth"></i>
        </header>

    }
}

export default PriceControl;


