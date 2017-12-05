/**
 *  地块·业态面积调整 block-format-adjust
 */
import React, {Component} from 'react';
import {Modal, Spin, Row, Col, Button} from 'antd';
import {shallowCompare} from '../utils';
import {AreaService} from '../services';
import {WrapperInput, WrapperGroupTable} from '../common';
import iss from '../js/iss';
import {knife} from '../utils';


class BlockFormatAdjust extends Component {

    static propTypes = {
        record: React.PropTypes.object,//点击的面积数据
        onHideModal: React.PropTypes.func,//对外接口 操作完成时 关闭模态窗口
    };

    static defaultProps = {
        record: {},
        onHideModal: () => {
        },
    };

    state = {
        headerData: [],
        dataSource: [],
        loading: false,
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     return shallowCompare(this, nextProps, nextState);
    // }

    componentDidMount() {
        this.loadData();
    };

    /**
     * 改变的数据
     */
    changeDataArray = [];

    /**
     * 加载数据
     */
    loadData = () => {
        this.setState({
            loading: true,
        });
        const {record, step, mode, versionId} = this.props;

        AreaService.getAreaEditData(step, mode, versionId, record["KEY"])
            .then(data => {
                this.setState({
                    loading: false,
                    dataSource: data["productTypeDataInfo"],
                    headerData: data["productTypeTitleInfo"]
                });
            })
            .catch(error => {
                this.setState({
                    loading: false,
                });
                console.error("发生错误", error);
                iss.error(error);
            })
    };

    handleSave = () => {
        this.setState({
            loading: true,
        });

        AreaService.adjustFormatData(this.changeDataArray)
            .then(result => {
                if (result === "success") {
                    iss.info("保存成功!");
                    this.props.onHideModal && this.props.onHideModal("reload");
                } else {
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
     * 处理数据修改
     */
    handleDataChange = (id, key, value) => {
        const changeData = this.changeDataArray.filter(item => item.id === id && item.quotaId === key)[0];
        if (changeData) {
            changeData.quotaValue = value;
        }
        else {
            this.changeDataArray.push({
                id,
                versionId: this.props.versionId,
                quotaId: key,
                quotaValue: value,
            });
        }
    };

    renderContent = () => {
        const {loading, dataSource, headerData} = this.state;
        const {record} = this.props;

        return (
            <Spin size="large" spinning={loading}>
                <Row gutter={16}>
                    <Col span={6}>
                        基本信息
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={10}>
                        <WrapperInput labelText="住宅业态：" disabled={true}
                                      value={record["PRODUCTNAME"] ? record["PRODUCTNAME"] : "无"}></WrapperInput>
                    </Col>
                </Row>
                <div className="table-wapper">
                    <WrapperGroupTable
                        headerData={headerData}
                        dataSource={dataSource}
                        rowKey="KEY"
                        editAble={true}
                        // fixedAble={true}
                        onDataChange={this.handleDataChange}
                    />
                </div>
            </Spin>
        );
    };

    render() {
        // return this.renderContent();
        return (
            <Modal
                title={"业态面积调整"}
                visible={true}
                onCancel={this.handleCancel}
                maskClosable={false}
                width="95%"
                footer={[
                    <Button key="save" type="primary" size="large" onClick={this.handleSave}>
                        保存
                    </Button>,
                    <Button key="cancel" type="primary" size="large" onClick={this.handleCancel}>
                        取消
                    </Button>,
                ]}>
                {this.renderContent()}
            </Modal>
        );
    };
}

export default BlockFormatAdjust;