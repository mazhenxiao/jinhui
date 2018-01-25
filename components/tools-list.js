/* 总头部 */
import React from 'react';
import ReactDOM from 'react-dom';
import iss from "../js/iss.js";
import "babel-polyfill";  //兼容ie
import appConfig from '../app.config';

export default class ToolsList extends React.Component {
    constructor(arg) {
        super(arg);
        this.state = {
            userInfo: "",
            myApprovalHistCount: 0, /*审批历史*/
            mySubmitionCount: 0, /*我的申请*/
            myMytaskDraftCount: 0, /*我的草稿*/
            myTodoCount: 0, /*我的待审*/
            toURL: ""//基础设置需要跳转的地址
        }
        this.Jurisdiction=JSON.parse(localStorage.getItem("Jurisdiction")||"[]");
        
        
        /* [
            {
            "Title": "信息填报",
            "Url": "",
            "ID": "11F446E7-EDDB-4FCF-5DFA-F856796082AA",
            "PID": "-1",
            "Child": [
            {
            "Title": "价格管理",
            "Url": "AreaInfo,priceControl",
            "ID": "91014D8C-48F0-477D-C2B4-F295532BEA95",
            "PID": "11F446E7-EDDB-4FCF-5DFA-F856796082AA",
            "Child": []
            },
            {
            "Title": "面积管理",
            "Url": "AreaInfo,areaManage",
            "ID": "6FD6BA65-AA3B-336D-85FC-C62D4CB8D020",
            "PID": "11F446E7-EDDB-4FCF-5DFA-F856796082AA",
            "Child": []
            }
            ]
            }
            ] */
    }

    componentWillMount() {
        
        this.EVENT_CLICKSETUP();
        if(!this.Jurisdiction.length){ 
            iss.popover({content:"用户没有权限！"})
           // iss.error("用户没有权限！")
         }
        
    }
    componentDidMount(){
        
   
    }
    
    /*菜单跳转
     *pageClass 页面分类，例如项目列表，面积管理，具有单独的index页面
     *routerArr 页面分类下对应的路由
     * */
    EVENT_CLICK(pageClass, routerArr) {
        let th = this;
        let pageUrl = "/Index/#/";
        if (!pageClass && !routerArr) {
            alert("缺少页面分类和路由地址，去传递去，坑爹玩意");
        }
        $(window).trigger("treeLoad");
        $(".JH-Content").removeClass("CLASS_AGENTY");
        
        if (pageClass == "Index") {
            th.props.callback(pageUrl + routerArr);
            // $(".icon-bar").trigger("click.bar")
            //  window.location.href=  //路由修改和后来不同此处为补丁
        } else {
            th.props.callback(pageUrl + pageClass + "/" + routerArr);
            // $(".icon-bar").trigger("click.bar")
            // window.location.href=pageUrl+pageClass+"/"+routerArr;
        }


    }

    /*退出*/
    EVENT_ILogout() {
        iss.ajax({
            type: "post",
            url: "/Account/ILogout",
            success(res) {
                if (res.message == "成功") {
                    sessionStorage.removeItem("userInfo");//清除登陆数据
                    sessionStorage.removeItem("treeId");
                    localStorage.removeItem("token");
                    window.location.href = "/Login";
                }
            },
            error(e) {
                iss.error(e);
            }
        });
    }

    /*基础设置*/
    EVENT_CLICKSETUP() {
        var th = this;
        iss.ajax({
            type: "post",
            url: "/Common/ILoginEncryp",
            success(res) {
                if (res.message == "成功") {
                    // var tempwindow = window.open('_blank');//打开一个窗口，然后用
                    //tempwindow.location = res.rows;//使这个窗口跳转到百度，这样就会呈现弹出百度窗口的效果了。
                    th.setState({
                        toURL: res.rows
                    })
                }
            },
            error(e) {

            }
        });
    }

    /*获取我的里面的数量*/
    evGetMyCount() {
        var th = this;

        iss.ajax({
            type: "get",
            url: "/MyTodo/ImyTodoCount",
            success(res) {

                if (res.message == "成功") {
                    let results = res.rows[0];
                    th.setState({
                        myApprovalHistCount: results.MYAPPROVALHISTCOUNT,
                        mySubmitionCount: results.MYSUBMITIONCOUNT,
                        myMytaskDraftCount: results.MYTASKDRAFTCOUNT,
                        myTodoCount: results.MYTODOCOUNT
                    });
                }
            }
        });
    }

    componentDidMount() {
        let th = this;
        th.evGetMyCount();
        var userInforInter = setInterval(function () {
            if (iss.userInfo) {
                clearInterval(userInforInter);
                th.setState({
                    userInfo: iss.userInfo
                });
            }
        }, 500);
        /*jquery ready*/
        $(function () {
            /*审批通过,驳回,已阅以后,重新查询我的数量*/
            $(document).off("reloadMyCount").on("reloadMyCount", function (e) {
                th.evGetMyCount();
            }).off("evPageClass").on("evPageClass", function (e, pageClass) {
                /*通过接受的pageClass,对菜单增加active状态*/
                if (pageClass == "Home") {
                    $("#projectList").addClass("active");
                } else if (pageClass == "AreaInfo") {
                    $("#areaInfo").addClass("active");
                }
            });
        });

    }

