import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import { Table, Icon, Divider, Select, Calendar,Row, Col,Input,Button,Radio,DatePicker,monthFormat } from 'antd';
import "./css/assessmentVersion.less";
const Option = Select.Option;
const { Column, ColumnGroup } = Table;
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const RadioGroup = Radio.Group;
const dateFormat = 'YYYY/MM'
import {Version} from '../services';
import "../css/button.less";
import "../css/antd.min.css";
class assessmentVersionIndex extends Component {
    
        state = {
            dataList:[],
            arealist:[],
            citylist:[]
        };
        
    
    componentDidMount() {
        this.bindLeftBart();
        this.getFetData()
    }
    componentWillUnmount(){
        
       
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
    }

    getFetData = () =>{
        return Version.GetCustomTagList()
                .then(dataList=>{
                    dataList.datalist.forEach((el,ind)=>{
                        // if(el.FiscalYearAdjustment!=null){
                        //     el.FiscalYearAdjustment = el.FiscalYearAdjustment.slice(0,6)
                        // }
                        // if(el.FiscalYearPlan!=null){
                        //     el.FiscalYearPlan = el.FiscalYearPlan.slice(0,6)
                        // }
                        // if(el.PolicyDecisionAssessment!=null){
                        //     el.PolicyDecisionAssessment = el.PolicyDecisionAssessment.slice(0,6)
                        // }
                        el.key = ind+1
                    });
                    this.setState({
                        dataList:dataList.datalist,
                        arealist:dataList.arealist,
                        citylist:dataList.citylist
                    })
                })
    }

    bindLeftBart(){
        $(".JH-Content").addClass("CLASS_AGENTY");
       setTimeout(a=>{
        $(window).trigger("EVENT_CLOSELEFTBAR");
       },1000)
    }

    BIND_Save =()=>{
        const {dataList} = this.state;
        Version.SaveCustomTag({
            data:JSON.stringify(dataList)
        })
        .then(dataList=>{
        })
    }
    renderHeader = () => {

            return (
                <div>
                    <div className="boxGroupTit">
                   
                        <Row>    
                            <Col span={22} >
                                <p>
                                    <span>考核版本设置</span>
                                </p>
                            </Col>
                            <Col span={2}>
                                <p>
                                    <button type="button" onClick={this.BIND_Save} className="jh_btn jh_btn22 jh_btn_add">保存</button>
                                </p>
                            </Col>
                        </Row>
             
                    </div>
                </div> 
                
            );
    }
    renderForm = () =>{
        const {arealist,citylist} = this.state;
        var areaArr=[],cityArr=[];
        arealist.forEach((el,ind)=>{
            areaArr.push(<Option value={el.id}>{el.name}</Option>)
        })
        citylist.forEach((el,ind)=>{
            cityArr.push(<Option key={el.id} value={el.id}>{el.name}</Option>)
        })
        return (
            <Row className="version-form">
                <Col span={4}>
                    区域：<Select onChange={this.POINTLEVEL_FN} defaultValue="请选择" style={{ width: 120 }}>
                        <Option value="-1">请选择</Option>
                        {areaArr}
                    </Select>
                </Col>
                <Col span={4}>
                    城市公司：<Select onChange={this.ISOLVE_FN} defaultValue="请选择" style={{ width: 120 }}>
                        <Option value="-1">请选择</Option>
                        {cityArr}
                    </Select> 
                </Col>
                <Col span={4}>
                    项目：<Input onChange={this.SOLVETIME_FN} style={{ width: 120 }} />
                </Col>
                <Col span={2} style={{textAlign: "left", paddingLeft: "10px"}}>
                    <Button onClick={this.handleLocalSearch}>查询</Button>
                </Col>
            </Row>
        )
    }
    onChange = (key,keyName,e) => {
        var val = e.target.value;
        var obj = this.state.dataList;
        obj.forEach((el,ind)=>{
            if(el.key == key){
                el[keyName] = val
            }
        })
        this.setState({
            dataList:obj
        })
    }
    //单选框
    renderRadio = (value,key,ind) =>{
        return (
            <RadioGroup onChange={this.onChange.bind(this,value.key,key)} value={value[key]} >
              <Radio value={0}>正常</Radio>
              <Radio value={1}>尾盘</Radio>
              <Radio value={2}>老项目</Radio>
            </RadioGroup>
          );
    }
    monthChange = (key,keyName,e,value) =>{
        var obj = this.state.dataList;
        obj.forEach((el,ind)=>{
            if(el.key == key){
                el[keyName] = value
            }
        })
        this.setState({
            dataList:obj
        })
    }
    //选择日期
    
    renderDate = (value,key,ind) =>{
        var defaultValue = value[key]==null?null : value[key]
        return (
            <MonthPicker defaultValue={defaultValue==null?null:moment(defaultValue, dateFormat)} onChange={this.monthChange.bind(this,value.key,key)} format={monthFormat} />
        )
    }
    renderContent = () =>{
        const columns = [{
            title: '区域',
            colSpan: 1,
            dataIndex: 'AreaName'
          }, {
            title: '城市公司',
            colSpan: 1,//跨两列
            dataIndex: 'CityName'
          } ,{
            title: '项目',
            colSpan: 1,
            dataIndex: 'ProjectName',
          },{
            title: '分期',
            colSpan: 1,
            dataIndex: 'StageName'
          },{
            title: '决策书考核版',
            colSpan: 1,
            dataIndex: 'PolicyDecisionAssessment',
            render:(title,row,ind) => this.renderDate(row,'PolicyDecisionAssessment',ind)
          },{
            title: '财年计划版',
            colSpan: 1,
            dataIndex: 'FiscalYearPlan',
            render:(title,row,ind) => this.renderDate(row,'FiscalYearPlan',ind)
          },{
            title: '财年计划年中调整版',
            colSpan: 1,
            dataIndex: 'FiscalYearAdjustment',
            render:(title,row,ind) => this.renderDate(row,'FiscalYearAdjustment',ind)
          },{
            title: '项目销售状态设置',
            colSpan: 1,
            dataIndex: 'SalesStatus',
            render:(title,row,ind) => this.renderRadio(row,'SalesStatus',ind)
          }];
        return (
            <Table
                columns={columns}
                dataSource={this.state.dataList} 
                bordered={true}
            />
        );
    }
    render() {
        return (
            <div className="version">
                    <Row className="version-title">
                        <Col span={24}>
                            {this.renderHeader()}
                        </Col>
                        <Col span={24}>
                            {this.renderForm()}
                        </Col>
                        <Col className="version-table" span={24}>
                            {this.renderContent()}
                        </Col>
                    </Row>
            </div>
        );
    }
}

export default assessmentVersionIndex;