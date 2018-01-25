/**
 * 报表管理projectList
 */
import "babel-polyfill";  //兼容ie
import React,{ Component} from 'react';
import iss from "../js/iss.js";
import {Spin,Table} from 'antd';
import {PlanSummary} from "../services"
//import "./css/reportForm.less";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../css/antd.min.css";
class ProjectList extends Component{
  state={
      loading:true,
      header:[],
      source:[]
  }

  componentWillReceiveProps(){

  }
  componentDidMount(){
    this.pageInit();
  }
  /**
   * 页面入口
   */
  pageInit=()=>{
     this.getFetchTable()
     
  }
 
  getFetchTable=()=>{
    this.setState({
        loading:true
    });
    // PlanSummary.YearSupplyMarkSummary({})
    // .then(arg=>{
    //     console.log("arg",arg)
    //     this.setState({
    //         loading:false
    //     })
    // })
    var th=this;
    iss.ajax({
        url: "/Report/YearSupplyMarkSummary",
        data:{
            //stageversionid: th.state.versionId
        },
        success(data) {
            th.setState({
                header:data.headerData,
                source:data.dataSource                
            })
        },
        error() {
            console.log('失败')
        }
    })
  }
  
  render(){
      let {header,source,loading}=this.state;
      let num=0;
       for(let key in header){
           num+=parseFloat(header[key]["width"]||0)
       }
      return <article className="reportForm">
      
    
            <Table
                        rowKey="key"
                        bordered={true}
                        columns={header || []}
                        dataSource={source || []}
                        scroll={{ x: num}}
            /> 
         
      
      </article>
  }
}
export default ProjectList;