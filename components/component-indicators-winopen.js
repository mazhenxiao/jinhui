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
    componentDidMount(){
        var th=this;
        th.evValiteInputbox();
    }
    /*绑定html*/
    BIND_BLOCK(){
        var th = this;
        let list=th.state.listArr;
        
       return list.map((obj,index)=>{
            return <div key={obj.ID} className="aBuiltSection" id={"section"+obj.ID}>
                        <h3 className="aBuilt_Title">
                                <span>{obj.Name}</span>
                                
                                <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==2} defaultValue="2" onChange={th.evAllOrParDev.bind(th,obj.ID)} />部分开发</span>
                                <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==1} defaultValue="1" onChange={th.evAllOrParDev.bind(th,obj.ID)} />全部开发</span>
                        </h3>
                        <ul className={obj.IsAllDevel==0? "aBuilt_Con hide":"aBuilt_Con"}>
                            {
                                obj.FieldList.map((fieldObj,fIndex)=>{
                                    return <li key={fieldObj.id}>
                                                <label><span className={fieldObj.regExp.length>3&&!fieldObj.exec?"red":"hide"}>*</span>{fieldObj.label}</label>
                                                <input type="text" className={fieldObj.regExp.length>3&&!fieldObj.exec?"comp-validatebox":""} id={fieldObj.id+'_'+obj.ID} data-regExp={fieldObj.regExp} autoComplete="off" readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&fieldObj.edit=="+r"} value={fieldObj.val==null?"":fieldObj.val} onChange={th.evInputChange.bind(th,obj.ID,fieldObj.id)}/>
                                                <span className="unitSpan">{fieldObj.unit?fieldObj.unit:""}</span>
                                            </li>
                                })
                            }
                        </ul>
                </div>
            });
        
    }
    evValiteInputbox(){
        setTimeout(function(){
            $(".comp-validatebox").each(function(index,ele){
                var eleDom=$(ele);
                var isReadAt=eleDom.attr("readonly");

                var regInforObj=JSON.parse(eleDom.attr("data-regExp"));
                console.log(regInforObj);
                var allKeys=Object.keys(regInforObj);
                var validTypeRule=[];
                var valideRule={
                    required: true,
                    missingMessage:"不能为空"
                };

                allKeys.forEach((vType)=>{
                    if(vType=="max"){
                        validTypeRule.push('number','max['+regInforObj[vType]+']');
                    }
                });
                if(validTypeRule.length>0){
                    valideRule.validType=validTypeRule;
                }
                eleDom.validatebox(valideRule);
                
            });
        },600);
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
                /*计算*/
                obj.FieldList.forEach((feildObj,fIndex)=>{
                    if(feildObj.exec){
                        let newVal=th.evCalcContent(feildObj.exec,obj.FieldList);
                        feildObj.text=newVal;
                        feildObj.val=newVal;
                    }
                });
           }
           newList.push(obj);
        });
        th.setState({
            listArr:newList
        });
        
    }
    /*计算表达式*/
    evCalcContent(execStr,obj){
        let val="";
        obj.forEach((item,index)=>{
            let regStr=new RegExp("{"+item.id+"}","ig");
            execStr=execStr.replace(regStr,Number(item.val));
        });
        var blockStr="try{return "+execStr+";}catch(e){console.log(e);}";
        console.log(blockStr);
        return new Function(blockStr)();
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
                if(val==0||val==1){
                    $("#section"+obj.ID+" .comp-validatebox").validatebox("disableValidation");
                }else{
                    $("#section"+obj.ID+" .comp-validatebox").validatebox("enableValidation");
                }
            }
            newList.push(obj);
            
         });
         th.setState({
             listArr:newList
         });
         
         th.props.callback(newList);
         
    }
    getAjax(id){
        var th = this;
        /*如果是编辑，则不请求数据*/
        let status=th.state.status;
        if(status=="edit"){
            return false;
        }
        iss.ajax({
            url: "/Stage/IGetLandQuotaByProId",
            type: "get",
            data: { projectId:id },
            success(d) {
                let filterList=[];
                filterList=d.rows.filter((obj,index)=>{
                    return !new RegExp(obj.ID,"ig").test(th.state.selectId);
                });

                th.setState({
                    "listArr": filterList
                })
            },
            error(d) {
                console.log(JSON.stringify(d));
            }
        })
    }
    render(){
        let th=this;
        
        return <div className="aBuiltMain">
            <form id="form_aBuiltLand">
            {this.BIND_BLOCK()}
            </form>
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
{
    // <div className="aBuilt_Title">
    //     <span>{obj.Name}</span>
    //     <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==1} defaultValue="1" onChange={th.evAllOrParDev.bind(th,obj.ID)} />全部开发</span>
    //     <span className="radioSpan"><input type="radio" name={'radio'+obj.ID} checked={obj.IsAllDevel==2} defaultValue="2" onChange={th.evAllOrParDev.bind(th,obj.ID)} />部分开发</span>
    // </div>
    // <table className={obj.IsAllDevel==0? "table builtAlertTable hide":"table builtAlertTable"}>
    //     <tbody>
            
    //         <tr>
    //             <td><label>地块名称</label></td>
    //             <td><input type="text" id={obj.FieldList[0].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[0].edit=="+r"} value={obj.FieldList[0].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[0].id)}/></td>
    //             <td><label>地块编码</label></td>
    //             <td><input type="text" id={obj.FieldList[1].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[1].edit=="+r"} value={obj.FieldList[1].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[1].id)}/></td>
    //             <td colSpan="2"></td>
    //         </tr>
    //         <tr>
    //             <td><label>总用地面积（㎡）</label></td>
    //             <td><input type="text" id={obj.FieldList[2].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[2].edit=="+r"} value={obj.FieldList[2].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[2].id)}/></td>
    //             <td><label><span className="red">*</span>建设用地面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[3].regExp} autoComplete="off" id={obj.FieldList[3].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[3].edit=="+r"} value={obj.FieldList[3].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[3].id)}/></td>
    //             <td><label><span className="red">*</span>代征用地面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[4].regExp} autoComplete="off" id={obj.FieldList[4].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[4].edit=="+r"} value={obj.FieldList[4].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[4].id)}/></td>
    //         </tr>
    //         <tr>
    //             <td><label><span className="red">*</span>计容建筑面积（㎡）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[5].regExp} autoComplete="off" id={obj.FieldList[5].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[5].edit=="+r"} value={obj.FieldList[5].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[5].id)}/></td>
    //             <td><label><span className="red">*</span>土地获取价款（万元）</label></td>
    //             <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[6].regExp} autoComplete="off" id={obj.FieldList[6].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[6].edit=="+r"} value={obj.FieldList[6].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[6].id)}/></td>
    //             <td><label>楼面均价（元/㎡）</label></td>
    //             <td><input type="text" id={obj.FieldList[7].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[7].edit=="+r"} value={obj.FieldList[7].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[7].id)}/></td>
    //         </tr>
    //     </tbody>
    // </table>
}
export default Winopen;