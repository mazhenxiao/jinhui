/** 
 * 用来处理动态生成表格
*/

import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
class DynamicTable extends React.Component {
    constructor(arg) {
        super(arg);
        this.count = 0; //初始化记录
        this.rule={};//验证
        this.id = `DynamicTable-${iss.guid}`;
        this.state = { //数据层
            url: "",
            data:this.props.DynamicData||[], //数据
            selected: {}
        }
        
      

    }
    componentDidMount() {
      
    }
    componentDidUpdate(prevProps, prevState) {
        var th = this;
         //this.setState({data:this.props.DynamicData})
        
      /*   if (this.count == 0) {
            this.count = 1;
            this.BIND_INPUT_STATE();
        } */

    }
    BIND_INPUT_STATE() {
        let $da = this.state.data;
        $da.forEach((da, ind) => {
            
        })
    }
    EVENT_CHANGE_DYNAMIC(d, e) { //自定义input事件
      if(d==null){
          return ""
      }else{
          return d;
      }
     //   let val = e.target.value;
       
      //  let selected = this.state.selected;
       // this.props.CallBack(d,val)       
    }
 
    getPost() {
        let th = this;
        iss.ajax({
            type: "POST",
            url: th.props.url,
            sucess(da) {
                let data = typeof da.data == "string" ? JSON.parse(da.data) : da.data;
                th.setState({
                    data: da.rows
                })
            },
            error(e) { }
        })
    }
    setList(da) {
       // console.log(da)
        let typeBox=el=>{
            
             if(el.type=="select"){
              let list =  el.data.map((_d,_i)=>{
                  return <option key={_i} value={_d.val}>{_d.label}</option>
                })
                return <select name={el.id} onChange={this.props.CallBack.bind(this,el)}  value={el.val||""}>{list}</select>
            }else{ 
              return <input   name={el.id} id={el.id} data-pid={el.pid} value={el.val||""}  placeholder={el.edit.indexOf("+m")>=0? "此处为必填项":"请输入内容"} type="text"  onChange={this.props.CallBack.bind(this,el)}  readOnly={el.edit.indexOf("+r")>=0}  />
            }
        }

        return da.map((el, ind) => {
             if(el.exec){
                let reg = /\{.*?\}/ig;
                let arr = el.exec.match(reg);
               
                if(arr){
                    let child = {};
                     arr.forEach((ee,ii)=>{
                        let gid = ee.replace(/[{}]/ig,"");
                        for(let eee = 0 ; eee<da.length;eee++){
                   
                            if(da[eee]["id"]==gid){
                                da[eee]["parent"]=da[eee]["parent"]||{};
                                da[eee]["parent"][el.id]=el.id;
                                child[gid]=child[gid]||{};
                                child[gid]=da[eee];
                                break;  
                            }
                            
                           
                        }
                    }) 
                    el["child"] = child;
                  //  console.log(da);
                }
             }
            return <li key={ind} className="col-sm-4 col-md-4 col-lg-4">
                <label className={el.edit.indexOf("+m") >= 0 ? "require" : ""}>{el.label}</label>
                <i>{el.unit}</i>
                <div>{typeBox(el)}</div>
            </li>
        })

    }
    render() {
        var th = this,_d = this.props.DynamicData;
        return <article className="tools-dynamicTable">
            

            <ul className="row">
                {th.setList(_d)}
            </ul>
 
        </article>
    }
}
export default DynamicTable;