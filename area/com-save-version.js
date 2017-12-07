import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select} from 'antd';
import iss from "../js/iss";//公共类
import {AreaConstants} from '../constants';
import {WrapperSelect} from '../common';
import "babel-polyfill";  //兼容ie
require("./areaCss/com-SaveVersion.less");
const {AreaManageStep, Legend, SelectVertionData} = AreaConstants;
const {Option} = Select;

class SaveVersion extends Component {

    static propTypes = {
        versionData: React.PropTypes.array,
        versionId: React.PropTypes.string,//当前版本
        onVersionChange: React.PropTypes.func,//版本选择项发生改变时
        onSaveVersionData: React.PropTypes.func,//保存当前版本的规划方案指标数据
        approvalState: React.PropTypes.bool,//审核状态, 真:是审核状态, 假:非审核状态
    };

    static defaultProps = {
        versionData: [],
        versionId: "",
        onVersionChange: () => {
        },
        onSaveVersionData: () => {
        },
        approvalState: false,
    };

    /**
     * 保存当前版本的规划方案指标数据
     */
    handleSave = () => {
        this.props.onSaveVersionData && this.props.onSaveVersionData();
    };

    /**
     * Change事件
     * @param value
     */
    handleChange = (value) => {
        this.props.onVersionChange && this.props.onVersionChange(value);
    };

    renderSaveButton = () => {
        const {step, approvalState} = this.props;
        if (parseInt(step.guid) <= 2 && !approvalState) {
            return (
                <button type="button" className="jh_btn jh_btn28 jh_btn_save Left" onClick={this.handleSave}>
                    保存</button>
            );
        }
        return null;
    };

    renderVersion = () => {
        const {versionData, versionId, approvalState} = this.props;
        if (approvalState) {
            return null;
        }
        return (
            <div className="areaVeSel">
                <WrapperSelect dataSource={versionData} labelText="当前版本:" showDefault={false}
                               labelSpan={10}
                               inputSpan={14}
                               style={{width: "100px"}}
                               value={versionId}
                               onChange={this.handleChange}/>
            </div>
        );
    };

    render() {
        const {versionData, versionId, approvalState} = this.props;
        const currentVersion = versionData.filter(item => item.id === versionId)[0];

        return (
            <div className="PosRight">
                <span className="areaUnit Left">（面积单位：㎡，车位单位：个，限高单位：米）</span>
                {this.renderSaveButton()}
                {this.renderVersion()}
                {
                    !approvalState ?
                        <span className="areaStatus">状态: {currentVersion ? currentVersion["statusName"] : "无"}</span>
                        : null
                }

            </div>
        );

    }

}

export default SaveVersion;