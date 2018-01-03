import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress,Select,Calendar,DatePicker,Row, Col } from 'antd';
const { TextArea } = Input;
class PriorityForm extends Component {

        state = {
            entityJson:this.props.entityJson,
            chooseToText:"",
            readOnlyData:{
                "key": null,
                "ID": "",
                "AREAID": "",
                "AREANAME": "",
                "COMPANYID": "",
                "COMPANYNAME": "",
                "PROJECTID": "",
                "PROJECTNAME": "",
                "STAGEID": null,
                "STAGENAME": null,
                "RISKDESC": "",
                "RISKEFFECT": null,
                "PROGRESS": null,
                "SUPPORT": null,
                "POINTLEVEL": 1,
                "ISOLVE": 1,
                "REPORTTIME": "0001-01-01",
                "OWNER": null,
                "USERNAME": null,
                "POST": null,
                "SOLVETIME": "0001-01-01",
                "CREATETIME": "0001-01-01",
                "CREATEUSER": null,
                "APPROVESTATUS": 0,
                "SELECTEDID": null,
                "SELECTEDLEVEL": 0
            }
         };//绑定数据
         PROJECTNAME= this.props.data.projectName||"";
         AREANAME=this.props.data.areaName||"";
         COMPANYNAME=this.props.data.companyName||"";
         sss="222"
         
    componentWillReceiveProps(nextProps) {
    }
    componentWillMount() {
         
    }
    componentDidMount() {
        if(this.props.readOnly != undefined){
            var th = this;
            iss.ajax({
                url: "/ProjectKayPoint/GetProjectKeyPoint",
                data:{
                    "id": th.props.readOnly
                },
                success(data) {
                        var el = data.rows;
                        if(el.ISOLVE == 1){
                            el.ISOLVE = "是"
                        }else{
                         el.ISOLVE = "否"
                        }
                        if(el.POINTLEVEL == 0){
                         el.POINTLEVEL = "低"
                        }else if(el.POINTLEVEL == 1){
                         el.POINTLEVEL = "中"
                        }else{
                         el.POINTLEVEL = "高"
                        }
        
                        el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                        el.CREATETIME=th.getLocalTime(el.CREATETIME)
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                     th.setState({readOnlyData:el})
                },
                error() {
                    console.log('失败')
                }
            })
        }else if(this.props.editData != ""){
            var th = this;
            iss.ajax({
                url: "/ProjectKayPoint/GetProjectKeyPoint",
                data:{
                    "id": th.props.editData
                },
                success(data) {
                        var el = data.rows;
                        if(el.ISOLVE == 1){
                            el.ISOLVE = "是"
                        }else{
                         el.ISOLVE = "否"
                        }
                        if(el.POINTLEVEL == 0){
                         el.POINTLEVEL = "低"
                        }else if(el.POINTLEVEL == 1){
                         el.POINTLEVEL = "中"
                        }else{
                         el.POINTLEVEL = "高"
                        }
        
                        el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                        el.CREATETIME=th.getLocalTime(el.CREATETIME)
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                        th.setState({readOnlyData:el})
                },
                error() {
                    console.log('失败')
                }
            })
            
        }
    }

    getLocalTime(nS) {
        return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")     
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

    renderTable = () =>{
        if(this.props.readOnly != undefined || this.props.editData != ""){
            return (
                <section className="staging-left boxSizing projectinFormation">
                <from id="FromProjectInfo">
                    <table className="formTable" width="100%">
                        <colgroup>
                            <col width="90" /><col width="" />
                            <col width="90" /><col width="" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.AREAID} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">区域</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.AREANAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">公司</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.COMPANYNAME} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险描述</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3} value={this.state.readOnlyData.RISKDESC} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3} value={this.state.readOnlyData.RISKEFFECT} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3} value={this.state.readOnlyData.PROGRESS} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3} value={this.state.readOnlyData.SUPPORT} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">重要级别</label>
                                </th>
                                <td>
                                    <Input  value={this.state.readOnlyData.POINTLEVEL} style={{ width: 100 }} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">是否解决</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.ISOLVE} style={{ width: 100 }} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.REPORTTIME} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任人</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.USERNAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任岗位</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.POST} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.SOLVETIME} />
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
        }else{
            return (
                <section className="staging-left boxSizing projectinFormation ant-col-">
                <from id="FromProjectInfo">
                    <table className="formTable" width="100%">
                        <colgroup>
                            <col width="90" /><col width="" />
                            <col width="90" /><col width="" />
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
                                    <TextArea rows={3} onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3}  onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3} onChange={this.TriggerCallback.bind(this,"PROGRESS")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td colSpan="5">
                                    <TextArea rows={3}  onChange={this.TriggerCallback.bind(this,"SUPPORT")} />
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
    renderHistory = () =>{
        return (
            <div className="process">
                <Row>
                    <Col span={24}>
                        过程记录5
                    </Col> 
                </Row>
                <Row>
                    <Col span={8}>
                        进展反馈人
                    </Col>
                    <Col span={16}>
                        魏德勇
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        进展反馈人
                    </Col>
                    <Col span={16}>
                        魏德勇
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        进展反馈人
                    </Col>
                    <Col span={16}>
                        魏德勇
                    </Col>
                </Row>
                <Row>
                    <Col span={8}>
                        进展反馈人
                    </Col>
                    <Col span={16}>
                        魏德勇
                    </Col>
                </Row>
            </div>
        )
    }
    render(){
        return(
            <Row>
                <Col span={24}>
                    <article>
                        {this.renderTable()}
                    </article>
                </Col>
            
            </Row>
        )
    }
}
export default PriorityForm;
