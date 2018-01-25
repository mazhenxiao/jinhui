/**
 * 树形表格
 */

import React, {Component} from 'react';
import {Button, Table, Input} from 'antd';
import {shallowCompare} from '../utils/index';

/**
 * 列默认宽度
 * @type {number}
 */
const defaultWidth = 100;

const numberReg = /^\d{1,8}(?:\.\d{0,2})?$/;

const dataSource = [
    {
        key: 1,
        payment: '项目1—分期1-地块1',
        children: [
            {
                key: 11,
                payment: '1组团1组团1组团',
                children: [
                    {
                        key: 111,
                        payment: '叠拼别墅',
                    }],
            },
            {
                key: 12,
                payment: '未分配车位',
                children: [
                    {
                        key: 112,
                        payment: '可售楼栋',
                    }],
            }],
    }];

const headerData = [
    {
        name: '签约',
        field: 'payment',
        width: 200,
    },
    {
        name: '截止当月1日零点期初库存',
        children: [
            {
                name: '总建筑面积',
                field: "totalArea",
            },
            {
                name: '已签约',
                children: [
                    {
                        name: '可售面积',
                        field: 'saleableArea',
                    },
                    {
                        name: '金额',
                        field: 'money',
                    },
                    {
                        name: '套数',
                        field: 'setNumber',
                    }]
            },
            {
                name: '存货',
                children: [
                    {
                        name: '期初存货可售面积',
                        field: 'beginPeriodArea',
                    },
                    {
                        name: '期初存货货值',
                        field: 'beginPeriodValue',
                    },
                    {
                        name: '18个月以上可售面积',
                        field: 'overArea',
                    }]
            }]
    },
    {
        name: '当年-1月',
        children: [{
            name: '1月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea1',
                },
                {
                    name: '金额',
                    field: 'monthMoney1',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber1',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea2',
                },
                {
                    name: '金额',
                    field: 'monthMoney2',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber2',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea3',
                },
                {
                    name: '金额',
                    field: 'monthMoney3',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber3',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea4',
                },
                {
                    name: '金额',
                    field: 'monthMoney4',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber4',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea5',
                },
                {
                    name: '金额',
                    field: 'monthMoney5',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber5',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea6',
                },
                {
                    name: '金额',
                    field: 'monthMoney6',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber6',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea7',
                },
                {
                    name: '金额',
                    field: 'monthMoney7',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber7',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea8',
                },
                {
                    name: '金额',
                    field: 'monthMoney8',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber8',
                }]
        }]
    },
    {
        name: '当年-2月',
        children: [{
            name: '2月可售面积和金额',
            children: [
                {
                    name: '可售面积',
                    field: 'monthSaleableArea9',
                },
                {
                    name: '金额',
                    field: 'monthMoney9',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber91',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber92',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber93',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber94',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber95',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber96',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber97',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber98',
                },
                {
                    name: '套数',
                    field: 'monthSetNumber99',
                },
            ]
        }]
    }
];

const headerStyle = {
    textAlign: 'center',
    display: 'block'
};

class WrapperTreeTable extends Component {

    static propTypes = {
        showHeader: React.PropTypes.bool,//是否显示表头
        headerData: React.PropTypes.array,//表头数据
        dataSource: React.PropTypes.array,//表格数据源
        rowKey: React.PropTypes.string,//主键
        defaultHeight: React.PropTypes.number,//表格自定义高度
        columnRender: React.PropTypes.object,//自定义render
        onDataChange: React.PropTypes.func,//文本框数据修改
        editState: React.PropTypes.bool,//单元格是否可编辑
        editMode: React.PropTypes.string,//编辑模式 eq: LastLevel:末级可编辑
        fixedAble: React.PropTypes.bool,//固定列是否可用
        firstColumnWidth: React.PropTypes.number,//第一列的宽度
    };

    static defaultProps = {
        showHeader: true,
        headerData: [],
        dataSource: [],
        rowKey: "key",
        defaultHeight: 400,
        columnRender: null,
        editState: false,
        editMode: "",
        fixedAble: true,
        firstColumnWidth: 0,
    };

    handleInputChange = (record, key, column) => {
        return (e) => {
            let value = e.target.value;
            value = value.replace(/\s*/ig, "");
            if (value && !numberReg.test(value)) {
                value = parseFloat(value).toFixed(2);
            }
            record[key] = value;
            this.props.onDataChange && this.props.onDataChange(record.KEY, key, value, record, column);
            this.forceUpdate();
        };
    };

