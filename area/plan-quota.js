/**
 *  规划方案指标 plan-quota （1~9）
 */

import React, {Component} from 'react';
import {Button, Select} from 'antd';
import "babel-polyfill";  //兼容ie
import {shallowCompare, knife} from '../utils';
import iss from "../js/iss.js";//公共类
import {AreaConstants} from '../constants';
import "../css/tools-dynamicTable.less";//专用css
import DynamicTable from "../components/tools-dynamicTable.js";
import {setTimeout} from 'timers';

class PlanQuota extends Component {

    state = {
        pid: 1,//项目id或当前版本id
        DynamicData: this.props.planData || [],//获取

    };

    /**
     * 发送数据给
     */
    postData = {}

    componentWillReceiveProps(nextProps, nextState) {
        let {approvalStatus, versionStatus} = nextProps;
        let readonly = approvalStatus || versionStatus == "approvaling" || versionStatus == "approvaled";

        this.setState({
            DynamicData: nextProps.planData,
            approvalStatus,
            readonly: readonly
        });

        this.setState({
            "DynamicData": nextProps.planData || [],
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }

    BIND_CALLBACK = (da, e) => { //子页面返回callback
        // if(this.time){ clearTimeout(this.time) }
        var th = this;
        var el = (e && e["target"]) ? e.target.value : e, list = this.state.DynamicData;
        list.forEach((d, i) => {
            if (da.id == d.id) {
                d["val"] = el;
                d["test"] = da["test"];
                return
            }

        });
        let newList = knife.SET_CountExec(list); //通用计算

        th.setState({
            "DynamicData": newList
        });

        this.postData = newList.filter(arg => {  //过滤传入所有已填数据
            if (arg["val"]) {
                delete arg["parent"]
                delete arg["child"]
                return arg
            }

        });

        this.props["onPlanQuotaDataChange"] && this.props.onPlanQuotaDataChange(this.postData);

        //let validates = knife.valid(list);  //数据校验
        // console.log(validates);
    }

    render() {
        const {readonly, pid, DynamicData} = this.state;
        const {versionId} = this.props;
        if (!versionId) {
            return <div className="empty-div">暂无数据</div>
        }
        return (
            <article>
                <DynamicTable readOnly={readonly} pid={pid} DynamicData={DynamicData}
                              CallBack={this.BIND_CALLBACK}/>
            </article>
        );
    };
}

export default PlanQuota;
