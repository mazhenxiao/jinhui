import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress,Select,Calendar,DatePicker } from 'antd';

class PriorityForm extends Component {

        state = {
            entityJson:this.props.entityJson,
            chooseToText:""
         };//绑定数据
         PROJECTNAME= this.props.data.projectName||"";
         AREANAME=this.props.data.areaName||"";
         COMPANYNAME=this.props.data.companyName||"";
         
    componentWillReceiveProps(nextProps) {
    }
    componentWillMount() {
         
    }
    componentDidMount() {
    }

    //输入框传值
    TriggerCallback = (para,e) => {
        const { value } = e.target;
        this.props.callback(value,para)
    }
    //select 传值
    selectCallback = (para,value) => {
        this.props.callback(value,para)
    }
    //时间控件传值
    TimeCallback = (para,e,value) => {
        this.props.callback(value,para)
    }
    //选人控件传值
    ChooseCallback = (para,e) =>{
        let peopleJson={},text=[],userId=[];
        var th=this;
        iss.chooseTo({
            title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
            pepole:peopleJson,  //已选人员名单
            callback(da){
                for(let key in da){
                    text.push(da[key].text)
                    userId.push(da[key].id)
                }
                th.props.callback(userId[0],para)
               th.setState({
                 chooseToText:text[0]
               })
            }
        })
    }

      
      
      
    render(){
        return (
                <section className="staging-left boxSizing projectinFormation">
                <from id="FromProjectInfo">
                    <table className="formTable" width="100%">
                        <colgroup>
                            <col width="150" /><col width="" />
                            <col width="150" /><col width="" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.PROJECTNAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">区域</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.AREANAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">公司</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.COMPANYNAME} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险描述</label>
                                </th>
                                <td colSpan="5">
                                    <Input onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td colSpan="5">
                                    <Input onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td colSpan="5">
                                    <Input onChange={this.TriggerCallback.bind(this,"PROGRESS")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td colSpan="5">
                                    <Input onChange={this.TriggerCallback.bind(this,"SUPPORT")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">重要级别</label>
                                </th>
                                <td>
                                    <Select onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 100 }}>
                                        <Option value="-1">请选择</Option>
                                        <Option value="0">低</Option>
                                        <Option value="1">中</Option>
                                        <Option value="2">高</Option>
                                    </Select>
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">是否解决</label>
                                </th>
                                <td>
                                    <Select onChange={this.selectCallback.bind(this,"ISOLVE")} defaultValue="请选择" style={{ width: 100 }}>
                                        <Option value="-1">请选择</Option>
                                        <Option value="1">是</Option>
                                        <Option value="0">否</Option>
                                    </Select> 
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                                </th>
                                <td>
                                    <DatePicker onChange={this.TimeCallback.bind(this,"REPORTTIME")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任人</label>
                                </th>
                                <td>
                                    <Input value={this.state.chooseToText || ""} onClick={this.ChooseCallback.bind(this,"OWNER")} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任岗位</label>
                                </th>
                                <td>
                                    <Input onChange={this.TriggerCallback.bind(this,"POST")} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                                </th>
                                <td>
                                    <DatePicker onChange={this.TimeCallback.bind(this,"SOLVETIME")} />
                                </td>
                            </tr>
                            {/* <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">备注</label>
                                </th>
                                <td colSpan="5">
                                    <Input />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">附件</label>
                                </th>
                                <td colSpan="5">
                                    <Input />
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </from>
            </section>
        );
    }
}
export default PriorityForm;
