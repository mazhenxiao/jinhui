/**
 * 价格
 */
import React from 'react';
import "../js/iss.js";
import "babel-polyfill";  //兼容ie
import ProcessBar from "../components/tools-processBar.js";
import ExchangeButton from "../components/tools-exchangeButton.js";
import ProcessApprovalTab from "../components/component-ProcessApproval-Tab.js"; //导航信息
import {Spin, Tabs, Row, Col, Button, Select, Table, Input} from 'antd';
import {AreaConstants} from '../constants';
import {price, AreaService} from '../services';
import {knife} from '../utils';
import "../css/tools-processBar.less";
import "../css/button.less";
import "../area/areaCss/areaManage.less";
import "./price/price.less";

const {AreaManageStep, Legend} = AreaConstants;
const TabPane = Tabs.TabPane;
const {Option} = Select;

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
        dataKey: this.props.location.query["businessId"] || this.props.location.query.dataKey || "", /*项目id或分期版本id*/
        mode: this.props.location.query.isProOrStage == "1" ? "Project" : "Stage",//显示模式，项目或者分期
        stepData: [],//阶段
        gridData: [],//表格数据
        version: [],//版本
        step: 0,//阶段
        stepName: "",//阶段名称
        curVersion: "空",//当前版本
        status: "",//当前版本状态
        versionData: [],//版本数据
        versionId: "",//版本id
        priceColumnsSource:[],//原始表个头
        priceColumns: [],//价格table表头
        priceData: [],//价格数据
        tableLoading: true,//表格加载中
        edit: false,//表格是否可编辑
        isApproal: false, //是否是审批
        disabled: false,  //默认
        isNoPriceData: true //默认没有数据
    };
    sessionCurrentData = {};//点击阶段或初次加载table时暂存数据
    componentWillMount() {

    }

    /**
     * 在组件接收到一个新的prop时被调用,这个方法在初始化render时不会被调用
     * param nextProps 下一阶段的props
     */
    componentWillReceiveProps(nextProps) {
        const {dataKey, mode} = this.state;
        const {location} = nextProps;
        const nextDataKey = location.query["businessId"] || location.query.dataKey || "";
        let nextMode = location.query.isProOrStage || "";
        nextMode = nextMode == "1" ? "Project" : "Stage";

        //切换路由之后，重新获取数据

        if (dataKey != nextDataKey
            || mode != nextMode) {
            this.setState({
                    edit: false,
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

        let stateData = arg ? arg.location.query : this.props.location.query;
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
                    edit: false,
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
        let header=[],data = [];
        price.GetPriceList(obj)
            .then(ref => { //表头
                this.Create_PriceColumns(ref.titles);
                return ref.data;
            })
            .then(ref => {  //归集汇总 修改原始数据
             let data=this.NotionalPooling(ref);//设置
            // console.log("data",data);
           // console.log(data);
            return data;
            })
            .then(ref => {  //表数据
                this.Create_TabelData(ref);
            })
            .catch(err => {
                //console.logs(err);
            })

    }
    /**
     * table数据归集向LEVE=1的数据归集
     */
    NotionalPooling(data){
        let pid="";
      return  data.map(arg=>{
            let {LEVELS,key}=arg;
            let newArg = {...arg};
            if(LEVELS==1){
                newArg["parentId"]=key;
                pid= key;
            }else{
                newArg["parentId"]=pid;
            }
            return newArg;
        });
    }
    /**
     * 所有parentId相同的数据向汇总
     * @param {*[JSON] 纵向合并} data 
     * @param {*String 当前父id} parentId 
     * @param {*String 需要汇总的字段名称按逗号分隔} str 
     */
    Exec_ColumsCount(data,parentId,str){
        let arrStr = str.split(",");
        let parents,count={};
        data.forEach(arg=>{
            
            if(arg.parentId==parentId){  //找出当前parentId相同内容部分
                if(arg.key==arg.parentId){  //找到当前 父id
                    parents=arg; 
                    arrStr.forEach(el=>{ //动态变量赋值
                       // count[el]=parseFloat(arg[el]);
                        count[el]=parseFloat(0);
                    })
                }else{
                    arrStr.forEach(el=>{
                        count[el]=parseFloat(count[el]||0)+parseFloat(arg[el]);
                    })
                }
                if(parents){
                    arrStr.forEach(el=>{
                        parents[el]=parseFloat(count[el]||0) //+parseFloat(parents[el]);
                    }) 
                }
               
            }
        })
    }
    /**
     * 
     * @param {*json} data 
     */
    Exec_ColumsJupCount(data){

    }
    /**
     * LEVA =1 总均价计算
     *  的货值PRICE/总可售TOTALSALEAREA=均价AVERAGEPRICE
     * @param {*json} data 
     */
    Exec_AveragePiceCount(data,fixed){
        data.forEach(arg=>{
            let {LEVELS,PRICE,TOTALSALEAREA}=arg;
            if(LEVELS==1){
                if(PRICE==0){ return}
                arg.AVERAGEPRICE=parseFloat(PRICE*10000)/parseFloat(TOTALSALEAREA)
                if(fixed!="undefined"&&fixed!=""){
                    arg.AVERAGEPRICE=arg.AVERAGEPRICE.toFixed(fixed)
                }
              
            }
        })
    }
/**
 * 合计值统计
 * @param {* 汇总数据} data 
 */
    Exec_MainCount(data){
       // this.filterRegEXP("AVERAGEPRICE PRICE");
        let countdb,reg = {
            TOTALSALEAREA:0,
            AVERAGEPRICE_COUNT:0,
            AVERAGEPRICE:this.filterRegEXP("AVERAGEPRICE"),
            PRICE_COUNT:0,
            PRICE:this.filterRegEXP("PRICE")
        }
        
        data.forEach(arg=>{
            if(arg["LEVELS"]==0){
                countdb=arg; 
            }else if(arg["LEVELS"]==1){
               // reg.AVERAGEPRICE_COUNT+=parseFloat(arg.AVERAGEPRICE);
                reg.PRICE_COUNT+=parseFloat(arg.PRICE);
            }
        });
        reg.TOTALSALEAREA=parseFloat(countdb.TOTALSALEAREA); 
        reg.AVERAGEPRICE_COUNT =reg.PRICE_COUNT*10000/parseFloat(reg.TOTALSALEAREA);
        countdb.PRICE=reg.PRICE==""? reg.PRICE_COUNT:parseFloat(reg.PRICE_COUNT).toFixed(reg.PRICE);
        countdb.AVERAGEPRICE=reg.AVERAGEPRICE==""? reg.AVERAGEPRICE_COUNT:parseFloat(reg.AVERAGEPRICE_COUNT).toFixed(reg.AVERAGEPRICE);
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
            
                    if (da.field == "SHOWNAME") {
                        return <span className={record.LEVELS == "2" ? "Title padL20" : "Title"}>
                                {text}
                             </span>
                    } else if (th.state.edit == true && da.field == "AVERAGEPRICE" && record.LEVELS != "1"&&record.LEVELS != "0") {
                         
                        return <Input value={text} className="text-right"
                                      onChange={th.EventChangeInput.bind(this, record, da["field"])}/>
                    } else {
                        let localText = text;
                        if (th.state.step && th.state.step.guid <= 2) {  //前两阶段标准层高级 为空
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
       
        this.setState({
            priceColumnsSource:params,
            priceColumns
        })
    }

    Create_TabelData = priceData => {
       
        let isNoPriceData = !Boolean(priceData.length);
        isNoPriceData = this.CheckNotCurrentStepAndVertionId();
        this.setState({
            isNoPriceData,
            priceData,
            tableLoading: false
        })
    }
    /**
     * 表格输入框事件
     *  this.forceUpdate();
     */
    EventChangeInput = (params, row, ev) => {
        let val = ev.target.value,data = this.state.priceData;
          if(!knife.checkType(val,"number(2)")){return};
            
            params[row] = val;
        
        //横向汇总 TOTALSALEAREA总可售*AVERAGEPRICE 均价=PRICE货值
          knife.setTableExec(row,this.state.priceColumnsSource,[params]);
        //纵向汇总 向parentId汇总
        this.Exec_ColumsCount(data,params.parentId,"PRICE",);
        //横向汇总 LEVE=1 的货值PRICE/总可售TOTALSALEAREA=均价AVERAGEPRICE
        let _reg=this.filterRegEXP("AVERAGEPRICE");
        this.Exec_AveragePiceCount(data,_reg);
        //合计值汇总 
        this.Exec_MainCount(data);
        
        this.setState({
            priceData:data
        })
    }
    /**
     * 
     * @param {* 查询保留小数位} str 
     */
    filterRegEXP(str){
       let _filter = this.state.priceColumnsSource.filter(arg=>arg.field==str)[0],_reg;
        if(_filter){ 
                _reg = _filter.regExps? eval(`(${_filter.regExps})`):"";
                _reg = _reg["type"]? (/\d+/ig).exec(_reg["type"]):"";
                _reg = _reg!=""? _reg[0]:"";
        }
        return _reg
    }
    /**
     * 非当前阶段和非当前最新版本、非状态为0 不现实保存和编辑
     * 1、【非】当前阶段或当前阶段为draft
     * 2、【非】当前最新版本或最新版本的状态为0
     */
    CheckNotCurrentStepAndVertionId = (id) => {
        let currentVertionid = true, currentStep = true,status = true,versionId = id || this.state.versionId;

        currentStep = (this.state.versionData.length <= 0) || (this.state.step.statusCode != "draft")
      
        if (this.state.versionData && this.state.versionData.length) {

            currentVertionid = (this.state.versionData[0].id != versionId)||(this.state.versionData[0].status!="0");

        }

        return (currentStep || currentVertionid)


    }
    /**
     * 查找当前阶段
     * approvaling【审批中】 -> draft【编制中】 -> approvaled 【审批通过】-> undraft 【未编制】
     */
    FindCurrentStep = (step) => {

        let da = step;
        let state = "approvaling,draft,approvaled,undraft".split(",");
        let currentString = "";
        for (var k = 0; k < state.length; k++) {
            let current = da.filter(key => key.statusCode == state[k]);
            if (current.length) {

                currentString = state[k];
                return currentString;

            }

        }

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
                let step = stepData.filter(params => {

                    return params.statusCode == this.FindCurrentStep(stepData);
                })[0];

                step = step ? step : stepData[0];

                this.setState({

                    stepData,
                    step: step,
                });
                if (step) {
                    return AreaService.getVersion(step, dataKey, mode, "Price"); //获取版本
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
        let {step, stepData} = this.state;
        let len = stepData.length;
        return stepData.map((item, ind) => {
            return (
                <li key={item.guid} style={{zIndex: len - ind}}
                    className={(step && item.guid == step.guid) ? "active" : ""}
                    onClick={this.handleStepClick(item)}><span className={item.className}></span>{item.name}</li>
            );
        });
    };
    /**
     * 处理步骤切换10104
     * 根据阶段获取版本数据 => 再获取 规划方案指标和面积数据
     */
    handleStepClick = (newStep) => {
        if (this.state.isApproal) {
            return
        }
        return () => {
            const {step, dataKey, mode, versionId} = this.state;
            if (newStep.code === step.code) return;

  /*           this.setState({
                edit: false,
                loading: true,
                step: newStep,
            }); */
            AreaService.getVersion(newStep, dataKey, mode, "Price")
                .then(versionData => {
                    let versionId = this.getDefaultVersionId(versionData),
                        curVersion = versionData.filter(arg => {
                            return arg["id"] == versionId;
                        })[0]
                    this.setState({
                        edit: false,
                        loading: true,
                        step: newStep,
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
        let cv = this.state.versionData.filter(arg=>arg.id==versionId)[0]
        this.setState({
            edit:false,
            curVersion:cv? cv.statusName:"",
            isNoPriceData: this.CheckNotCurrentStepAndVertionId(versionId),
            versionId
        });

        let {step, mode} = this.state;
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
            if (this.state.isApproal) {
                return
            }
            if (this.state.edit) {
                return <button type="button" className="jh_btn jh_btn22 jh_btn_save" onClick={this.saveNewPriceVersion}>
                    保存</button>

            } else {
                return <button type="button" className="jh_btn jh_btn22 jh_btn_edit" onClick={this.editNewPriceVersion}>
                    编辑</button>
            }
        }

        // let defaultValue = this.state.versionData.length ? [this.state.versionData[0]["id"]] : "请选择";
        return <ul className="BTN_GROUP Right">
            <li className={this.state.isNoPriceData ? "hide" : ""}> {ButtonBar()}</li>
            <li className=""></li>
            <li className="">
                <button type="button" onClick={this.handleApproval}
                        className={this.state.isNoPriceData ? "hide" : "jh_btn jh_btn22 jh_btn_apro"}>
                    发起审批
                </button>
            </li>
            <li className=""><span>当前版本：</span><Select value={this.state.versionId}
                                                       onChange={this.EventChangeSelectVersion}
                                                       style={{width: 90}}>{list}</Select></li>
            <li className=""><span>状态：</span><span id="statusText">{this.state.curVersion}</span></li>
            
        </ul>
    }
    isApproal = arg => {
        let stateData = this.props.location.query;
        if (this.state.isApproal) {
            return <section className="padB20">
                <ProcessApprovalTab current="priceControl" allSearchArg={stateData}/>
            </section>
        }

    }
    BindTableRowClass=(record, index)=>{
        let {LEVELS}=record;
      
        return LEVELS=="1"?  "bg-eee":LEVELS=="0"? "bg-d6":"";
        
    }
    renderTable = () => {
        let width = knife.recursion(this.state.priceColumns, 0);
        if (this.state.isApproal) {//发起审批显示没有价格管理标签用此
            return <div>
                <Table pagination={false} scroll={{x: width, y: 400}} loading={this.state.tableLoading} border
                       columns={this.state.priceColumns} dataSource={this.state.priceData} ></Table>
            </div>
        } else { //正常页面
            return <Tabs>
                <TabPane tab="价格管理" key="plan-quota">

                    <Spin spinning={false}>
                        <div>
                            <Table bordered={true} pagination={false} scroll={{x: width,y:400}}
                                   loading={this.state.tableLoading} border columns={this.state.priceColumns}
                                   dataSource={this.state.priceData} rowClassName={this.BindTableRowClass}></Table>
                        </div>

                    </Spin>

                </TabPane>
            </Tabs>
        }
    }

    render() {
        var th = this;
        let {dataKey,current}=this.props.location.query;

        return <article>

            {this.isApproal()}
         
            <section className={this.props.location.query["dataKey"] ? "processBar" : "processBar none"}>
                <header className="price">
                    <Spin size="large" spinning={false}>
                        <Row className={this.state.isApproal ? "hide" : ""}>
                            <Col span={8}>
                                <ul className="processBar-header">
                                    {this.renderStepLend()}
                                </ul>
                            </Col>
                            <Col span={16}>
                                <div className={this.props.location.query["dataKey"] ? "" : "none"}>
                                    {this.BIND_Button()}
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
            <section className={(dataKey&&current) ? "none" : "noneBlock processBar-Prompt"}>
                <h3>价格管理操作指引</h3>
                <p>1、前置条件：面积管理已审批通过。</p>                
                <p className="Prompt">每当审批通过一版面积信息，系统将自动生成一版编制中的价格信息。</p>
                <p>2、点击【编辑】，填写均价。</p>
                <p className="Prompt"> 只有编制中状态的价格信息才显示【编辑】按钮，未编制、审批中、审批通过均不显示【编辑】按钮。</p>
                <p className="Prompt"> 价格管理中的业态、楼栋、可售面积均来源于对应版本的面积管理。</p>
                <div className="imgBorder"><img src="../img/price.png" /></div>
                <p>3、点击【发起审批】</p>
                <p>4、全部审批节点审批通过。</p>
            </section>
        </article>
    }
}

export default PriceControl;