import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import NewProjectCount from "./component-newProject-count.js";
import DynamicTable from "./tools-dynamicTable.js";
import "../../Content/css/tools-dynamicTable.less";//专用css
import ApprovalControlNode from "./component-newProjectApproval-node.js";  //审批信息
/*
    pdi id   DynamicData  结构数据 CallBack 数据修改回调
  <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
 */
class NewProject extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            newDynamicData:{},//空数据
            DynamicData:{},//已存在数据
            propsDATA:[],//显示数据
            CountData:[],//统计
            pid:"",
            states:false,
            countText:"统计数据过期",
            NewProjectCountDATA:[],
            status:"show"
        }
        this.guid = iss.guid();
        iss.hashHistory.listen((local, next) => {
            //console.log(arguments)
        })
        this.BIIND_FIST_LAND(); //获取地块信息
        this.time="";//延时变量
        this.firstData=[];//初始化数据
    }
    componentWillMount(){
        let local = this.props.location
        if(local.query["status"]){
            this.setState({status:this.props.location.query.status})
        }
    }
    componentDidMount(){   
    }
    BIND_NewProjectCountDATA(data){
      //  console.log(data)
        this.setState({
            NewProjectCountDATA:data
        })
    }
    BIIND_FIST_LAND(){
        if(iss.id==""){ return}
        let THIS = this;
       let id =iss.id;//"A91BB3051A0848319B45D3D527AC4103" //this.props.location.state.id;
       iss.ajax({
           url:"/Project/INewLand",  //初次请求创建空地块使用
           data:{projectId:id},
           success(d){
               if(d["rows"]){
                   THIS.state.states = true;
                   THIS.setState({
                       newDynamicData:JSON.stringify(d["rows"]) 
                      });
               }
           },
           error(e){

           }
       })
       iss.ajax({  //获取已有地块
           url:"/Project/IProjectLandsInfo",
           data:{projectId:id},
           success(d){
               if(d.rows){
                   var da = {};
                   d.rows.forEach((el,ind)=>{
                       if(ind==0){ //初次加载地块
                           
                          THIS.setState({
                            propsDATA:el["FieldList"]
                        }) 
                       }
                       da[el.LandId]=el;
                   })
                   
                   THIS.setState({
                    DynamicData:da
                   },arg=>{
                       THIS.BIND_LAND_BTN();
                   })
                   console.log(da)
               }
           },
           error(){}
       })
        //Project/ILandsStatistics  土地动态统计
       iss.ajax({
           url:"/Project/ILandsStatistics",
           success(a){
              
               if(a["rows"]){
                  THIS.setState({
                    CountData:a["rows"] 
                  },arg=>{
                      setTimeout(arg=>{
                          
                        THIS.BIND_COUNT_GETMAP();
                      },2000);
                  })
               }
           }
       })
    }

    EVENT_CLICK_NEWLAND(){ //新增地块
        let th = this,nd = JSON.parse(this.state.newDynamicData);
        if(this.state.states){  
           // this.DynamicData["pid"]=iss.guid();
              let guid = iss.guid();
              
             this.state.DynamicData[guid]={LandId:guid,FieldList:nd}; //向数据树添加一条数据
             this.setState({
                propsDATA:nd,  //新增地块
                pid:guid 
            });
            
        }
    }
    EVENT_CLICK_LANDBTN(id,e){ //切换地块
       // console.log(this.state.DynamicData[id]["data"]);
       
        let self = $(e.target),pa = self.parent();
            if(self.hasClass("icon-delete")){ return}
            pa.find("li").removeClass("active");
            self.addClass("active");
            this.setState({
                pid:id,
                propsDATA:this.state.DynamicData[id]["FieldList"]
            },arg=>{
              //  console.log(this.state.propsDATA)
            });

    }
    SET_PARENTCOUNT(list,d){  //地块计算
        let da = {};
        let data = list.forEach((el,ind)=>{
           for(var  i in d.parent){
            if(el.id==i){
                let exec = el.exec;
                let reg = /{.*?}/ig; 
                let arr = exec.match(reg);
                if(arr){
                    arr.forEach((ee,ii)=>{
                        let regs = new RegExp(`${ee}`,"ig");
                        exec=exec.replace(regs,~~el.child[ee.replace(/[{}]/ig,"")].val)
                    });
                   el.val=eval(exec);
                   return;
                }
                
                
            }   
           }
        })
        return  
    }
    BIND_CALLBACK(da,e){ //子页面返回callback
       // if(this.time){ clearTimeout(this.time) }
        var th = this;
        var el = e? e.target.value:da.val,list = this.state.DynamicData[this.state.pid];
         list.FieldList.forEach((d,i)=>{
            if(da.id==d.id){
                d["val"]=el//e.target.value; 
                    if(d["parent"]){
                        th.SET_PARENTCOUNT(list.FieldList,d)
                    }
                return
            }
          
        })
        this.setState({
            propsDATA:list.FieldList
        });
        
      // th.time=setTimeout(arg=>{
            th.BIND_COUNT_GETMAP();
        //},1000);
        
    }
    EVENT_CLICK_DELETE(id,ev){ //删除地块
        let data = this.state.DynamicData;
        let th = this;
        iss.Alert({
            title:"提示",
            width:300,
            content:`<div class="Alert">是否删除地块</div>`,
            ok(){
                delete data[id];
                let fda=[],iii=0,_id="";
                for(let v in data){
                    if(iii==1){ break;}
                    fda = data[v]["FieldList"]
                    _id = data[v]["LandId"]
                    iii+=1;
                }
            
                th.setState({
                    DynamicData:data,
                    propsDATA:fda,
                    pid:_id
                },arg=>{
                    th.BIND_COUNT_GETMAP();
                })
            },
            cancel(){
                
            }
        })

    }
    BIND_LAND_BTN(){ //添加新增地块button
        let map=[],li =this.state.DynamicData,name="新增地块",g=0;
       // console.log(li)
        for(var i in li){
            g+=1;
            for(var f=0;f<li[i].FieldList.length;f++){
                if(li[i].FieldList[f]["label"]=="地块名称"){ 
                    name=li[i].FieldList[f]["val"]||`新增地块${g}`
                    break;
                 }
            }

            map.push(<li onClick={this.EVENT_CLICK_LANDBTN.bind(this,li[i].LandId)} key={g} data-id={li[i].LandId}>{name}<span className="icon-delete" onClick={this.EVENT_CLICK_DELETE.bind(this,li[i].LandId)}></span></li>)
        }
        
  
        return map;
    }
    BIND_COUNT_DATACALLBACK(da){ //地块统计
     
    }
    EVENT_CLICK_REFASH(){ //刷新
        //this.BIND_COUNT_GETMAP(); //重新统计数据
    }
    BIND_COUNT_GETMAP(){ //地块统计
        let da = this.state.CountData,th = this;
        var t = new Date().getTime();
        da.forEach((el,ind)=>{
        let reg = /\{.*?\}[\+\-\*\/]/,regcount = /\{.*?\}/ig,arr=regcount.exec(el.exec||""),list = th.state.DynamicData;
             if(el.exec&&!reg.exec(el.exec)){
                if(arr&&arr[0]){
                        let _id = arr[0].replace(/[{}]/ig,""),_str=[];
                        for(let v in list){
                            list[v]["FieldList"].forEach((ee,ii)=>{
                                 if(ee["id"]==_id){
                                     _str.push(~~ee["val"]);
                                     return
                                 }
                            })
                           
                        }
                        el.val=eval(_str.join("+"));
                        return;
                }
            }
        })
        th.setState({
            CountData:da
        })
        var t2 = (new Date().getTime()-t)/1000;
        console.log(t2)
    }

    EVENT_CLICK_POSTAPP(){  //发起审批基础部分
        var th = this; 
        let landInfoListJson = [];
        
        for(let vv in this.state.DynamicData){
            
           this.state.DynamicData[vv]["FieldList"].map((e,i)=>{
                delete e["child"];
                delete e["parent"];
                return e;
            })
            landInfoListJson.push(this.state.DynamicData[vv])
        }
        
        iss.ajax({
            type:"POST",
            url:"/Project/ISave",
            data:{
                projectJson:JSON.stringify(this.state.NewProjectCountDATA),
                landInfoListJson:JSON.stringify(landInfoListJson),
                editType:"Submit",
            },
            success:function (data) {
                if (data.errno == 0) {
                     //do something 
                } else {
                    console.log("1");
                }
            },
            error:function (er) {
                console.log('错误');
            }
        });
        
       
    }
    BIND_SUBMITPRIMISE(){
        BIND_ROUTERCHANGE(); //路由跳转
    }   
    EVENT_CLICK_SAVE(){
        var th = this;
        let landInfoListJson = [];
        for(let vv in this.state.DynamicData){
            landInfoListJson.push(this.state.DynamicData[vv])
        }
        iss.ajax({
            type:"POST",
            url:"/Project/ISave",
            data:{
                projectJson:JSON.stringify(this.state.NewProjectCountDATA),
                landInfoListJson:JSON.stringify(landInfoListJson),
                editType:"Save",
            },
            success:function (data) {
                if (data.errno == 0) {
                     //do something 
                } else {
                    console.log("1");
                }
            },
            error:function (er) {
                console.log('错误');
            }
        });
      
    }
    BIND_ApprovalControlNode(self){  //流程绑定回调
       this.BIND_ApprovalControlNode_EVENT=self.EVENT_CLICK_SUBMIT.bind(self);//绑定子集数据
    }
    BIND_ApprovalControlNode_EVENT(){ //流程提交,重定向到审批流程
        
    }
    BIND_ROUTERCHANGE(){  //发起审批
        this.EVENT_CLICK_POSTAPP();//基础信息提交
        this.BIND_ApprovalControlNode_EVENT();//流程提交
       // iss.hashHistory.push({pathname:"/newProjectApproval",state:iss.id});
    }
    render() {
      // console.log(JSON.stringify(this.state.DynamicData))
        return <article>
            <section>
            <h3 className="boxGroupTit">
                    <p>
                        <span>项目信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">
                        <a className="saveIcon " onClick={this.EVENT_CLICK_SAVE.bind(this)} href="#">暂存</a>
                        <a className="approvalIcon" onClick={this.BIND_ROUTERCHANGE.bind(this)} href="javascript:;">发起审批</a>
                    </span>
                </h3> 
                <NewProjectCount local={this.props.location} NewProjectCountDATA={this.BIND_NewProjectCountDATA.bind(this)} />
            </section>

            <section>
                <h3 className="boxGroupTit">
                    <p>
                        <span>地块信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">
                        <a className="addDik-icon" href="javascript:;" onClick={this.EVENT_CLICK_NEWLAND.bind(this)}>新增地块</a>
                    </span>
                </h3>
                <div>
                 <DynamicTable pid="countdata" DynamicData={this.state.CountData} CallBack={this.BIND_COUNT_DATACALLBACK.bind(this)} /> 
                </div>
                <ul className="BIND_LAND_BTN">
                    {this.BIND_LAND_BTN()}
                </ul>
                 <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
            </section>
            <section>
                <ApprovalControlNode guid={this.guid} type="edit" callback={this.BIND_ApprovalControlNode.bind(this)} />
            </section>
           
        </article>
    }
}
export default NewProject;