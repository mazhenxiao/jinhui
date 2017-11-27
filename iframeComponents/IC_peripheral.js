/**
 * 外设条件 适用于非当前模块逻辑
 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
require("../../Content/css/IC_peripheral.less");
class ICPeripheral extends React.Component {
    constructor(arg) {
        super(arg)
        this.state = {
            listData: [], //显示数据
            current: []
        }
        this.dataKey = ""; //dataKey
        this.id = ""; //地块id
        this.dataBaseInfo = [];//基础数据
        this.dataGetInfo = [];//获取数据，新数据并入
        window["iframeCallback"] = this.iframeCallback.bind(this);//与父页面数据通信
    }
    componentWillMount() {
        this.dataKey = this.props.location.query["dataKey"];
        this.id = this.props.location.query["currentID"];
        this.GET_ExternalAjaxFirst();//ajax获取数据
    }
    iframeCallback(da, $ele) { //父页面点击ok回掉
        var url = "/Project/ISaveExternal";//保存数据url
        let th = this, data = th.state.listData;
        data.forEach((ee, ii) => {
            if (!ee["LandId"]) {
                ee["LandId"] = th.id;
            }

            ee["FieldList"].forEach((eee, iii) => {  //过滤数据
                delete eee["regExp"];

            })
        })

        let json =JSON.stringify([{
            "LandId": th.id,
            "ExternalData":data
        }]);

        iss.ajax({
            type: "POST",
            url: url,
            dataType: "JSON",
            data: { 
                "projectId":th.dataKey,    
                "externalInfoJson": json
            },
            success(da) {
                top.iss.popover({ content: "保存成功", type: 2 });
                $ele.modal("hide");
            },
            error(E) {
                top.iss.popover({ content: "保存失败", type: 1 });
                $ele.modal("hide");
            }
        })

    }
    CHECK_APPRAL() { //查询地块是否存在不存在则给新的
        let th = this;
        let data = this.dataGetInfo.filter((el, ind) => {
            if (el["LandId"] == th.id) {
                return el
            }
        });

        if (!data.length) {
            let _data = JSON.parse(th.dataBaseInfo);
            this.dataGetInfo.push({ "LandId": th.id, "ExternalData": _data });
            this.setState({
                listData: _data,
                current: _data[0],
                activeID: _data[0]["QuotaGroup"]  //当前激活
            })
        } else {
            this.setState({
                listData: data[0]["ExternalData"],
                current: data[0]["ExternalData"][0],
                activeID: data[0]["ExternalData"][0]["QuotaGroup"]  //当前激活
            })
        }
    }
    GET_ExternalAjaxFirst() {  //获取空数据用于新增地块时
        let url = "/Project/INewLandExternalInfo";  //空数据
        let url2 = "/Project/ILandsExternalInfo"; //存在数据

        let th = this;
        let projectId = this.dataKey;
        //判断是否内存有数据
        let static_data = top.sessionStorage.getItem(`$$dataKey-${projectId}-static`);
        // let dynamic_data = top.sessionStorage.getItem(`$$dataKey-${projectId}-dynamic`);
        if (static_data) { //判断如果获取过数据则不再获取
            th.dataBaseInfo = top.sessionStorage.getItem(`$$dataKey-${projectId}-static`);
            //th.dataGetInfo = JSON.parse(top.sessionStorage.getItem(`$$dataKey-${projectId}-dynamic`));
            // th.CHECK_APPRAL();
            //  return
        }
        let static_promise = new Promise((resolve, reject) => {
            if (static_data) {
                resolve();
                return;
            }
            iss.ajax({
                url: url,
                data: { projectId: projectId },
                success(da) {
                    let str = da["rows"] ? JSON.stringify(da["rows"]) : "";
                    th.dataBaseInfo = str.replace(/"LandId"\:""/ig, '"LandId":"' + th.id + '"');
                    top.sessionStorage.setItem(`$$dataKey-${projectId}-static`, str);//获取过数据存入内存
                    resolve();
                },
                error() {
                    reject();
                }
            });
        })
        let dynamic_promise = new Promise((resolve, reject) => {
            iss.ajax({   //已有外设条件
                url: url2,
                data: { projectId: projectId },
                success(da) {
                    if (da["rows"] && da["rows"].length) {

                        th.dataGetInfo = da["rows"];
                        //top.sessionStorage.setItem(`$$dataKey-${projectId}-dynamic`, JSON.stringify(th.dataGetInfo));//获取过数据存入内存
                    }
                    resolve();
                },
                error() {
                    reject();
                }
            });
        })

        Promise.all([static_promise, dynamic_promise]).then((arg) => {
            th.CHECK_APPRAL();
        }, (arg) => {
            console.log(arg)
        });


    }
    EVENT_CLICK_UPDATE(da) { //上传
        var url = "../../Project/UpLoadFile"; //上传
        var url2 = "../../Project/IGetAttachmentsByItemId";//获取已上传
        let promise1 = new Promise((resolve, reject) => {
         iss.ajax({
                url: url2,
                data: { "itemId": da.valueId },
                success(da) {
                    if (da && da["rows"]) {
                        resolve(da["rows"]);
                    }
                    resolve("");
                },
                error(e) {
                    reject();
                }
            })
        })
        promise1.then(arg => {
     
            top.iss.upload({
                server: url,
                content:arg,
                fileVal: "FileData",
                formData: {
                    fileId: da.valueId
                },
                onReady($el){
                   
                },
                onUploadSucess(f,render,opt){
                    iss.ajax({
                        url: url2,
                        data: { "itemId": da.valueId },
                        success(da) {
                            render(da["rows"]||[])
                        },
                        error(e) {
                        }
                    })
                   
                },
                onRemove(pa,id){
                  
                  iss.ajax({
                      url:"../../Project/IDeleteAttachment",
                      data:{"attachmentId":id},
                      success(da){
                        pa.remove();
                      },
                      error(e){
                        console.log(e)
                      }
                  })
                }

            })
        })

    }
    EVENT_CHANGE_TEXTAREA(da, ev) { //INPUT
        //  console.log(da);
        let list = this.state.current["FieldList"]; //所有地块
        list.forEach((ee, ind) => {
            if (ee.valueId == da.valueId) {
                ee.val = ev.target.value;
                return;
            }

        })
        this.setState({
            current: this.state.current
        });

    }
    EVENT_CLICK_TAP(da, ev) { //tab绑定事件
        this.setState({
            current: da,
            activeID: da["QuotaGroup"]
        })
    }
    Bind_data_tap() {
        let list = this.state.listData; //所有地块
        return list.map((el, ind) => {
            return <li key={ind} className={el["QuotaGroup"] == this.state.activeID ? "active" : ""} onClick={this.EVENT_CLICK_TAP.bind(this, el)}>{el.QuotaName}</li>
        })
    }
    Bind_List_Peripher() { //筛选数据
        let id = this.id, //地块id
            list = this.state.current; //所有地块

        if (list && list["FieldList"] && list["FieldList"].length) {
            return list["FieldList"].map((el, ind) => {
                return <tr key={ind}>
                    <td className="right" width="300">{el.label}</td>
                    <td className="left">{el.type.toString().toLocaleUpperCase() == "TEXTAREA" ? <textarea value={(el.val || "")} onChange={this.EVENT_CHANGE_TEXTAREA.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0}></textarea> : <input type="text" onChange={this.EVENT_CHANGE_TEXTAREA.bind(this, el)} readOnly={el.edit.indexOf("+r") >= 0} />}</td>
                    <td className="center" width="80"><button className="btn btn-primary" onClick={this.EVENT_CLICK_UPDATE.bind(this, el)}>上传</button></td>
                </tr>
            })
        }
    }
    render() {

        return <article className="peripheral">
            <div className="peripheralList">
                <ul>{this.Bind_data_tap()}</ul>
                <div className="peripheralBox">
                    <table className="row" width="100%"><tbody>
                        {this.Bind_List_Peripher()}
                    </tbody>
                    </table>
                </div>
            </div>
        </article>
    }



}
export default ICPeripheral