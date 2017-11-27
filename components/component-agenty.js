/* 我的待审 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
import Page from "./tools-page.js";//基于bootstrap分页组件
class Agenty extends React.Component {
    constructor(arg) {
        super(arg);
        var th = this;
        this.url = "/MyTodo/IGetMytodo?page=1&size=10";
        this.state = {
            dataList: [],
            pageTotal: 0, //页数
            pageCount: 0 //总数
        }
    }
    componentDidMount() {
        var th = this;
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
    EVENT_CLICK_PROJECTNAME(da){
        let search = "";
        var url="";
        var pageUrl=da.pageurl;
        var pageUrlArr=pageUrl.split("?");
        if(da.RUNSTATE=="Rejected"){ //判断是否驳回
            switch(da.ENTIID){
                case iss.getEVal("intallmentStatus"):url="intallment";break; //分期
                case iss.getEVal("newProjectStatus"):url="newProject";break;//项目
            };
            iss.hashHistory.push({
                pathname:`/${url}`,
                search:`?status=edit&dataKey=${da.RUNTRECORDID}&e=${da.ENTIID}`
            });
            $(".JH-Content").removeClass("CLASS_AGENTY");

        }else{
        	if(pageUrlArr.length>1){
        		search="?"+pageUrlArr[1];
        	}else{
        		switch(da.ENTIID){
	                case iss.getEVal("newProjectStatus"):
	                	search=`?e=${da.ENTIID}&dataKey=${da.RUNTRECORDID}&current=ProcessApprover`;
	                	break;
	                case iss.getEVal("intallmentStatus"):
	                	search=`?e=${da.ENTIID}&dataKey=${da.RUNTRECORDID}&current=ProcessApprover`;
	                	break;
	                default:
	                	search="";
	           }
        	}
            if(search==""){
	        	iss.popover({ content: "此条数据异常，请联系后台工作人员！" });
	        	return false;
	        }
            iss.hashHistory.push({ 
                pathname: "/ProcessApprover",
                search:search
            });
        }
        
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
                });
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
            return <tr key={ind}>
                <td className="center">{ind+1}</td>
                <td className="left">{el.flowtypename}</td>
                <td className="left"><a href="javascript:;" onClick={this.EVENT_CLICK_PROJECTNAME.bind(this,el)}>{el.WORKFLOWTITLE}</a></td>
                <td className="center">{el.SubmitUserName}</td>
                <td className="center">{el.INITIALIZEDDATETIME||""}</td>
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
                        <col width="250"  />
                        <col  />
                        <col width="120"  />
                        <col width="120"  />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>编号</td>
                            <td>审批类型</td>
                			<td>审批内容</td>
                            <td>提交人</td>
                            <td>接收时间</td>
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

export default Agenty;