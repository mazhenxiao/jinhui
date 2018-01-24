/* 我的申请 */
import React from 'react';
import iss from "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
import Page from "./tools-page.js";//基于bootstrap分页组件
import { Pagination } from 'antd';
import "../css/antd.min.css";
class Apply extends React.Component {
    constructor(arg) {
        super(arg);
        this.url = "/MyTodo/IGetmySubmition?page=1&size=10";
        this.state = {
            dataList: [],
            current:1
        }
    }
    componentWillMount() {
        this.getAjax();
    }
    EventClickCell(txt, da, val) {
        var tar = event.target || event.srcElement;
        let w = window.screen.availWidth,
            h = window.screen.availHeight - 50;
        if (da == "type" && tar.nodeName.toLocaleLowerCase() == "a") {
            //window.open("/Home/MYTodo/#/","",`width=${w},height=${h},left=0,top=0`)
            iss.hashHistory.push({ pathname: "/ProcessApprover", state: iss.id.id });
        }
    }
    /**
     * 
     * @param {*判断路由跳转} da 
     */
    EVENT_CLICK_PROJECTNAME(da) {
        let url = iss.convertURL(da.entiid), search = "";
        switch (da.entiid) {
            case iss.getEVal("newProjectStatus"):  //项目列表-项目
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;
            case iss.getEVal("intallmentStatus"): //项目列表-分期
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;
            case iss.getEVal("teamMaintainStatus"): //信息填报-组团
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&readOnly=readOnly&isProOrStage=2`;
                break;
            case iss.getEVal("area"): //信息填报-面积
            case iss.getEVal("priceControl"): //信息填报-价格
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;
            case iss.getEVal("priority"): //信息填报-组团
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&readOnly=readOnly`;
                break;
            case iss.getEVal("primarykeyTarget"): //信息填报-关键指标目标
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&primarykeyTarget=primarykeyTarget&isProOrStage=2`;
                break;
            case iss.getEVal("primarykey"): //信息填报-关键指标
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&primarykey=primarykey&isProOrStage=2`;
                break;
            default: iss.tip({ type: "error", description: "url地址未带出，请联系后台工作人员。" }); break
        }
        iss.hashHistory.push({
            pathname: "/ProcessApprover",
            search: search
        });
        $(".JH-Content").removeClass("CLASS_AGENTY");
    }
    //废弃重写
    /*
    _EVENT_CLICK_PROJECTNAME(da) {
        
        let search = "";
        var url="";
        if(da.runstate=="Rejected"){
            switch (da.entiid) {
                case iss.getEVal("intallmentStatus"):url="intallment";break; //分期
                case iss.getEVal("newProjectStatus"):url="newProject";break;//项目
                case iss.getEVal("teamMaintainStatus"):url="AreaInfo/groupbuild";break;//项目团队维护
            }
            
            if(da.entiid == "10114"){
                
                iss.hashHistory.push({
                    pathname:`/${url}`,
                    search:`?status=edit&dataKey=${da.runtrecordid}&e=${da.entiid}&readOnly=readOnly&isProOrStage=2`
                });
            }else{
                iss.hashHistory.push({
                    pathname:`/${url}`,
                    search:`?status=edit&dataKey=${da.runtrecordid}&e=${da.entiid}`
                });
            }
            
            $(".JH-Content").removeClass("CLASS_AGENTY");
        }else{
            switch(da.entiid) {
                case iss.getEVal("newProjectStatus"): 
                	search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`; 
                	break;
                case iss.getEVal("intallmentStatus"): 
                	search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`; 
                    break;
                case iss.getEVal("teamMaintainStatus"):
                    search=`?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&readOnly=readOnly&isProOrStage=2`;
                    break;
                default:
                	search="";
            }
            if(search==""){
	        	iss.popover({ content: "此条数据异常，请联系后台工作人员！" });
	        	return false;
	        }
            iss.hashHistory.push({
                pathname: "/ProcessApprover",
                search: search
            });
        }
        
    }
    */
    getAjax(arg) {
        var th = this, page = 1, size = 10;
        if (arg) {
            page = arg
        }

        iss.ajax({
            url: this.url,
            data: {
                page: page,
                size: size
            },
            success(da) {
                th.setState({
                    pageTotal: da.rows.TotalPages,
                    pageCount: da.rows.TotalItems,
                    dataList: da.rows.Items
                });
            },
            error() {

            }
        })
    }
    Bind_Click_Page=(page, pageSize)=> { // 分页回调
        this.setState({current:page},()=>{
            this.getAjax(page);//分页完成后重新获取
        })
        
    }
    agentyTabel() {
        var th = this;
        return th.state.dataList.map((el, ind) => {
            let type = "";
            if (el.runstatetext.indexOf("审批中") >= 0) { type = "type1" } else
                if (el.runstatetext.indexOf("通过") >= 0) { type = "type2" } else
                    if (el.runstatetext.indexOf("驳回") >= 0) { type = "type3" }
            return <tr key={ind}>
                <td className="center">{ind + 1}</td>
                <td className="left">{el.entiname}</td>
                <td className="left"><a href="javascript:;" onClick={this.EVENT_CLICK_PROJECTNAME.bind(this, el)}>{el.workflowtitle}</a></td>
                <td className="center">{el.submitdatetime.replace("T", " ")}</td>
                <td className="left"><span className="pseudo"><i className={type}></i>{el.runstatetext}</span></td>
                <td className="center">{el.currentflowname}</td>
                <td className="center">{el.approvername}</td>
            </tr>
        });

    }
    render() {

        let {current,pageCount}=this.state;
        return <article>
            <AgentyTab parent={this.props} />
            <section className="agentyBox mgT20">
                <table id="agentyBoxTabel" className="table2">
                    <colgroup>
                        <col width="40" />
                        <col width="120" />
                        <col />
                        <col width="90" />
                        <col width="90" />
                        <col width="90" />
                        <col width="90" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th className="center">序号</th>
                            <th className="center">审批类型</th>
                            <th className="center">审批内容</th>
                            <th className="center">提交时间</th>
                            <th className="center">审批状态</th>
                            <th className="center">当前节点</th>
                            <th className="center">当前审批人</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.agentyTabel()}
                    </tbody>
                </table>

            </section>
            <Pagination current={current} total={pageCount} onChange={this.Bind_Click_Page} />
            {/* <Page total={this.state.pageTotal} count={this.state.pageCount} callback={this.Bind_Click_Page.bind(this)} /> */}
        </article>
    }
}

export default Apply;