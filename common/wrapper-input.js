import React, {Component} from 'react'
import {Input, Row, Col} from 'antd'
import {shallowCompare} from '../utils';

const rowStyle = {
    height: 28,
    lineHeight: "28px",
    marginBottom: "10px",
};

const labelStyle = {
    textAlign: "right",
    paddingRight: "5px",
};

class WrapperInput extends Component {

    static propTypes = {
        labelText: React.PropTypes.string.isRequired,
        labelSpan: React.PropTypes.number,
        inputSpan: React.PropTypes.number,
        showRequired: React.PropTypes.bool,//显示必填 *
    };

    static defaultProps = {
        labelSpan: 12,
        inputSpan: 12,
        showRequired: false,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState);
    }

    render() {

        const {labelText, labelSpan, inputSpan, showRequired, ...inputProps} = this.props;

        return (
            <Row style={rowStyle}>
                <Col span={labelSpan} style={labelStyle}>
                    {showRequired ? <span style={{color: "red"}}>*</span> : null}
                    {labelText}
                </Col>
                <Col span={inputSpan}>
                    <Input {...inputProps}></Input>
                </Col>
            </Row>
        );
    }
}

export default WrapperInput;

