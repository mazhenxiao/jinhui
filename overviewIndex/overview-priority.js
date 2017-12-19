import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress } from 'antd';
require("../priority/priority/priority.less");
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

class OverviewPriority extends Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: false,
          data:this.getData(),
         };//绑定数据
         this.columns=this.getColumns();
    }
    componentWillReceiveProps(nextProps) {
    }
    componentWillMount() {
         
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
          
          let latestSolutionTime=row.latestSolutionTime.concat(" 00:00:00");
          latestSolutionTime = new Date(Date.parse(latestSolutionTime.replace(/-/g, "/")));
          latestSolutionTime = latestSolutionTime.getTime();//最迟解决时间时间戳
          latestSolutionTime=latestSolutionTime/10000;

          let riskTime=row.riskTime.concat(" 00:00:00");
          riskTime = new Date(Date.parse(riskTime.replace(/-/g, "/")));
          riskTime = riskTime.getTime();//风险报备时间戳
          riskTime = riskTime/10000;

          let currentTime = new Date();
          currentTime=currentTime.getTime();//此时此刻时间戳
          currentTime=currentTime/10000;

          let intervalTime=latestSolutionTime-riskTime;//解决时间
          let interTime=currentTime-riskTime;//解决时间
          
         
          let rate=interTime/intervalTime;
          rate = parseFloat(rate.toFixed(2))*100;
          rate = rate.toFixed(2);
          //console.log(riskTime);
          //console.log(latestSolutionTime);
          //console.log(currentTime);
          let statusColor;
          let status;
          let finishRate;
          if((currentTime-latestSolutionTime)>=0){
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
              <Progress percent={finishRate} status={status} />
          </div>
      }
  
      getColumns =()=>{
          //表格头部数据
          const columns = [{
              title: '序号',
              colSpan: 1,
              dataIndex: 'order',
              render:(value, row,ind) => this.renderContent(value, row,'order',ind),
            }, {
              title: '区域',
              colSpan: 1,//跨两列
              dataIndex: 'areaName',
              render:(value, row,ind) => this.renderContent(value, row,"areaName",ind),
            } ,{
              title: '公司',
              colSpan: 1,
              dataIndex: 'companyName',
              render:(value, row,ind) => this.renderContent(value, row,"companyName",ind),
            },{
              title: '项目',
              colSpan: 1,
              dataIndex: 'projectName',
              render:(value, row,ind) => this.renderContent(value, row,"projectName",ind),
            },{
              title: '风险报备时间',
              colSpan: 1,
              dataIndex: 'riskTime',
              //render: this.renderContent,
              render:(value, row,ind) => this.renderContent(value, row,"riskTime",ind),
            },{
              title: '风险描述',
              colSpan: 1,
              dataIndex: 'riskSaid',
              render:(value, row,ind) => this.renderProgress(value, row,"riskSaid",ind),
            },{
              title: '最迟解决时间',
              colSpan: 1,
              dataIndex: 'latestSolutionTime',
              render:(value, row,ind) => this.renderContent(value, row,"latestSolutionTime",ind),
            },{
              title: '重要级别',
              colSpan: 1,
              dataIndex: 'importantGrade',
              render:(value, row,ind) => this.renderContent(value, row,"importantGrade",ind),
            },{
                title: '是否解决',
                colSpan: 1,
                dataIndex: 'solveWhether',
                render:(value, row,ind) => this.renderContent(value, row,"solveWhether",ind),
              },{
                title: '责任人',
                colSpan: 1,
                dataIndex: 'headName',
                render:(value, row,ind) => this.renderContent(value, row,"headName",ind),
              }]; 
            return columns
      }
      getData =()=>{ //表格内容数据
            const data = [{
              key: '1',
              order: '1',
              areaName:'环渤海',//区域名称
              companyName:'天津',//公司名称
              projectName:'天津优步花园',//项目名称
              riskTime:'2017-11-23',//风险报备时间
              riskSaid:'十九大召开存在停工风险',//风险描述
              finishRate:'10%',//完成率
              latestSolutionTime:'2017-12-1',//最迟解决时间
              importantGrade:'高',//重要级别
              solveWhether:'否',//是否解决
              headName:'金城武',//责任人
            },{
                key: '2',
                order: '2',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'20%',//完成率
                latestSolutionTime:'2017-12-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '3',
                order: '3',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'30%',//完成率
                latestSolutionTime:'2018-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '4',
                order: '4',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在风十九大召开存在风十九大召开存在风',//风险描述
                finishRate:'40%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '5',
                order: '5',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'50%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '6',
                order: '6',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'60%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '7',
                order: '7',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'70%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '8',
                order: '8',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'70%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '9',
                order: '9',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'70%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '10',
                order: '10',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'70%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '11',
                order: '11',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                finishRate:'80%',//完成率
                latestSolutionTime:'2017-11-23',//最迟解决时间
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '12',
                order: '12',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                latestSolutionTime:'2018-11-28',//最迟解决时间
                finishRate:'100%',//完成率
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              },{
                key: '13',
                order: '13',
                areaName:'环渤海',//区域名称
                companyName:'天津',//公司名称
                projectName:'天津优步花园',//项目名称
                riskTime:'2017-11-23',//风险报备时间
                riskSaid:'十九大召开存在停工风险',//风险描述
                latestSolutionTime:'2017-12-29',//最迟解决时间
                finishRate:'70%',//完成率
                importantGrade:'高',//重要级别
                solveWhether:'否',//是否解决
                headName:'金城武',//责任人
              }
            ];
            return data
      }
  
      
      render() {
          // pagination 是否分页，columns头部标题数据，dataSource表内容数据
          return (
              <div className="PriorityTable" style={{clear:"both"}}>
                <Table 
                    columns={this.columns||[]}
                    dataSource={this.state.data||[]} 
                    bordered={true} 
                />
              </div>
              
          );
         
      }
}
export default OverviewPriority;