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
        var listArr=th.state.listArr;
        setTimeout(function(){
            $(".comp-validatebox").each(function(index,ele){
                var eleDom=$(ele);
                var regInforObj=JSON.parse(eleDom.attr("data-regExp"));
                console.log(regInforObj);
                eleDom.validatebox({
                    required: true,
                    missingMessage:"不能为空",
                    validType:['number','max['+regInforObj['max']+']']
                });
            });
        },500);
        
    }
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
                    <table className={obj.IsAllDevel==0? "table builtAlertTable hide":"table builtAlertTable"}>
                        <tbody>
                            <tr>
                                <td><label>地块名称</label></td>
                                <td><input type="text" id={obj.FieldList[0].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[0].edit=="+r"} value={obj.FieldList[0].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[0].id)}/></td>
                                <td><label>地块编码</label></td>
                                <td><input type="text" id={obj.FieldList[1].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[1].edit=="+r"} value={obj.FieldList[1].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[1].id)}/></td>
                                <td colSpan="2"></td>
                            </tr>
                            <tr>
                                <td><label>总用地面积（㎡）</label></td>
                                <td><input type="text" id={obj.FieldList[2].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[2].edit=="+r"} value={obj.FieldList[2].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[2].id)}/></td>
                                <td><label><span className="red">*</span>建设用地面积（㎡）</label></td>
                                <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[3].regExp} id={obj.FieldList[3].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[3].edit=="+r"} value={obj.FieldList[3].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[3].id)}/></td>
                                <td><label><span className="red">*</span>代征用地面积（㎡）</label></td>
                                <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[4].regExp} id={obj.FieldList[4].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[4].edit=="+r"} value={obj.FieldList[4].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[4].id)}/></td>
                            </tr>
                            <tr>
                                <td><label><span className="red">*</span>计容建筑面积（㎡）</label></td>
                                <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[5].regExp} id={obj.FieldList[5].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[5].edit=="+r"} value={obj.FieldList[5].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[5].id)}/></td>
                                <td><label><span className="red">*</span>土地获取价款（万元）</label></td>
                                <td><input type="text" className="comp-validatebox" data-regExp={obj.FieldList[6].regExp} id={obj.FieldList[6].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[6].edit=="+r"} value={obj.FieldList[6].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[6].id)}/></td>
                                <td><label><span className="red">*</span>楼面均价（元/㎡）</label></td>
                                <td><input type="text" id={obj.FieldList[7].id+'_'+obj.ID} readOnly={obj.IsAllDevel==0||obj.IsAllDevel==1||obj.IsAllDevel==2&&obj.FieldList[7].edit=="+r"} value={obj.FieldList[7].val||''} onChange={th.evInputChange.bind(th,obj.ID,obj.FieldList[7].id)}/></td>
                            </tr>
                        </tbody>
                    </table>
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
            <form id="form_aBuiltLand" method="submit" >
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

export default Winopen;