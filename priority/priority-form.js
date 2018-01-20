import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Upload,Table,Input,Progress,Select,Calendar,DatePicker,Row, Col,Button,Icon,message } from 'antd';
const { TextArea } = Input;
class PriorityForm extends Component {

        state = {
           
            entityJson:this.props.entityJson,
            chooseToText:"",
            chooseToId:"",
            chooseTopostId:"",
            chooseToPost:"",
            defaultData:[],
            currentUpload:{},//当前上传文件
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
                "POINTLEVEL": -1,
                "ISOLVE": -1,
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
         STAGENAME=this.props.data.stageName||"";
         uploadData = [];
         arr=[];
         
         upload={
            defaultFileList:[],
         }
         
    componentWillReceiveProps(nextProps) {
        
    }
    componentWillMount() {
         
    }
    componentDidMount() {
        
        if(this.props.current != undefined){
            var dataID = ""; 
            var th = this;
            iss.ajax({
                url: "/ProjectKayPoint/GetProjectKeyPoint",
                data:{
                    "id":th.props.readOnly
                },
                success(data) {
                        var el = data.rows;
                        if(el.ISOLVE == 1){
                            el.ISOLVE = "是"
                        }else if(el.ISOLVE == 0){
                         el.ISOLVE = "否"
                        }
                        if(el.POINTLEVEL == 0){
                         el.POINTLEVEL = "低"
                        }else if(el.POINTLEVEL == 1){
                         el.POINTLEVEL = "中"
                        }else if(el.POINTLEVEL == 2){
                         el.POINTLEVEL = "高"
                        }
        
                        el.REPORTTIME=th.getLocalTime(el.REPORTTIME)
                        el.SOLVETIME=th.getLocalTime(el.SOLVETIME)
                        el.LASTUPDATETIME=th.getLocalTime(el.LASTUPDATETIME)
                    var defaultData = [];
                    if( el.ATTACHMENT != null){
                        el.ATTACHMENT.forEach((el,ind)=>{
                            var obj={
                                uid: el.ID,
                                status:'done',
                                thumbUrl:iss.url(el.FILEURL),
                                name : el.FILENAME,
                                url : iss.url(el.FILEURL)
                            } 
                            defaultData.push(obj)
                        })
                    }
                    th.setState({
                         readOnlyData:el,
                         chooseToText:el.USERNAME,
                         chooseToId:el.OWNER,
                         defaultData:defaultData,
                         chooseTopostId:el.POST,
                         chooseToPost:el.POSTNAME,
                    })
                },
                error() {
                    console.log('失败')
                }
            })
        }else if(this.props.editData != ""){
            var defaultData = [];
            this.props.editData.ATTACHMENT.forEach((el,ind)=>{
                var obj={
                    uid:el.ID,
                    status:'done',
                    thumbUrl:iss.url(el.FILEURL),
                    name : el.FILENAME,
                    url : iss.url(el.FILEURL)
                }
                defaultData.push(obj) 
            }) 
            this.setState({
                chooseToText:this.props.editData.USERNAME,
                chooseToId:this.props.editData.OWNER,
                chooseTopostId:this.props.editData.POST,
                chooseToPost:this.props.editData.POSTNAME,
                readOnlyData:this.props.editData,
                defaultData:defaultData,
            })
        }
    }
    GetQueryString(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = window.location.href.substr(1).match(reg);
         if(r!=null)return  unescape(r[2]); return null;
    }
    getLocalTime(nS) {
        if(nS == "/Date(-62135596800000)/"){
            return "0001-01-01"
        }else{
            return new Date(parseInt((/\d+/ig).exec(nS)[0])).Format("yyyy-MM-dd")
        }
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
    //责任岗位
    ChoosePostCallback = (para,e,arg) => {
        let peopleJson={},postIds="",postNames="";
        let th = this;
        if(this.state.chooseTopostId != null){
            postIds = this.state.chooseTopostId
            postNames = this.state.chooseToPost
        }
         postIds = postIds.trim().split(",")
         postNames = postNames.trim().split(",")
        postIds.forEach((ell,indd)=>{
            if(ell != ""){
                let PrincipalId={
                    "id":ell,
                    "text":postNames[indd]
                }
                peopleJson[ell]=PrincipalId;
            }
        })
        iss.chooseTo({
            title:"选择人员<i class='fontRed'>（双击选择人员）</i>",
            url:"/ProjectKayPoint/GetPostByOrgID",
            searchURL: "/ProjectKayPoint/GetPostByName",
            param: {orgID:1},
            pepole:peopleJson,  //已选人员名单
            multiple:true,
            callback(da){
                var post = [],postId =[];
                for(let key in da){
                    post.push(da[key].text)
                    postId.push(da[key].id)
                }
                th.props.callback(postId.join(","),para)
                th.setState({
                    chooseToPost:post.join(","),
                    chooseTopostId:postId.join(",")
                })
            }
        })

}
    //选人控件传值
    ChooseCallback = (para,e) =>{
        let peopleJson={},text=[],userId=[];
        var th=this,UserIds="",UserNames="";
        if(this.state.chooseToId != null){
            UserIds = this.state.chooseToId
            UserNames = this.state.chooseToText
        }
        UserIds = UserIds.trim().split(",")
        UserNames = UserNames.trim().split(",")
        
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
    }
    //查看
    ViewAttachmen = () =>{

    }
    //上传
    UploadAttachmen = (readOnly) =>{
        var th=this;
        if(this.state.readOnlyData.ATTACHMENT != null){
            th.arr=this.state.readOnlyData.ATTACHMENT;
        }
        let {defaultData}=this.state;
        let {defaultFileList}=this.upload;
        let ud = defaultFileList.concat(defaultData);
        var props = {
            action: iss.url('/ProjectKayPoint/Upload'),
            data:{
                token:iss.token
            },
            onChange({ file,fileList }) {
                if(file.response){  
                  const isLt50M = file.size / 1024 / 1024 < 50;
                  if (!isLt50M) {
                    message.error('文件不能大于50MB!');
                    return
                  }
                }
                  th.setState({
                    defaultData:fileList
                  })
                  if(file.response){
                    th.arr.push(file.response.rows[0])
                    th.props.callback(th.arr,"ATTACHMENT")
                  }
            },
            
            fileList:ud,
            onRemove(file){
                 if(readOnly){
                    return false
                 }
                 var fileID = "",fileUrl = "";
                 if(file.response){
                    fileID = file.response.rows[0].ID,
                    fileUrl = file.response.rows[0].FILEURL        
                 }else{
                    fileID = file.uid,
                    fileUrl = file.url
                 }
                 iss.ajax({
                    url: "ProjectKayPoint/DeleteAttachment",
                    data:{
                        id: fileID,
                        url: fileUrl.replace(iss.url(),"")
                    },
                    success(data) {
                        console.log(`删除`+data)
                    },
                    error() {
                        console.log('失败')
                    }
                })
             }
        };
        if(readOnly){
                return (
                    <div>
                       <Upload multiple {...props}>
                           <Button disabled>
                               <Icon type="upload" /> 上传
                           </Button>
                       </Upload>
                   </div>
                )
            
        }else{
            return (
                <div>
                   <Upload multiple {...props}>
                       <Button>
                           <Icon type="upload" /> 上传
                       </Button>
                   </Upload>
               </div>
            )
        
        }
         
    }   
    renderTable = () =>{
        var cancel = this.GetQueryString("cancel");
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
                        <label className="formTableLabel boxSizing">分期名称</label>
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
                        <label className="formTableLabel boxSizing redFont">面临风险解决进展</label>
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
                        <Select disabled value={this.state.readOnlyData.POINTLEVEL=="-1" ? "请选择":this.state.readOnlyData.POINTLEVEL} onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 300 }}>
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
                            placeholder={this.state.readOnlyData.REPORTTIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.REPORTTIME}  
                            onChange={this.TimeCallback.bind(this,"REPORTTIME")} 
                        />
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                    </th>
                    <td>
                        <DatePicker
                         disabled
                         placeholder={this.state.readOnlyData.SOLVETIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.SOLVETIME}
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
                        <Input disabled value={ this.state.chooseToPost || this.state.readOnlyData.POSTNAME || ""} onClick={this.ChoosePostCallback.bind(this,"POST")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing">附件</label>
                    </th>
                    <td colSpan={3}>
                         {this.UploadAttachmen("readOnly")}
                    </td>
                </tr>
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
                                    <label className="formTableLabel boxSizing">分期名称</label>
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
                                    <label className="formTableLabel boxSizing redFont">面临风险解决进展</label>
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
                                    <Input  value={this.state.readOnlyData.POINTLEVEL=="-1" ? "请选择":this.state.readOnlyData.POINTLEVEL} style={{ width: 300 }} />
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
                                    <Input value={ this.state.chooseToPost || this.state.readOnlyData.POSTNAME || ""} />
                                </td>
                                
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">附件</label>
                                </th>
                                <td colSpan={3}>
                                    {this.UploadAttachmen("readOnly")}
                                </td>
                            </tr>
                        </tbody>
                   
            );
        }else if(this.props.editData != "" || cancel == "cancel" ){
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
                        <label className="formTableLabel boxSizing">分期名称</label>
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
                        {
                            this.props.editData.APPROVESTATUS == 99 ? 
                            <TextArea disabled rows={3} value={this.state.readOnlyData.RISKDESC} onChange={this.TriggerCallback.bind(this,"RISKDESC")} /> :
                            <TextArea rows={3} value={this.state.readOnlyData.RISKDESC} onChange={this.TriggerCallback.bind(this,"RISKDESC")} />
                        }
                        
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">风险影响</label>
                    </th>
                    <td>
                        {
                            this.props.editData.APPROVESTATUS == 99 ? 
                            <TextArea disabled rows={3} value={this.state.readOnlyData.RISKEFFECT} onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} /> :
                            <TextArea rows={3} value={this.state.readOnlyData.RISKEFFECT} onChange={this.TriggerCallback.bind(this,"RISKEFFECT")} />
                        }
                        
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing redFont">面临风险解决进展</label>
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
                        <Select value={this.state.readOnlyData.POINTLEVEL=="-1" ? "请选择":this.state.readOnlyData.POINTLEVEL} onChange={this.selectCallback.bind(this,"POINTLEVEL")} defaultValue="请选择" style={{ width: 300 }}>
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
                        <Select value={this.state.readOnlyData.ISOLVE=="-1" ? "请选择":this.state.readOnlyData.ISOLVE} onChange={this.selectCallback.bind(this,"ISOLVE")} defaultValue="请选择" style={{ width: 300 }}>
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
                        {
                            this.props.editData.APPROVESTATUS == 99 ? 
                            <DatePicker 
                            disabled
                            placeholder={this.state.readOnlyData.REPORTTIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.REPORTTIME}  
                            onChange={this.TimeCallback.bind(this,"REPORTTIME")} 
                            /> :
                            <DatePicker
                            placeholder={this.state.readOnlyData.REPORTTIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.REPORTTIME}  
                            onChange={this.TimeCallback.bind(this,"REPORTTIME")} 
                            />
                        }
                        
