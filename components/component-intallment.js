/*分期  */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import StagingInformation from "./component-stagingInformation.js";
import Indicators from "./component-indicators.js";
class Intallment extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            StagingInformationDATA:{}, /*分期信息*/
            landList:[],/*分期占用土地*/
            status:"show",
            STAGEVERSIONID_guid:iss.guid(),
            STAGEID_guid:iss.guid(),
        }
         iss.hashHistory.listen((local,next)=>{
        })  
    }    
    componentWillMount(){
        
        let location = this.props.location
        if(location.query["status"]){
            this.setState({
                status:this.props.location.query.status,
            })
        }
        
    }
    componentDidMount(){
        
    }
    BIND_StagingInformationDATA(data){
        console.log(data)
        this.setState({
            StagingInformationDATA:data
        },()=>{
         //   this.getAjax();
        });
        
       
    }
    /*分期占用土地==数据*/
    evLandList(landArr){
        console.log("最终地块信息");
        console.log(landArr);
        var th=this;
        th.setState({
            landList:landArr
        });
    }

    EVENT_CLICK_POSTAPP(){
        let status=this.props.location.query.status;
        let th=this;
        var SumbitType;
        var dta=th.state.StagingInformationDATA;
        
        dta.LandList=th.state.landList;
        if(status=="edit"){
            SumbitType="Edit";
        }else if(status=="add"){
            SumbitType="Add";
        }else if(status=="upgrade"){
            SumbitType="Upgrade";
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEVERSIONIDOLD=iss.id.id;
            dta.STAGEID=this.state.STAGEID_guid;
        }
    //    console.log(dta);

        iss.ajax({
            type:"POST",
            url:"/Stage/IToCreate",
            data:{
                data:JSON.stringify(dta),
                SumbitType:SumbitType,
                EditType:"Submit", 
            },
            success:function (data) {
               
            },
            error:function (er) {
                console.log('错误');
            }
        });
    }
    EVENT_CLICK_SAVE(){
        let status=this.props.location.query.status;
        let th=this;
        var SumbitType;
        var dta=th.state.StagingInformationDATA;
        
        dta.LandList=th.state.landList;
        if(status=="edit"){
            SumbitType="Edit";
        }else if(status=="add"){
            SumbitType="Add";
        }else if(status=="upgrade"){
            SumbitType="Upgrade";
            dta.STAGEVERSIONID=this.state.STAGEVERSIONID_guid;
            dta.STAGEVERSIONIDOLD=iss.id.id;
            dta.STAGEID=this.state.STAGEID_guid;
        }
        

        iss.ajax({
            type:"POST",
            url:"/Stage/IToCreate",
            data:{
                data:JSON.stringify(dta),
                SumbitType:SumbitType,
                EditType:"Submit",
            },
            success:function (data) {

            },
            error:function (er) {
                console.log('错误');
            }
        });
    }
    getAjax(){
       
    }

    render() {
        var th=this;
        return <article>
        <div>
            <h3 className="boxGroupTit">
                    <p>
                        <span>分期信息</span>
                        <i>（<i className="redFont"></i>为必填项）</i>
                    </p>
				    <span className="functionButton">
                        <a className="saveIcon" onClick={this.EVENT_CLICK_SAVE.bind(this)} href="#">暂存</a>
                        <a className="approvalIcon" onClick={this.EVENT_CLICK_POSTAPP.bind(this)} href="#">发起审批</a>
                    </span>
			</h3>
        </div> 
        <StagingInformation location={this.props.location} StagingInformationDATA={this.BIND_StagingInformationDATA.bind(this)} />
        <div>
            <h3 className="boxGroupTit">
                <p>
                    <span>分期规划条件指标</span>
                 </p>
			</h3>
        </div>
        <Indicators local={this.props} callback={th.evLandList.bind(th)}/>
        </article> 
    }      

}
export default Intallment;