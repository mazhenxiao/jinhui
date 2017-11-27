import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select, Table } from 'antd';
import { AreaService } from '../services';
import { shallowCompare, knife } from '../utils';

class EsayuiTable extends Component{
    state={

    }
    table="";
    componentWillReceiveProps(nextProps, nextState) { }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps.planData, nextState.planData);
    }
    componentWillMount() { }
    componentDidMount() {
        this.table = $(`#${this.props.id}`);
        this.BIND_EsayuiTable();//绑定table
    }
    /**
     * esayui模拟真实数据
     */
    GET_ColumnsEasyui=arg=>{
        return [
            [
             {"title":"截止当月1日零点期初库存","field":'',colspan:14}],
            [
                {"title":"总建筑面积","field":"TotalBuildingArea",rowspan:2},
                {"title":"已供货","field":"",colspan:3},
                {"title":"存货","field":"",colspan:10}],
            [
                {"title":"可售面积","field":"SuppliedSaleArea",width:120},
                {"title":"金额","field":"SuppliedMonery",width:120},
                {"title":"套数","field":"SuppliedNumber",width:120},

                {"title":"期初存货可售面积","field":"StockInitInvSaleaArea",width:120},
                {"title":"期初存货货值","field":"StockInitInvMonery",width:120},
                {"title":"18个月以上可售面积","field":"Stock18MonthSaleArea",width:120},
                {"title":"18个月以上货值","field":"Stock18MonthMonery",width:120},
                {"title":"12-18个月可售面积","field":"Stock12MonthSaleArea",width:120},
                {"title":"12-18个月货值","field":"Stock12MonthMonery",width:120},
                {"title":"6-12个月可售面积","field":"Stock6MonthSaleArea",width:120},
                {"title":"6-12个月货值","field":"Stock6MonthMonery",width:120},
                {"title":"0-6个月可售面积","field":"StockMonthSaleArea",width:120},
                {"title":"0-6个月货值","field":"StockMonthMonery",width:120}
            ]
        ]
    }
    BIND_EsayuiTable=arg=>{
        this.table.treegrid({
            idField:'id',
            treeField:'name',
           // columns:this.props.columns
           frozenColumns:[[{"title":"供货","field":'Name',width:150,rowspan:3}],[],[]],
           columns:this.GET_ColumnsEasyui()
        })
    }
    render(){
        return <article>
            <table id={this.props.id}></table>
        </article>
    }
}

export default EsayuiTable;