    render() {
        var th = this;
        /*className="redFont"*/
        return <article>
            <div className="userLogin">
                <b className={th.state.myTodoCount > 0 ? "userName doing" : "userName"}>{th.state.userInfo.empName}</b>
                <ul className="userTancen boxSizing">
                    <li><a className="userPending" href="javascript:void(0);"
                           onClick={this.EVENT_CLICK.bind(this, "Index", "agenty")}>我的待审</a><i>({th.state.myTodoCount})</i>
                    </li>
                    <li><a className="userApply" href="javascript:void(0);"
                           onClick={this.EVENT_CLICK.bind(this, "Index", "apply")}>我的申请</a><i>({th.state.mySubmitionCount})</i>
                    </li>
                    <li><a className="userDraft" href="javascript:void(0);"
                           onClick={this.EVENT_CLICK.bind(this, "Index", "draft")}>我的草稿</a><i>({th.state.myMytaskDraftCount})</i>
                    </li>
                    <li><a className="userHistory" href="javascript:void(0);"
                           onClick={this.EVENT_CLICK.bind(this, "Index", "approalHistory")}>审批历史</a><i>({th.state.myApprovalHistCount})</i>
                    </li>
                    <li><a className="userExit" href="javascript:void(0);"
                           onClick={this.EVENT_ILogout.bind(this)}>退出</a></li>
                </ul>
            </div>
            <h1 className="xtName">金辉集团运营管理平台</h1>
            <ul>
                {
                    
                     this.Jurisdiction.map((arg,ind)=>{
                         let {Url,Title,Child}=arg,id = "";
                         Url=Url||"";Child=Child||[];
                         if(Url.includes("Index")){
                             id="projectList";
                         }else if(!Url&&Child&&Child[0]&&Child[0].Url.includes("AreaInfo")){
                             id="areaInfo"; 
                         }
                         let urlArr = Url.includes("/")? Url.split("/"):Url;
                        return  <li key={ind}>
                                    {
                                        (typeof urlArr=="string")? (
                                            <a id={id} href={urlArr? urlArr:"javascript:;"} target="_blank" >{Title}</a>
                                        )
                                        :(
                                            <a id={id} href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this,urlArr[0],urlArr[1])}>{Title}</a>
                                        )
                                    }
                                   
                                      {   
                                           Boolean(Child&&Child.length)&&(
                                              <ol className="subMenu">{
                                                Child.map((arg2,ind2)=>{
                                                    let {Url,Title}=arg2,urlArr = Url.includes("http")? Url:Url.split("/");
                                                    let {token}=iss;
                                                    return  <li className="" key={ind2}>
                                                                                                    
                                                            {
                                                                (typeof urlArr=="string")?
                                                                (<a id={id} href={urlArr? urlArr.includes("?")? `${urlArr}&token=${token}`:`${urlArr}?token=${token}`:"javascript:;"} target="_blank" >{Title}</a>)
                                                                 :(
                                                                    <a id={id} href="javascript:void(0);"
                                                                        onClick={this.EVENT_CLICK.bind(this,urlArr[0],urlArr[1])}>{Title}</a>
                                                                  )
                                                            }
                                                               
                                                            </li>
                                                })
                                              }</ol>
                                        ) 
                                      }  
                                </li>
                    }) 
                }
               {/*  <li>
                    <a id="projectList" href="javascript:void(0);"
                       onClick={this.EVENT_CLICK.bind(this, "Index", "index")}>项目信息</a>
                </li>
                <li>
                    <a id="areaInfo" href="javascript:void(0);">信息填报</a>
                    <ol className="subMenu">
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "areaManage")}>面积管理</a>
                        </li>
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "priceControl")}>价格管理</a>
                        </li>
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "supply")}>供货</a></li>
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "sign")}>签约</a></li>
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "payment")}>回款</a></li>
                        {
                            appConfig["env"] != "prod" ?
                                <li className=""><a href="javascript:void(0);"
                                                    onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "priority")}>重点事项</a>
                                </li> : null
                        }
                        {
                            appConfig["env"] != "prod" ?
                                <li className=""><a href="javascript:void(0);"
                                                    onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "primarykeyTarget")}>关键指标目标</a>
                                </li> : null
                        }
                        {
                            appConfig["env"] != "prod" ?
                                <li className=""><a href="javascript:void(0);"
                                                    onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "primarykey")}>关键指标动态</a>
                                </li> : null
                        }
                        <li><a href="javascript:void(0);"
                               onClick={this.EVENT_CLICK.bind(this, "AreaInfo", "groupbuild")}>项目团队维护</a>

                        </li>
                    </ol>
                </li>
                <li>
                    <a href="javascript:void(0);">报表管理</a>
                    <ol className="subMenu" style={{minWidth: "260px"}}>
                        <li className=""><a href="javascript:void(0);">年度供销存计划汇总(建设中)</a></li>
                        <li className=""><a href="javascript:void(0);">三年销售目标汇总(建设中)</a></li>
                        <li className=""><a href="javascript:void(0);">三年投资计划汇总(建设中)</a></li>
                        <li className=""><a href="javascript:void(0);">集团项目清单(建设中)</a></li>
                        <li className=""><a href="javascript:void(0);">数据巡检(建设中)</a></li>
                    </ol>
                </li>

                <li>
                    <a href="javascript:void(0);">基础设置</a>
                    <ol className="subMenu" style={{minWidth: "225px"}}>
                        <li className=""><a href={this.state.toURL} target="_blank"
                                            className={this.state.toURL ? "" : "hide"}>标准角色授权</a>
                        </li>
                        <li className=""><a href="javascript:void(0);"
                                            onClick={this.EVENT_CLICK.bind(this, "basicSetting", "assessmentVersion")}>考核版本设置(建设中)</a>
                        </li>
                        <li className=""><a href="javascript:void(0);">组织架构维护(建设中)</a></li>
                        <li className=""><a href="javascript:void(0);">字典维护(建设中)</a></li>
                    </ol>
                </li> */}
               

            </ul>

        </article>
    }
}

//ReactDOM.render(<ToolsList />, document.querySelector("#JH-Header"));