    formatToFixed = (value) => {
        let reg_num = new RegExp(`\\d*\\.\\d{${2}}`); 
        if (!!value && !isNaN(value) && reg_num.test(value)) {
            return parseFloat(value).toFixed(2)
        }
        return value;
    };

    getColumns = (headerData) => {
        const {columnRender, editState, fixedAble, firstColumnWidth, editMode} = this.props;
        let columnArray = [];
        columnArray.scrollX = 0;

        headerData.forEach((headerItem, index) => {
            const column = {
                title: <span style={headerStyle}>{headerItem.name || ""}</span>
            };

            //默认固定第一列
            if (fixedAble && index === 0) {
                column.fixed = "left";
            }
            if(fixedAble == "year"){
                if( index === 0 ||  index === 1 || index === 2 ||  index === 3){
                    column.fixed = "left";
                }
            }

            //render
            if (index != 0) {
                column.render = (text, record) => {
                    let formatText = this.formatToFixed(text);
                    return <span className="wrapper-tree-text-center">{formatText ? formatText : "-"}</span>
                };
            }

            if (columnRender && columnRender[headerItem.field]) {
                column.render = columnRender[headerItem.field];
            }

            if (headerItem.children && Array.isArray(headerItem.children) && headerItem.children.length > 0) {
                column.children = this.getChildColumns(columnArray, headerItem);
            }
            else {
                column.dataIndex = headerItem.field;
                column.key = headerItem.field;
                if (headerItem.width && headerItem.width > 0) {
                    column.width = headerItem.width;
                } else {
                    column.width = defaultWidth;
                }

                if (firstColumnWidth) {
                    column.width = firstColumnWidth;
                }

                columnArray.scrollX += column.width;
            }
            columnArray.push(column);
        });
        return columnArray;
    };

    /**
     * 递归获取下级列头信息
     * @param columnArray
     * @param item
     * @returns {Array}
     */
    getChildColumns = (columnArray, item) => {
        const {editState, columnRender, editMode} = this.props;
        const children = [];
        item.children.forEach(childHeaderItem => {

            const childColumn = {
                title: <span style={headerStyle}>{childHeaderItem.name || ""}</span>
            };

            childColumn.render = (text, record) => {
                let formatText = this.formatToFixed(text);
                return <span className="wrapper-tree-text-center">{formatText ? formatText : "-"}</span>
            };

            if (columnRender && columnRender[childHeaderItem.field]) {
                childColumn.render = columnRender[childHeaderItem.field];
            }

            if (editState) {
                childColumn.render = (text, record) => {
                    let formatText = this.formatToFixed(text);

                    if (childHeaderItem.edit !== "+w") {
                        return formatText;
                    }

                    //如果是末级编辑模式
                    if (editMode && editMode === "LastLevel") {
                        if (!record.children) {
                            return <Input
                                onChange={this.handleInputChange(record, childHeaderItem.field, childHeaderItem)}
                                value={formatText}/>;
                        } else {
                            return formatText;
                        }
                    }

                    return <Input onChange={this.handleInputChange(record, childHeaderItem.field, childHeaderItem)}
                                  value={formatText}/>;
                };
            }

            if (childHeaderItem.children && Array.isArray(childHeaderItem.children) && childHeaderItem.children.length > 0) {
                childColumn.children = this.getChildColumns(columnArray, childHeaderItem);
            }
            else {
                childColumn.dataIndex = childHeaderItem.field;
                childColumn.key = childHeaderItem.field;
                childColumn.width = defaultWidth;

                if (childHeaderItem.width && childHeaderItem.width > 0) {
                    childColumn.width = childHeaderItem.width;
                } else {
                    childColumn.width = defaultWidth;
                }
                columnArray.scrollX += childColumn.width;
            }
            children.push(childColumn);
        });
        return children;
    };

    render() {
        const {headerData, dataSource, rowKey, defaultHeight, showHeader} = this.props;
        let tableColumns = this.getColumns(headerData);
        // if (dataSource && dataSource.length > 0) {
        //     tableColumns = this.getColumns(headerData);
        // }

        return (
            <Table
                showHeader={showHeader}
                rowKey={rowKey}
                columns={tableColumns}
                dataSource={dataSource}
                defaultExpandAllRows={true}
                bordered={true}
                size="small"
                scroll={{x: tableColumns.scrollX, y: defaultHeight}}
                pagination={false}
            />
        );
    }
}

export default WrapperTreeTable