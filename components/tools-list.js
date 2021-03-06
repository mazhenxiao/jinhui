/* 总头部 */
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
class ToolsList extends React.Component {
    constructor(arg) {
        super(arg) 
    }
    EVENT_CLICK(str,th) {
        console.log(this);
        switch(str){
            case "index":iss.hashHistory.push("index");break;
            case "agenty":iss.hashHistory.push("agenty");break;
            case "apply":iss.hashHistory.push("apply");break;
            case "projectList":iss.hashHistory.push("projectList");break;
            case "priceControl":iss.hashHistory.push({
                pathname:"priceControl"
            });break;
            case "areaManagement":iss.hashHistory.push({
                pathname:"areaManagement"
            });break;
        }
    }
    render() {
        return <article>
            <div className="userLogin">
				<b className="userName">欧阳少华</b>
				<ul className="userTancen boxSizing">
					<li><a className="userPending" onClick={this.EVENT_CLICK.bind(this,"agenty")} href="javascript:;">我的待审</a><i className="redFont">(2)</i></li>
					<li><a className="userApply" onClick={this.EVENT_CLICK.bind(this,"apply")} href="javascript:;">我的申请</a><i className="redFont">(12)</i></li>
					<li><a className="userDraft" href="#">我的草稿</a><i className="redFont">(12)</i></li>
					<li><a className="userHistory" href="#">审批历史</a><i className="redFont">(12)</i></li>
					<li><a className="userExit" href="#">退出</a></li>
				</ul>
			</div>
            <h1 className="xtName">金辉集团运营管控系统</h1>
            <ul>
                <li>
                    <a className="active" onClick={this.EVENT_CLICK.bind(this,"index")} href="javascript:;" >项目列表</a>
                </li>
                <li>
                    <a href="#">信息填报</a>
                    <ol className="subMenu">
                        <li><a onClick={this.EVENT_CLICK.bind(this,"areaManagement")} href="javascript:;" >面积管理</a></li>
                        <li><a onClick={this.EVENT_CLICK.bind(this,"priceControl")} href="javascript:;" >价格管理</a></li>
                        <li><a href="InformationProvidedSupply.html">供货</a></li>
                        <li><a href="signingReceivable.html">签约与回款</a></li>
                        <li><a href="keyIssues.html">重点事项</a></li>
                        <li><a href="keyIndicators.html">关键指标</a></li>
                    </ol>
                </li>
                <li>
                    <a href="#">报表管理</a>

                </li>
                <li>
                    <a href="#">基础设置</a>
                </li>
                <li>
                    <a href="#">楼栋匹配</a>
                </li>

            </ul>
          
        </article>
    }
}

ReactDOM.render(<ToolsList />, document.querySelector("#JH-Header"));