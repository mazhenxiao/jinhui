import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
class AreaManagementTabel extends React.Component{
    render(){
        return <article>
              <header className="iss-headTitle">
                   <ul className="iss-headTitle-bar">
                       <li>规划方案</li>
                       <li>产品构成</li>
                   </ul>
                   <p className="iss-headTitle-bar">（面积单位：㎡，车位单位：个，限高单位：米）</p>
                   <div className="iss-headTitle-button">
                       <button className="refresh-icon addIcon">生成新版本</button>
                       <button className="refresh-icon addIcon ClickThePopUp3">业态/楼栋维护</button>
                       <p><label>当前版本：</label><input type="text" id="version" /></p>
                       <p>状态：编制中</p>
                   </div>
               </header>
               <section className="AM-block">
                   <div className="AM-block-child" id="AM-block-child-programme">

                   </div>
                   <div className="AM-block-child" id="AM-block-child-constitute">

                   </div>
               </section>
        </article>
    }
}

export default AreaManagementTabel;