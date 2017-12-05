import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";//公共类
import Tree from '../components/tools-tree.js'; //树控件
export default class ToolsTree extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            data: "",
            changeCurrent: "",
            search: "",
            changeState: "",/*用来控制左侧树右上方的按钮,例如项目列表，点选项目时，会出现新建分期，编辑项目，删除项目的按钮*/
            pageClass: "Index"/*页面分类，如项目列表，面积管理等需要重新定位入口的分类,默认是项目*/
        }
        this.setTime = "";
        this.currentPath = "";
        //iss.hashHistory.listen()
    }
    componentWillReceiveProps(nextProps) {
        let path = nextProps.path;
        this.currentPath = path;
        //this.currentPath();
        //console.log(this.currentPath);
        this.getCurrentPath();
        Tree.getAjax();

    }
    componentWillMount() {
        this.getCurrentPath();
    }
    getCurrentPath(){
        
        var th = this;
        let pathClass = location.hash.split("/")[1].split("?")[0]; //this.state.pageClass;//location.hash.split("/")[1];

        if (pathClass.toLocaleLowerCase() == "index") {/*项目列表*/
            th.setState({
                pageClass: "Index",
                changeState: iss.getQuert("intallment") ? "intallment" : iss.getQuert("newProject") ? "newProject" : ""
            });
        } else if (pathClass == "AreaInfo") {/*面积管理*/
            th.setState({
                pageClass: "AreaInfo",
                changeState: ""
            });
        }
    }
    componentDidMount() {

        var th = this;
        var pathClass = location.hash.split("/")[1].split("?")[0]//th.state.pageClass;

        th.notIndexChange(); //判断是否刷新了也没
        /*告诉头部，当前处于哪个页面分类，方便给menu添加active状态*/
        $(function () {
            $(document).triggerHandler("evPageClass", [pathClass]);
        });
        Tree.bindTree("#tree", arg => {

            iss.id = arg;
            pathClass = location.hash.split("/")[1].split("?")[0];
            sessionStorage.setItem("treeId", JSON.stringify(arg));

            let id, current, paths =location.hash.split("#")[1].split("?")[0]; //this.currentPath;//paths = location.hash.split("/")[1].split("?")[0];
            /**
             * 这个逻辑为，在tools-list菜单里this.EVENT_CLICK.bind(this,"AreaInfo","priceControl")
             * 判断当前是“AreaInfo”等，信息填报内容都在“AreaInfo”
             */
            
         
            	
            if(pathClass=="AreaInfo"){ //  面积管理
           	    
            	switch(arg["level_id"]){
	                case "1":
	                case "2":
	                case "3": //首页
	                	iss.hashHistory.push({
	                		pathname:paths,
	                		state:arg
	                	});
	                	break;
	                case "4":/*项目*/
	                	iss.hashHistory.push({
	                		pathname:paths,
	                		state:arg,
	                		search:"?isProOrStage="+1+"&dataKey="+iss.id.id
	                	});
	                	break;
	                case "5":/*分期*/
	                	iss.hashHistory.push({
	                		pathname:paths,
	                		state:arg,
	                		search:"?isProOrStage="+2+"&dataKey="+iss.id.id
	                	});
	                	break;
	            }
            }else{
                switch(arg["level_id"]){
	                case "1":iss.hashHistory.replace({pathname:"index",state:arg,query:{currentPosi:"group",dataKey:iss.id.id}});break; //集团汇总
	                case "2":iss.hashHistory.replace({pathname:"index",state:arg,query:{currentPosi:"area",dataKey:iss.id.id}});break;//区域
	                case "3":iss.hashHistory.replace({pathname:"index",state:arg,query:{currentPosi:"branchOffice",dataKey:iss.id.id}});id="newProject";break;//分公司
	                case "4":iss.hashHistory.replace({pathname:"index",state:arg,query:{currentPosi:"project",dataKey:iss.id.id}});id="intallment";current="newProject";break;//项目
	                case "5":"";iss.hashHistory.replace({pathname:"index",state:arg,query:{status:"show",currentPosi:"intallment",dataKey:iss.id.id}});current="intallment";id="intallmentDetail";break;//分期;
	            }
            }


            th.setState({
                changeState: id,
                changeCurrent: current,
                data: arg,
                status: arg["status"]
            });
        });
    }
    notIndexChange() { //非首页跳转
        // return;
        if (iss.getQuert("dataKey")) {
            return
            // iss.id=
        } else {
            iss.id = sessionStorage.getItem("treeId") ? JSON.parse(sessionStorage.getItem("treeId")) : "";
        }

        if (iss.id == "" && !iss.getQuert("login")) {
            //iss.id=localStorage.getItem("treeId");
            // iss.hashHistory.replace("/index");
        }
    }
    addTodo() {
        var th = this;
        if (th.state.changeState == "newProject") {
            iss.hashHistory.replace({
                pathname: `/${th.state.changeState}`,
                state: this.state.data,
                query: {
                    status: "add",
                }

            })
        };
        if (th.state.changeState == "intallment") {
            if (iss.id.initdata == 1) {
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeState}`,
                    state: this.state.data,
                    query: {
                        status: "add",
                    }
                })
            } else if (iss.id.initdata == 0) {
                if (th.state.status == 99) {
                    iss.hashHistory.replace({
                        pathname: `/${th.state.changeState}`,
                        state: this.state.data,
                        query: {
                            status: "add",
                        }

                    })
                } else if (th.state.status == 0) {
                    //iss.popover({ content: "该项目未审批无法新增分期" });
                    iss.hashHistory.replace({
                        pathname: `/${th.state.changeState}`,
                        state: this.state.data,
                        query: {
                            status: "add",
                        }

                    })
                } else {
                    //iss.popover({ content: "该项目审批中无法新增分期"});
                    iss.hashHistory.replace({
                        pathname: `/${th.state.changeState}`,
                        state: this.state.data,
                        query: {
                            status: "add",
                        }

                    })
                }
            }
        }
    }
    editTodo(arg) {
        var th = this;
        if (th.state.changeCurrent == "intallment") {
            if (th.state.status == 0 || th.state.status == -1) {
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeCurrent}`,
                    query: {
                        status: "edit",
                    }
                })
            } else if (th.state.status == 99) {
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeCurrent}`,
                    query: {
                        status: "upgrade",
                    }
                })
            } else {
                iss.popover({ content: "该分期审批中无法编辑" });
            }

        }
        if (th.state.changeCurrent == "newProject") {
            if (iss.id.initdata == 1) {
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeCurrent}`,
                    query: {
                        status: "upgrade",
                    }
                })
            } else if (iss.id.initdata == 0) {
                if (th.state.status == 99) {
                    iss.hashHistory.replace({
                        pathname: `/${th.state.changeCurrent}`,
                        query: {
                            status: "upgrade",
                        }
                    })
                } else if (th.state.status == 0 || th.state.status == -1) {
                    iss.hashHistory.replace({
                        pathname: `/${th.state.changeCurrent}`,
                        query: {
                            status: "edit",
                        }
                    })
                } else {
                    iss.popover({ content: "该项目审批中无法编辑" });
                }

            }

        }

    }
    deleteTodo_1(arg) {
        var th = this;
        if (iss.id.initdata == 0) {
            if (th.state.status == 0 || th.state.status == -1) {
                iss.Alert({
                    title: "提示",
                    width: 300,
                    height: 90,
                    content: `<div class="Alert">确认要删除分期吗？</div>`,
                    ok() {
                        iss.ajax({  //获取数据
                            type: "post",
                            url: "/Stage/IDelete",
                            data: {
                                id: iss.id.id,
                            },
                            success(res) {

                                if (res.rows == true) {
                                    iss.popover({ content: "删除成功！", type: 2 });
                                    iss.hashHistory.replace("/index");
                                    $(window).trigger("treeLoad");
                                } else {
                                    iss.popover({ content: "删除失败！" });
                                }
                            },
                            error(e) {

                            }
                        })
                    }
                });
            } else if (th.state.status == 99) {
                iss.popover({ content: "分期已审批通过无法删除" });
            } else {
                iss.popover({ content: "分期审批中无法删除" });
            }
        } else if (iss.id.initdata == 1) {
            iss.popover({ content: "历史分期只允许编辑，不可删除" });
        }
    }//删除分期

    deleteTodo_2(arg) {
        var th = this;
        if (iss.id.initdata == 0) {

            if (iss.id.isoldapprove > 0) {
                iss.popover({ content: "该项目已审批过，不能删除！" });
            } else {
                if (th.state.status == 0 || th.state.status == -1) {
                    iss.Alert({
                        title: "提示",
                        width: 300,
                        height: 90,
                        content: `<div class="Alert">确认要删除项目吗？</div>`,
                        ok() {
                            iss.ajax({  //获取数据
                                type: "post",
                                url: "/Project/IDelete",
                                data: {
                                    projectId: iss.id.id
                                },
                                success(res) {

                                    if (res.errorcode == 200) {
                                        iss.popover({ content: "删除成功！", type: 2 });
                                        iss.hashHistory.replace("/index");
                                        $(window).trigger("treeLoad");
                                    } else {
                                        iss.popover({ content: "删除失败！" });
                                    }
                                }
                            })
                        }
                    });
                } else if (th.state.status == 99) {
                    iss.popover({ content: "项目已审批通过无法删除" });
                } else {
                    iss.popover({ content: "项目审批中无法删除" });
                }
            }

        } else if (iss.id.initdata == 1) {
            iss.popover({ content: "历史项目只允许编辑，不可删除" });
        }

    }//删除项目
    EVENT_CHANGE_SEARCH(ev) {
        let th = this, me = ev.target.value;
        th.setSate({
            search: me
        });
        clearTimeout(th.setTime);
        th.setTime = setTimeout(arg => {

        }, 3000)
    }
    render() {
        let th = this;
        let setBar = arg => {
            if (th.state.changeState == "" || th.state.changeState == undefined) {
                return "";
            } else if (th.state.changeState == "newProject") {
                return <div className="">
                    <a href="javascript:;" onClick={this.addTodo.bind(this)} className="iconBoxJin projectAdd" title="创建项目"></a>
                </div>

            } else if (th.state.changeState == "intallmentDetail") {
                return <div className="deleteBox">
                    <a href="javascript:;" onClick={this.deleteTodo_1.bind(this)} className="iconBoxJin projectDelete" title="删除分期"></a>
                    <a href="javascript:;" onClick={this.editTodo.bind(this)} className="iconBoxJin projectBian" title="编辑分期"></a>
                </div>

            } else {
                return <div className="">
                    <a href="javascript:;" onClick={this.deleteTodo_2.bind(this)} className="iconBoxJin projectDelete" title="删除项目"></a>
                    <a href="javascript:;" onClick={this.editTodo.bind(this)} className="iconBoxJin projectBian" title="编辑项目"></a>
                    <a href="javascript:;" onClick={this.addTodo.bind(this)} className="iconBoxJin projectAdd" title="创建分期"></a>
                </div>

            }
        }
        return <div>
            <header>
                <div className="stateSelect">
                    {setBar()}
                </div>
            </header>
            <div className="JH-LeftNav">
                {/*    <p className="JH-TreeTitle">
                    项目名称
                    </p> */}
                <div className="treeBox">
                    <ul id="tree"></ul>
                </div>

            </div>
            <p className="icon-bar" target=".JH-Nav"><span className="glyphicon glyphicon-menu-right"></span></p>
        </div>
    }
}
//ReactDOM.render(<ToolsTree />, document.querySelector("#JH-Nav"))