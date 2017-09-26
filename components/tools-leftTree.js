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
            changeState: iss.getQuert("intallment") ? "intallment" : iss.getQuert("newProject")? "newProject":""
        }
    }
    componentDidMount() {
        var self = this;
        Tree.bindTree("#tree", arg => {
            self.setState({
                changeState: arg.type == 2 ? "newProject" :  arg.type == 3? "intallment":"",
                data:arg
            })
        });
    }
    addTodo() {
        var th = this;
        iss.hashHistory.replace({
            pathname: `/${th.state.changeState}`,
            state:this.state.data
        })
    }
    render() {
        let th = this;
        let setBar = arg => {
            console.log(th.state.changeState)
            if (th.state.changeState == "") {
                return <div>
                    <input type="search" className="stateSearch" value="" />
                    <img src="img/state-icon-btn.png" />
                </div>
            } else {
                return <div>
                    <a href="javascript:;"  className="iconBoxJin projectDelete"></a>
                    <a href="javascript:;" className="iconBoxJin projectBian"></a>
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
                <p className="JH-TreeTitle">
                    项目名称
                    </p>
                <div className="treeBox">
                    <ul id="tree"></ul>
                </div>

            </div>
            <p className="icon-bar" target=".JH-Nav"><span className="glyphicon glyphicon-menu-right"></span></p>
        </div>
    }
}
ReactDOM.render(<ToolsTree />, document.querySelector("#JH-Nav"))