/* 我的申请 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
import Page from "./tools-page.js";//基于bootstrap分页组件
class ApproalHistory extends React.Component{
    constructor(arg) {
        super(arg);
        this.url = "/MyTodo/IGetmyGetTaskDone?page=1&size=10";
        this.state = {
            dataList: []
        }
    }
    componentWillMount() {
        this.getAjax();
    }
 
    EVENT_CLICK_PROJECTNAME(da) {
        let search ="";
        switch (da.entiid) {
            case iss.getEVal("newProjectStatus"): 
            	search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
            	break; //项目
            case iss.getEVal("intallmentStatus"): 
            	search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`; 
                break; //分期
            case iss.getEVal("teamMaintainStatus"):
                search=`?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&readOnly=readOnly&isProOrStage=2`;
                break;
            case iss.getEVal("priceControl"):
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;//价格
            case iss.getEVal("area"):
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;//面积
            case iss.getEVal("priority"):
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover`;
                break;//面积
            case iss.getEVal("primarykeyTarget"): //信息填报-关键指标目标
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&primarykeyTarget=primarykeyTarget&isProOrStage=2`;
                break;
            case iss.getEVal("primarykey"): //信息填报-关键指标
                search = `?e=${da.entiid}&dataKey=${da.runtrecordid}&current=ProcessApprover&primarykey=primarykey&isProOrStage=2`;
                break;
            default:
            	search ="";
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
    getAjax(arg) {
        var th = this,page=1,size=10;
        if(arg){
            page=arg
        }

        iss.ajax({
            url: this.url,
            data:{
                page: page,
                size: size
            },
            success(da) {
                th.setState({
                    pageTotal: da.rows.TotalPages,
                    pageCount: da.rows.TotalItems,
                    dataList: da.rows.Items
                })
            },
            error() {

            }
        })
    }
    Bind_Click_Page(arg) { // 分页回调
        this.getAjax(arg);//分页完成后重新获取
    }
    agentyTabel() {
        var th = this;
        return th.state.dataList.map((el, ind) => {
            let type = "";
            if(el.RunStateText.indexOf("审批中")>=0){ type="type1" }else 
            if(el.RunStateText.indexOf("通过")>=0){ type="type2" }else
            if(el.RunStateText.indexOf("驳回")>=0){ type="type3" }
            return <tr key={ind}>
                <td className="center">{ind+1}</td>
                <td className="left">{el.entiname}</td>
                <td className="left"><a href="javascript:;" onClick={this.EVENT_CLICK_PROJECTNAME.bind(this, el)}>{el.workflowtitle}</a></td>
                <td className="center">{el.submitusername}</td>
                <td className="center">{el.RunDuration.replace("T"," ").replace(/\//ig,"-")}</td>
                <td className="center">{el.ApprovedDateTime.replace("T"," ")}</td>
                <td className="left"><span className="pseudo"><i className={type}></i>{el.RunStateText}</span></td>
            </tr>
        })


    }
    render() {
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
                            <th className="center">提交人</th>
                            <th className="center">提交时间</th>
                            <th className="center">审批时间</th>
                            <th className="center">审批状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.agentyTabel()}
                    </tbody>
                </table>
                
            </section>
            <Page total={this.state.pageTotal} count={this.state.pageCount} callback={this.Bind_Click_Page.bind(this)} />
        </article>
    }
}
export default ApproalHistory;