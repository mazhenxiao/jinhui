/**
 *  地块·业态维护 block-format-edit (1~2)
 */

import React, {Component} from 'react';
import {Modal, Spin, Table, Row, Col, Button} from 'antd';
import {shallowCompare} from '../utils';
import {WrapperSelect, WrapperModalSelect} from '../common';
import {AreaConstants} from '../constants';
import {AreaService} from '../services';
import iss from '../js/iss';

class BlockFormatEdit extends Component {

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
        },
        {
            title: '所属地块',
            dataIndex: 'landid',
            key: 'landid',
            width: 200,
            render: (text, record) => {
                return <WrapperSelect dataSource={this.props.conditionData.land} value={text} showDefault={false}
                                      onChange={this.handleChangeProperty(record, "landid")}/>
            },
        },
        {
            title: '产权属性',
            dataIndex: 'ishaveproperty',
            key: 'ishaveproperty',
            width: 200,
            render: (text, record) => {
                const matchProperty = AreaConstants.RightsProperty.filter(item => item.id == text)[0];
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
            width: 200,
            render: (text, record) => {
                const matchProperty = AreaConstants.HardcoverProperty.filter(item => item.id == text)[0];
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
            width: 200,
            render: (text, record) => {
                const matchProperty = AreaConstants.LayerProperty.filter(item => item.id == text)[0];
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
                return (<a href="javascript:;" onClick={this.handleDelete(text)}>删除</a>);
            }
        },
    ];

    handleDelete = (id) => {
        return () => {
            const {dataSource} = this.state;
            const remain = dataSource.filter(item => item.id !== id);
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
        const {land, residence, commercial, business, parkAndSupport, dataSource} = this.state;
        //TODO 校验
        if (!land) {
            iss.error("请选择所属地块！");
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
                    levelId: item.levelId
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
        const {loading, land, dataSource} = this.state;
        const {conditionData} = this.props;

        return (
            <Modal
                title={"地块·业态维护"}
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
                    <Row gutter={16} style={{marginBottom: "10px"}}>
                        <Col span={6}>
                            <WrapperSelect labelText="所属地块:" dataSource={conditionData.land}
                                           labelSpan={8}
                                           inputSpan={16}
                                           showRequired={!land}
                                           onChange={this.handleSelectChange("land")}/>
                        </Col>
                        <Col span={18} style={{textAlign: "right"}}>
                            <Button type="primary" onClick={this.handleCreateFormat}>生成业态</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={5}>
                            <WrapperModalSelect labelText="住宅:" multiple={false} dataSource={conditionData.residence}
                                                onSelectChange={this.handleModalSelectChange("residence")}/>
                        </Col>
                        <Col span={5}>
                            <WrapperModalSelect labelText="商办:" multiple={false} dataSource={conditionData.commercial}
                                                onSelectChange={this.handleModalSelectChange("commercial")}/>
                        </Col>
                        <Col span={5}>
                            <WrapperModalSelect labelText="商业:" dataSource={conditionData.business}
                                                onSelectChange={this.handleModalSelectChange("business")}/>
                        </Col>
                        <Col span={8}>
                            <WrapperModalSelect labelText="车位、配套及其他可售:" dataSource={conditionData.parkAndSupport}
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

export default BlockFormatEdit;