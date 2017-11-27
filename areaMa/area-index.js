/*面积管理   首页 */
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie

var echarts = require("echarts");

class AreaIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state={
        	date:new Date(),
        }
        this.numbers=[1,2,3];
    }
    
    componentDidMount() {
		this.timeID=setInterval(
			()=>this.tick()
		,1000);
    }
    componentWillUnmount() {
        clearInterval(this.timeID);
    }
    tick(){
    	this.setState({
    		date:new Date()
    	});
    }
    render() {
        return (<div>
        		欢迎来到面积管理,请去选择项目或分期,{this.state.date.toLocaleTimeString()}.
        		<ul>
        		{this.numbers.map((number,index)=>
        			<li key={"aaa"+index}>{number*3}</li>
        		)}
        		</ul>
        		
        </div>);
    }
}
export default AreaIndex;