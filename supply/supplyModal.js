/**
 * 获取数据
 */
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select, Table,Checkbox,DatePicker } from 'antd';
import { Supply } from '../services';
import { shallowCompare, knife } from '../utils';
let Option = Select.Option;
export default class SupplyModal extends Component{
    state={
        loading:false,
        setMon:"",  //调整月份默认值
        select:[{label:"2017年11月",value:"2017/11"}],  //下拉菜单
        checkboxAssessment:true,//设置考核版
    }
    componentWillMount(){
        this.GET_FETCH_MON();
    }
    //第一次获下拉菜单内容
    GET_FETCH_MON=()=>{
        this.setState({
            setMon:this.state.select[0]["value"]||""
        })
    }
    /**
     * 调整月份
     */
    CREATE_SELECT=()=>{
      return this.state.select.map((arg,ind)=>{
            return <Option value={arg.value} key={ind}>{arg.label}</Option>
        })
    }
    //设置选中checkbox
    EVENT_CHANGE_CHECKBOX=arg=>{
        this.setState({
            checkboxAssessment:arg.target.checked
        })
    }
    //设置月份
    EVENT_CHANGE_SELECT=arg=>{
        this.setState({
            setMon:arg
        })
    }
    render(){
        return <article>
            <Spin spinning={this.state.loading}>
                    <Row>
                        <Col span={24}>
                            <label className="mgR10">调整月份:</label>
                            <Select className="ipt120 mgR10" value={this.state.setMon} onChange={this.EVENT_CHANGE_SELECT}>{this.CREATE_SELECT()}</Select>
                            <Checkbox checked={this.state.checkboxAssessment} onChange={this.EVENT_CHANGE_CHECKBOX}>设置考核版</Checkbox>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <section>
                                <Row>
                                    <Col span={10}></Col>
                                    <Col span={4}><DatePicker defaultValue={moment('2015-01-01', 'YYYY-MM-DD')} /></Col>
                                    <Col span={10}></Col>
                                </Row>
                            </section>
                        </Col>
                    </Row>
            </Spin>
        </article>
    }
}