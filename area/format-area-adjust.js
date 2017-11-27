/**
 *  业态面积调整 format-area-adjust
 */
import "babel-polyfill";  //兼容ie
import React, {Component} from 'react';
import {Tabs, Row, Col, Button} from 'antd';
import {shallowCompare} from '../utils';

class FormatAreaAdjust extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {
        return (
            <div>
                业态面积调整
            </div>
        );
    };
}

export default FormatAreaAdjust;