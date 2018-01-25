/* 我的草稿 *//* 我的申请 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import AgentyTab from "./tools-agenty-tab.js";//引入头部
import Page from "./tools-page.js";//基于bootstrap分页组件
import { Pagination } from 'antd';
import "../css/antd.min.css";
class Draft extends React.Component {
    constructor(arg) {
        super(arg);
        this.url = "/MyTodo/IGetmytask_draft";
        this.state = {
            dataList: [],
            pageTotal: 0, //页数
            pageCount: 0, //总数
            current:1
        }
    }
    componentWillMount() {
        this.getAjax();
    }
    EVENT_CLICK_PROJECTNAME(da) {

      /*  let search = ""
        switch (da.ENTIID) {
            case "10005": search = `?e=${da.ENTIID}&dataKey=${da.id}&current=ProcessApproval`; break; //项目
            case "10004": search = `?e=${da.ENTIID}&dataKey=${da.id}&projectId=${da.PROJECTID}&current=ProcessApproval`; break; //分歧
        }*/
        //sessionStorage.clear("treeId");
         window.location.href=da.url;
         $(".JH-Content").removeClass("CLASS_AGENTY");
        /*var reg=/\#\/.*?\?/;
        iss.hashHistory.push({ 
            pathname:reg.exec(da.url)[0].replace(/[#\?]/ig,""), 
            search: da.url.split("?")[1]
        });*/
    }
    getAjax(arg) {
        var th = this,page=1,size=10;
        if(arg){
            page=arg
        }
        iss.ajax({
            url: this.url,
            data: {
                page: page,
                size: size
            },
            success(da) {
                th.setState({
                    pageTotal: da.rows.TotalPages,
                    pageCount: da.rows.TotalItems,
                    dataList: da.rows.Items
                })
            },
            error() {

            }
        })
    }
    Bind_Click_Page=(page, pageSize)=> { // 分页回调
        this.setState({current:page},()=>{
            this.getAjax(page);//分页完成后重新获取
        })
        
    }
    agentyTabel() {
        var th = this;
        return th.state.dataList.map((el, ind) => {
            return <tr key={ind}>
                <td className="center">{ind + 1}</td>
                <td className="left">{el.drafttype}</td>
                <td className="left"><a href="javascript:;" onClick={th.EVENT_CLICK_PROJECTNAME.bind(th, el)}>{el.draftname}</a></td>
                <td className="center">{el.updatetime}</td>
            </tr>
        })
    }
    render() {
        let {current,pageCount}=this.state;
        return <article>
            <AgentyTab parent={this.props} />
            <section className="agentyBox mgT20">
                <table id="agentyBoxTabel" className="table2">
                    <colgroup>
                        <col width="40" />
                        <col width="250" />
                        <col />
                        <col width="120" />
                        <col width="120" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>序号</td>
                            <td>草稿类型</td>
                            <td>草稿内容</td>
                            <td>保存时间</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.agentyTabel()}
                    </tbody>
                </table>
                
            </section>
            <div className="agency-pagination">
                <Pagination current={current} total={pageCount} onChange={this.Bind_Click_Page} />
            </div>
        </article>
    }
}

export default Draft;