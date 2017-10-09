/* 供货 */
import React from 'react';
import "babel-polyfill";  //兼容ie
import IndexTab from "../components/component-priceControl";//标签
class PriceInvestment extends React.Component {
    constructor(arg) {
        super(arg);
        this.state={
            version:[
                {"guid":"1","value":"V3.0","text":"V3.0"},
                {"guid":"2","value":"V2.0 2017-09-26","text":"V2.0 2017-09-26"},
                {"guid":"3","value":"V1.0 2017-09-20","text":"V1.0 2017-09-20"}
            ]
        };
    }
    componentWillMount() {
        // render之前
    }
    componentDidMount() {
        // render之后
        let th = this;

        th.icon = $(".icon-bar");
        window.onresize = arg => {
            th.icon.trigger("EVENT_TOGGLEBAR");
        }
        setTimeout(arg => {
            //绑定datagruid1
            th.bind_table_ys()
        }, 500);

        th.icon.on("EVENT_TOGGLEBAR", ev => {
            setTimeout(() => {
                th.table_ys.datagrid("resize");
            }, 500);
            // myChart.setOption(option);
        })
    }
    Event_Change_Version(data, ev) {
        // let el = $(ev.target);
        // el.parent().find("li").removeClass("active");
        // setTimeout(() => { el.addClass("active") });
    }
    addTodo(text) {

    }
    bind_table_ys() {
        let _data = [
            { area: "建设用地面积", number: "-", count: "", group: "" },
            { area: "建设用地面积", number: "-", count: "", group: "" },
            { area: "建设用地面积", number: "-", count: "", group: "" },
            { area: "建设用地面积", area201701: "-", count: "", group: "" }
        ];
        let table = this.table_ys = $("#table-ys");
        table.datagrid({
            width: "auto",
            nowrap: true,
            fitColumns: true,
            // rownumbers:true,
            singleSelect: true,
            frozenColumns: [[
                { field: 'buildingyt', align: "center", title: '楼栋/业态', rowspan: 1, width: 350, fixed: true }
            ]],
            columns: [[

                { field: '', align: "center", title: '全盘', colspan: 2, width: 120, fixed: true },
                { field: 'count', align: "center", title: '当年期初累计供货（A）', colspan: 2, width: 120, fixed: true },
                { field: 'group', align: "center", title: '当年期初存货（B）', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '当年预算新增供货（C）', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '当年预算新增供货（D）', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '当年预算新增供货（E）', colspan: 2, width: 90 },

                { field: 'group', align: "center", title: '2017年', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年1月', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年2月', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年3月', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年4月', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年5月', colspan: 2, width: 90 },
                { field: 'group', align: "center", title: '2017年6月', colspan: 2, width: 90 }
            ], [
                { field: 'count', align: "center", title: '总面积', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '总货值', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }, //==

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true },

                { field: 'count', align: "center", title: '面积(m2)', rowspan: 1, width: 120, fixed: true },
                { field: 'count', align: "center", title: '货值(万元)	', rowspan: 1, width: 120, fixed: true }

            ]],
            data: _data
        });
        let promise_ys = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            })
        })
        return promise_ys;
    }
    render() {
        let versionlist = this.state.version.map((da, ind) => {
            return <option key={ind} value={da.value}>{da.text}</option>
        })
        return <div>
            <React-tools-tab className="React-tools-tab" id="React-tools-tab"></React-tools-tab>
            <IndexTab parent={this.props} />
            <article className="index-supply mgT20 clearboth">
                <section className="supply-ys">
                    <header className="HeaderBar">
                        <h5>
                            <span className="price-left">投决会价格</span>
                            <ul className="price-right opers">
                                <li className="jh-icons"><i className="jh-icon jh-icons-edit"></i><span>编辑</span></li>
                                <li className="jh-icons"><i className="jh-icon jh-icons-export"></i><span>导出EXCEL</span></li>
                                <li><span>当前版本：</span><select id="version">{versionlist}</select></li>
                                <li><span>状态：</span><span>编制中</span></li>
                            </ul>
                        </h5>
                        </header>
                            <table className="formTable" id="table-ys" width="100%">
                            </table>
                </section>
            </article>
        </div>
    }




}
export default PriceInvestment;