/**
 *
 */
import React, {Component} from 'react'
import {Input, Row, Col, Select, Modal, Button} from 'antd'
import {shallowCompare} from '../utils';
import WrapperSelect from './wrapper-select';
import {AreaConstants} from '../constants';

const {Option, OptGroup} = Select;

const rowStyle = {
    height: 28,
    lineHeight: "28px",
    marginBottom: "10px",
};

const labelStyle = {
    textAlign: "right",
    paddingRight: "5px",
};

class WrapperModalSelect extends Component {

    static propTypes = {
        labelSpan: React.PropTypes.number,
        inputSpan: React.PropTypes.number,
        labelText: React.PropTypes.string.isRequired,
        multiple: React.PropTypes.bool,
        promiseLoader: React.PropTypes.func,//支持promise
        dataSource: React.PropTypes.array,//同步情况下的数据源
        onSelectChange: React.PropTypes.func,//选择项发生改变时
        showRequired: React.PropTypes.bool,//显示必填 *
        showDefault: React.PropTypes.bool,//是否显示默认
    };

    static defaultProps = {
        multiple: true,
        showDefault: true,
        labelSpan: 6,
        inputSpan: 18,
        defaultValue: "",
        showRequired: true,
        promiseLoader: () => {
            return Promise.resolve([]);
        },
    };

    state = {
        selectedValue: [],//已经选择的值
        visible: false,//详细属性弹窗是否显示
        filterData: {},//存储选择的信息，key为主选择框选中的值，value为属性选中的值
        addingValue: "",//当前正在添加的值
        propertyData: {},
    };

    //处理属性选择框 change
    handlePropertyChange = (key) => {
        return (value) => {
            this.setState({
                propertyData: {
                    ...this.state.propertyData,
                    [key]: value
                },
            });
        };
    };

    /**
     * 检查属性值
     */
    checkPropertyValue = (key) => {
        const {propertyData} = this.state;
        return !propertyData[key];
    };

    handleChange = (value) => {
        const {multiple} = this.props;
        const {selectedValue, filterData} = this.state;

        if (multiple) {
            const selectingValue = [...value];
            if (selectingValue.length > selectedValue.length) {
                //当选中某一项时, 记录当前选择的项， 打开属性选择窗口 选择属性， 最后点击确认按钮， 这个才是选中某一项目的的整个操作
                const addingValue = selectingValue[selectingValue.length - 1];

                this.setState({
                    visible: true,
                    addingValue,
                    propertyData: {},
                });
            }
            else {
                //当取消选择项时
                const newSelectedValue = selectingValue;
                const newFilterData = filterData;
                const validFilterData = this.getValidConditionData(newSelectedValue, newFilterData);

                //触发回调函数
                this.props.onSelectChange && this.props.onSelectChange(validFilterData);

                this.setState({
                    selectedValue: newSelectedValue,
                    propertyData: {},
                });
            }
        } else {
            const newState = {
                selectedValue: [],
                addingValue: value,
                propertyData: {},
                visible: false,
            };
            if (value) {
                newState.visible = true;
            } else {
                //触发回调函数
                this.props.onSelectChange && this.props.onSelectChange([]);
            }
            this.setState(newState);
        }
    };

    renderGroupOption = () => {
        const {dataSource, showDefault} = this.props;
        const optArray = [];
        let defaultOption = <Option key="-1" value="">请选择</Option>;
        if (showDefault) {
            optArray.push(defaultOption);
        }
        dataSource && dataSource.forEach(item => {
            optArray.push(
                <OptGroup key={item.id} label={item.name}>
                    {item.children.map(child => {
                        return (
                            <Option key={child.id} value={child.id}>{child.name}</Option>
                        );
                    })}
                </OptGroup>
            );
        });

        return optArray;
    };

    handleOk = () => {

        if (this.checkPropertyValue("ishaveproperty")//产权属性
            || this.checkPropertyValue("isdecoration")//精装属性
            || this.checkPropertyValue("storeyheight")) //层高属性
        {
            return;
        }

        const {selectedValue, filterData, addingValue, propertyData} = this.state;
        const newSelectedValue = [...selectedValue, addingValue];
        const newFilterData = {
            ...filterData,
            [addingValue]: propertyData,
        };
        const validFilterData = this.getValidConditionData(newSelectedValue, newFilterData);
        //触发回调函数
        this.props.onSelectChange && this.props.onSelectChange(validFilterData);

        this.setState({
            selectedValue: newSelectedValue,
            filterData: newFilterData,
            visible: false,
        })
        ;
    };

    handleCancel = () => {
        this.setState({visible: false, addingValue: ""});
    };

    /**
     * 获取有效的筛选条件 []
     */
    getValidConditionData = (newSelectedValue, newFilterData) => {
        const validConditionData = [];
        const keys = Object.keys(newFilterData);
        keys.forEach(key => {
            if (newSelectedValue.includes(key)) {
                const validCondition = {
                    id: key,
                    isdecoration: newFilterData[key]["isdecoration"],
                    storeyheight: newFilterData[key]["storeyheight"],
                    ishaveproperty: newFilterData[key]["ishaveproperty"],
                };
                validConditionData.push(validCondition);
            }
        });
        return validConditionData;
    };

    renderPropertyModal = () => {
        const {visible} = this.state;
        if (!visible) {
            return null;
        }

        return (
            <Modal
                title="属性选择"
                visible={true}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                maskClosable={false}
                width="360px"
            >
                <Row style={{height: "35px"}}>
                    <WrapperSelect labelText="产权属性：" dataSource={AreaConstants.RightsProperty}
                                   showRequired={this.checkPropertyValue("ishaveproperty")}
                                   onChange={this.handlePropertyChange("ishaveproperty")}/>
                </Row>
                <Row style={{height: "35px"}}>
                    <WrapperSelect labelText="精装属性：" dataSource={AreaConstants.HardcoverProperty}
                                   showRequired={this.checkPropertyValue("isdecoration")}
                                   onChange={this.handlePropertyChange("isdecoration")}/>
                </Row>
                <Row style={{height: "35px"}}>
                    <WrapperSelect labelText="层高属性：" dataSource={AreaConstants.LayerProperty}
                                   showRequired={this.checkPropertyValue("storeyheight")}
                                   onChange={this.handlePropertyChange("storeyheight")}/>
                </Row>
            </Modal>
        );
    };

    render() {

        const {
            labelText, labelSpan, InputSpan, multiple
        } = this.props;

        let {selectedValue, addingValue} = this.state;
        if (!multiple) {
            selectedValue = addingValue;
        }

        return (
            <div>
                <Row style={rowStyle}>
                    <Col span={labelSpan} style={labelStyle}>{labelText}</Col>
                    <Col span={InputSpan}>
                        <Select
                            mode={!!multiple ? "multiple" : "-"}
                            value={selectedValue}
                            style={{width: "55%"}}
                            onChange={this.handleChange}
                            placeholder="请选择"
                        >
                            {this.renderGroupOption()}
                        </Select>
                    </Col>
                </Row>
                {this.renderPropertyModal()}
            </div>
        );
    };
}

export default WrapperModalSelect;