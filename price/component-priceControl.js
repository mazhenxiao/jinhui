/**
 * 价格
 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessBar from "../components/tools-processBar.js";
import ExchangeButton from "../components/tools-exchangeButton.js";
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import { Spin, Tabs, Row, Col, Button, Select, Table, Input } from 'antd';
import { AreaConstants } from '../constants';
import { price, AreaService } from '../services';
import { knife } from '../utils';
import"../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./price/price.less";
const { AreaManageStep, Legend } = AreaConstants;
const TabPane = Tabs.TabPane;
const { Option } = Select;
class PriceControl extends React.Component {
    //  this.bindTab();
    state = {
        actionUrl: {
            "GetDataGridTitle": "/Common/GetDataGridTitle",//由组获取指标
            "GetPriceList": "/Price/GetPriceList",//获取价格表格数据
            "GetVersions": "/Common/GetVersionListByBusinessId",//获取版本列表
            "CreatePriceVersion": "/Price/CreatePriceVersion",//创建价格管理版本
        },
        title: {//表格标题
            frozenColumns: [],//固定列
            columns: []//滚动列
        },
        dataKey:this.props.location.query["businessId"]||this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        stepData: [],//阶段
        gridData: [],//表格数据
        version: [],//版本
        step:0,//阶段
        stepName: "",//阶段名称
        curVersion: "空",//当前版本
        status: "",//当前版本状态
        versionData: [],//版本数据
        versionId: "",//版本id
        priceColumns: [],//价格table表头
        priceData: [],//价格数据
        tableLoading: true,//表格加载中
        edit: false,//表格是否可编辑
        isApproal: false, //是否是审批
        disabled:false,  //默认
        isNoPriceData:true //默认没有数据
    };
    sessionCurrentData = {};//点击阶段或初次加载table时暂存数据
    componentWillMount() {
       
    }
    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        const { dataKey, mode } = this.state;
        const { location } = nextProps;
        const nextDataKey = location.query["businessId"]||location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey
            || mode != nextMode) {
            this.setState({
                dataKey: nextDataKey,
                mode: nextMode,
            }
            );
            
            this.loadStep(nextDataKey, nextMode);
        }
        this.SetisApproal(nextProps);
    }

    componentDidMount() {
        //判断是否是审批, 真:审批状态; 假:普通状态
        
        if (this.SetisApproal()) {
            this.changeVersionIdToDataKey();
        } else {
            this.loadStep();
        }
       // this.loadStep();
      //  this.SetisApproal();
       // this.Approal_RevertDataKey();
        //this.Fetch_GetPriceList();
    }

    /**
     * 当前是否是审批
     */
    SetisApproal = arg => {
        
        let stateData = arg? arg.location.query:this.props.location.query;
            this.setState({
                isApproal: Boolean(stateData["current"])
            })
        return Boolean(stateData["current"])
    }
    
    /**
     * 转换数据: 版本id → 项目Id/分期Id
     */
    changeVersionIdToDataKey = () => {
        
         const versionId = this.props.location.query.dataKey;
        AreaService.getBaseInfoByVersionId(versionId)
            .then(baseInfo => {
                const dataKey = baseInfo["parentid"];
                const mode = baseInfo["projectlevel"] == "1" ? "Project" : "Stage";
                const defaultStepId = baseInfo["step"];

                this.setState({
                    dataKey,
                    mode,
                    defaultStepId,
                });

                this.loadStep(dataKey, mode, defaultStepId);
            })
            .catch(error => {
                iss.error(error);
            }); 
    };
    /** 获取
     *  stageversionid,  //项目或版本id
     *  step,  //当前阶段
     *  projectLevel //级别项目传1，分期前两个传2，后面传3
     */
    Fetch_GetPriceList = obj => {

        price.GetPriceList(obj)
            .then(ref => { //表头
                this.Create_PriceColumns(ref.titles);
                return ref.data;
            })
            .then(ref => {  //表数据

                this.Create_TabelData(ref);
            })
            .then(ref => {  //版本

            })
            .catch(err => {
                //console.logs(err);
            })

    }
    /**
     * 设置表头
     */
    Create_PriceColumns = params => {

        let th = this;
        let priceColumns = params.map((da, ind) => {
            let opt = {
                key: ind,
                dataIndex: da["field"],
                title: da["name"],
                width: 80,
                className: da["field"] == "SHOWNAME" ? "text-left" : "text-center",
                render(text, record, index) {

                    //console.log("da.field",da.field)
                    if (da.field == "SHOWNAME") {
                        return <span className={record.LEVELS == "2" ? "Title padL20" : "Title"}>{text}</span>
                    } else if (th.state.edit == true && da.field == "AVERAGEPRICE" && record.LEVELS != "1") {

                        return <Input value={text} className="text-right" onChange={th.EventChangeInput.bind(this, record, da["field"])} />
                    } else {
                        let localText = text;
                        /*      if (da.field == "ISHAVEPROPERTY" || da.field == "ISDECORATION") {
                                 localText = text == 1 ? "是" : "否";
                             } */

                        if (th.state.step&&th.state.step.guid <= 2) {  //前两阶段标准层高级 为空
                            if (da.field == "STANDARDFLOORHEIGHT") {
                                return "";
                            } else {
                                return <span>{localText}</span>;
                            }

                        } else {
                            //后几个阶段标准层高 级别==1的为空
                            if (da.field == "STANDARDFLOORHEIGHT" && record.LEVELS == "1") {
                                return "";
                            } else {
                                return <span>{localText}</span>;
                            }

                        }


                    }
                }
            }
            if (ind == 0) {
               // opt["fixed"] = true;
                opt["width"] = 180;
            }
            /* f(da["field"]=="AVERAGEPRICE"){
                opt["fixed"]=true;
                opt["width"]=180;
            } */
            Array.isArray(da["children"]) && (opt["children"] = da["children"]);
            return opt
        });
        //console.log("title",priceColumns);
        this.setState({
            priceColumns
        })
    }

    Create_TabelData = priceData => {
        // console.log("data",priceData)
        let isNoPriceData =!Boolean(priceData.length);
        isNoPriceData = this.CheckNotCurrentStepAndVertionId();
        
        this.setState({
            isNoPriceData,
            priceData,
            tableLoading: false
        })
    }
    /**
     * 表格输入框事件
     */
    EventChangeInput = (params, row, ev) => {
        let val = ev.target.value;
        params[row] = val;
        this.forceUpdate();
    }
    /**
     * 非当前阶段和非当前最新版本不现实保存和编辑
     */
    CheckNotCurrentStepAndVertionId=(id)=>{
      /*   let currentVertionid=true,currentStep=true,versionId = id|| this.state.versionId;
        if(this.state.versionData&&this.state.versionData.length){
            currentVertionid= this.state.versionData[0].id != versionId;
        }
        if(this.state.step){
            debugger
            currentStep = this.state.step.statusCode!=this.FindCurrentStep(this.state.stepData);
            
        }
        return currentVertionid||currentStep; */
          /* let currentVertionid=true,currentStep=true,versionId = id|| this.state.versionId;
        if(this.state.versionData&&this.state.versionData.length){
            currentVertionid= this.state.versionData[0].id != versionId;
        }
        if(this.state.step){
            
            currentStep = this.state.step.statusCode!="draft";
            
        }
        return currentVertionid||currentStep; */
        return (this.state.versionData.length<=0)||(this.state.step.statusCode!="draft"); 
    }
    /**
     * 查找当前阶段
     * approvaling【审批中】 -> draft【编制中】 -> approvaled 【审批通过】-> undraft 【未编制】 
     */
    FindCurrentStep=(step)=>{

         let da = step;//[{"guid":"1","name":"拿地版","code":"Vote","className":"legend-white","statusCode":"undraft"},{"guid":"2","name":"项目定位会版","code":"ProductPosition","className":"legend-white","statusCode":"undraft"},{"guid":"4","name":"启动会版","code":"Startup","className":"legend-yellow","statusCode":"approvaling"},{"guid":"5","name":"工规证版","code":"Rules","className":"legend-white","statusCode":"undraft"},{"guid":"6","name":"决策书版","code":"Decision","className":"legend-white","statusCode":"undraft"}]
        let state = "approvaling,draft,approvaled,undraft".split(",");
        let currentString="";
            for(var k=0;k<state.length;k++){
                let current =  da.filter(key=>key.statusCode==state[k]);
                if(current.length){
                    
                    currentString=state[k];
                    return currentString;
                  
                }

            }
            debugger
            return "";
    }
    /**
     * 加载步骤
     */
    loadStep = (dataKey, mode) => {
        
        if (dataKey === undefined) {
            dataKey = this.state.dataKey;
            mode = this.state.mode;
        }

        if (!dataKey) {
            return;
        }

        //临时存储当前的step
        let step = undefined;
        let versionId = undefined;
        this.setState({
            loading: true,
            versionId: "",
            tableLoading: true
        });

        /**
         * 先获取阶段数据 => 然后根据阶段获取版本数据 => 最后获取 规划方案指标和面积数据
         */
        AreaService.getStep(dataKey, mode, "Price")
            .then(stepData => {
                
               // let step = stepData[0];
               let step = stepData.filter(params=>{
                   
                   return params.statusCode==this.FindCurrentStep(stepData);
               })[0];
               
               step = step? step:stepData[0]; 
               // let versionId = this.getDefaultVersionId(this.state.versionData);
                this.setState({
                  //  versionId,
                    stepData,
                    step: step,
                });
                if (step) {
                    return AreaService.getVersion(step, dataKey, mode,"Price"); //获取版本
                }
                return Promise.reject("未获取到阶段数据！");
            })
            .then(versionData => {
                
                let versionId = this.getDefaultVersionId(versionData),
                    curVersion = versionData.filter(arg => {
                        return arg["id"] == versionId;
                    })[0]
                
                this.setState({
                    versionData,
                    versionId,
                    curVersion: curVersion ? curVersion.statusName : ""
                });

                return versionId;

            })
            .then(versionId => {
                let opt = {
                    stageversionid: versionId,
                    step: this.state.step.code,
                    projectLevel: this.state.mode == "Project" ? "1" : parseInt(this.state.step.guid) <= 2 ? "2" : "3" //级别项目传1，分期前两个传2，后面传3
                }
                this.sessionCurrentData = opt;//暂存当前数据
                this.Fetch_GetPriceList(opt)
            })
            .catch(error => {
                this.setState({
                    tableLoading: false,
                });
                console.error("发生错误", error);
                iss.error(error);
            })
    };
    /**
     * 获取默认显示的版本Id
     */
    getDefaultVersionId = (versionData) => {
        if (!versionData || !Array.isArray(versionData) || versionData.length === 0) {
            return "";
        }
        return versionData[0]["id"];
    };

    /**
     * 编辑表格
     */
    editNewPriceVersion = (params) => {
        this.setState({
            edit: true
        });

    }
    /**
     * 保存内容
     */
    saveNewPriceVersion = () => {
        this.setState({
            edit: false
        });
        let data = [];
        this.state.priceData.forEach(arg => {
            if (arg["LEVELS"] == "2") {
                data.push({
                    versionId: this.state.versionId,//版本id
                    producttypeId: arg["PRODUCTTYPEID"] || "",//业态ID
                    quotaId: "", //指标ID
                    averagePrice: arg["AVERAGEPRICE"] || "0",//均价
                    totalSaleArea: arg["TOTALSALEAREA"] || "0"//总可售面积
                })
            }
        });

        return price.SavePriceList(data)
            .then(da => {
                this.Fetch_GetPriceList(this.sessionCurrentData)
            })

    }


    /**
     * 发起审批
     */
    handleApproval = params => {
        this.saveNewPriceVersion()
            .then(arg => {
                this.goToApplroal();
            })

    }
    /**
     * 审批跳转
     */
    goToApplroal = arg => {
        //获取小版本跳转
        let versionId = this.state.versionId; //;
        let newProjectStatus = iss.getEVal("priceControl");
        const {isProOrStage} = this.props.location.query;
        iss.hashHistory.push({
            pathname: "/ProcessApproval",
            search: `?e=${newProjectStatus}&dataKey=${versionId}&current=ProcessApproval&areaId=&areaName=&businessId=${this.props.location.query["dataKey"]}&isProOrStage=${isProOrStage}`
        });
        /*      price.IGetProVersion(dataKey)
                 .then(arg => {
                
                 }) */



        //$(window).trigger("treeLoad");
    }
    /**
  * 渲染步骤的颜色状态
  */
    renderStepLend = () => {
        return Legend.map((el, ind) => {
            return (
                <li key={ind} data-guid={el.guid} className={el.class}>{el.text}</li>
            );
        });
    };
    /**
    * 渲染步骤UI
    */
    renderStepList = () => { //阶段
        let { step, stepData } = this.state;
        let len = stepData.length;
        return stepData.map((item, ind) => {
            return (
                <li key={item.guid} style={{ zIndex: len - ind }} className={(step&&item.guid == step.guid) ? "active" : ""}
                    onClick={this.handleStepClick(item)}><span className={item.className}></span>{item.name}</li>
            );
        });
    };
    /**
    * 处理步骤切换10104
    * 根据阶段获取版本数据 => 再获取 规划方案指标和面积数据
    */
    handleStepClick = (newStep) => {
        if(this.state.isApproal){ return}
        return () => {
            const { step, dataKey, mode, versionId } = this.state;
            if (newStep.code === step.code) return;

            this.setState({
                loading: true,
                step: newStep,
            });
            AreaService.getVersion(newStep, dataKey, mode, "Price")
                .then(versionData => {
                    let versionId = this.getDefaultVersionId(versionData),
                        curVersion = versionData.filter(arg => {
                            return arg["id"] == versionId;
                        })[0]
                    this.setState({
                        versionData,
                        versionId,
                        curVersion: curVersion ? curVersion.statusName : ""
                    });
                    return versionId;
                })
                .then(versionId => {
                    let opt = {
                        stageversionid: versionId, //项目或版本id
                        step: this.state.step.code,//当前阶段
                        projectLevel: this.state.mode == "Project" ? "1" : parseInt(this.state.step.guid) <= 2 ? "2" : "3" //级别项目传1，分期前两个传2，后面传3
                    }
                    this.sessionCurrentData = opt;//暂存当前数据
                    this.Fetch_GetPriceList(opt);
                })
        };
    };
    /**
     * 版本下拉切换
     *  stageversionid,  //项目或版本id
     *  step,  //当前阶段
     *  projectLevel //级别项目传1，分期前两个传2，后面传3
     */
    EventChangeSelectVersion = versionId => {

            this.setState({
              //  isNoPriceData:this.CheckNotCurrentStepAndVertionId(versionId),
                versionId
            });
        
       
        let { step, mode } = this.state;
        let opt = {
            stageversionid: versionId,
            step: step.code,
            projectLevel: mode == "Project" ? "1" : parseInt(step.guid) <= 2 ? "2" : "3" //级别项目传1，分期前两个传2，后面传3
        }
        this.sessionCurrentData = opt;//暂存当前数据
        this.Fetch_GetPriceList(opt)
    }
    /* 绑定button */
    BIND_Button = arg => {
        let list = []
        this.state.versionData.forEach((val, ind) => {
            list.push(<Option key={val.id} value={val.id}>{val.name}</Option>)
        });
        let ButtonBar = arg => {
            if (this.state.isApproal) { return }
            if (this.state.edit) {
                return <button type="button" className="jh_btn jh_btn22 jh_btn_save" onClick={this.saveNewPriceVersion}>保存</button>

            } else {
                return <button type="button" className={this.state.isNoPriceData? "hide":"jh_btn jh_btn22 jh_btn_edit"} onClick={this.editNewPriceVersion}>编辑</button>
            }
        }

        // let defaultValue = this.state.versionData.length ? [this.state.versionData[0]["id"]] : "请选择";
        return <ul className="BTN_GROUP">
            <li className=""> {ButtonBar()}</li>
            <li className=""></li>
            <li className=""><span>当前版本：</span><Select value={this.state.versionId} onChange={this.EventChangeSelectVersion} style={{ width: 90 }}>{list}</Select></li>
            <li className=""><span>状态：</span><span id="statusText">{this.state.curVersion}</span></li>
        </ul>
    }
    isApproal = arg => {
        let stateData = this.props.location.query;
        if (this.state.isApproal) {
            return <section className="padB20">
                <ProcessApprovalTab current="priceControl" allSearchArg={stateData} />
            </section>
        }

    }
    renderTable = () => {
        let width = knife.recursion(this.state.priceColumns, 0);
        if (this.state.isApproal) {
            return <div>
                <Table pagination={false} scroll={{ x: width, y: 400 }} loading={this.state.tableLoading} border columns={this.state.priceColumns} dataSource={this.state.priceData}></Table>
            </div>
        } else {
            return <Tabs tabBarExtraContent={this.BIND_Button()}>
                <TabPane tab="价格管理" key="plan-quota" >

                    <Spin spinning={false}>
                        <div>
                            <Table bordered={true} pagination={false} scroll={{ x: width, y: 400 }} loading={this.state.tableLoading} border columns={this.state.priceColumns} dataSource={this.state.priceData}></Table>
                        </div>

                    </Spin>

                </TabPane>
            </Tabs>
        }
    }
    render() {
        var th = this;
        

        return <article>

            {this.isApproal()}

            <section className={this.props.location.query["dataKey"] ? "processBar" : "processBar none"}>
                <header className="price" >
                    <Spin size="large" spinning={false}>
                        <Row className={this.state.isApproal ? "hide" : ""}>
                            <Col span={12}>
                                <ul className="processBar-header">
                                    {this.renderStepLend()}
                                </ul>
                            </Col>
                            <Col span={12}>
                                <div className="Right">
                                    <button type="button" onClick={this.handleApproval} className={this.state.isNoPriceData? "hide":"jh_btn jh_btn22 jh_btn_apro"}>发起审批
                                </button>
                                </div>
                            </Col>
                        </Row>
                        <Row gutter={0}>
                            <Col>
                                <ul className="processBar-List">
                                    {
                                        this.renderStepList()
                                    }
                                </ul>
                            </Col>

                        </Row>
                    </Spin>
                </header>
            </section>
            <section className={this.props.location.query["dataKey"] ? "" : "none"}>
                <article className="index-supply mgT20 clearboth">
                    <section className="supply-ys">
                        {this.renderTable()}
                    </section>
                </article>
            </section>
            <section className={this.props.location.query["dataKey"] ? "none" : "noneBlock"}>
                请选择左侧树内容
            </section>
        </article>
    }
}

export default PriceControl;