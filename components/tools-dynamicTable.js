/** 
 * 用来处理动态生成表格
*/

import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import "../css/tools-dynamicTable.less";//专用css
class DynamicTable extends React.Component{
    constructor(arg){
        super(arg);
        this.data={ //数据层
             url:""
        }
        this.getPost();
    }
    componentDidMount(){
      
    }
    getPost(){
        console.log(this.props)
        iss.ajax({
            type:"POST",
            url:this.props.src,
            sucess(da){
               let data =  typeof da.data=="string"? JSON.parse(da.data):da.data;
               console.log(data);
            },
            error(e){}
        })
    }
    setList(){

        return  <li className="col-sm-4 col-md-4 col-lg-4"><label></label><span><input type="text" /></span><i>万元</i></li>
    }
    render(){
        var th = this;
       return <article className="tools-dynamicTable">
           <ul className="row">
               {th.setList()}
           </ul>
       </article>
    }
}
export default DynamicTable;