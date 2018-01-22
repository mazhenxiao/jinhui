import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Select,Spin } from 'antd';
import knife from '../utils/knife'
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
//import "./css/primaryKey.less"
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
      if((_reg.test(val) && _reg2.test(val)) || val==""){
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
    selectOption =(obj)=>{
      const children = [];
      const Option = Select.Option;

      obj.forEach((el,i)=>{
          children.push(<Option key={i} value={el.val}>{el.label}</Option>);
        })
      return children
    }
    //渲染select
    quarterSelect = (obj) =>{
        return(
            <div>
                <Select disabled={this.GetQueryString("primarykey")?true:false} defaultValue={this.props.step} style={{ width: 110 }} onChange={this.quarterSelectChange}>
                   {this.selectOption(obj)}
                </Select>
          </div>
        )
    }

    GetQueryString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.href.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }
    tableRender =()=>{
        //表头数据
        var columns=[{
              title: '序号',
              colSpan: 1,
              dataIndex: 'key',
              render:(value, row,ind) => this.renderContent(value, row,'key',ind),
              width:60,
              //fixed:"left"
            }];
        const editstatus=this.props.editstatus;//获取编辑状态
        if(this.props.tableDate != "" && this.props.tableDate !=null){
          
          this.props.tableDate.baselist.headerData.forEach((el,ind)=>{
            var obj={}
            if(el.field=="QUARTVAL"){
              if(!editstatus && !this.GetQueryString("primarykey")){
                return
              }
              obj = {
                title:this.quarterSelect(el.data),
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                render:(value, row,ind) => this.renderContentInput(value, row,"QUARTVAL",ind),
                width:180,
                //fixed:"left"
              }
            }else if(el.field=="FQUOTANAME"){
              obj = {
                title: el.name,
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                render:(value, row,ind) => this.renderContentTable(value, row,"Fquotaname",ind),
                width:100,
                //fixed:"left"
              }
            }else if(el.field=="PLANVAL"){
              obj = {
                title: el.name,
                dataIndex: el.field,
                width:115,
                //fixed:"left"
              }
            }else if(el.field=="QUOTANAME"){
              obj = {
                title: el.name,
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                width:190,
                //fixed:"left"
              }
            }else{
              obj = {
                title: el.name,
                dataIndex: el.field,
                colSpan:Number(el.colSpan == null ? 1:el.colSpan),
                width:100
              }
            }
            
            columns.push(obj)
          })
        }
        var Xwidth = 0;
        columns.forEach((el,ind)=>{
          Xwidth+=el.width == undefined?100:el.width;
        })
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
              scroll={{ x: Xwidth }}
          />
      </Spin>
      )
    }
    
    render() {
      
        // pagination 是否分页，columns头部标题数据，dataSource表内容数据
        return (
          <div className="tableRender">
            {this.tableRender()}
          </div>
        );
       
    }
}
export default TableBlock;