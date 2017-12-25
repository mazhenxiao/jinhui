import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component, Children} from 'react';
import {Spin, Tabs, Row, Col, Button, Select,Modal,Table} from 'antd';

class assessmentVersionIndex extends Component {
    
        state = {
            
        };
    
    
    componentDidMount() {
        
    }
    componentWillUnmount(){
        
       
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        
    }

    
    render() {
        return (
            <div className="">
                <div className="version-title">
                    <h3 className="boxGroupTit">
                        <p> 
                            <span className='title'>考核版本设置</span>
                        </p>
                    </h3>
                </div>
                <div className="version-content">
                </div>
            </div>
        );
    }
}

export default assessmentVersionIndex;