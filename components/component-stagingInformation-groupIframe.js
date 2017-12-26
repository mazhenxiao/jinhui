/*分期信息栏 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../css/component-stagingInformation-groupIframe.css";//专用css
class GroupIframe extends React.Component{
    constructor(arg){
        super(arg);
        this.url = "/Stage/IGetGroupBuilding";
        this.state = {
            dataList: [],//总数据
            versionId:this.props.versionId,

            index:0,  //当前组团
            _group:[],
            checked:'',
            flag :true
        },
        this.index = 0;
        this.nameList = [];
        this._group = [];
        this._nData = [];
    }
    //?stageversionid=2a8ff0cd-5718-725e-aa85-3c577cd9f22f
    componentWillMount() {
        this.getAjax();
    }
    componentDidMount(){
        $(".groupListScroll").mCustomScrollbar({
            autoDraggerLength:true,
            scrollButtons:{enable:true}
        });
    }
    getAjax(arg) {
        var th = this;
        th.state.checked = th.props.versionId
        //th.state.checked = "2a8ff0cd-5718-725e-aa85-3c577cd9f22f"
        iss.ajax({
            url: this.url+"?stageversionid="+ th.state.checked,
            data:{
                //stageversionid: th.state.versionId
            },
            success(data) {
                if(null != data.rows){
                    var arr = [];
                    data.rows.forEach((el,ind) => {
                        arr.push(el.groupnumber)
                    })
                    if(arr.indexOf(1) == -1){
                        var newId = iss.guid()
                        var addObj = {
                            "groupId": newId,
                            "groupName": "组团",
                            "groupnumber": 1,
                            "buildingId": null,
                            "buildingName": null,
                            "current": "new"
                        }
                        data.rows.push(addObj)
                    }
                    th.setState({
                        dataList: data.rows,
                        _group:th._group
                    });
                }
                th.props.callback(th);
            },
            error() {
                console.log('失败')
            }
        })
    }
    //删除组团

    delGroupFun(da,ev){
        var th = this,arr=[];
        var delAr = th.state.dataList;
        const target = ev.currentTarget;
    
        delAr.forEach((el,ind) =>{
            if(arr.indexOf(el.groupnumber) == -1){
                arr.push(el.groupnumber)
            }
        })
        delAr.forEach((el, ind) => {
            if(Math.max.apply(null, arr) != 1){
                if(el.groupnumber == da){
                    el.groupName = "nomapping";
                    el.groupnumber = 0;
                    el.delete = "del";
                }
            }
            if(el.groupnumber > da){
                el.groupnumber = el.groupnumber - 1;

            }
        })

        th.setState({
            index: da,
            dataList:delAr
        })
    }

    delGroup(da,ev){
        var th = this,arr=[];
        var delAr = th.state.dataList,groupid="";
        delAr.forEach((el,ind) =>{
            if(el.groupnumber == da){
                groupid = el.groupId
            }
        })
        iss.ajax({
            url: "/Stage/ICheckCanDeleteGroup",
            data:{
                stageversionid: th.state.versionId,
                groupid: groupid
            },
            success(data) {
                    if(data.rows == 0){
                        if(th.state.flag){
                            th.setState({
                                flag:false
                            })
                            iss.Alert({
                                title:"",
                                width:600,
                                height:305,
                                content:`<p class='Promptinfo' style='padding-top:70px; padding-right:25px;'>温馨提示：此组团已编制主项计划，删除此组团后会永久丢失此组团的当前主项计划数据。确定仍要删除此组团吗？</p>`,
                                okVal:"确定",
                                cancel:"取消",
                                ok(){
                                    th.delGroupFun(da,ev)
                                    th.setState({
                                        flag:true
                                    })
                                },
                                cancel(da){
                                    th.setState({
                                        flag:true
                                    })
                                }
                            })
                        }
                    }else{
                        th.delGroupFun(da,ev)
                    }
                
                
            },
            error() {
                console.log('失败')
            }
        })
        
    }
    // 组团名称
    groupName() {  
         
         var th = this,arr=[];
         var _len=th.state.dataList.length;
         th._group=[];
         th._nData=[];
         for(var i=0;i<_len;i++){
             if(th._group.indexOf(th.state.dataList[i].groupnumber)==-1){ 
                 th._group.push(th.state.dataList[i].groupnumber);
             }
             if(th._group.indexOf(th.state.dataList[i].groupId)==-1){
                var obj = {
                    "groupId":th.state.dataList[i].groupId,
                    "groupnumber":th.state.dataList[i].groupnumber
                };
                th._nData.push(obj)
            }
         }
         th._group.sort(function sortNumber(a,b)
         {
         return a - b
         })
        return th._group.map((el, ind) => {
             if(el != 0 && el != 1){
                return <li key={ind} className={(this.state.index==el)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,el)}>{el+"组团"}<span onClick={this.delGroup.bind(this,el)}></span></li>
             }
            
        })
    }
    EVENT_CLICK_LI(da,ev){
        var th = this;
        th.setState({
            index:da
        })
        
    }

    //复选框
    inputChange(ind,el,ev){
   
        const target = ev.target;
        var th = this,
            domType = target.type === 'checkbox' ? target.checked : target.value,
            text = el.buildingName, //target.parentNode.innerText,
            brr = th.state.dataList,
            newBr = [];
        var n = th.state.index,idN = 0;
            th._nData.forEach((el,ind) => {
                if(n==el.groupnumber){
                    idN = el.groupId
                }
            })
            if(domType){
                brr.forEach((el,ind) =>{
                    if(el.buildingName == text){
                        el.groupName = "组团",
                        el.groupnumber = n,
                        el.groupId = idN
                    }
                })
                brr.forEach((el,ind) =>{
                    newBr.push(el.groupnumber)
                })
                if(newBr.indexOf(0) == -1){
                    var BrObj = {
                        "groupId": null,
                        "groupName": "nomapping",
                        "groupnumber": 0,
                        "buildingId": null,
                        "buildingName": null
                    }
                    brr.push(BrObj)
                }
                th.setState({
                    dataList:brr
                })
            }else{
                brr.forEach((el,ind) =>{
                    if(el.buildingName == text){
                        el.groupName = "nomapping",
                        el.groupnumber = 0,
                        el.groupId = null;
                    }
                })
                brr.forEach((el,ind) =>{
                    newBr.push(el.groupnumber)
                })
                if(newBr.indexOf(n) == -1){
                    var kongId = "";
                    th._nData.forEach((el,ind) => {
                        if(n==el.groupnumber){
                            kongId = el.groupId
                        }
                    })
                    var BrObj = {
                        "groupId": kongId,
                        "groupName": "组团",
                        "groupnumber": n,
                        "buildingId": null,
                        "buildingName": null
                    }
                    brr.push(BrObj)
                }
                
                th.setState({
                    dataList:brr
                })
            }
    }
    //楼栋
    groupFloor() {
        var th = this;
        if(th.state.index == "n"){
            return 
        }else{
            if(th.state.dataList.length != 0){ 
                return th.state.dataList.map((el, ind) => {
                    let id = el.groupnumber; 
                    if(id == th.state.index && null!=el.buildingName && id != 0){
                        
                        return <li key={ind} className='toggle-checkbox'>
                                    <input type="checkbox" checked={true} id={"check"+ind} onChange={this.inputChange.bind(this,ind,el)} />
                                    <label className="track" htmlFor={"check"+ind}>
                                    <span className="buildingName">{el.buildingName}</span>
                                        <span className="icon"></span>
                                    </label>
                                    
                            </li>
                    }else if(id == 0 && null!=el.buildingName){
    
                        if(th.state.index == 0){
                            return <li key={ind}>
                                        <span className="buildingName">{el.buildingName}</span>
                                </li>
                        }else{
                            return <li key={ind} className='toggle-checkbox'>
                                        <input type="checkbox" id={"check"+ind} checked={false} onChange={this.inputChange.bind(this,ind,el)} />
                                        <label className="track" htmlFor={"check"+ind}>
                                            <span className="icon"></span>
                                            <span className="buildingName">{el.buildingName}</span>
                                        </label>
                                        
                                </li>
                        }
                        
                    }
                    
                })
            }
        }
        
        
    }

    //增加组团
    addGroup(){
        if(!this.state.flag){
            return
        }
        var th=this;
        var crr = th.state.dataList;
        var addObj = {},len = 1,
            _len = crr.length,
            newAr = [],
            newId = iss.guid()
        for(var i=0;i<_len;i++){
            if(newAr.indexOf(this.state.dataList[i].groupnumber)==-1){
                newAr.push(this.state.dataList[i].groupnumber)
            }
        }
        if(newAr.length > 0){
            len = Math.max.apply(null, newAr)+1;
        }
        
            addObj = {
                "groupId": newId,
                "groupName": "组团",
                "groupnumber": len,
                "buildingId": null,
                "buildingName": null,
                "current": "new"
            }
            crr.push(addObj)
            th.setState({
                dataList:crr
            })
    }

    render(){
        
        return <article>
            <div className='addGroup'><input type='button' value='增加组团' onClick={this.addGroup.bind(this)} /></div>
            <div className='groupList'>
                <div className='groupName groupListScroll'>
                <ul >
                        <li className={(this.state.index== 0)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,0)}>未分配楼栋</li>
                        <li className={(this.state.index== 1)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,1)}>1组团<span onClick={this.delGroup.bind(this,1)}></span></li>
                        {this.groupName()}
                        {/* <li className={(this.state.index== "n")? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,"n")}>未分配车位</li> */}
                    </ul>
                </div>
                <div className='groupFloor'>
                    <ul>
                        {this.groupFloor(this.index)}
                    </ul>
                </div>
                <div className='clear'></div>
            </div>
        </article>
    }
    
}

export default GroupIframe;