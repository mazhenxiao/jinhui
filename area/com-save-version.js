import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Modal} from 'antd';
import iss from "../js/iss";//公共类
import {AreaConstants} from '../constants';
import {WrapperSelect} from '../common';
import "babel-polyfill";  //兼容ie
import "./areaCss/com-SaveVersion.less";

const confirm = Modal.confirm;

const {AreaManageStep, Legend, SelectVertionData} = AreaConstants;
const {Option} = Select;

class SaveVersion extends Component {

    static propTypes = {
        versionData: React.PropTypes.array,
        versionId: React.PropTypes.string,//当前版本
        onVersionChange: React.PropTypes.func,//版本选择项发生改变时
        onSaveVersionData: React.PropTypes.func,//保存当前版本的规划方案指标数据
        onDeleteVersionData: React.PropTypes.func,//保存当前版本的数据
        approvalStatus: React.PropTypes.bool,//审核状态, 真:是审核状态, 假:非审核状态
        versionStatus: React.PropTypes.string,//版本状态  未编制 undraft, 编制中 draft, 审批中 approvaling, 审批通过 approvaled
    };
  
    static defaultProps = {
        versionData: [],
        versionId: "",
        current: "",
        onVersionChange: () => {
        },
        onSaveVersionData: () => {
        },
        onDeleteVersionData: () => {
        },
        onHandleApproval: () => {
        },
        onHandleCreateVersion: () => {
        },
        onHandleBlockFormatEdit: () => {

        },
        onHandleBuildingFormatEdit: () => {

        },
        approvalStatus: false,
        versionStatus: "",
    };
    Jurisdiction=iss.Jurisdiction("areaManage");;//权限
    /**
     * 保存当前版本的规划方案指标数据
     */
    handleSave = () => {
        this.props.onSaveVersionData && this.props.onSaveVersionData();
    };

    handleApproval = () => {
        this.props.onHandleApproval && this.props.onHandleApproval();
    };
    handleCreateVersion = () => {
        this.props.onHandleCreateVersion && this.props.onHandleCreateVersion();
    }
    handleBlockFormatEdit = () => {
        this.props.onHandleBlockFormatEdit && this.props.onHandleBlockFormatEdit();
    }
    handleBuildingFormatEdit = () => {
        this.props.onHandleBuildingFormatEdit && this.props.onHandleBuildingFormatEdit();
    }
    handleDelete = () => {
        confirm({
            title: '删除确认',
            content: '确认要删除该版本吗? ',
            onOk: () => {
                this.props.onDeleteVersionData && this.props.onDeleteVersionData();
            },
            onCancel() {

            },
        });

    };

    /**
     * Change事件
     * @param value
     */
    handleChange = (value) => {
        this.props.onVersionChange && this.props.onVersionChange(value);
    };

    renderSaveButton = () => {
        const {approvalStatus, versionStatus} = this.props;
        if (approvalStatus || versionStatus == "approvaling" || versionStatus == "approvaled") {
            return null;
        }
        return (
            Boolean(this.Jurisdiction.includes("save"))&&<button type="button" className="jh_btn jh_btn28 jh_btn_save Left" onClick={this.handleSave}>
                保存</button>
        );
    };

    renderDeleteButton = () => {
        const {approvalStatus, versionStatus} = this.props;
        if (approvalStatus) {
            return null;
        }
        if (versionStatus == "draft") {
            return (
                Boolean(this.Jurisdiction.includes("remove"))&&<button type="button" className="jh_btn jh_btn28 jh_btn_delete Left" onClick={this.handleDelete}>
                    删除</button>
            );
        }
        return null;
    };
    getApprovalStatus = () => {
        const {current} = this.props;
        if (current != "") {
            return true;
        }
        return false;
    };
    renderApprovalButton = () => {
        const {approvalStatus, versionStatus} = this.props;
        if (approvalStatus || versionStatus == "approvaling" || versionStatus == "approvaled") {
            return null;
        }
        return (
            Boolean(this.Jurisdiction.includes("approval"))&&<button type="button" onClick={this.handleApproval} className="jh_btn jh_btn28 jh_btn_apro Left">发起审批
            </button>
        );
    };
    renderButtonList = () => {
        //审批状态时,不显示阶段按钮
        const {approvalStatus, versionStatus, step} = this.props;
        if (approvalStatus) {
            return null;
        }

        return (
            <div className="Left">
                {
                    
                    Boolean(this.Jurisdiction.includes("newVersion"))&&
                <button type="button" className="jh_btn jh_btn28 jh_btn_add" onClick={this.handleCreateVersion}>
                    生成新版本
                </button>
                 }
                {
                    parseInt(step.guid) <= 2 ?
                    Boolean(this.Jurisdiction.includes("blockFormatEdit"))&&<button type="button" className="jh_btn jh_btn28 jh_btn_save"
                                onClick={this.handleBlockFormatEdit}>业态维护
                        </button> :
                    Boolean(this.Jurisdiction.includes("buildingFormatEdit"))&&<button type="button" className="jh_btn jh_btn28 jh_btn_save"
                                onClick={this.handleBuildingFormatEdit}>业态/楼栋维护
                        </button>
                }
            </div>
        );
    };
    renderVersion = () => {
        const {versionData, versionId, approvalStatus} = this.props;
        if (approvalStatus) {
            return null;
        }
        return (
            <div className="areaVeSel">
                <WrapperSelect dataSource={versionData} labelText="当前版本:" showDefault={false}
                               labelSpan={11}
                               inputSpan={13}
                               style={{width: "80px"}}
                               value={versionId}
                               onChange={this.handleChange}/>
            </div>
        );
    };

    render() {
        const {versionData, versionId, approvalStatus} = this.props;
        const currentVersion = versionData.filter(item => item.id === versionId)[0];

        return (
            <div className="PosRight">
                {this.renderButtonList()}
                {this.renderApprovalButton()}
                {this.renderSaveButton()}
                {this.renderDeleteButton()}
                {this.renderVersion()}
                {
                    !approvalStatus ?
                        <span className="areaStatus">状态: {currentVersion ? currentVersion["statusName"] : "无"}</span>
                        : null
                }
            </div>
        );

    }

}

export default SaveVersion;