/**
 *  楼栋·业态维护 building-format-edit (3~9)
 */

import React, {Component} from 'react';
import {Modal, Spin, Table, Row, Col, Button, Input} from 'antd';
import {shallowCompare} from '../utils';
import {WrapperSelect, WrapperInput, WrapperModalSelect} from '../common';
import {AreaConstants} from '../constants';
import {AreaService} from '../services';
import iss from '../js/iss';

class BuildingFormatEdit extends Component {

    static propTypes = {
        onHideModal: React.PropTypes.func,//对外接口 操作完成时 关闭模态窗口
        conditionData: React.PropTypes.object,
    };

    static defaultProps = {
        onHideModal: () => {
        },
        conditionData: {},
    };

    state = {
        dataSource: [],
        loading: false,
        land: "",//地块
        buildingNo: "",//楼栋号
        standardHeight: "",//标准层层高
        residence: [],//住宅
        commercial: [],//商办
        business: [],//商业
        parkAndSupport: [],//车位以及配套
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidMount() {
        this.loadData();
    };

    /**
     * 加载数据
     */
    loadData = () => {
        this.setState({
            loading: true,
        });
        const {step, mode, versionId} = this.props;
        //TODO 使用参数 versionId
        AreaService.getSearchData(step, mode, versionId)
            .then(rows => {
                this.setState({
                        dataSource: [...rows],
                        loading: false,
                    }
                );
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                console.error("发生错误", error);
                iss.error(error);
            })
    };

    columns = [
        {
            title: '业态',
            dataIndex: 'producttypename',
            key: 'producttypename',
            width: 200,
            render: (text, record) => {
                if (record["levelId"] === "1")
                    return <span className="format-tree-parent">{text}</span>;
                return <span className="format-tree-child">{text}</span>;
            }
        },
        {
            title: '标准层层高(m)',
            dataIndex: 'standardfloorheight',
            key: 'standardfloorheight',
            width: 120,
            render: (text, record) => {
                if (record["levelId"] == "1") {
                    return (
                        <Input value={text} onChange={this.handleInputChangeProperty(record, "standardfloorheight")}/>
                    );
                }
                return "-";
            },
        },
        {
            title: '所属地块',
            dataIndex: 'landid',
            key: 'landid',
            width: 200,
            render: (text, record) => {
                if (record["levelId"] == "1")
                    return (
                        <WrapperSelect dataSource={this.props.conditionData.land} value={text} showDefault={false}
                                       onChange={this.handleChangeProperty(record, "landid")}/>
                    );
                return "-";
            },
        },
        {
            title: '产权属性',
            dataIndex: 'ishaveproperty',
            key: 'ishaveproperty',
            width: 160,
            render: (text, record) => {
                if (record["levelId"] == "1") {
                    return "-";
                }
                const matchProperty = this.props.conditionData.rightsProperty.filter(item => item.id == text)[0];
                if (matchProperty) {
                    return matchProperty.name;
                }
                return "";
            },
        },
        {
            title: '精装属性',
            dataIndex: 'isdecoration',
            key: 'isdecoration',
            width: 160,
            render: (text, record) => {
                if (record["levelId"] == "1") {
                    return "-";
                }
                const matchProperty = this.props.conditionData.hardcoverProperty.filter(item => item.id == text)[0];
                if (matchProperty) {
                    return matchProperty.name;
                }
                return "";
            },
        },
        {
            title: '层高属性',
            dataIndex: 'storeyheight',
            key: 'storeyheight',
            width: 160,
            render: (text, record) => {
                if (record["levelId"] == "1") {
                    return "-";
                }
                const matchProperty = this.props.conditionData.layerProperty.filter(item => item.id == text)[0];
                if (matchProperty) {
                    return matchProperty.name;
                }
                return "";
            },
        },
        {
            title: '操作',
            dataIndex: 'id',
            key: 'id',
            width: 100,
            render: (text, record) => {
                return (<a href="javascript:;" onClick={this.handleDelete(text, record)}>删除</a>);
            }
        },
    ];

    /**
     * 删除操作
     * @param id
     * @returns {function()}
     */
    handleDelete = (id, record) => {
        return () => {
            const {dataSource} = this.state;
            let remain = [];
            let deleteArray = [];
            if (record["levelId"] == "1") {
                //点击的一级楼栋删除，则删除楼栋与楼栋下的业态
                remain = dataSource.filter(item => item.id != id && item.parentid != id);
            } else {
                //点击的二级业态删除，则删除业态，如果删除之后，该楼栋没有其他的业态，则楼栋也删除
                let parentId = record["parentid"];
                let other = dataSource.filter(item => item.parentid == parentId && item.id != id);
                if (other.length === 0) {
                    //如果没有同级业态,则同时删除父级楼栋
                    remain = dataSource.filter(item => item.id != parentId && item.parentid != parentId);
                } else {
                    //只过滤掉当前业态
                    remain = dataSource.filter(item => item.id != id);
                }
            }
            this.setState({
                dataSource: [...remain]
            });
        };
    };

    handleChangeProperty = (record, key) => {
        return (value) => {
            record[key] = value;
            this.forceUpdate();
        };
    };

    handleInputChangeProperty = (record, key) => {
        return (e) => {
            record[key] = e.target.value;
            this.forceUpdate();
        };
    };

    handleSave = () => {
        const {dataSource} = this.state;
        const {step, mode, versionId, dataKey} = this.props;
        this.setState({
            loading: true,
        });
        const paramsValue = {
            step: step.code,
            projectLevel: mode,
            versionId,
            dataKey,
            formData: dataSource.map(item => {
                return {
                    id: item.id,
                    landid: item.landid,
                    producttypeid: item.producttypeid,
                    ishaveproperty: item.ishaveproperty,
                    isdecoration: item.isdecoration,
                    storeyheight: item.storeyheight,
                    levelId: item.levelId,
                    baseData: item.baseData,
                    buildKeyId: item.buildKeyId,
                    buildId: item.buildId,
                    groupId: item.groupId,
                    producttypename: item.producttypename,
                    standardfloorheight: item.standardfloorheight,
                    buildName: item.buildName,
                };
            })
        };

        AreaService.saveFormatData(paramsValue)
            .then(result => {
                if (result === "success") {
                    iss.info("保存成功!");
                    this.props.onHideModal && this.props.onHideModal("reload");
                }
                else {
                    return Promise.reject("保存失败");
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                console.error("发生错误", error);
                iss.error(error);
            });
    };
    handleCancel = () => {
        this.props.onHideModal && this.props.onHideModal();
    };

    /**
     * 处理文本框change事件
     */
    handleInputChange = (key) => (e) => {
        this.setState(
            {
                [key]: e.target.value
            }
        );
    };
    /**
     *  处理下拉框change事件
     */
    handleSelectChange = (key) => (value) => {
        this.setState(
            {
                [key]: value
            }
        );
    };

    handleModalSelectChange = (key) => {
        return (value) => {
            this.setState({
                [key]: value,
            });
        };
    };

    /**
     * 生成业态
     */
    handleCreateFormat = () => {
        const {
            land, buildingNo, standardHeight,
            residence, commercial, business, parkAndSupport, dataSource
        }
            = this.state;
        //TODO 校验
        if (!land) {
            iss.error("请选择所属地块！");
            return;
        }
        if (!buildingNo) {
            iss.error("楼栋号必填！");
            return;
        }
        if (!standardHeight) {
            iss.error("标准层层必填！");
            return;
        }

        if (residence.length === 0
            && commercial.length === 0
            && business.length === 0
            && parkAndSupport.length === 0) {
            iss.error("住宅/商办/商业/车位及配套 至少选择一个！");
            return;
        }

        this.setState({
            loading: true,
        });

        const paramsValue = {
            landId: land,
            buildingNo,
            standardHeight,
            conditionData: [
                ...residence,
                ...commercial,
                ...business,
                ...parkAndSupport,
            ],
            productTypeList: dataSource.map(item => {
                return {
                    id: item.id,
                    landid: item.landid,
                    producttypeid: item.producttypeid,
                    ishaveproperty: item.ishaveproperty,
                    isdecoration: item.isdecoration,
                    storeyheight: item.storeyheight,
                    standardfloorheight: item.standardfloorheight,
                    baseData: item.baseData,
                    producttypename: item.producttypename,
                    levelId: item.levelId,
                    buildKeyId: item.buildKeyId,
                    buildId: item.buildId,
                    groupId: item.groupId,
                    producttypename: item.producttypename,
                    standardfloorheight: item.standardfloorheight,
                    buildName: item.buildName,
                };
            }),
        };

        //生成业态
        AreaService.createFormatData(paramsValue)
            .then(dataSource => {
                this.setState({
                    dataSource: [...dataSource],
                    loading: false,
                })
            })
            .catch(err => {
                console.error("发生错误", err);
                iss.error(error);
            })

    };

    render() {
        const {loading, land, buildingNo, standardHeight, dataSource} = this.state;
        const {conditionData} = this.props;
        return (
            <Modal
                title={"业态/楼栋维护"}
                visible={true}
                onCancel={this.handleCancel}
                maskClosable={false}
                width="90%"
                footer={[
                    <Button key="save" type="primary" size="large" onClick={this.handleSave}>
                        保存
                    </Button>,
                    <Button key="cancel" type="primary" size="large" onClick={this.handleCancel}>
                        取消
                    </Button>,
                ]}>
                <Spin size="large" spinning={loading}>
                    <Row gutter={16} className="building-format-warn">
                        <div>1. 楼栋可输入连续号【~】连接号【、，】分段楼号。如：1#~10#[指1#至10#]；1#、10#[指1#和10#]</div>
                        <div>2.【车库】应作为单独楼栋进行创建，所有车位归属到【车库】楼栋下，按交付时间或组团进行【车库】楼栋的划分。
                            例如；车库楼栋的名称可填写为【车库】、【XX号车库】、【XX组团车库】等
                        </div>
                    </Row>
                    <Row gutter={16} className="padding-bottom-6">
                        <Col span={6}>
                            <WrapperSelect labelText="所属地块:" dataSource={conditionData.land}
                                           showRequired={!land}
                                           onChange={this.handleSelectChange("land")}/>
                        </Col>
                        <Col span={7}>
                            <WrapperInput
                                labelSpan={8}
                                inputSpan={16}
                                labelText={"楼栋号:"}
                                value={buildingNo}
                                showRequired={!buildingNo}
                                onChange={this.handleInputChange("buildingNo")}/>
                        </Col>
                        <Col span={7}>
                            <WrapperInput
                                labelSpan={8}
                                inputSpan={16}
                                labelText={"标准层层高(m):"}
                                value={standardHeight}
                                showRequired={!standardHeight}
                                onChange={this.handleInputChange("standardHeight")}/>
                        </Col>
                        <Col span={4} style={{textAlign: "right"}}>
                            <Button type="primary" onClick={this.handleCreateFormat}>生成业态</Button>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={5}>
                            <WrapperModalSelect labelText="住宅:" multiple={false} dataSource={conditionData.residence}
                                                conditionData={conditionData}
                                                onSelectChange={this.handleModalSelectChange("residence")}/>
                        </Col>
                        <Col span={5}>
                            <WrapperModalSelect labelText="商办:" multiple={false} dataSource={conditionData.commercial}
                                                conditionData={conditionData}
                                                onSelectChange={this.handleModalSelectChange("commercial")}/>
                        </Col>
                        <Col span={5}>
                            <WrapperModalSelect labelText="商业:" dataSource={conditionData.business}
                                                conditionData={conditionData}
                                                onSelectChange={this.handleModalSelectChange("business")}/>
                        </Col>
                        <Col span={8}>
                            <WrapperModalSelect labelText="车位、配套及其他可售:" dataSource={conditionData.parkAndSupport}
                                                conditionData={conditionData}
                                                labelSpan={9} inputSpan={15}
                                                onSelectChange={this.handleModalSelectChange("parkAndSupport")}/>
                        </Col>
                    </Row>
                    <div className="table-wapper">
                        <Table dataSource={dataSource} rowKey="id" size={"middle"} pagination={false} bordered={true}
                               columns={this.columns}/>
                    </div>
                </Spin>
            </Modal>
        );
    };
}

export default BuildingFormatEdit;