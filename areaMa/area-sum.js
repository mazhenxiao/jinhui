/*面积管理=规划方案指标*/
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import "../js/iss.js";

class AreaSum extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
        	dataKey:""
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        
    }
    render() {
        return (<div className="areaSession areaSession16">
        		规划方案指标
        	</div>);
    }
}
export default AreaSum;