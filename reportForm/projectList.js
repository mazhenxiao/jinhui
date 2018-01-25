/**
 * 报表管理projectList
 */
import "babel-polyfill";  //兼容ie
import React,{ Component} from 'react';
import iss from "../js/iss.js";
import {Spin,Table} from 'antd';
import {ProjectListServer} from "../services"
//import "./css/reportForm.less";
import "../css/tools-processBar.less";
import "../css/button.less";
import "../css/antd.min.css";
class ProjectList extends Component{
  state={
      loading:true
  }
  dataBase={
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
  /**
   * 设置头部
   */
  setHeader=()=>{
    this.dataBase.header = [{
        title: '区域',
        dataIndex: 'AREANAME',
        width:120,fixed: 'left',
        key:1
        },{
        title: '城市',
        dataIndex: 'CITYNAME',
        width:120,fixed: 'left',
        key:2
        },
        {
        title: '项目名称',
        dataIndex: 'PROJECTNAME',width:120,fixed: 'left',
        key:3
        },
        {
        title: '分期名称',
        dataIndex: 'STAGENAME',width:120,fixed: 'left',
        key:4
        },
        {
        title: '分期编码',
        dataIndex: 'STAGECODE',width:120,
        key:5
        },
        {
        title: '项目开发状态',
        dataIndex: 'STAGESTATUS',width:120,
        key:6
        },
        {
        title: '项目销售状态',
        dataIndex: 'SALESTATUS',width:120,
        key:7
        },
        {
        title: '操盘类型',
        dataIndex: 'TRADERMODE',width:120,
        key:8
        },
        {
        title: '权益比例',
        dataIndex: 'EQUITYRATIO',width:120,
        key:9
        },
        {
        title: '项目公司',
        dataIndex: 'PROJECTCOMPANYNAME',width:120,
        key:11
        },
        {
        title: '建筑面积',
        dataIndex: 'TOTALCAPACITYAREA',width:120,
        key:12
        },
        {
        title: '土地获取时间',
        dataIndex: 'LANDGETDATE',width:120,
        key:13
        },
        {
        title: '计划开工时间',
        dataIndex: 'TARGETSTARTDATE',width:120,
        key:14
        },
        {
        title: '实际开工时间',
        dataIndex: 'ACTSTARTDATE',width:120,
        key:15
        },
        {
        title: '计划首开时间',
        dataIndex: 'TARGETDATE',width:120,
        key:16
        },
        {
        title: '实际首开时间',
        dataIndex: 'ACTOPENDATE',width:120,
        key:17
        },
        {
        title: '审批通过时间',
        dataIndex: 'APPROVETIME',width:120,
        key:18
        }]
  }
  getFetchTable=()=>{
    this.setState({
        loading:true
    });
    this.setHeader();
    ProjectListServer.GetGroupProjectInventory()
    .then(arg=>{
        this.dataBase.source=arg;
        this.setState({
            loading:false
        })
    })
  }
  
  render(){
      let {loading}=this.state;
      let {header,source}=this.dataBase;
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
                        scroll={{ x: num,y:400}}
                        pagination={false}
            /> 
         
      
      </article>
  }
}
export default ProjectList;