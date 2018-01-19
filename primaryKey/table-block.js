import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Select,Spin } from 'antd';
import knife from '../utils/knife'
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0

class TableBlock extends Component {

      state = {
        loading:false,
        editstatus:false,
        data:[],
        childDate:"",
        selectData:""
       };//绑定数据
    componentWillReceiveProps(nextProps) {
      //console.log(nextProps)
        
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
    

    //带有编辑功能的使用 this.renderContentInput
    renderContentInput = (value, row, index) => {
        const editstatus=this.props.editstatus;//获取编辑状态
        if(editstatus){
          return <Input style={{ margin: '-5px 0',textAlign:'right' }} value={value} onChange={this.EventhandleChangeInput.bind(this,row.key,index)} />
        }else{
            const obj = {
              children: value,
              props: {},
          };
          return obj;
        }
    };

    // 修改当前input框的值
    EventhandleChangeInput =(key, keyName,event)=>{
      
      let val = event.target.value;
      var _reg = new RegExp("^\\d+(\.\\d{0,2})?$");
      let _reg2 = /(?:\d{1}|\.{1})$/;
      
      if(_reg.test(val) && _reg2.test(val)){
        this.props.callback(val,key,keyName);
      }
      
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
            obj.props.rowSpan = 8;
          };
          if (ind === 5||ind === 6||ind === 7||ind === 8||ind === 9||ind === 10) {
            obj.props.rowSpan = 0;
          };
          if (ind === 11||ind === 12) {
            obj.props.rowSpan = 0;
          };
          return obj;
    }
    //选择阶段
    quarterSelectChange = (val) =>{
         this.props.callback(val);
    }

    //渲染Option
    selectOption =()=>{
      const children = [];
      const Option = Select.Option;

      if(this.props.tableDate!="" && this.props.tableDate !=null){
        this.props.tableDate.baseinfo.StepList.forEach((el,i)=>{
          children.push(<Option key={i} value={el.key}>{el.value}</Option>);
        })
      }
      return children
    }
    //渲染select
    quarterSelect = () =>{
        
        return(
            <div>目标：
                <Select defaultValue="请选择" style={{ width: 110 }} onChange={this.quarterSelectChange}>
                   {this.selectOption()}
                </Select>
          </div>
        )
    }


    tableRender =()=>{
        //表头数据
        var columns=[{
              title: '序号',
              colSpan: 1,
              dataIndex: 'key',
              width:60,
              render:(value, row,ind) => this.renderContent(value, row,'key',ind),
            }];
        const editstatus=this.props.editstatus;//获取编辑状态
        if(this.props.tableDate != "" && this.props.tableDate !=null){
          
          this.props.tableDate.baselist.headerData.forEach((el,ind)=>{
            var obj={}
            if(el.field=="PLANVAL"){
              if(!editstatus){
                return
              }
              obj = {
                title:this.quarterSelect(),
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                render:(value, row,ind) => this.renderContentInput(value, row,"PLANVAL",ind),
              }
            }else if(el.field=="FQUOTANAME"){
              obj = {
                title: el.name,
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                render:(value, row,ind) => this.renderContentTable(value, row,"Fquotaname",ind),
              }
            }else{
              obj = {
                title: el.name,
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan)
              }
            }
            
            columns.push(obj)
          })
        }
        // const columns = [{
        //     title: '序号',
        //     colSpan: 1,
        //     dataIndex: 'key',
        //     width:60,
        //     render:(value, row,ind) => this.renderContent(value, row,'key',ind),
        //   },{
        //     title: '指标名称',
        //     colSpan: 2,//合并单元格
        //     dataIndex: 'Fquotaname',
        //     width:150,
        //     render:(value, row,ind) => this.renderContentTable(value, row,"Fquotaname",ind),//合并列
        //   },{
        //     title: '指标名称',
        //     colSpan: 0,
        //     dataIndex: 'quotaname',
        //     width:200,
        //     render:(value, row,ind) => this.renderContent(value, row,"quotaname",ind),
        //   },{
        //     title: this.quarterSelect(),
        //     colSpan: 1,
        //     dataIndex: 'PLANVAL',
        //     render:(value, row,ind) => this.renderContentInput(value, row,"PLANVAL",ind),
        // }];
        
        //表格详细数据
        var dataSource=[],headName=[]
        if(this.props.tableDate != "" && this.props.tableDate !=null){
          dataSource=this.props.tableDate.baselist.dataSource
        }
        dataSource.forEach((el,ind)=>{
          el.key = ind+1
          if(headName.indexOf(el.FQUOTANAME)==-1){
            headName.push(el.FQUOTANAME)
          }
        })
      return (
        <Spin spinning={this.state.loading}>
          <Table 
              columns={columns} 
              pagination={false} 
              dataSource={dataSource} 
              bordered={true} 
          />
      </Spin>
      )
    }
    
    render() {
      
        // pagination 是否分页，columns头部标题数据，dataSource表内容数据
        return (
          <div>
            {this.tableRender()}
          </div>
        );
       
    }
}
export default TableBlock;