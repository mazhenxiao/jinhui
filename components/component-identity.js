/*项目身份证  */
import React from 'react';
import "babel-polyfill";  //兼容ie
import IndexTab from "../components/tools-index-tab.js";//标签
require("../../Content/css/identity.less");

class identity extends React.Component {
    constructor(arg) {
        super(arg);
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.bind_combobox();
      //  toolsTab.bindTab(this.props);//绑定头部标签
    }
    addTodo(text) {

    }
    bind_combobox() {
        let box = $("#comboBoxCRMProjectState");
        box.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "筹备", value: "0" },
                { label: "在售（在建）", value: "1" },
                { label: "竣备", value: "2" },
                { label: "入住", value: "3" },
                { label: "结案", value: "4" }
            ]
        });
        let PeojectDev = $("#comboboxPeojectDev");
        PeojectDev.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "单独开发", value: "0" },
                { label: "合作开发-派经理", value: "1" },
                { label: "合作开发-不派经理竣备", value: "2" }
            ]
        })
        let property = $("#comboboxisSlefProperty");
        property.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "是", value: "0" },
                { label: "否", value: "1" },
            ]
        })
        let operate = $("#operate");
        operate.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "部分操盘", value: "0" },
                { label: "非操盘", value: "1" },
            ]
        })
        let inproperty = $("#includProperty");
        inproperty.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "是", value: "0" },
                { label: "否", value: "1" },
            ]
        });
        let account = $("#account");
        account.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "单帐套", value: "0" },
                { label: "多帐套", value: "1" },
            ]
        });
        let projectType = $("#projectType");
        projectType.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            reaonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "开发项目", value: "0" },
                { label: "收并购已完工", value: "1" },
                { label: "一级开发及其他", value: "2" },
                { label: "升级改造项目", value: "3" },
                { label: "售转持", value: "4" },
                { label: "外部租赁", value: "5" }
            ]
        });
        let tax = $("#tax");
        tax.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "一般计税", value: "0" },
                { label: "简易计税", value: "1" }
            ]
        });
        let expresion = $("#expresion");
        expresion.combobox({
            valueField: "value",
            textField: "label",
            editable: false,
            readonly: true,
            data: [
                { label: "请选择", value: "", "selected": true },
                { label: "A并表项目", value: "0" },
                { label: "B非并表项目", value: "1" }
            ]
        });
    }
    render() {
        return <div>
            <IndexTab parent={this.props} />
            <article className="index-identity mgT20">
                <section className="identity">
                    <header className="HeaderBar">
                        <h5>
                            <span>项目总图</span>
                            <i className="red">(红色*号为必填项)</i>
                        </h5>
                    </header>
                    <div>
                        <table className="formTable" width="100%">
                            <colgroup>
                                <col width="110" /><col width="" />
                                <col width="150" /><col width="" />
                                <col width="140" /><col width="" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目身份证</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">土地获取日期</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputTextBoxTime boxSizing" id="getTime" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目地址（区位）</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">案名</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">CRM项目状态</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="comboBoxCRMProjectState" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目开发方式方式</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="comboboxPeojectDev" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">分期名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>

                                    <th>
                                        <label className="formTableLabel boxSizing redFont">是否含自持集中物业</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="comboboxisSlefProperty" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">操盘方式</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="operate" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">是否含自持集中物业</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="includProperty" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">项目公司名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目负责人</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">账务帐套模式</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="account" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">投资公司名称</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">项目类型</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="projectType" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目计税方式</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="tax" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">权益比例</label>
                                    </th>
                                    <td>
                                        <b className="suffix">%</b> <p className="mgR20"><input readOnly="readonly" className="inputTextBox boxSizing " type="text" value="" /></p>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">项目并表方式</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" type="text" id="expresion" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">身份证建立日期</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputTextBoxTime boxSizing" id="establish" type="text" value="" />

                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing redFont">身份证更新日期</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputTextBoxTime boxSizing" id="upDate" type="text" value="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
                <section className="mgT20">
                    <header className="HeaderBar">
                        <h5>
                            <span>项目总图</span>
                            <i className="red">(红色*号为必填项)</i>
                        </h5>
                    </header>
                    <table className="formTable" width="100%">
                        <colgroup>
                            <col width="110" /><col width="" />
                            <col width="150" /><col width="" />
                            <col width="140" /><col width="" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目身份证</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">土地获取日期</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" className="inputTextBox inputTextBoxTime boxSizing" id="getTime" type="text" value="" />
                                </td>
                                <th>
                                    <label className="formTableLabel boxSizing redFont">项目地址（区位）</label>
                                </th>
                                <td>
                                    <input readOnly="readonly" className="inputTextBox boxSizing" type="text" value="" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </article>
        </div>
    }




}
export default identity;