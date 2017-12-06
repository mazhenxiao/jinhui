import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table } from 'antd';
import { AreaService } from '../services';
import { shallowCompare, knife } from '../utils';

class TableBar extends Component{
    state = {
        loading: false,
        dataSource:this.props.dataSource||[],//表格数据
        columns:this.props.columns||[],//表头数据
        columnsWidth:0, //默认表格滚动宽度
        currentYear:this.props.year|| new Date().getFullYear()//设置显示年
    }
    componentWillReceiveProps(nextProps, nextState) { }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }
    componentWillMount() { }
    componentDidMount() {
        this.GET_Columns();//获取头部
        this.CET_DataSource();//数据
    }
      /**
     * 设置表格头部
     */
    GET_Columns = arg => {
        let columns = [{
            title: '供货',
            dataIndex: 'Name',
            width: 250,
            className:"CM",
            fixed:"left"
        },
        {
            title: '全盘',
            className:"CM",
            children:[
                {
                    title: '总建筑面积',
                    dataIndex: 'TotalArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '总可售面积',
                    dataIndex: 'TotalSaleArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '总货值',
                    dataIndex: 'TotalMonery',
                    width: 80,
                    className:"CM"
                }
            ]
        },
        {
            title: '截止当月1日零点期初库存',
            className:"CM",
            children: [
                {
                    title: '总建筑面积',
                    dataIndex: 'TotalBuildingArea',
                    width: 80,
                    className:"CM"
                },
                {
                    title: '已供货',
                    className:"CM",
                    children: [
                        {
                            title: '可售面积',
                            dataIndex: 'SuppliedSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '金额',
                            dataIndex: 'SuppliedMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '套数',
                            dataIndex: 'SuppliedNumber',
                            width: 80,
                            className:"CM"

                        }
                    ]
                },
                {
                    title: '存货',
                    className:"CM",
                    children: [
                        {
                            title: '期初存货可售面积',
                            dataIndex: 'StockInitInvSaleaArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '期初存货货值',
                            dataIndex: 'StockInitInvMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '18个月以上可售面积',
                            dataIndex: 'Stock18MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '18个月以上货值',
                            dataIndex: 'Stock18MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '12-18个月可售面积',
                            dataIndex: 'Stock12MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '12-18个月货值',
                            dataIndex: 'Stock12MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '6-12个月可售面积',
                            dataIndex: 'Stock6MonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '6-12个月货值',
                            dataIndex: 'Stock6MonthMonery',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '0-6个月可售面积',
                            dataIndex: 'StockMonthSaleArea',
                            width: 80,
                            className:"CM"
                        },
                        {
                            title: '0-6个月货值',
                            dataIndex: 'StockMonthMonery',
                            width: 80,
                            className:"CM"
                        }
                    ]
                }
            ]
        }];
        let year = parseInt(this.state.currentYear),yearArray=[];
        let First =`FirstYearM1SaleArea:可售面积,FirstYearM1Monery:金额,FirstYearM1Number:套数`,//按规律 12个月
            Second = `SecondYearM1SaleArea:可售面积,SecondYearM1Monery:金额,SecondYearM1Number:套数`,//12个月
            Third  =`ThirdYearQ1SaleArea:可售面积,ThirdYearQ1Monery:金额,ThirdYearQ1Number:套数`,  //季度
            Fourth = `FourthSaleArea:可售面积,FourthMonery:金额,FourthNumber:套数` //三个内容
                    
        for(var i =0;i<4;i++){
            let opt = {};
            if(i<2){ //头两年显示到月
                for(let j=1;j<=12;j++){
                    opt =  {
                            title:`${year+i}年${j}月`,
                            dataIndex:"",
                            className:"CM",
                            children:[{
                                title:"供货",
                                children:[
                                    {dataIndex:i==0? `FirstYearM${j}SaleArea`:`SecondYearM${j}SaleArea`,title:"可售面积",width:80, className:"CM"},
                                    {dataIndex:i==0? `FirstYearM${j}Monery`:`SecondYearM${j}Monery`,title:"金额",width:80, className:"CM"},
                                    {dataIndex:i==0? `FirstYearM${j}Number`:`SecondYearM${j}Number`,title:"套数",width:80, className:"CM"}
                                ]
                            }]
                        };
                columns.push(JSON.parse(JSON.stringify(opt)));
                }
                
            }else if(i==2){ //第三年显示到季度
                for(let jj=1;jj<=4;jj++){
                    opt =  {
                            title:`${year+i}年第${jj}季度`,
                            dataIndex:"",
                            className:"CM",
                            children:[{
                                title:"供货",
                                children:[
                                    {dataIndex:`ThirdYearQ${jj}SaleArea`,title:"可售面积",width:80, className:"CM"},
                                    {dataIndex:`ThirdYearQ${jj}Monery`,title:"金额",width:80, className:"CM"},
                                    {dataIndex:`ThirdYearQ${jj}Number`,title:"套数",width:80, className:"CM"}
                                ]
                            }]
                        };
                columns.push(JSON.parse(JSON.stringify(opt)));
                }
            }else{  //第四年显示
                opt =  {
                    title:`${year+i}年及以后`,
                    dataIndex:"",
                    className:"CM",
                    children:[{
                        title:"供货",
                        children:[
                            {dataIndex:`FourthSaleArea`,title:"可售面积",width:80, className:"CM"},
                            {dataIndex:`FourthMonery`,title:"金额",width:80, className:"CM"},
                            {dataIndex:`FourthNumber`,title:"套数",width:80, className:"CM"}
                        ]
                    }]
                };
                columns.push(JSON.parse(JSON.stringify(opt)));
            }
        }
      
        let width = knife.recursion(columns,0)   //this.COUNT_Width(columns,0);

        this.setState({
            columns,
            columnsWidth:width
        });
        
    }
    CET_DataSource = arg => {
        let data = { 
                "Name":10,
                "TotalArea":80,
                "TotalSaleArea":80,
                "TotalMonery":90,
                "TotalBuildingArea":20,
                "SuppliedSaleArea":30,
                "SuppliedMonery":30,
                "SuppliedNumber":30,
                "StockInitInvSaleaArea":30,
                "StockInitInvMonery":30,
                "Stock18MonthSaleArea":30,
                "Stock18MonthMonery":30,
                "Stock12MonthSaleArea":30,
                "Stock12MonthMonery":30,
                "Stock6MonthSaleArea":30,
                "Stock6MonthMonery":30,
                "StockMonthSaleArea":30,
                "StockMonthMonery":30
            }
        
        let _da=[];
         for(var i=0;i<20;i++){
            let json = JSON.parse(JSON.stringify(data));
                json["key"]=i;
            _da.push(json)

        } 
        this.setState({
            dataSource:_da
        })
    }
    render(){
        return <Table pagination={false} scroll={{ y:300,x:this.state.columnsWidth }}  bordered dataSource={this.state.dataSource} columns={this.state.columns}></Table>
    }
}
export default TableBar;