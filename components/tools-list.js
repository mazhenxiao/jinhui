/* 总头部 */
import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
class ToolsList extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
        	userInfo:"",
        	myApprovalHistCount:0,/*审批历史*/
    		mySubmitionCount:0,/*我的申请*/
    		myMytaskDraftCount:0,/*我的草稿*/
    		myTodoCount:0/*我的待审*/
        }
    }
    /*菜单跳转
     *pageClass 页面分类，例如项目列表，面积管理，具有单独的index页面
     *routerArr 页面分类下对应的路由
     * */
    EVENT_CLICK(pageClass,routerArr) {
        
    	let th=this;
    	let pageUrl="";
    	if(!pageClass&&!routerArr){
    		alert("缺少页面分类和路由地址，去传递去，坑爹玩意");
    	}
        if(pageClass=="Home"){/*项目列表*/
        	pageUrl="/Index/#/";
        }else if(pageClass=="AreaInfo"){/*面积管理*/
            pageUrl="/AreaInfo/#/"; 
            //manage
        }
        $(window).trigger("treeLoad");
        /*switch(str){
            case "index":iss.hashHistory.push("index");break;
            case "agenty":iss.hashHistory.push("agenty");break;
            case "apply":iss.hashHistory.push("apply");break;
            case "draft":iss.hashHistory.push("draft");break;
            case "approalHistory":iss.hashHistory.push("approalHistory");break;
            case "priceControl":iss.hashHistory.push({
                pathname:"priceControl"
            });break;
        }*/
        window.location.href=pageUrl+routerArr;
    }
    /*退出*/
    EVENT_ILogout(){
        iss.ajax({
            type: "post",
            url:"/Account/ILogout",
            success(res){
                if(res.message=="成功"){
                    sessionStorage.removeItem("userInfo");//清除登陆数据
                    sessionStorage.removeItem("treeId");
                    window.location.href="/Account/Login";
                }
            },
            error(e){   
                
            }
        });
    }
    /*基础设置*/ 
    EVENT_CLICKSETUP(){
        iss.ajax({
            type: "post",
            url:"/Common/ILoginEncryp",
            success(res){
                if(res.message=="成功"){
                    var tempwindow=window.open('_blank');//打开一个窗口，然后用
                    tempwindow.location=res.rows;//使这个窗口跳转到百度，这样就会呈现弹出百度窗口的效果了。
                }
            },
            error(e){   
                
            }
        });
    }
    /*获取我的里面的数量*/
   evGetMyCount(){
   		var th=this;
   		
   		iss.ajax({
            type: "get",
            url:"/MyTodo/ImyTodoCount",
            success(res){
            	
                if(res.message=="成功"){
                	let results=res.rows[0];
                	th.setState({
                		myApprovalHistCount:results.MYAPPROVALHISTCOUNT,
                		mySubmitionCount:results.MYSUBMITIONCOUNT,
                		myMytaskDraftCount:results.MYTASKDRAFTCOUNT,
                		myTodoCount:results.MYTODOCOUNT
                	});
                }
            }
        });
   }
    componentDidMount() {
    	let th=this;
    	th.evGetMyCount();
    	var userInforInter=setInterval(function(){
    		if(iss.userInfo){
    			clearInterval(userInforInter);
    			th.setState({
    				userInfo:iss.userInfo
    			});
    		}
    	},500);
    	/*jquery ready*/
    	$(function(){
    		/*审批通过,驳回,已阅以后,重新查询我的数量*/
    		$(document).off("reloadMyCount").on("reloadMyCount",function(e){
        		th.evGetMyCount();
        	}).off("evPageClass").on("evPageClass",function(e,pageClass){
        		/*通过接受的pageClass,对菜单增加active状态*/
        		if(pageClass=="Home"){
        			$("#projectList").addClass("active");
        		}else if(pageClass=="AreaInfo"){
        			$("#areaInfo").addClass("active");
        		}
        	});
    	});
    	
    }
    
    render() {
    	var th=this;
    	/*className="redFont"*/
        return <article>
            <div className="userLogin">
				<b className={th.state.myTodoCount>0?"userName doing":"userName"}>{th.state.userInfo.empName}</b>
				<ul className="userTancen boxSizing">
					<li><a className="userPending" href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"Home","agenty")}>我的待审</a><i>({th.state.myTodoCount})</i></li>
					<li><a className="userApply" href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"Home","apply")}>我的申请</a><i>({th.state.mySubmitionCount})</i></li>
					<li><a className="userDraft" href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"Home","draft")}>我的草稿</a><i>({th.state.myMytaskDraftCount})</i></li>
					<li><a className="userHistory" href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"Home","approalHistory")}>审批历史</a><i>({th.state.myApprovalHistCount})</i></li>
					<li><a className="userExit" href="javascript:void(0);" onClick={this.EVENT_ILogout.bind(this)}>退出</a></li>
				</ul>
			</div>
            <h1 className="xtName">金辉集团运营管理平台</h1>
            <ul>
                <li>
                    <a id="projectList" href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"Home","index")}>项目列表</a>
                </li>
                <li>
                    <a href="javascript:void(0);" onClick={this.EVENT_CLICKSETUP.bind(this)}>基础设置</a>
                </li>
                <li>
                    <a id="areaInfo" href="javascript:void(0);" >信息填报</a>
                    <ol className="subMenu">
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","index")}>面积管理</a></li>
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","priceControl")}>价格管理</a></li>
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","supply")}>供货</a></li>
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","payment")}>签约与回款</a></li>
                        <li><a href="javascript:void(0);" >重点事项</a></li>
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","primarykey")}>关键指标</a></li>
                        <li><a href="javascript:void(0);" onClick={this.EVENT_CLICK.bind(this,"AreaInfo","groupbuild")}>项目团队维护</a></li>
                    </ol>
                </li>
                <li className="hide"> 
                    <a href="#">报表管理</a>
                </li>
                
            </ul>
          
        </article>
    }
}

ReactDOM.render(<ToolsList />, document.querySelector("#JH-Header"));