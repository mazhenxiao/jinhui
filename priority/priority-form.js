import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress,Select,Calendar,DatePicker,Row, Col } from 'antd';
const { TextArea } = Input;
class PriorityForm extends Component {

        state = {
            entityJson:this.props.entityJson,
            chooseToText:"",
            chooseToId:"",
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
                "SELECTEDLEVEL": 0,
                "CONTENTID":null
            }
         };//绑定数据
         PROJECTNAME= this.props.data.projectName||"";
         AREANAME=this.props.data.areaName||"";
         COMPANYNAME=this.props.data.companyName||"";
         STAGENAME=this.props.data.stageName||""
         
    componentWillReceiveProps(nextProps) {
        
    }
    componentWillMount() {
         
    }
    componentDidMount() {
        if(this.props.current != undefined){
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
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                        el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
                     th.setState({
                         readOnlyData:el,
                         chooseToText:el.USERNAME,
                         chooseToId:el.OWNER
                    })
                },
                error() {
                    console.log('失败')
                }
            })
        }else if(this.props.editData != ""){
            this.setState({readOnlyData:this.props.editData})         
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
        
        var UserIds = this.state.chooseToId.trim().split(",")
        var UserNames = this.state.chooseToText.trim().split(",")
        UserIds.forEach((ell,indd)=>{
            if(ell != ""){
                let PrincipalId={
                    "id":ell,
                    "text":UserNames[indd]
                }
                peopleJson[ell]=PrincipalId;
            }
        })
        
        iss.chooseTo({
            title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
            pepole:peopleJson,  //已选人员名单
            multiple:true,
            callback(da){
                var text = [],userId =[];
                for(let key in da){
                    text.push(da[key].text)
                    userId.push(da[key].id)
                }
                th.props.callback(userId.join(","),para)
                th.setState({
                    chooseToText:text.join(","),
                    chooseToId:userId.join(",")
                })
            }
        })
        // iss.chooseTo({
        //     title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
        //     pepole:peopleJson,  //已选人员名单
        //     callback(da){
        //         for(let key in da){
        //             text.push(da[key].text)
        //             userId.push(da[key].id)
        //         }
        //         th.props.callback(userId[0],para)
        //        th.setState({
        //          chooseToText:text[0]
        //        })
        //     }
        // })
    }

    renderTable = () =>{
        if(this.props.lookStatus){
            return (
                <tbody>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">区域</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.AREANAME} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">城市公司</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.COMPANYNAME} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">项目名称</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.PROJECTNAME} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.STAGENAME} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险描述</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.RISKDESC} onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险影响</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.RISKEFFECT} onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.PROGRESS} onChange={this.TriggerCallback.bind(this,"PROGRESS")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing">需要集团支持事项</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.SUPPORT} onChange={this.TriggerCallback.bind(this,"SUPPORT")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">重要级别</label>
                    </th>
                    <td>
                        <Select disabled value={this.state.readOnlyData.POINTLEVEL} onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 300 }}>
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
                        <Select disabled value={this.state.readOnlyData.ISOLVE} onChange={this.selectCallback.bind(this,"ISOLVE")} defaultValue="请选择" style={{ width: 300 }}>
                            <Option value="-1">请选择</Option>
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select> 
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                    </th>
                    <td>
                        <DatePicker 
                            disabled
                            placeholder={this.state.readOnlyData.REPORTTIME}  
                            onChange={this.TimeCallback.bind(this,"REPORTTIME")} 
                        />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                    </th>
                    <td>
                        <DatePicker
                         disabled
                         placeholder={this.state.readOnlyData.SOLVETIME}
                         onChange={this.TimeCallback.bind(this,"SOLVETIME")} />
                    </td>
                </tr>
                <tr> 
                    <th>
                        <label className="formTableLabel boxSizing redFont">责任人</label>
                    </th>
                    <td>
                        <Input disabled value={this.state.chooseToText || this.state.readOnlyData.USERNAME || ""} onClick={this.ChooseCallback.bind(this,"OWNER")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">责任岗位</label>
                    </th>
                    <td>
                        <Input disabled value={this.state.readOnlyData.POST} onChange={this.TriggerCallback.bind(this,"POST")} />
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
            );
        }else if(this.props.current != undefined){
            return (
                        <tbody>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">区域</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.AREANAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">城市公司</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.COMPANYNAME} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目名称</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.PROJECTNAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">分期名称</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.state.readOnlyData.STAGENAME} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险描述</label>
                                </th>
                                <td>
                                    <TextArea rows={3} value={this.state.readOnlyData.RISKDESC} />
                                </td>
                            
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td>
                                    <TextArea rows={3} value={this.state.readOnlyData.RISKEFFECT} />
                                </td>
                            </tr>

                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td>
                                    <TextArea rows={3} value={this.state.readOnlyData.PROGRESS} />
                                </td>
                           
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td>
                                    <TextArea rows={3} value={this.state.readOnlyData.SUPPORT} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">重要级别</label>
                                </th>
                                <td>
                                    <Input  value={this.state.readOnlyData.POINTLEVEL} style={{ width: 300 }} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">是否解决</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.ISOLVE} style={{ width: 300 }} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.REPORTTIME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.SOLVETIME} />
                                </td>
                            </tr>
                            <tr>    
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任人</label>
                                </th>
                                <td>
                                    <Input value={this.state.chooseToText || this.state.readOnlyData.USERNAME || ""} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任岗位</label>
                                </th>
                                <td>
                                    <Input value={this.state.readOnlyData.POST} />
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
                   
            );
        }else if(this.props.editData != ""){
            return (
                <tbody>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">区域</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.AREANAME} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">城市公司</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.COMPANYNAME} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">项目名称</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.PROJECTNAME} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                    </th>
                    <td>
                        <Input readOnly="readOnly" value={this.state.readOnlyData.STAGENAME} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险描述</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.RISKDESC} onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险影响</label>
                    </th>
                    <td>
                        <TextArea disabled rows={3} value={this.state.readOnlyData.RISKEFFECT} onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                    </th>
                    <td>
                        <TextArea rows={3} value={this.state.readOnlyData.PROGRESS} onChange={this.TriggerCallback.bind(this,"PROGRESS")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing">需要集团支持事项</label>
                    </th>
                    <td>
                        <TextArea rows={3} value={this.state.readOnlyData.SUPPORT} onChange={this.TriggerCallback.bind(this,"SUPPORT")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">重要级别</label>
                    </th>
                    <td>
                        <Select value={this.state.readOnlyData.POINTLEVEL} onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 300 }}>
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
                        <Select value={this.state.readOnlyData.ISOLVE} onChange={this.selectCallback.bind(this,"ISOLVE")} defaultValue="请选择" style={{ width: 300 }}>
                            <Option value="-1">请选择</Option>
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select> 
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                    </th>
                    <td>
                        <DatePicker 
                            disabled
                            placeholder={this.state.readOnlyData.REPORTTIME}  
                            onChange={this.TimeCallback.bind(this,"REPORTTIME")} 
                        />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                    </th>
                    <td>
                        <DatePicker
                         disabled
                         placeholder={this.state.readOnlyData.SOLVETIME}
                         onChange={this.TimeCallback.bind(this,"SOLVETIME")} />
                    </td>
                </tr>
                <tr> 
                    <th>
                        <label className="formTableLabel boxSizing redFont">责任人</label>
                    </th>
                    <td>
                        <Input value={this.state.chooseToText || this.state.readOnlyData.USERNAME || ""} onClick={this.ChooseCallback.bind(this,"OWNER")} />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">责任岗位</label>
                    </th>
                    <td>
                        <Input value={this.state.readOnlyData.POST} onChange={this.TriggerCallback.bind(this,"POST")} />
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
            );
        }else{
            return (
                
                        <tbody width="100%">
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">区域</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.AREANAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">城市公司</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.COMPANYNAME} />
                                </td>
                            </tr>
                            <tr>    
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目名称</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.PROJECTNAME} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing">分期名称</label>
                                </th>
                                <td>
                                    <Input readOnly="readOnly" value={this.STAGENAME} />
                                </td>
                                
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险描述</label>
                                </th>
                                <td>
                                    <TextArea rows={3} onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                                </td>
                            
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td>
                                    <TextArea rows={3}  onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td>
                                    <TextArea rows={3} onChange={this.TriggerCallback.bind(this,"PROGRESS")} />
                                </td>
                            
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td>
                                    <TextArea rows={3}  onChange={this.TriggerCallback.bind(this,"SUPPORT")} />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">重要级别</label>
                                </th>
                                <td>
                                    <Select onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 300 }}>
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
                                    <Select onChange={this.selectCallback.bind(this,"ISOLVE")} defaultValue="请选择" style={{ width: 300 }}>
                                        <Option value="-1">请选择</Option>
                                        <Option value="1">是</Option>
                                        <Option value="0">否</Option>
                                    </Select> 
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                                </th>
                                <td>
                                    <DatePicker onChange={this.TimeCallback.bind(this,"REPORTTIME")} />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                                </th>
                                <td>
                                    <DatePicker onChange={this.TimeCallback.bind(this,"SOLVETIME")} />
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
                    
            );
        } 
    }
    historyTr = () =>{
        if(this.props.historyData !=""){
            return this.props.historyData.map((el, ind) => {
                if(ind != 0){
                    return <tr>
                                <td>{el.USERNAME}</td>
                                <td>{el.PROGRESS}</td>
                                <td>{this.getLocalTime(el.LASTUPDATETIME)}</td>
                                <td>附件</td>
                            </tr>
                }
            })
        }
    }
    renderHistory = () =>{
        if(this.props.historyData !=""){
            return (
                <div>
                    <table className="historyTable" width="100%">
                        <thead>
                            <tr>
                                <td>进展反馈人</td>
                                <td>进展</td>
                                <td>反馈时间</td>
                                <td>附件</td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.historyTr()}
                        </tbody>
                    </table>
                </div>
            )
        }
        
    }
    render(){
        return(
            <div>
            <Row>
                <Col span={24}>
                <section className="staging-left boxSizing projectinFormation">
                    <from id="FromProjectInfo">
                        <table className="formTable" width="100%">
                            <article>
                                {this.renderTable()}
                            </article>
                        </table>
                    </from>
                </section>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    {this.renderHistory()}
                </Col>
            </Row>
            </div>
        )
    }
}
export default PriorityForm;
