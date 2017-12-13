/**
 *  楼栋供货--动态调整
 */

import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Spin, Tabs, Row, Col, Button, Select, Table, Modal} from 'antd';
import {WrapperSelect, WrapperTreeTable} from '../common';
import {SupplyService} from "../services";
import "../css/button.less";
import "./css/supply.less";

class PercentAdjust extends Component {
    render() {
        return (
            <div></div>
        );
    };
}

export default PercentAdjust;