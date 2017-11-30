import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select} from 'antd';
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
    };

    static defaultProps = {
        versionData: [],
        versionId: "",
        onVersionChange: () => {
        },
        onSaveVersionData: () => {
        },
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

    render() {
        const {versionData, versionId} = this.props;
        const currentVersion = versionData.filter(item => item.id === versionId)[0];

        return <div className="PosRight">
            <span className="areaUnit Left">（面积单位：㎡，车位单位：个，限高单位：米）</span>
            <button type="button" className="jh_btn jh_btn28 jh_btn_save Left" onClick={this.handleSave}>保存</button>
            <div className="areaVeSel">
                <WrapperSelect dataSource={versionData} labelText="当前版本" showDefault={false}
                               style={{width: "100px"}}
                               value={versionId}
                               onChange={this.handleChange}/>
            </div>
            <span className="areaStatus">状态 {currentVersion ? currentVersion["statusName"] : ""}</span>
        </div>

    }

}

export default SaveVersion;