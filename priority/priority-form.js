import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
import { Table,Input,Progress } from 'antd';

class PriorityForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
         };//绑定数据
    }
    componentWillReceiveProps(nextProps) {
    }
    componentWillMount() {
         
    }
    componentDidMount() {

    }
    render(){
        return (
                <section className="staging-left boxSizing projectinFormation">
                <from id="FromProjectInfo">
                    <table className="formTable" width="100%">
                        <colgroup>
                            <col width="150" /><col width="" />
                            <col width="150" /><col width="" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目</label>
                                </th>
                                <td>
                                    {/* <input id="PROJECTNAME"  className="inputTextBox boxSizing" type="text" maxLength="20" /> */}
                                    <Input />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">区域</label>
                                </th>
                                <td>
                                    <Input />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">公司</label>
                                </th>
                                <td>
                                    <Input />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险描述</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险影响</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">面前风险解决进展</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">需要集团支持事项</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">重要级别</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">是否解决</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">风险报备时间</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任人</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">责任岗位</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">最迟解决时间</label>
                                </th>
                                <td>
                                    <input id=""  className="inputTextBox boxSizing" type="text" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">备注</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing">附件</label>
                                </th>
                                <td colSpan="5">
                                    <input id=""  className="inputTextBox boxSizing" type="text" maxLength="20" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </from>
            </section>
        );
    }
}
export default PriorityForm;
