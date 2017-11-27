/*面积管理=产品构成按业态或楼栋*/
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import "../js/iss.js";

class AreaAlertTain extends React.Component {
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
        return (<div>
        		业态维护
        	</div>);
    }
}
export default AreaAlertTain;