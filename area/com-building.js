/**
 *  产品构成--按楼栋 com-building（3~9）
 */

import React, {Component} from 'react';
import {shallowCompare} from '../utils/index';
import {Button, Row, Col} from 'antd';
import {WrapperGroupTable, WrapperInput} from '../common';

class ComBuilding extends Component {

    static propTypes = {
        headerData: React.PropTypes.array,
        dataSource: React.PropTypes.array,
        onBuildingClick: React.PropTypes.func,
        approvalStatus: React.PropTypes.bool,//是否是审批
        versionStatus: React.PropTypes.string,//版本状态  未编制 undraft, 编制中 draft, 审批中 approvaling, 审批通过 approvaled
    };

    static defaultProps = {
        headerData: [],
        dataSource: [],
        onBuildingClick: () => {
        },
        approvalStatus: false,
        versionStatus: "",
    };

    state = {
        formatKey: "",
        buildingKey: "",
    };

    filterFormatKey = "";
    filterBuildingKey = "";

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.step.code !== nextProps.step.code
            || this.props.dataKey !== nextProps.dataKey
            || this.props.versionId !== nextProps.versionId) {

            this.filterFormatKey = "";
            this.filterBuildingKey = "";
            this.setState({
                formatKey: "",
                filterFormatKey: "",
            });
        }
    }

    /**
     *  处理文本框change事件
     */
    handleInputChange = (key) => (e) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    handleClick = (text, record, descType) => {
        return () => {
            //楼栋 Building
            //业态 ProductType
            record.descType = descType;
            this.props.onBuildingClick && this.props.onBuildingClick(record, text);
        };
    };

    getColumnRender = () => {
        const {approvalStatus, versionStatus} = this.props;
        if (approvalStatus || versionStatus == "approvaling" || versionStatus == "approvaled") {
            return {
                PRODUCTNAME: (text, record) => {
                    if (record["LevelId"] === 1)
                        return <span className="format-tree-parent">{text}</span>;
                    return <span className="format-tree-child">{text}</span>;
                }
            };
        } else {
            return {
                PRODUCTNAME: (text, record) => {
                    if (record["LevelId"] === 1)
                        return <a className="format-tree-parent"
                                  onClick={this.handleClick(text, record, "Building")}>{text}</a>;
                    return <a className="format-tree-child"
                              onClick={this.handleClick(text, record, "ProductType")}>{text}</a>;
                }
            };
        }
    };

    /**
     * 处理本地搜索
     */
    handleLocalSearch = () => {
        const {formatKey, buildingKey} = this.state;
        this.filterFormatKey = formatKey.trim();
        this.filterBuildingKey = buildingKey.trim();
        this.forceUpdate();
    };

    /**
     * 获取帅选后的数据
     * 一级楼栋，二级业态
     */
    getFilterDataSource = () => {
        const {dataSource} = this.props;

        if (this.filterBuildingKey == "" && this.filterFormatKey == "") {
            return dataSource;
        }
        //匹配的一级楼栋
        const matchBuildingData = dataSource.filter(item => {
            if (item["LevelId"] != 1) {
                return false;
            }
            if (this.filterBuildingKey == "") {
                return true;
            }
            if (item["PRODUCTNAME"].indexOf(this.filterBuildingKey) > -1) {
                return true;
            }
            return false;
        });
        //匹配的二级业态
        const matchFormatData = dataSource.filter(item => {
            if (item["LevelId"] != 2) {
                return false;
            }
            if (this.filterFormatKey == "") {
                return true;
            }
            if (item["PRODUCTNAME"].indexOf(this.filterFormatKey) > -1) {
                return true;
            }
            return false;
        });
        //根据匹配的一级楼栋进行筛选
        let filterDataSource = dataSource.filter(item => {
            return matchBuildingData.some(filterItem => {
                if (item["LevelId"] == 1) {
                    return item.KEY === filterItem.KEY;
                } else {
                    return item.PARENTID === filterItem.KEY;
                }
            });
        });
        //匹配的二级业态进行筛选
        filterDataSource = filterDataSource.filter(item => {
            return matchFormatData.some(filterItem => {
                if (item["LevelId"] == 1) {
                    return item.KEY === filterItem.PARENTID;
                } else {
                    return item.KEY === filterItem.KEY;
                }
            });
        });
        return filterDataSource;
    };

    render() {
        const {formatKey, buildingKey} = this.state;
        const {headerData} = this.props;

        let filterDataSource = this.getFilterDataSource();

        return (
            <div>
                <Row className="padding-bottom-6">
                    <Col span={5}>
                        <WrapperInput labelText="按楼栋：" labelSpan={8} inputSpan={16} value={buildingKey}
                                      onChange={this.handleInputChange("buildingKey")}/>
                    </Col>
                    <Col span={5}>
                        <WrapperInput labelText="按业态：" labelSpan={8} inputSpan={16} value={formatKey}
                                      onChange={this.handleInputChange("formatKey")}/>
                    </Col>
                    <Col span={5} style={{textAlign: "left", paddingLeft: "10px"}}>
                        <Button onClick={this.handleLocalSearch}>查询</Button>
                    </Col>
                </Row>
                <WrapperGroupTable
                    headerData={headerData}
                    dataSource={filterDataSource}
                    rowKey="KEY"
                    columnRender={this.getColumnRender()}
                    fixedAble={true}
                />
            </div>
        );
    };
}

export default ComBuilding;