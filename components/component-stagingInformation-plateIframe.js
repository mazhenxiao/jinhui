/*分期信息栏 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../css/component-stagingInformation-groupIframe.css";//专用css
class PlateIframe extends React.Component{
    constructor(arg){
        super(arg);
        this.url = "/Stage/IGetPushPlate";
        this.url2 = "/Stage/IReferenceGroupDivision";
        this.state = {
            dataList: [],//总数据
            versionId:this.props.versionId,
            index:0,  //当前推盘
            parkingLot:[],
            _group:[],
            checked:''
        },
        this.index = 0;
        this.nameList = [];
        this._group = [];
        this._nData = [];
        this.numArr = [];
        this.delete = [];
    }
    //?stageversionid=2dd2fa0b-9f45-16a8-463b-a973a5aa5ab1
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
        
        //th.state.checked = "2dd2fa0b-9f45-16a8-463b-a973a5aa5ab1"
        iss.ajax({
            url: this.url+"?stageversionid="+ th.state.checked,
            data:{
                //stageversionid: th.state.versionId
            },
            scriptCharset: 'utf-8',
            success(data) {
                if(null != data.rows){
                    var arr = [],rows=[],parkingLot=[];
                    data.rows.forEach((el,ind) => {
                        if(el.groupnumber != 200){
                            rows.push(el)
                        }else{
                            parkingLot.push(el)
                        }
                    })
                    rows.forEach((el,ind) => {
                        arr.push(el.pushPlateNumber)
                    })
                    if(arr.indexOf(1) == -1){
                       
                        var newId = iss.guid()
                        var addObj = {
                            "pushPlateId": newId,
                            "pushPlateName": "推盘",
                            "pushPlateNumber": 1,
                            "buildingId": null,
                            "buildingName": null,
                            "current": "new"
                        }
                        rows.push(addObj)
                    }
                    th.setState({
                        dataList: rows,
                        parkingLot:parkingLot,
                        index:data.rows[0]["pushPlateNumber"],
                        _group:th._group
                    });
                    //console.log(data.rows)
                }
                th.props.callback(th);
            },
            error() {
                console.log('失败')
            }
        })
    }
    //删除推盘
    delGroup(da,ev){
        
        const target = ev.currentTarget;
        var th = this,arr=[];
        var delAr = th.state.dataList;
        th.setState({
            index: da
        })
        delAr.forEach((el,ind) =>{
            if(arr.indexOf(el.pushPlateNumber) == -1){
                arr.push(el.pushPlateNumber)
            }
        })
        delAr.forEach((el, ind) => {
            if(Math.max.apply(null, arr) != 1){
                if(el.pushPlateNumber == da){
                    el.pushPlateName = "nomapping";
                    el.pushPlateNumber = 0;
                    el.delete = "del";
                    el.Mdel = "Mdel";
                    th.delete.push(el.pushPlateId)
                }
            }
            
            if(el.pushPlateNumber > da){
                el.pushPlateNumber = el.pushPlateNumber - 1;
                el.newPush = "newPush"
            }
        })
        th.setState({
            dataList:delAr
        })
    }
    // 推盘名称
    pushPlateName() {  
        
         var th = this,arr=[];
         var _len=th.state.dataList.length;
         th._group=[];
         th._nData=[];
         for(var i=0;i<_len;i++){
             if(th._group.indexOf(th.state.dataList[i].pushPlateNumber)==-1){ 
                 th._group.push(th.state.dataList[i].pushPlateNumber);
                 var obj = {
                    "pushPlateId":th.state.dataList[i].pushPlateId,
                    "pushPlateNumber":th.state.dataList[i].pushPlateNumber
                };
                th._nData.push(obj)
             }
         }
         //console.log(th._nData)
         th._group.sort(function sortNumber(a,b)
         {
         return a - b
         })
        return th._group.map((el, ind) => {
             if(el != 0 && el != 1 && el!=200){
                return <li key={ind} className={(this.state.index==el)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,el)}>{"第 "+el+" 批推盘"}<span onClick={this.delGroup.bind(this,el)}></span></li>
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
            text = el.buildingName,
            brr = th.state.dataList,
            newBr = [];

        var n = th.state.index,idN = 0;
            th._nData.forEach((el,ind) => {
                if(n==el.pushPlateNumber){
                    idN = el.pushPlateId
                }
            })
            if(domType){
                
                brr.forEach((el,ind) =>{
                    if(el.buildingName == text){
                        if(this.numArr.indexOf(n) != -1){
                                el.pushPlateName = "推盘",
                                el.pushPlateNumber = n,
                                el.pushPlateId = idN,
                                el.delete = "",
                                el.current="new"
                            
                        }else{
                                el.pushPlateName = "推盘",
                                el.pushPlateNumber = n,
                                el.pushPlateId = idN,
                                el.delete = ""
                            
                        }
                } 
                })
                brr.forEach((el,ind) =>{
                    if(el.pushPlateNumber == n && el.buildingId == null && el.buildingName == null ){
                        brr.splice(ind,1);
                    }
                })

                brr.forEach((el,ind) =>{
                    newBr.push(el.pushPlateNumber)
                })

                th.setState({
                    dataList:brr
                })
            }else{
                
                brr.forEach((el,ind) =>{
                    if(el.buildingName == text){
                        if(this.numArr.indexOf(n) != -1){
                                el.pushPlateName = "nomapping",
                                el.pushPlateNumber = 0,
                                el.pushPlateId = null,
                                el.current="new"
                            
                        }else{
                                el.pushPlateName = "nomapping",
                                el.pushPlateNumber = 0,
                                el.pushPlateId = null;
                        }
                    }
                    
                })
                brr.forEach((el,ind) =>{
                    newBr.push(el.pushPlateNumber)
                })
               
                
                if(newBr.indexOf(n) == -1){
                    var kongId = "";
                    th._nData.forEach((el,ind) => {
                        if(n==el.pushPlateNumber){
                            kongId = el.pushPlateId
                        }
                    })
                    if(this.numArr.indexOf(n) != -1){
                        var BrObj = {
                            "pushPlateId": kongId,
                            "pushPlateName": "推盘",
                            "pushPlateNumber": n,
                            "buildingId": null,
                            "buildingName": null,
                            "current":"new"
                        }
                        
                    }else{
                        var BrObj = {
                            "pushPlateId": kongId,
                            "pushPlateName": "推盘",
                            "pushPlateNumber": n,
                            "buildingId": null,
                            "buildingName": null,
                        }
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
        if(th.state.index == 200){
            return th.state.parkingLot.map((el,ind)=>{
                return <li key={ind}>
                            <span className="buildingName">{el.buildingName}</span>
                    </li>
            })
        }else{
        if(th.state.dataList.length != 0){ 
            return th.state.dataList.map((el, ind) => {
                let id = el.pushPlateNumber; 
            if(el.del==null && el.del != "del"){
            if(el.delete == null|| el.delete == "" || el.Mdel == "Mdel"){
                if(id == th.state.index && null!=el.buildingName && id != 0 && id !=200){
                    
                    return <li key={ind} className='toggle-checkbox'>
                                <input type="checkbox" checked={true} id={"check"+ind} onChange={this.inputChange.bind(this,ind,el)} />
                                <label className="track" htmlFor={"check"+ind}>
                                    <span className="icon"></span>
                                    <span className="buildingName">{el.buildingName}</span>
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
            }
        }
            })
        }
    }
        
    }

    //增加推盘
    addGroup(){
        debugger
        var th=this;
        var crr = th.state.dataList;
        var addObj = {},len = 1,
            _len = crr.length,
            newAr = [],
            newId = iss.guid()
        for(var i=0;i<_len;i++){
            if(newAr.indexOf(this.state.dataList[i].pushPlateNumber)==-1){
                newAr.push(this.state.dataList[i].pushPlateNumber)
            }
        }
        if(newAr.length > 0){
            len = Math.max.apply(null, newAr)+1;
        }
        
        addObj = {
            "pushPlateId": newId,
            "pushPlateName": "推盘",
            "pushPlateNumber": len,
            "buildingId": null,
            "buildingName": null,
            "current": "new"
        }
        this.numArr.push(len)
        crr.push(addObj)
        th.setState({
            dataList:crr
        })
            console.log(crr)
    }

    GroupDivide(){
        var th = this,delArr = th.state.dataList;
        th.state.checked = th.props.versionId;
        delArr.forEach((el,ind)=>{
            el.delete = "del",
            el.pushPlateName = "nomapping";
            el.del = "del",
            el.pushPlateNumber = 0;
            th.delete.push(el.pushPlateId)
        })
        iss.ajax({
            url: this.url2+"?stageversionid="+ th.state.checked,
            data:{
                //stageversionid: th.state.versionId
            },
            success(data) {
                if(null != data.rows && data.rows.length>0){
                    var arr = [],FinalArr =[];
                    data.rows.forEach((el,ind) => {
                        arr.push(el.pushPlateNumber)
                        el.current = "new";
                        th.numArr.push(el.pushPlateNumber)
                    })
                    if(arr.indexOf(1) == -1){
                       
                        var newId = iss.guid()
                        var addObj = {
                            "pushPlateId": newId,
                            "pushPlateName": "推盘",
                            "pushPlateNumber": 1,
                            "buildingId": null,
                            "buildingName": null,
                            "current": "new"
                        }
                        data.rows.push(addObj)
                    }
                    FinalArr = data.rows.concat(delArr);
                    th.setState({
                        dataList: FinalArr,
                        index:data.rows[0]["pushPlateNumber"],
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
    //引用组团划分
    quoteGroup(){
        var th = this;
        iss.Alert({
            title:"",
            width:600,
            height:305,
            content:`<p class='Promptinfo'>温馨提示：引用组团划分数据会覆盖当前已有推盘数据，</p><p class='Promptinfo'>确定引用组团划分数据吗？</p>`,
            okVal:"确定",
            cancel:"取消",
            ok(da){
                th.GroupDivide()
            },
            cancel(da){

            }
        })
        
    }   
    render(){
        
        return <article>
            <div className='addGroup'>
                <input type='button' value='增加推盘批次' onClick={this.addGroup.bind(this)} />
                <input type='button' value='引用组团划分' onClick={this.quoteGroup.bind(this)} />
            </div>
            <div className='groupList'>
                <div className='groupName groupListScroll plateName'>
                <ul >
                        <li className={(this.state.index== 0)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,0)}>未分配楼栋</li>
                        <li className={(this.state.index== 1)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,1)}>第 1 批推盘<span onClick={this.delGroup.bind(this,1)}></span></li>
                        {this.pushPlateName()}
                        <li className={(this.state.index== 200)? "active":""} onClick={this.EVENT_CLICK_LI.bind(this,200)}>未分配车位</li>
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

export default PlateIframe;