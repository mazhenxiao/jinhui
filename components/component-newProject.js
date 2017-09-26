import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import NewProjectCount from "./component-newProject-count.js";
import DynamicTable from "./tools-dynamicTable.js";
class NewProject extends React.Component{
    constructor(arg){
        super(arg);
         iss.hashHistory.listen((local,next)=>{
            console.log(arguments)
        }) 
    }
    render(){
        return <article>
            <NewProjectCount />
        </article>
    }
}
export default NewProject;