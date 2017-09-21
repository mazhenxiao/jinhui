/* 供货 */
import React from 'react';
import "babel-polyfill";  //兼容ie
import IndexTab from "../components/tools-index-tab.js";//标签
class supply extends React.Component {
    constructor(arg) {
        super(arg);

    }
    componentWillMount() {

    }
    componentDidMount() {
        let th = this;

        th.icon = $(".icon-bar");
        window.onresize = arg => {
            th.icon.trigger("EVENT_TOGGLEBAR");
        }
        setTimeout(arg => {
            //绑定datagruid1
            //绑定datagruid2
            th.bindScroll(th.bind_table_ys(), th.bind_table_bm());//绑定滚动
        }, 500);

        th.icon.on("EVENT_TOGGLEBAR", ev => {
            setTimeout(() => {
                th.table_ys.datagrid("resize");
                th.table_bm.datagrid("resize");
            }, 500);
            // myChart.setOption(option);
        })
    }
    bindScroll($a, $b) { //绑定数据滚动
        let th = this;
        Promise.all([$a, $b]).then(arg => {
            let $ys = th.table_ys.data("datagrid").dc.body2, $bm = th.table_bm.data("datagrid").dc.body2;
            let current = "", x = 0, y = 0, t1, t2;
            $ys.bind("scroll.JH", arg => {
                clearTimeout(t1);
                if (current == "bm") { return }
                let yst = arg.target;
                x = yst.scrollLeft, y = yst.scrollTop;
                current = "ys";
                t1 = setTimeout(a => {
                    current = ""
                }, 500);
                $bm.scrollLeft(x).scrollTop(y);

            });
            $bm.bind("scroll.JH", arg => {
                clearTimeout(t2);
                if (current == "ys") { return }
                let bm = arg.target;
                let x = bm.scrollLeft, y = bm.scrollTop;
                current = "bm";
                t2 = setTimeout(a => {
                    current = ""
                }, 500);
                $ys.scrollLeft(x).scrollTop(y);

            })

        }, error => {

        })

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
                { field: 'area', align: "center", title: '供货', rowspan: 1, width: 350, fixed: true }
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
    bind_table_bm() {
        let _data = [
            { area: "area", number: "number-", count: "2count", group: "3group" },
            { area: "2", number: "-", count: "", group: "" },
            { area: "3", number: "-", count: "", group: "" },
            { area: "4", number: "-", count: "", group: "" }
        ];
        let table = this.table_bm = $("#table-bm");
        table.datagrid({
            width: "auto",
            nowrap: true,
            fitColumns: true,
            // rownumbers:true,
            singleSelect: true,
            frozenColumns: [[
                { field: 'area', align: "center", title: '供货', rowspan: 1, width: 350, fixed: true }
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

        let promise_dm = new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve();
            })
        })
        return promise_dm;
    }
    render() {
        return <div>
            <React-tools-tab   className="React-tools-tab" id="React-tools-tab"></React-tools-tab>
            <IndexTab parent={this.props} />
            <article className="index-supply mgT20">
                <section className="supply-ys">
                    <header className="HeaderBar">
                        <h5>
                            <span>项目总图</span>
                            <i className="red">(红色*号为必填项)</i>
                        </h5>
                    </header>
                    <div>
                        <table className="formTable" id="table-ys" width="100%">


                        </table>
                    </div>
                </section>
                <section className="supply-bm mgT20">
                    <header className="HeaderBar">
                        <h5>
                            <span>项目总图</span>
                            <i className="red">(红色*号为必填项)</i>
                        </h5>
                    </header>
                    <div>
                        <table className="formTable" id="table-bm" width="100%">


                        </table>
                    </div>
                </section>

            </article>
        </div>
    }




}
export default supply;