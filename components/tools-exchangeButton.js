import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../css/tools-processBar.less");
class ExchangeButton extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            btns: [
                // data={"[{'text':'保存'，'class':''},{}]"}
                { "guid": "0", "text": "编辑", "class": "jh-icon jh-icons-edit", "operType": "edit" },
                { "guid": "1", "text": "保存", "class": "jh-icon jh-icons-save", "operType": "save" },
            ],
            id:this.props["data-unique"]+"changebtn"
        };
    }
    EVENT_CLICK_LIST(da,ind) {
        $('#'+this.state.id).children("li").hide();
        let si = da.guid=="0"?"1":"0";
        $('#'+this.state.id).children("li").eq(parseInt(si)).show();
        this.props["callback"] && this.props["callback"](da);
    }
    componentDidMount(){
        $('#'+this.state.id).children("li").hide();
        $('#'+this.state.id).children("li").eq(0).show();
    }
    render() {
        let btneles = this.state.btns.map((da, ind) => {
            return <li key={da.guid} onClick={this.EVENT_CLICK_LIST.bind(this,da)} data-oper={da.operType}><i className={da.class}></i><span>{da.text}</span></li>;
        })
        return <ul className="opers btn-change jh-icons" id={this.state.id}>
            {btneles}
        </ul>
    }
}

export default ExchangeButton;