import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";//公共类
import Tree from '../components/tools-tree.js'; //树控件
class ToolsTree extends React.Component {
    constructor(arg) {
        super(arg);
        
    }
    componentDidMount(){
        Tree.bindTree("#tree");
    }
    render() {
        return <div>
            <header>
                <p className="headSate">
                    <span>状态：</span>
                    <select>
                        <option>全部</option>
                    </select>
                </p>
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
ReactDOM.render(<ToolsTree />,document.querySelector("#JH-Nav"))