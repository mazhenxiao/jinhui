import React from 'react'
import {shallowCompare} from '../utils';
import {Select, Row, Col} from 'antd'

const Option = Select.Option;

const rowStyle = {
    height: 28,
    lineHeight: "28px",
};

const labelStyle = {
    textAlign: "right",
    paddingRight: "5px",
};

class WrapperSelect extends React.Component {

    static propTypes = {
        labelText: React.PropTypes.string,
        promiseLoader: React.PropTypes.func,//支持promise
        dataSource: React.PropTypes.array,//同步情况下的数据源
        showRequired: React.PropTypes.bool,//显示必填 *
        showDefault: React.PropTypes.bool,//是否显示默认项 请选择
        defaultValue: React.PropTypes.string,//默认值
    };

    static defaultProps = {
        showDefault: true,
        labelSpan:4,
        inputSpan: 20,
        defaultValue: "",
        promiseLoader: () => {
            return Promise.resolve([]);
        },
        showRequired: false,
        showDefault: true,
    };

    state = {
        data: [],
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    componentDidMount() {
        this.initData();
    }

    initData = () => {
        const {promiseLoader} = this.props;

        if (!promiseLoader || typeof promiseLoader !== "function") {
            return;
        }
        promiseLoader()
            .then(res => {
                this.setState({data: res});
            })
            .catch(error => {
                console.log("获取数据失败", error);
            });
    };

    render() {

        let {labelText, labelSpan, inputSpan, dataSource, showDefault, showRequired, className, ...selectProps} = this.props;
        let options = [];
        let defaultOption = <Option key="1" value="">请选择</Option>;
        if (showDefault) options.push(defaultOption);

        let {data} = this.state;
        if (dataSource) {
            data = dataSource;
        }
        if (Array.isArray(data) && data.length > 0) {
            data.forEach((item, index) => {
                options.push(<Option key={item.id} value={item.id}>{item.name}</Option>);
            });
        }

        if (labelText) {
            return (
                <Row style={rowStyle} className={className}>
                    <Col span={labelSpan} style={labelStyle}>
                        {showRequired ? <span style={{color: "red"}}>*</span> : null}
                        {labelText}
                    </Col>
                    <Col span={inputSpan}>
                        <Select style={{width: '100%'}} {...selectProps}>
                            {options}
                        </Select></Col>
                </Row>
            );
        }

        return (
            <Row style={rowStyle}>
                <Select {...selectProps} style={{width: '100%'}}>
                    {options}
                </Select>
            </Row>
        );
    }
}

export default WrapperSelect;