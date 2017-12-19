import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input } from 'antd';
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

class OverviewPrimaryKey extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        editstatus:false,
        data:this.getData(),
       };//绑定数据
       this.columns=this.getColumns(),
       this.initialData = this.state.data;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            editstatus:nextProps.editstatus,
        })
    }
    componentWillMount() {
       
    }
    componentDidMount() {
      this.setState({
        initialData:JSON.stringify(this.initialData),
      })
    }

    BIND_CHANGE_DATA(data) {
      this.props.TableBlockDATA(data);
    }
    //只展示使用 this.renderContent
    renderContent = (value, row, index) => {
            const obj = {
                children: value,
                props: {},
            };
            return obj;
      };
    

    //带有编辑功能的使用 this.renderContentInput
    renderContentInput = (value, row, index) => {
        const editstatus=this.state.editstatus;//获取编辑状态
        if(editstatus){
          return <Input style={{ margin: '-5px 0',textAlign:'right' }} value={value} onChange={this.EventhandleChangeInput.bind(this,value,row.key,index)} />
        }else{
            const obj = {
              children: value,
              props: {},
          };
          return obj;
        }
    };

    // 修改当前input框的值
    EventhandleChangeInput =(value, key, index,event)=>{
      let target = event.target.value;
       this.state.data.forEach(arg=>{
           if(key==arg.key){
              arg[index]=target;
              return;
           }
       })
       this.setState({ data: this.state.data },() => {
        this.BIND_CHANGE_DATA(this.state)
      });
    }

    renderContentTable=(value, row, index,ind) => {
        //根据数据合并行
        const obj = {
            children: value,
            props: {},
          };
          if (ind === 1) {
            obj.props.rowSpan = 2;//跨两行
          };
          if (ind === 2) {
            obj.props.rowSpan = 0;
          };
          if (ind === 4) {
            obj.props.rowSpan = 6;
          };
          if (ind === 5||ind === 6||ind === 7||ind === 8||ind === 9) {
            obj.props.rowSpan = 0;
          };
          if (ind === 10) {
            obj.props.rowSpan = 3;
          };
          if (ind === 11||ind === 12) {
            obj.props.rowSpan = 0;
          };
          return obj;
    }
   
   
    getColumns =()=>{
        //表格头部数据
        const columns = [{
            title: '序号',
            colSpan: 1,
            dataIndex: 'order',
            render:(value, row,ind) => this.renderContent(value, row,'order',ind),
          }, {
            title: '指标名称',
            colSpan: 2,//跨两列
            dataIndex: 'indexName1',
            render:(value, row,ind) => this.renderContentTable(value, row,"indexName1",ind),//合并列
          } ,{
            title: '指标名称',
            colSpan: 0,
            dataIndex: 'indexName2',
            render:(value, row,ind) => this.renderContent(value, row,"indexName2",ind),
          },{
            title: '计划',
            colSpan: 1,
            dataIndex: 'plan',
            render:(value, row,ind) => this.renderContentInput(value, row,"plan",ind),
          },{
            title: '2017年一季度',
            colSpan: 1,
            dataIndex: 'quarter1',
            //render: this.renderContent,
            render:(value, row,ind) => this.renderContentInput(value, row,"quarter1",ind),
          },{
            title: '2017年二季度',
            colSpan: 1,
            dataIndex: 'quarter2',
            render:(value, row,ind) => this.renderContentInput(value, row,"quarter2",ind),
          },{
            title: '2017年三季度',
            colSpan: 1,
            dataIndex: 'quarter3',
            render:(value, row,ind) => this.renderContentInput(value, row,"quarter3",ind),
          },{
            title: '2017年四季度',
            colSpan: 1,
            dataIndex: 'quarter4',
            render:(value, row,ind) => this.renderContentInput(value, row,"quarter4",ind),
          }]; 
          return columns
    }
    getData =()=>{ //表格内容数据
        /*const data = [];
        for (let i = 0; i < 100; i++) {
          data.push({
            key: i.toString(),
            name: `Edrward ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
            key: '1',
            order: '1',
            indexName1: '面积指标',
            indexName2: '总建面',
            plan: '计划',
            quarter1: '一季度',
            quarter2: '二季度',
            quarter3: '三季度',
            quarter4: '四季度',
          });
        } */
        
          const data = [{
            key: '1',
            order: '1',
            indexName1: '面积指标',
            indexName2: '总建面',
            plan: '7887878',
            quarter1: '198773',
            quarter2: '2232323',
            quarter3: '232323',
            quarter4: '23233',
          }, {
            key: '2',
            order: '2',
            indexName1: '销售指标',
            indexName2: '销售总货值',
            plan: '7878787',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '3',
            order: '3',
            indexName1: '销售指标',
            indexName2: '17年签约指标',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          }, {
            key: '4',
            order: '4',
            indexName1: '成本指标',
            indexName2: '成本支出',
            plan: '7878787',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          }, {
            key: '5',
            order: '5',
            indexName1: '财务类指标',
            indexName2: '销售净利润',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          }, {
            key: '6',
            order: '6',
            indexName1: '财务类指标',
            indexName2: '销售净利润率',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '7',
            order: '7',
            indexName1: '财务类指标',
            indexName2: 'IRR（含融资）',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '8',
            order: '8',
            indexName1: '财务类指标',
            indexName2: 'IRR（不含融资）',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          }, {
            key: '9',
            order: '9',
            indexName1: '财务类指标',
            indexName2: '现金流回正时间（含融资）',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '10',
            order: '10',
            indexName1: '财务类指标',
            indexName2: '现金流回正时间（不含融资）',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '11',
            order: '11',
            indexName1: '计划类指标',
            indexName2: '主项计划达成率',
            plan: '78787878',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '12',
            order: '12',
            indexName1: '计划类指标',
            indexName2: '拿地到首开周期',
            plan: '7878787',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          },{
            key: '13',
            order: '13',
            indexName1: '计划类指标',
            indexName2: '拿地到交付周期',
            plan: '7878787',
            quarter1: '243243',
            quarter2: '55555',
            quarter3: '565666',
            quarter4: '565656',
          }];
          return data
    }

    
    render() {
        // pagination 是否分页，columns头部标题数据，dataSource表内容数据
        return (
            <div style={{clear:"both"}}>
            <Table 
                columns={this.columns||[]} 
                pagination={false} 
                dataSource={this.state.data||[]} 
                bordered={true} 
            />
            </div>
        );
       
    }
}
export default OverviewPrimaryKey;