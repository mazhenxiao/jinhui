import "babel-polyfill";  //兼容ie
import React, { Component } from 'react';
import { Spin, Tabs, Row, Col, Button, Select } from 'antd';
import iss from "../js/iss.js";//公共类
import {shallowCompare} from "../utils/shallowCompare";//公共类
import { AreaConstants } from '../constants'; 

const { AreaManageStep, Legend, SelectVertionData } = AreaConstants;
class SaveVersion extends Component {
    state = {
        selectVersionData: SelectVertionData, //版本数据
        currentSelectVersionData: SelectVertionData[0] //当前选中版本
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }
    componentWillReceiveProps(nextProps) {
        if(shallowCompare(this.props.data,nextProps.data)){
            this.FETCH_SelectVersionData();
        }
    }
    componentWillMount() {
        this.FETCH_SelectVersionData();
    }
    componentDidMount() {
        

    }
    //自定义事件
    BIND_EVENT_CHANGE_SelectVertion = (arg) => { //选择版本
        let currentDB = this.state.selectVersionData.filter(ref => {
            if (ref["id"] == arg) {
                return ref
            }
        })
        this.setState({
            currentSelectVersionData: currentDB[0]
        })
        // console.log(this.sessionDB.versionData);
    }
    BIND_ELEMENT_SELECTVERTION = arg => { //绑定版本
        return this.state.selectVersionData.map((el, ind) => {
            return <Option key={el["id"]} value={el["id"]} >{el["versioncode"]}</Option>
        })
    }
    FETCH_SelectVersionData = arg => {  //获取下拉数据
        /**
       * Common/IGetVersionListByBusinessId?ProjectStageId=56EF7587243E4B9EB05029800BFC1F81&step=1&projectLevel=1&dataType=2
       * ProjectStageId  =>项目id或分期版本id
       * step            =>当前阶段
       * projectLevel    =>项目只有一个传1 分期前两个2  三个以后3
       * dataType        =>面积默认值2，价格传3
       */
        let opt = {
            url: "/Common/IGetVersionListByBusinessId",
            type: "GET",
            data: {
                ProjectStageId:this.props.data.dataKey,
                step:this.props.data["step"]?this.props.data["step"]["guid"]:"",
                projectLevel:1,
                dataType:2
            }
        }
      /*   iss.fetch(opt)
            .then(arg => {
                console.log("=========================");
                console.log(arg);
            })
            .catch(error => {
                console.log("=========error======")
                console.log(this.props.data);
            }); */

            iss.ajax({...opt,success(da){
                console.log(da);
            },error(){

            }})
    }
    render() {
        return <div className="PosRight">
            <button type="button" className="jh_btn jh_btn33 jh_btn_save Left">保存</button>
            <div className="areaVeSel">
                <label htmlFor="areaVeSel">当前版本: </label>
                <Select defaultValue={this.state.currentSelectVersionData["id"]} style={{ width: 120 }} onChange={this.BIND_EVENT_CHANGE_SelectVertion}>
                    {this.BIND_ELEMENT_SELECTVERTION()}
                </Select>
            </div>
            <span className="areaStatus">状态:{this.state.currentSelectVersionData["statusname"]}</span>
        </div>

    }

}

export default SaveVersion;