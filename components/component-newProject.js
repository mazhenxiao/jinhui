import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import DynamicTable from "./tools-dynamicTable.js";//动态表格
class NewProject extends React.Component{
    constructor(arg){
        super(arg);
        iss.hashHistory.listenBefore((local,next)=>{
            console.log(local)
        })
    }
    render(){
        return <article>
            <section>
                <DynamicTable src="/Home/demoAdd" />
            </section>
        </article>
    }
}
export default NewProject;