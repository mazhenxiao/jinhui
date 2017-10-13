/*选择地块-弹框*/
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../../Content/css/aBuilt.less";

class Winopen extends React.Component{
    constructor(arg){
        super(arg);
        this.state={
            listArr:this.props.selArr,/*地块信息*/
            selectId:this.props.selId,/*选择过的地块*/
            status:this.props.status,/*选择地块或编辑地块*/
        }
        
        this.getAjax(this.props.guid);
        
    }
    // componentDidUpdate(){
        
    // }
    /*绑定html*/
    BIND_BLOCK(){
        var th = this;
        let list=th.state.listArr;
        
       return list.map((obj,index)=>{
            return <div key={obj.ID} className="aBuiltSection">
                    <div className="aBuilt_Title">
                        <span>{obj.Name}</span>
                        <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==1} defaultValue="1" onChange={th.evAllOrParDev.bind(th,obj.ID)} />全部开发</span>
                        <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==2} defaultValue="2" onChange={th.evAllOrParDev.bind(th,obj.ID)} />部分开发</span>
                    </div>
                    <ul className={obj.IsAllDevel==0? "aBuilt_Con hide":"aBuilt_Con"} >
                        {
                            obj.FieldList.map((fieldO,fIndex)=>{
                                return <li key={fieldO.id}><label>{fieldO.label}</label><input type="text" readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&fieldO.edit=="+r"} value={fieldO.val} onChange={th.evInputChange.bind(th,obj.ID,fieldO.id)}/></li>;
                            })
                        }
                    </ul>
                </div>
            });
        
    }
    /*input change*/
    evInputChange(listId,fieldId,event){
        let th=this;
        let list=th.state.listArr;
        let newList=[];
        let val=event.target.value;
        list.forEach((obj,index)=>{
           if(obj.ID==listId){
                obj.FieldList.forEach((feildObj,fIndex)=>{
                    if(feildObj.id==fieldId){
                        feildObj.text=val;
                        feildObj.val=val;
                    }
                });
           }
           newList.push(obj);
        });
        th.setState({
            listArr:newList
        });
    }
    /*点击全部开发或部分开发*/
    evAllOrParDev(listId,event){
        let th=this;
        let list=th.state.listArr;
        let newList=[];
        let val=event.target.value;
        list.forEach((obj,index)=>{
            if(obj.ID==listId){
                obj.IsAllDevel=val;
            }
            newList.push(obj);
         });
         th.setState({
             listArr:newList
         });
         this.props.callback(newList);
    }
    getAjax(id){
        var th = this;
        /*如果是编辑，则不请求数据*/
        let status=th.state.status;
        console.log("进入弹框==查看编辑数据"+status);
        console.log(this.state.listArr);
        if(status=="edit"){
            return false;
        }
        iss.ajax({
            url: "/Stage/IGetLandQuotaByProId",
            type: "get",
            data: { projectId:id },
            sucess(d) {
                let filterList=[];
                filterList=d.rows.filter((obj,index)=>{
                    return !new RegExp(obj.ID,"ig").test(th.state.selectId);
                });
                console.log("过滤后的list");
                console.log(filterList);

                th.setState({
                    "listArr": filterList
                })
            },
            error(d) {
                console.log("错误内容");
                console.log(JSON.stringify(d));
            }
        })
    }
    render(){
        let th=this;
        
        return <div className="aBuiltMain">
            {this.BIND_BLOCK()}
        </div>
    }
    
}

{/* <div className="aBuiltSection">
    <div className="aBuilt_Title">
        <span>世界城-A地块</span>
        <span className="radioSpan"><input type="radio" name="lang" defaultValue="01"/>全部开发</span>
        <span className="radioSpan"><input type="radio" name="lang" defaultValue="02"/>部分开发</span>
    </div>
    <ul className="aBuilt_Con">
        <li><label htmlFor="">地块名称</label><input type="text" id="" defaultValue="地块一"/></li>
        <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
        <li><label>地块名称</label><input type="text" defaultValue="地块一"/></li>
        <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
        <li><label>地块编码</label><input type="text" defaultValue="地块一"/></li>
    </ul>
</div> */}

export default Winopen;