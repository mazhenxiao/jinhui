import React from 'react';
import ReactDom from 'react-dom';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
class Peripheral extends React.Component {
    constructor(arg) {
        super(arg);
        this.url = "/Project/INewLandExternalInfo";
        this.id = this.props["pid"];
        this.state = {
            firstList: [],//第一次数据
            dataList: [], //获取数据
            tap: [],//标签翻页
            id: "",
            current: 0,//当前点击
        },
            this.content = "";
    }
    getDate() {

    }
    Event_click_edit() {

    }

    componentDidMount() {

    }
    Event_change_test() {

    }
    Bind_List_Peripher() { //筛选数据
        let id = this.props.id, list = this.props.data;
        if (list && list.length) {
            let da = [];
            for (let i = 0; i < list.length; i++) {
                if (list[i].LandId == id) {
                    da = list[i].ExternalData[this.state.current]["FieldList"]
                    break;
                }
            }
            return da.map((el, ind) => {
                return <tr key={ind}>
                    <td className="label">{el.label}</td>
                    <td>{el.type.toString().toLocaleUpperCase() == "TEXTAREA" ? <textarea onChange={this.Event_change_test.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0}></textarea> : <input type="text" onChange={this.Event_change_test.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0} />}</td>
                    <td><button className="btn btn-primary">上传</button></td>
                </tr>
            })

        }
    }
    Bind_data_tap() {

    }
    Bind_list() {
        if (this.props["data"] && this.props["data"].length) {
            return <div className="row">
                <div className="col-sm-4 col-md-4 col-lg-4">
                    <label>外设数据</label>
                    <p> <button className="btn btn-default" onClick={this.Event_click_edit.bind(this)}>编辑</button></p>
                </div>
            </div>
        }
    }
    Bind_List_show() {
        console.log(this.state.dataList)
    }
    render() {

        return <article className="peripheral">{
            this.Bind_list()
        }
            <div className="peripheralList">
                <ul>{this.Bind_data_tap()}</ul>
                <table className="row"><tbody>
                    {this.Bind_List_Peripher()}
                </tbody>
                </table>
            </div>
        </article>
    }

}
export default Peripheral;