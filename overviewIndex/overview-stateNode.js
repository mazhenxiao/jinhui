import React from 'react';
import ReactDOM from 'react-dom';
class OverviewStateNode extends React.Component{
    constructor(arg){
        super(arg)
        this.state={
            list:[
                {"id":"1","text":"1月","content":"fdsfafsdsa","state":0},
                {"id":"1","text":"2月","content":"fdsfafsdsa","state":1},
                {"id":"1","text":"3月","content":"fdsfafsdsa","state":2},
                {"id":"1","text":"4月","content":"fdsfafsdsa","state":3},
                {"id":"1","text":"5月","content":"fdsfafsdsa","state":4},
                {"id":"1","text":"6月","content":"fdsfafsdsa","state":5},
                {"id":"1","text":"7月","content":"fdsfafsdsa","state":6},
                {"id":"1","text":"8月","content":"fdsfafsdsa","state":7},
                {"id":"1","text":"9月","content":"fdsfafsdsa","state":8},
                {"id":"1","text":"10月","content":"fdsfafsdsa","state":9},
                {"id":"1","text":"11月","content":"fdsfafsdsa","state":10},
                {"id":"1","text":"12月","content":"fdsfafsdsa","state":11}
            ]
        }        
    }
    bindToolTip(){
        $('[data-toggle="tooltip"]').tooltip();
    }
    componentDidMount(){
        this.bindToolTip();
    }
    componentDidUpdate(){
        this.bindToolTip();
    }
    render(){
        
       let list = this.state.list.map((da,ind)=>{
           return <li key={ind} data-toggle="tooltip" className={"col-md-1 col-xs-1 col-lg-1 Tap Tap"+da.state}  data-placement="bottom" title={da.content}>{da.text}</li>
        })
        return  <div className="stateNodeBox mgT20">
            <header className="HeaderBar">
                <h5><span>项目关键节点</span></h5>
            </header>
            <div className="BlockBox">
                <ul className="row">
                  { list }
                </ul>
            </div>
        </div>
    }
}
export default OverviewStateNode;