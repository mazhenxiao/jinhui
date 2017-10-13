import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessBar from "./tools-processBar.js";

class PriceControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.bindTab();
        this.state = {};
    }
    componentWillMount() {
        // render之前
        sessionStorage['pricestep'] = "1";
    }
    bindTab(prop) {
        $(".JH-Content").removeClass("CLASS_AGENTY");
    }
    /* 事件 */
    BIND_CALLBACK(da) {
        sessionStorage['pricestep'] = da.guid;
        var th = this;debugger
        switch (da.tap) {
            case "priceInvestment":
            case "priceProductlocat": 
            case "priceProjectlocat":
            case "priceStartup": 
            case "priceCertificate":
            case "priceDecision": 
            case "pricePresell": 
            case "priceContract": 
            case "priceDeliver": th.BIND_URL1(da); break;
        }
        // switch (data.tap) {
        //     case "priceInvestment": iss.hashHistory.push("component-priceControl-Investment", { "state": "001" }); break;
        //     case "priceProductlocat": iss.hashHistory.push("component-priceControl-Productlocat", { "state": "002" }); break;
        //     case "priceProjectlocat": iss.hashHistory.push("component-priceControl-Projectlocat", { "state": "003" }); break;
        //     case "priceStartup": iss.hashHistory.push("component-priceControl-Startup", { "state": "004" }); break;
        //     case "priceCertificate": iss.hashHistory.push("component-priceControl-Certificate", { "state": "005" }); break;
        //     case "priceDecision": iss.hashHistory.push("component-priceControl-Decision", { "state": "006" }); break;
        //     case "pricePresell": iss.hashHistory.push("component-priceControl-Presell", { "state": "007" }); break;
        //     case "priceContract": iss.hashHistory.push("component-priceControl-Contract", { "state": "008" }); break;
        //     case "priceDeliver": iss.hashHistory.push("component-priceControl-Deliver", { "state": "009" }); break;
        // }
    }
    BIND_URL1(da) {
        require.ensure([], function (require) {
            let PriceManagementTabel = require('../components/component-priceControl-Management.js').default;
            ReactDOM.render(<PriceManagementTabel data={da} />, document.querySelector("#priceManagement"));
        }, "component-priceControl-Management");
    }
    render() {
        var th = this;
        return <article className="price" >
            <section>
                <ProcessBar edit="true" callback={this.BIND_CALLBACK.bind(this)} />
                <div className="price-right">
                    <i className="addIcon"></i>
                    <a className="btn-refish" href="javascript:;">生成新版本</a>
                </div>
                <i className="clearboth"></i>
            </section>
            <section>
                <section className="mgT10" id="priceManagement">

                </section>
            </section>
        </article>
    }
}

export default PriceControl;


