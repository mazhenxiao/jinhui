/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import Staging from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
        iss.hashHistory.listenBefore((local,next)=>{
            console.log(local);
        })
        console.log(this.props.location)
    }
    componentDidMount(){
        console.log(this.props.location)
    }
    render() {
        return <article>
            <Staging />
            <Indicators />
        </article>
    }

}
export default Intallment;