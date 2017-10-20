/* 分期审核=只读基本信息*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StageInforView from "./component-stageInfor-view.js";  /*分期信息*/
import StageMasView from "./component-stageMas-view.js";  /*分期规划条件指标和分期占用土地*/
import ProcessApprovalTab from "./component-ProcessApproval-Tab.js"; //导航信息


class StageControl extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            versionId:"98b9d631-b31d-ef60-8fe5-4b837c53a37a",/*版本id*/
            projectid:"f7c938c9-a12b-45cd-8bdf-67c6152824e7",/*项目id*/
            reqtype:"Edit"/*请求类型*/
        }
    }

    render() {
        let th=this;
        let stateData=th.state;
        return (<div>
            <ProcessApprovalTab current="newProjectStage"/>
            <StageInforView versionId={stateData.versionId} reqtype={stateData.reqtype} projectid={stateData.projectid} />
            <StageMasView versionId={stateData.versionId} projectid={stateData.projectid}/>
        </div>);
    }
}

export default StageControl;