                    </td>
                    <th>
                        <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                    </th>
                    <td>
                        {
                            this.props.editData.APPROVESTATUS == 99 ? 
                            <DatePicker
                            disabled
                            placeholder={this.state.readOnlyData.SOLVETIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.SOLVETIME}
                            onChange={this.TimeCallback.bind(this,"SOLVETIME")} /> :
                            <DatePicker
                            placeholder={this.state.readOnlyData.SOLVETIME == "0001-01-01"?"请选择日期":this.state.readOnlyData.SOLVETIME}
                            onChange={this.TimeCallback.bind(this,"SOLVETIME")} />
                        }
                        
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
                        <Input value={ this.state.chooseToPost || this.state.readOnlyData.POSTNAME || ""} onClick={this.ChoosePostCallback.bind(this,"POST")} />
                    </td>
                </tr>
                <tr>
                    <th>
                        <label className="formTableLabel boxSizing">附件</label>
                    </th>
                    <td colSpan={3}>
                        {this.UploadAttachmen()}
                    </td>
                </tr>
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
                            <label className="formTableLabel boxSizing redFont">面临风险解决进展</label>
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
                            <Input value={ this.state.chooseToPost || this.state.readOnlyData.POSTNAME || ""} onClick={this.ChoosePostCallback.bind(this,"POST")} />
                        </td>
                        
                    </tr>
                    <tr>
                        <th>
                            <label className="formTableLabel boxSizing">附件</label>
                        </th>
                        <td colSpan={3}>
                            {this.UploadAttachmen()}
                        </td>
                    </tr>
                </tbody>
                    
            );
        } 
    }

    historyAttachment = (obj) =>{
        return obj.map((el,ind) =>{
            var url = iss.url(el.FILEURL)
            return <a href={url}>{el.FILENAME}</a>
        })
    }
    historyTr = () =>{
        if(this.props.historyData !=""){
            return this.props.historyData.map((el, ind) => {
                if(ind != 0){
                    return <tr>
                                <td width="200px">{el.LASTUPDATENAME}</td>
                                <td>{el.PROGRESS}</td>
                                <td width="200px">{this.getLocalTime(el.LASTUPDATETIME)}</td>
                                <td>{this.historyAttachment(el.ATTACHMENT)}</td>
                            </tr>
                }
            })
        }
    }
    renderHistory = () =>{
    
        if(this.props.historyData !="" && this.props.historyData.length >1 ){
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
