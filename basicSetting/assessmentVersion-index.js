import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import { Table, Icon, Divider, Select, Calendar,Row, Col } from 'antd';
import "./css/assessmentVersion.less";
const Option = Select.Option;
const { Column, ColumnGroup } = Table;
import "../css/button.less";
class assessmentVersionIndex extends Component {
    
        state = {
            
        };
        
    
    componentDidMount() {
        this.bindLeftBart();
    }
    componentWillUnmount(){
        
       
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
    }

    bindLeftBart(){
        $(".JH-Content").addClass("CLASS_AGENTY");
       setTimeout(a=>{
        $(window).trigger("EVENT_CLOSELEFTBAR");
       },1000)
    }

    BIND_Save =()=>{

    }
    renderHeader = () => {

            return (
                <div>
                    <div className="boxGroupTit">
                        <Row>
                            <Col span={12} >
                                <p><span>考核版本设置</span></p>
                            </Col>
                            <Col span={12}>
                                <button type="button" onClick={this.BIND_Save} className="jh_btn jh_btn22 jh_btn_add">保存</button>
                            </Col>
                        </Row>
                    </div>
                </div> 
                
            );
    }

    render() {
        return (
            <div className="">
                <div className="version-title">
                            {this.renderHeader()}

                    <h3 className="boxGroupTit">
                        
                    </h3>
                </div>
                <div className="version-content center">

                </div>
            </div>
        );
    }
}

export default assessmentVersionIndex;