/**
 * 报表管理projectList
 */
import "babel-polyfill";  //兼容ie
import React,{ Component} from 'react';
import iss from "../js/iss.js";
import {Button,Spin,Table,Row,Col} from 'antd';
import {PlanSummary} from "../services"
import {WrapperTreeTable, WrapperSelect} from '../common';
import appConfig from '../app.config';
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
    this.getFetchTable()
  }

  getFetchTable=()=>{
    this.setState({
        loading:true
    });
    PlanSummary.YearSupplyMarkSummary()
    .then(data=>{
        data.rows.dataSource.forEach((el,ind)=>{
            el.key=ind+1
        });
        this.setState({
            loading:false,
            header:data.rows.headerData,
            source:data.rows.dataSource
        })
    }).catch(error=>{
        console.error("发生错误",error);
    })
  }
  exportExcel = () =>{
    
    PlanSummary.YearSupplyMark()
    .then(data=>{
        window.location.href = appConfig.domain+"/Exprot/DownLoadExcelFile/?fileName=" + data.rows.File
    }).catch(error=>{
        console.error("发生错误",error);
    })
  
  }
  render(){
      let {header,source,loading}=this.state;
       let defaultHeight = 1000;
      return <article className="reportForm">
      <Spin size="large" spinning={this.state.loading} tip="加载中请稍后。。。">
                <Row>
                    <Col span={22}>
                    </Col>
                    <Col span={2}>
                            <button className="jh_btn jh_btn22 jh_btn_edit right" onClick={this.exportExcel}>
                                导出
                            </button>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <WrapperTreeTable
                            headerData={header || []}
                            dataSource={source || []}
                            defaultHeight={defaultHeight}
                            planSummary={"planSummary"}
                        />
                    </Col>
                </Row>
                </Spin>
                
      </article>
  }
}
export default ProjectList;