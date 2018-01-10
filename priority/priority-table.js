import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress } from 'antd';
import { debug } from "util";
require("./priority/priority.less");
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

class PriorityTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data:[],
         };//绑定数据
         this.columns=this.getColumns();
         this.index=0;
         
    }
    componentWillReceiveProps(nextProps) {
      
      var dataL = nextProps.dataList
      dataL.forEach((el,ind)=>{
        if(el.REPORTTIME == "0001-01-01"){
          el.REPORTTIME = ""
        }
        if(el.SOLVETIME == "0001-01-01"){
          el.SOLVETIME = ""
        }
        if(el.ISOLVE == "-1"){
          el.ISOLVE = ""
        }
        if(el.POINTLEVEL == "-1"){
          el.POINTLEVEL = ""
        }
      })
      this.setState({
        data:dataL
      })
      
    }
    componentWillMount() {
      //this.getAjax();
    }
    componentDidMount() {
    }
    
      //只展示使用 this.renderContent
    renderContent = (value, row, index) => {
        const obj = {
            children: value,
            props: {},
        };
        return obj;
    };
      
      //进度条
      renderProgress = (value, row, index,ind) =>{
          let SOLVETIME=row.SOLVETIME.concat(" 00:00:00");
          SOLVETIME = new Date(Date.parse(SOLVETIME.replace(/-/g, "/")));
          SOLVETIME = SOLVETIME.getTime();//最迟解决时间时间戳
          SOLVETIME=SOLVETIME/10000;

          let REPORTTIME=row.REPORTTIME.concat(" 00:00:00");
          REPORTTIME = new Date(Date.parse(REPORTTIME.replace(/-/g, "/")));
          REPORTTIME = REPORTTIME.getTime();//风险报备时间戳
          REPORTTIME = REPORTTIME/10000;

          let currentTime = new Date();
          currentTime=currentTime.getTime();//此时此刻时间戳
          currentTime=currentTime/10000;

          let intervalTime=SOLVETIME-REPORTTIME;//解决时间
          let interTime=currentTime-REPORTTIME;//解决时间
          
         
          let rate=interTime/intervalTime;
          rate = parseFloat(rate.toFixed(2))*100;
          //console.log(riskTime);
          //console.log(latestSolutionTime);
          //console.log(currentTime);
          let statusColor;
          let status;
          let finishRate;
          if((currentTime-SOLVETIME)>=0){
             statusColor="#f04134";
             finishRate=100;
             status="success";
          }else{
              if(rate>=80){
                statusColor="#F1A118";
                finishRate=rate;
                status="exception";
              }else  if(0<rate<80){
                statusColor="#108ee9";
                finishRate=rate;
                status="normal";
                
              }
          }
          return<div>
              <div style={{color:statusColor}}>{value}</div>
              <Progress percent={finishRate} status={status} showInfo={false} size="small" />
          </div>
      }
  
      getColumns =()=>{
          //表格头部数据
          const columns = [{
              title: '序号',
              colSpan: 1,
              dataIndex: 'key',
              render:(value, row,ind) => this.renderContent(value, row,'key',ind),
            }, {
              title: '区域',
              colSpan: 1,//跨两列
              dataIndex: 'AREANAME',
              render:(value, row,ind) => this.renderContent(value, row,"AREANAME",ind),
            } ,{
              title: '城市',
              colSpan: 1,
              dataIndex: 'COMPANYNAME',
              render:(value, row,ind) => this.renderContent(value, row,"COMPANYNAME",ind),
            },{
              title: '项目',
              colSpan: 1,
              dataIndex: 'PROJECTNAME',
              render:(value, row,ind) => this.renderContent(value, row,"PROJECTNAME",ind),
            },{
              title: '分期',
              colSpan: 1,
              dataIndex: 'STAGENAME',
              render:(value, row,ind) => this.renderContent(value, row,"STAGENAME",ind),
            },{
              title: '风险描述',
              colSpan: 1,
              width:200,
              dataIndex: 'RISKDESC',
              render:(value, row,ind) => this.renderProgress(value, row,"RISKDESC",ind),
            },{
              title: '重要级别',
              colSpan: 1,
              dataIndex: 'POINTLEVEL',
              render:(value, row,ind) => this.renderContent(value, row,"POINTLEVEL",ind),
            },{
                title: '是否解决',
                colSpan: 1,
                dataIndex: 'ISOLVE',
                render:(value, row,ind) => this.renderContent(value, row,"ISOLVE",ind),
              },{
                title: '责任人',
                colSpan: 1,
                dataIndex: 'USERNAME',
                render:(value, row,ind) => this.renderContent(value, row,"USERNAME",ind),
              },{
                title: '风险报备时间',
                colSpan: 1,
                dataIndex: 'REPORTTIME',
                //render: this.renderContent,
                render:(value, row,ind) => this.renderContent(value, row,"REPORTTIME",ind),
              },{
                title: '最迟解决时间',
                colSpan: 1,
                dataIndex: 'SOLVETIME',
                render:(value, row,ind) => this.renderContent(value, row,"SOLVETIME",ind),
              },{
                title: '最近更新时间',
                colSpan: 1,
                dataIndex: 'LASTUPDATETIME',
                render:(value, row,ind) => this.renderContent(value, row,"LASTUPDATETIME",ind),
              }]; 
            return columns
      }
      // getData =()=>{ //表格内容数据
      //       var data = this.props.dataList;
      //       console.log(data)
      //       data.forEech((el,ind)=>{
      //         if(el.REPORTTIME == "0001-01-01"){
      //           el.REPORTTIME = ""
      //         }
      //         if(el.SOLVETIME == "0001-01-01"){
      //           el.SOLVETIME = ""
      //         }
      //       })
      //       return data
      // }

      
      render() {
          // pagination 是否分页，columns头部标题数据，dataSource表内容数据
          return (
              <Table
                  rowClassName={(record, index) => record.APPROVESTATUS == "1" ? "underWay" : record.APPROVESTATUS == "99" ? "success":"edit"}
                  columns={this.columns||[]}
                  dataSource={this.state.data||[]} 
                  bordered={true}
              />
          );
         
      }
}
export default PriorityTable;