import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select, Table,Modal } from 'antd';
import { Supply } from '../services';
import { shallowCompare, knife } from '../utils';
import TableBar from "./table";//表格
//import EsayuiTable from "./EsayuiTable";//esayui表格
import "../css/button.less";
import "./css/supply.less";



const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Index extends Component {
    state = {
        loading: false,
        dataSource: [],//表格数据
        columns: [],//表头数据
        versionData: [{ text: "2017", id: "0" }, { text: "2018", id: "1" }, { text: "2019", id: "2" }],//版本数据
        versionDefault: "",//默认版本value值
        currentYear: new Date().getFullYear(),//设置显示年
        ModalVisiblity:false,  //显示模态窗口
        ModalContent:"内容为空",
        title:"编辑供货"
    }

    componentWillReceiveProps(nextProps, nextState) { }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }
    componentWillMount() {
      
               
    }
    componentDidMount() {
        console.log(TableBar.num);
    }
    /**
     * 编辑供货
     */
    EVENT_CLICK_Edit = arg => {
       this.Modal_OpenGropu();
  
    }
    /**
     * 编辑供货-1按业态调整
     */
    Modal_OpenGropu=()=>{
        var th = this;
             require.ensure([], function (require) {
              let SupplyModal = require('./supplyModal').default;
                th.setState({
                    ModalVisiblity:true,
                    content:<SupplyModal />   
                }); 
              }, "supplyModal");     
    }
    /**
     * 表格库存编辑版本设置
     */
    GET_TitleEditBtn = arg => {

        let Options = arg => {
            return this.state.versionData.map(arg => {
                return <Option key={arg.id} value={arg.id}>{arg.text}</Option>
            })

        }
        return <div className="RT">

            <button className="jh_btn jh_btn22 jh_btn_repertory">库存</button>

            <label>版本：<Select defaultValue={this.state.versionData.length ? this.state.versionData[0]["id"] : ""} className="ipt120">{Options()}</Select></label>
        </div>
    }
    /**
     * 模态窗口ok事件
     */
    EVENT_CLICK_OK=()=>{
        this.setState({
            ModalVisiblity:false
        })
    }
    EVENT_CLICK_CANCEL=()=>{
        this.setState({
            ModalVisiblity:false
        })
    }
    bindModal=()=>{

      return  <Modal
        width={800}
        title={this.state.title}
        visible={this.state.ModalVisiblity}
        okText="确认"
        cancelText="取消"
        onOk={this.EVENT_CLICK_OK}
        onCancel={this.EVENT_CLICK_CANCEL}
      >
       {this.state.content}
      </Modal>


    }

    render() {
      
        return <Spin size="large" spinning={this.state.loading}>
            <article>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="供货" key="1" tabBarExtraContent={this.GET_Compent}>
                        <article>
                            <header className="HeaderBar"><Row>
                                <Col span={12}>
                                    <span>计划版（面积：平方米，货值：万元）</span>
                                </Col>
                                <Col span={12}>
                                    {this.GET_TitleEditBtn()}
                                </Col>
                            </Row></header>
                            {/* <EsayuiTable id="EsayuiTable" dataSource={this.state.dataSource} columns={this.state.columns} /> */}

                            <TableBar dataSource={this.state.dataSource} columns={this.state.columns} year={this.state.currentYear} />
                        </article>
                        <article>
                            <header className="HeaderBar"><Row>
                                <Col span={12}>
                                    <span>动态调整版（面积：平方米，货值：万元）</span>
                                </Col>
                                <Col span={12}>
                                    <div className="RT">
                                    <button className="jh_btn jh_btn22 jh_btn_edit" onClick={this.EVENT_CLICK_Edit}>编辑供货</button>
                                    </div>
                                </Col>
                            </Row></header>
                            <TableBar dataSource={this.state.dataSource} columns={this.state.columns} year={this.state.currentYear} />
                        </article>
                    </TabPane>
                </Tabs>
            </article>
            {
                this.bindModal("绑定页面所需要的模态窗口") 
            }
        </Spin>
    }
}
export default Index