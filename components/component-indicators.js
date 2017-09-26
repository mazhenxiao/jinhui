// 分期经济指标（投决会版）
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/intallment.less");
class Indicators extends React.Component {
    constructor(arg) {
        super(arg);
        iss.hashHistory.listenBefore((local,next)=>{
            console.log(local);
        })
        console.log(this.props.location)
    }
    render() {
        return <article className="staging-box">
               <h3 className="boxGroupTit">
                    <p>
                        <span>分期经济指标</span>
                        <i>（投决会版）</i>
                    </p>
				</h3>
                <section className="boxSizing">
                    <table className="formTable" width="100%">
                            <colgroup>
                                <col width="150" /><col width="" />
                                <col width="150" /><col width="" />
                                <col width="150" /><col width="" />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">总用地面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                   <th>
                                        <label className="formTableLabel boxSizing">总建筑面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">总可售面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">分期总货值</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                    <th></th>
                                    <td></td>
                                    <th></th>
                                    <td></td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">地上建筑面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                   <th>
                                        <label className="formTableLabel boxSizing">地上可售面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">地上不可售面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">地下建筑面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                   <th>
                                        <label className="formTableLabel boxSizing">地下可售面积（非车位）</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">地下不可售面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                </tr>

                                <tr>
                                    <th>
                                        <label className="formTableLabel boxSizing">地下建筑面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                   <th>
                                        <label className="formTableLabel boxSizing">地下可售面积（非车位）</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                    <th>
                                        <label className="formTableLabel boxSizing">地下不可售面积</label>
                                    </th>
                                    <td>
                                        <input readOnly="readonly" className="inputTextBox inputGray boxSizing" type="text" value="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                </section>
        </article>
    }

}

export default Indicators;