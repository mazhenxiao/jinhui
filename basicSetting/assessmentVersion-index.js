import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import { Table, Icon, Divider, Select, Calendar } from 'antd';
import "./css/assessmentVersion.less";
const Option = Select.Option;
const { Column, ColumnGroup } = Table;
class assessmentVersionIndex extends Component {
    
        state = {
            
        };
        
    
    componentDidMount() {
        this.bindLeftBart();
    }
    componentWillUnmount(){
        
       
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
    }

    bindLeftBart(){
        $(".JH-Content").addClass("CLASS_AGENTY");
       setTimeout(a=>{
        $(window).trigger("EVENT_CLOSELEFTBAR");
       },1000)
    }
    selectRender () {
        return <div>
                    <Select defaultValue="1" style={{ width: 100 }}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                        <Option value="6">6</Option>
                        <Option value="7">7</Option>
                        <Option value="8">8</Option>
                        <Option value="9">9</Option>
                        <Option value="10">10</Option>
                        <Option value="11">11</Option>
                        <Option value="12">12</Option>
                    </Select>
                </div>
    }

    tableRender () {
    }
    onPanelChange(value, mode) {
        console.log(value, mode);
      }
    timeRender () {
        return <div>
        <Calendar />
      </div>
    }
    render() {
        return (
            <div className="">
                <div className="version-title">
                    <h3 className="boxGroupTit">
                        <p> 
                            <span className='title'>考核版本设置</span>
                        </p>
                    </h3>
                </div>
                <div className="version-content center">
                     <table>
                     <thead>
                        <tr>
                            <th rowSpan="2">
                                <span>项目名称</span>
                            </th>
                            <th colSpan="2">
                                <span>考核版设置</span>
                            </th>
                            <th rowSpan="2">
                                <span>记尾盘日期</span>
                            </th>
                            <th rowSpan="2">
                                <span>关键指标计划</span>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <span>年初</span>
                            </th>
                            <th>
                                <span>年中</span>
                            </th>
                        </tr>
                    </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>{this.selectRender()}</td>
                                <td>{this.selectRender()}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>{this.selectRender()}</td>
                                <td>{this.selectRender()}</td>
                                <td></td>
                                <td></td>
                            </tr>
                            
                        </tbody>
                    </table>
                    
                </div>
                {this.timeRender()}
            </div>
        );
    }
}

export default assessmentVersionIndex;