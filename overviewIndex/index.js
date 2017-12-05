/* 项目概览 */
import "babel-polyfill";  //兼容ie
import React from 'react';
import ReactDOM from 'react-dom';
import OverviewTab from "./overview-tab.js";//标签
import OverviewIndex from "./overview-index.js";//首页
class index extends React.Component {
    componentDidMount() {
       // this.bind_echars();
       // this.bind_table();
    }
 
    render() {
        return <section>
            <OverviewTab parent={this.props} />
            <OverviewIndex />
            
        </section>
    }




}
export default index;