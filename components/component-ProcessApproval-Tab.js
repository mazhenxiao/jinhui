/*审批信息*/
import React from 'react';
/**
 * 首页导航条
 * index  identity  supply  所需
 */
import iss from "../js/iss.js";
import "babel-polyfill";  //兼容ie

class ProcessApprovalTab extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            TapList: [],
            allSearchArg: this.props.allSearchArg/*地址栏的参数*/
        }

    }

    getQueryTab() { //页面显示连接设置
        var th = this;
        let url ="";
        if(th.props.allSearchArg["current"]){
            url = th.props.allSearchArg["current"];
        }else{
            url = "ProcessApprover"
        }
         
        var list = [
                {id: `${url}`, url: `/${url}`},//审批0
                {id: "newProjectApproval", url: "/newProjectApproval"},//项目1
                {id: "newProjectStage", url: "/newProjectStage"},//分期2
                {id: "groupbuild", url: "/AreaInfo/groupbuild"},//项目团队维护3
                {id: "priceControl", url: "/AreaInfo/priceControl"},//价格4
                {id: "area", url: "/AreaInfo/areaManage"},//面积5
                {id: "priority", url: "/AreaInfo/priority"},//重点事项
                {id: "supply", url: "/AreaInfo/supply"},//供货6
                {id: "sign", url: "/AreaInfo/sign"},//签约7
                {id: "payment", url: "/AreaInfo/payment"}//回款8
            ],
            id = th.state.allSearchArg['e'];
        switch (id) {
            case iss.getEVal("newProjectStatus"):
                this.setState({     // 项目审批
                    TapList: [list[0], list[1]]
                });
                break;
            case iss.getEVal("intallmentStatus"):
                this.setState({ // 分期审批
                    TapList: [list[0], list[2]]
                });
                break;
            case iss.getEVal("teamMaintainStatus"):
                this.setState({ // 项目团队维护
                    TapList: [list[0], list[3]]
                });
                break;
            case iss.getEVal("priceControl"):
                this.setState({ // 价格
                    TapList: [list[0], list[4]]
                });
                break;
            case iss.getEVal("area"):
                this.setState({ // 面积
                    TapList: [list[0], list[5]]
                });
            case iss.getEVal("priority"):
                this.setState({ // 项目团队维护
                    TapList: [list[0], list[6]]
                });
                break;
            case iss.getEVal("supply"):
            case iss.getEVal("sign"):
            case iss.getEVal("payment"):
                this.setState({ // 回款
                    TapList: [list[0], list[6],list[7],list[8]]
                });
                break;
        }

    }

    setTapList() { //设置导航条
        return this.state.TapList.map((el, id) => {
            let str = "";
            switch (el.id) {
                case "ProcessApproval":
                case "ProcessApprover":
                    str = "流程审批";
                    break;
                case "newProjectApproval":
                    str = "项目信息";
                    break;
                case "newProjectStage":
                    str = "分期信息";
                    break;
                case "groupbuild":
                    str = "项目团队维护";
                    break;
                case "priceControl":
                    str = "价格管理";
                    break;
                case "area":
                    str = "面积管理";
                    break;
<<<<<<< HEAD
                case "priority":
                    str = "重点事项";
=======
                case "supply":
                    str = "供货";
                    break;
                case "sign":
                    str = "签约";
                    break;
                case "payment":
                    str = "回款";
>>>>>>> mzx
                    break;
            }
            return <li className={this.props.current == el.id ? "active" : ""} key={id}
                       onClick={this.EVENT_CLICK_LINK.bind(this, el.url, el.id)}>{str}</li>
        })
    }

    EVENT_CLICK_LINK(url, id, ev) {
        var th = this;
        var allSearchArg = th.state.allSearchArg;
        var keyArr = [];

        for (let key in allSearchArg) {
            //    if(key == "dataKey"){
            //     keyArr.push(key+"="+allSearchArg["newId"]);
            //    }else{
            keyArr.push(key + "=" + allSearchArg[key]);
            // }
        }
        //console.log(keyArr)
        iss.hashHistory.push({
            pathname: url,
            search: "?" + keyArr.join("&")
        });
    }

    componentWillMount() {
        this.getQueryTab();
    }

    render() {
        let th = this;
        return <section>
            <header className="JH-HeadTab">
                <ul className="JH-HeadList">
                    {
                        this.setTapList()
                    }
                </ul>
            </header>

        </section>

    }
}

export default ProcessApprovalTab;