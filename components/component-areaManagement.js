import React from 'react';
import ReactDOM from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/areaManagement.less");
/**
 * 
 */
import ProcessBar from "./tools-processBar.js";
class AreaManagement extends React.Component{
   constructor(arg){
       super(arg);
       console.log(iss.id);
   }
   BIND_CALLBACK(da){
     var th = this;
    switch(da.tap){
        case "priceProjectlocat":th.BIND_URL1(da);break;
        default: th.BIND_URL2();break;
    }
       //ReactDOM.render()
       console.log()
   }
   BIND_URL2(){
    ReactDOM.render(<div>ffdsafafdssa</div>,document.querySelector("#areaManagement"));
   }
   BIND_URL1(){
    require.ensure([], function (require) {
        let AreaManagementTabel = require('../components/component-areaManagement-1.js').default;
        // console.log(AreaManagement1);
            ReactDOM.render(<AreaManagementTabel />,document.querySelector("#areaManagement"));
      }, "component-areaManagement-1");  
   }
   render(){
       return <article>
           <section>
               <ProcessBar  edit="true" callback={this.BIND_CALLBACK.bind(this)} />
           </section>
           <section className="mgT10" id="areaManagement">
             
           </section>
       </article>
   }
}

export default AreaManagement;