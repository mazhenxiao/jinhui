import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import NewProjectCount from "./component-newProject-count.js";
import DynamicTable from "./tools-dynamicTable.js";
import "../../Content/css/tools-dynamicTable.less";//专用css
import validate from "./tools-validate.js";//验证字典表
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
            pid:"",
            states:false
        }
        iss.hashHistory.listen((local, next) => {
            console.log(arguments)
        })
        this.BIIND_FIST_LAND()
    }
    componentDidMount(){   
    }
    BIIND_FIST_LAND(){
        let THIS = this;
        if(!this.props.location||!this.props.location.state){ iss.Alert({content:"请选择区域或项目！"})};
       let id ="A91BB3051A0848319B45D3D527AC4103" //this.props.location.state.id;
       iss.ajax({
           url:"/Project/INewLand",  //初次请求创建空地块使用
           data:{projectId:id},
           sucess(d){
               
               if(d["rows"]){
                   THIS.state.states = true;
                   THIS.setState({
                       newDynamicData:d["rows"] 
                      });
               }
             
           },
           error(e){

           }
       })
       iss.ajax({
           url:"/Project/IProjectLandsInfo",
           data:{projectId:id},
           sucess(d){
               if(d.rows){
                   var da = {};
                   d.rows.forEach((el,ind)=>{
                       da[el.LandId]=el;
                   })
                   THIS.setState({
                    DynamicData:da
                   },arg=>{
                       THIS.BIND_LAND_BTN();
                   })
               }
           },
           error(){}
       })
    }
    EVENT_CLICK_NEWLAND(){ //新增地块
        let th = this,nd = JSON.parse(JSON.stringify(this.state.newDynamicData));
        if(this.state.states){  
           // this.DynamicData["pid"]=iss.guid();
              let guid = iss.guid();
              
             this.state.DynamicData[guid]={LandId:guid,FieldList:nd}; //向数据树添加一条数据
             this.setState({
                propsDATA:this.state.newDynamicData,  //新增地块
                pid:guid
            });
            
        }
    }
    EVENT_CLICK_LANDBTN(id,e){ //切换地块
       // console.log(this.state.DynamicData[id]["data"]);
        let self = $(e.target),pa = self.parent();
            pa.find("li").removeClass("active");
            self.addClass("active");
            this.setState({
                pid:id,
                propsDATA:this.state.DynamicData[id]["FieldList"]
            },arg=>{
              //  console.log(this.state.propsDATA)
            });

    }
    SET_PARENTCOUNT(list,d){
        for(let v in d.parent){
            console.log(v);
        }
        return
         
    }
    BIND_CALLBACK(da,e){ //子页面返回callback
        var th = this;
        var el = e.target.value,list = this.state.DynamicData[this.state.pid];
         list.FieldList.forEach((d,i)=>{
            if(da.id==d.id){
                d["val"]=e.target.value; 
                    if(d["parent"]){
                        th.SET_PARENTCOUNT(list.FieldList,d)
                    }
                return
            }
          
        })
        this.setState({
            propsDATA:list.FieldList
        });
        
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

            map.push(<li onClick={this.EVENT_CLICK_LANDBTN.bind(this,li[i].LandId)} key={g} data-id={li[i].LandId}>{name}</li>)
        }
        
  
        return map;
    }

    render() {
      // console.log(JSON.stringify(this.state.DynamicData))
        return <article>
            <NewProjectCount />
            <section>
                <h3 className="boxGroupTit">
                    <p>
                        <span>项目信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
                    <span className="functionButton">

                        <a className="approvalIcon" href="javascript:;" onClick={this.EVENT_CLICK_NEWLAND.bind(this)}>新增地块</a>
                    </span>
                </h3>
                <div>
               {/*  <DynamicTable pid={"1"} DynamicData={[]} CallBack={this.BIND_CALLBACK.bind(this)} />  */}
                </div>
                <ul className="BIND_LAND_BTN">
                    {this.BIND_LAND_BTN()}
                </ul>
                 <DynamicTable pid={this.state.pid} DynamicData={this.state.propsDATA} CallBack={this.BIND_CALLBACK.bind(this)} /> 
            </section>
           
        </article>
    }
}
export default NewProject;