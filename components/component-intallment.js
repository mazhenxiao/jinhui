/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
         iss.hashHistory.listen((local,next)=>{
        })
    }    
    componentDidMount(){
         
    }
    render() {
        return <article>
        <StagingInformation  />
        <Indicators />
        </article>
    }     

}
export default Intallment;