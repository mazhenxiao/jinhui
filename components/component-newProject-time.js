import "babel-polyfill";  //兼容ie
import iss from "../js/iss.js";
import React, { Component } from 'react';
class NewProjectTime extends Component {

    static propTypes = {
        //approvalTime: React.PropTypes.number,//审批通过时间
    };

    static defaultProps = {
       //approvalTime:1512381204,
    };

    state = {
        diffTime: 0,
    };

    timer = null;
    componentWillReceiveProps(nextProps){
        let approvalTime = nextProps.approvalTime==undefined || "" || null ? "":nextProps.approvalTime;
        //approvalTime==undefined ? ""
        if(nextProps.approvalTime !=""){
            
            approvalTime = new Date(Date.parse(approvalTime.replace(/-/g, "/")));
            approvalTime = approvalTime.getTime();//最迟解决时间时间戳
            approvalTime=approvalTime/1000;
            this.setState({
                approvalTime:approvalTime,
            })
            this.startTime();//判断是否可以保存和发起审批
        }
    }
    componentDidMount() {
        
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        this.timer = null;

    }
    

    startTime = () => {
        //console.log("startTime");
        const { approvalTime } = this.state;
        let time = "";
        let currentTime =(new Date().getTime())/1000;//此时此刻时间戳
        let diffTime = currentTime-approvalTime;//时间差
        let mins5 = 5 * 60;//5分钟
        //console.log("diffTime",diffTime);
        if (diffTime>0 && diffTime < mins5) {
            //console.log("setInterval");
            diffTime=mins5-diffTime;
            this.setState({
                diffTime,
            });
            this.timer = setInterval(() => {
                const { diffTime } = this.state;
                //console.log("diffTime",diffTime);
                const newDiffTime = diffTime - 1;
                if (newDiffTime > 0) {
                    this.setState({
                        diffTime: newDiffTime,
                    });
                }
                else {
                    this.setState({
                        diffTime: 0,
                    });
                    clearInterval(this.timer);
                    this.props.endTiming && this.props.endTiming();
                }
            }, 1000);
        }
    }

    

    render() {
        const { diffTime } = this.state;
        const minutes = parseInt(diffTime / 60 % 60, 10);//计算剩余的分钟 
        const seconds = parseInt(diffTime % 60, 10);//计算剩余的秒数 
        const text = `${minutes}分${seconds}秒`;
        if (diffTime > 0) {
          
            return <span>({text})</span>
            
        } else {
            //this.props.canOnclick({canOnclick:false});
            return <span></span>
        }
      
        
    }
}
export default NewProjectTime;