/**
 * 获取数据
 */
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select, Table } from 'antd';
import { Supply } from '../services';
import { shallowCompare, knife } from '../utils';
let Option = Select.Option;
export default class SupplyModal extends Component{
    state={
        loading:false,
        setMon:"",  //调整月份默认值
        select:[{label:"2017年11月",value:"2017/11"}],  //下拉菜单
        assessment:true,//设置考核版
    }
    /**
     * 调整月份
     */
    CREATE_SELECT=()=>{
        
    }
    render(){
        return <article>
            <Spin spinning={this.state.loading}>
                    <Row>
                        <Col span={24}>
                            <label className="mgR10">调整月份:</label>
                            <Select className="ipt120 mgR10" value={this.state.setMon}>{this.CREATE_SELECT()}</Select>
                            <Checkbox onChange={onChange}>设置考核版</Checkbox>
                        </Col>
                    </Row>
            </Spin>
        </article>
    }
}