import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, {Component} from 'react';
import {Table, Input, Select} from 'antd';
import {WrapperTreeTable} from '../common';
import {AreaService} from '../services';

require("../css/antd.min.css");
require("../css/payment.css");
require("../css/tools-processBar.less");
require("../css/button.less");
require("../area/areaCss/areaManage.less");

class Index extends Component {

    state = {
        loading: false,
    };

    componentWillMount() {

    }

    render() {

        return (
            <WrapperTreeTable></WrapperTreeTable>
        );
    }
}

export default Index;