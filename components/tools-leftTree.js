import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";//公共类
import Tree from '../components/tools-tree.js'; //树控件
class ToolsTree extends React.Component {
    constructor(arg) {
        super(arg);

        this.state = {
            data:"",
            changeCurrent:"",
            changeState: iss.getQuert("intallment") ? "intallment" : iss.getQuert("newProject")? "newProject":""
        }
      
    }
    componentDidMount() {
        var self = this;
        this.notIndexChange(); //判断是否刷新了也没
        Tree.bindTree("#tree", arg => {
            iss.id=arg;
            let id,current;
            switch(arg["level_id"]){
                case "1": //集团汇总
                case "2":iss.hashHistory.replace({pathname:"index",state:arg});break;//总部
                case "3":iss.hashHistory.replace({pathname:"index",state:arg});id="newProject";break;//项目
                case "4":iss.hashHistory.replace({pathname:"index",state:arg,query:{status:"show"}});id="intallment";current="newProject";break;//分公司
                case "5":"";iss.hashHistory.replace({pathname:"index",state:arg,query:{status:"show"}});current="intallment";id="intallmentDetail";break;//分区;
            }
            //console.log(arg["status"])
           // console.log(current)
            self.setState({
                changeState:id,
                changeCurrent:current,
                data:arg,
                status:arg["status"]
            })
        });
    }
    notIndexChange(){ //非首页跳转
           // console.log()
        if(iss.id==""){
            iss.hashHistory.replace("/index");
        }
    }
    addTodo() {
        var th = this;
         if(th.state.changeState=="newProject"||th.state.changeState=="intallment"){
            iss.hashHistory.replace({
                pathname: `/${th.state.changeState}`,
                state:this.state.data,
                query:{
                    status:"add",
                }
                
            }) 
         }
    }
    editTodo(arg){
        var th = this;
        console.log(th.state.status)
         if(th.state.changeCurrent=="newProject"||th.state.changeCurrent=="intallment"){
             if(th.state.status==0||th.state.status==2){
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeCurrent}`,
                    query:{
                        status:"edit",
                    }
                })     
             }else if(th.state.status==99){
                iss.hashHistory.replace({
                    pathname: `/${th.state.changeCurrent}`,
                    query:{
                        status:"upgrade",
                    }
                })     
             }
           
        } 

    }
    render() {
        let th = this; 
        let setBar = arg => {
            console.log(th.state.changeState)
            if (th.state.changeState == ""||th.state.changeState == undefined) {
                return <div>
                    <input type="search" className="stateSearch" value="" />
                    <img src="../img/state-icon-btn.png" />
                </div>
            } else if(th.state.changeState == "newProject"){
                return <div>
                    <a href="javascript:;"  className="iconBoxJin projectDelete"></a>
                    <a href="javascript:;" onClick={this.addTodo.bind(this)} className="iconBoxJin projectAdd"></a>
                </div>
            
            }else if(th.state.changeState == "intallmentDetail"){
                return <div>
                    <a href="javascript:;"  className="iconBoxJin projectDelete"></a>
                    <a href="javascript:;" onClick={this.editTodo.bind(this)} className="iconBoxJin projectBian"></a>
                </div>

            }else {
                return <div>
                    <a href="javascript:;"  className="iconBoxJin projectDelete"></a>
                    <a href="javascript:;" onClick={this.editTodo.bind(this)} className="iconBoxJin projectBian"></a>
                    <a href="javascript:;" onClick={this.addTodo.bind(this)} className="iconBoxJin projectAdd"></a>
                </div>

            }
        }
        return <div>
            <header>
                <div className="stateSelect">
                    <label>状态：</label>
                    <select>
                        <option value="">全部</option>
                        <option value="">已审批</option>
                        <option value="">待审批</option>
                    </select>
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
ReactDOM.render(<ToolsTree />, document.querySelector("#JH-Nav"))