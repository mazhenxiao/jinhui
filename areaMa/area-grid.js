/*面积管理=产品构成按业态或楼栋*/
import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";  //兼容ie
import "../js/iss.js";

class AreaGrid extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
        	dataKey:""
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        var th=this;
        th.evRenderTable();
    }
    /*渲染表格头部*/
   evRenderTable(){
   		var th=this;
   		var areaGridDom=$("#areaGrid");
   		iss.ajax({
	   	  	type: "get",
	   	  	url:"/AreaInfo/IGetAreaTitle",
	   	  	success(res){
	   	  		var allDatas=res.rows;
	   	  		
	   	  		console.log(allDatas);
	   	  		areaGridDom.datagrid({
	   	  			nowrap:true,
	   	  			frozenColumns:[allDatas[2]],
	   	  			columns:[allDatas[0],allDatas[1]]
	   	  		});
	   	  	}
	   	  });
   		/*areaGridDom.datagrid({
   			nowrap:true,
   			frozenColumns:[[
		    	{field:'item1',title:'楼栋/业态',colspan:1,align:"center",width:120}
		    ]],
			columns:[[
			    {field:'item2',title:'产权属性',rowspan:2,align:"center",width:80,fix:null},
			    {field:"",title:'总建筑面积（㎡/个）',colspan:3,align:"center",rowspan:1,fix:null},
			    {field:"",title:'实际建筑面积（㎡/个）',colspan:3,align:"center",rowspan:1,fix:null},
			    {field:"",title:'可租售面积(㎡/个)',colspan:7,align:"center",rowspan:1,fix:null},
			],[
				
			    {field:'item2',title:'总面积',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地上',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地下',align:"center",width:80,colspan:1,rowspan:1},
			    
			    {field:'item2',title:'总实际面积',align:"center",width:120,colspan:1,rowspan:1},
			    {field:'item2',title:'地上',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地下',align:"center",width:80,colspan:1,rowspan:1},
			    
			    {field:'item2',title:'总面积',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地上',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地下',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'总实际面积',align:"center",width:120,colspan:1,rowspan:1},
			    {field:'item2',title:'地上',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'地下',align:"center",width:80,colspan:1,rowspan:1},
			    {field:'item2',title:'面积',align:"center",width:80,colspan:1,rowspan:1}
			]],
		    data:[{
		    	item1:"哈哈",
		    	item2:"哈哈"
		    },{
		    	item1:"嘿嘿",
		    	item2:"嘿嘿"
		    }]
   		});*/
   }
    render() {
        return (<div className="areaSession areaSession16">
        		<table id="areaGrid"></table>
        	</div>);
    }
}
export default AreaGrid;