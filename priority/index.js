// 重点事项
import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select,Input,Progress} from 'antd';
import { AreaService } from '../services';
import {WrapperSelect,WrapperInput} from '../common';
import PriorityTable from './priority-table.js';
import PriorityForm from './priority-form.js';
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");


class Index extends Component {
    state = {
        addAatterStatus:false,
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        //debugger;
        const {dataKey, mode} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey
            || mode != nextMode) {
            this.setState({
                    dataKey: nextDataKey,
                    mode: nextMode,
                    //activeTapKey: "plan-quota",
                }
            );
        }
    }
    componentDidMount(){

    };

    BIND_AddAatter = () =>{
        this.setState({
            addAatterStatus:true,
        })
    }
    BIND_Save = () =>{
        this.setState({
            addAatterStatus:false,
        })
    }
    renderButton = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        if(addAatterStatus){
            return(
                <div>
                    <button type="button" onClick={this.BIND_Save} className="jh_btn jh_btn22 jh_btn_add">暂存</button>
                    <button type="button" className="jh_btn jh_btn22 jh_btn_add">发起审批</button>
                </div>
            )
        }else{
            return(
                <div>
                    <button type="button" onClick={this.BIND_AddAatter} className="jh_btn jh_btn22 jh_btn_add">新增事项</button>
                    <button type="button" className="jh_btn jh_btn22 jh_btn_add">导出EXCEL</button>
                </div>
            )
        }
    }
    renderHeader = () => {
        return (
            <div>
            <div className="boxGroupTit">
                    <p><span>重点事项</span></p>
                    <div>
                        <div className="areaTopbtn jhBtn-wrap">
                            {this.renderButton()}
                        </div>
                    </div>
            </div>
        </div> 
            
        );
    }
    renderContent = () =>{
        const addAatterStatus=this.state.addAatterStatus;
        if(addAatterStatus){
           return(
               <div>
                   <Row>
                        <Col span={24}>
                            <article>
                                <PriorityForm />
                            </article>
                        </Col>
                    </Row>
               </div>
           )
        }else{
            return(
                <div>
                    <Row>
                        <Col span={4}>
                            <WrapperInput labelText="项目：" labelSpan={10} inputSpan={14} />
                        </Col>
                        <Col span={4}>
                            <WrapperInput labelText="责任人：" labelSpan={10} inputSpan={14} />
                        </Col>
                        <Col span={4}>
                            <WrapperSelect labelText="重要级别：" 
                                           labelSpan={12}
                                           inputSpan={12} /> 
                        </Col>
                        <Col span={4}>
                            {/* onChange={this.handleSelectChange("land")}*/}
                            <WrapperSelect labelText="是否解决" 
                                           labelSpan={12}
                                           inputSpan={12} /> 
                        </Col>
                        <Col span={4}>
                            <WrapperInput labelText="最迟解决时间：" labelSpan={14} inputSpan={10} />
                        </Col>
                        <Col span={3} style={{textAlign: "left", paddingLeft: "10px"}}>
                            <Button onClick={this.handleLocalSearch}>查询</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <article>
                                <PriorityTable />
                            </article>
                        </Col>
                    </Row>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="processBar">
                   <Row>
                        <Col span={24}>
                            <article> 
                                {this.renderHeader()}
                            </article>
                        </Col>
                    </Row>
                    {this.renderContent()}
            </div>
        );
    }

}
export default Index;