/**
 * 报表管理projectList
 */
import "babel-polyfill";  //兼容ie
import React,{ Component} from 'react';
import iss from "../js/iss.js";
import {Button,Spin,Table,Row,Col} from 'antd';
import {PlanSummary} from "../services"
import {WrapperTreeTable, WrapperSelect} from '../common';
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
    PlanSummary.YearSupplyMarkSummary({})
    .then(data=>{
        console.log("data",data)
        this.setState({
            loading:false
        })
    }).catch(error=>{
        console.error("发生错误",error);
    })
    // var th=this;
    // iss.ajax({
    //     url: "/Report/YearSupplyMarkSummary",
    //     data:{
    //         //stageversionid: th.state.versionId
    //     },
    //     success(data) {
    //         th.setState({
    //             header:data.headerData,
    //             source:data.dataSource                
    //         })
    //     },
    //     error() {
    //         console.log('失败')
    //     }
    // })
  }
  export = () =>{

  }
  render(){
      let {header,source,loading}=this.state;
       let defaultHeight = 1000;
      return <article className="reportForm">
                <Row>
                    <Col span={24}>
                            <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.handleEditClick}>
                                编辑供货
                            </button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        {/* <WrapperTreeTable
                            headerData={header || []}
                            dataSource={source || []}
                            fixedAble={true}
                            defaultHeight={defaultHeight}
                        /> */}
                    </Col>
                </Row>
                
      </article>
  }
}
export default ProjectList;