import iss from '../js/iss'
import {locale} from 'moment';
/**
 *  瑞涛 获取签约基础数据，用dataKey去换取当前版本id
 * /SignAContract/IGetSignBaseInfo?businessId=f2f29de7-2f36-9947-7c40-808e229f1d8f&type=project
 */
export const IGetSignBaseInfo=({dataKey:businessId,mode:type})=>{
   
    return iss.fetch({
        type:"GET",
        url:"/SignAContract/IGetSignBaseInfo",
        data:{businessId,type}
    })
    .then(ThenListener)
}
/**
 * 瑞涛 获取签约动态数据/SignAContract/IGetSignDataByVersionId
 * @param {* versionId } 版本id 
 * @param {* type} 项目还是分期
 */
export const IGetSignDataByVersionId=({DynamicId:versionId,mode:type})=>{
    return iss.fetch({
        type:"GET",
        url:"/SignAContract/IGetSignDataByVersionId",
        data:{versionId,type}
    })
    .then(ThenListener)
}
/**
 * 获取签约版本
 *
 * /SignAContract/IGenerateBudgetVersion?adjustmentVersionId=f8a6f4a8-ff9b-731b-0c54-53ca93df980a
 */
export const IGenerateBudgetVersion = (dataKey) => {

    return iss.fetch({
        url: "/SignAContract/IGenerateBudgetVersion",
        data: {
            "adjustmentVersionId": dataKey
        }
    }).then(arg => {

        if (arg.rows && typeof arg.rows == "object") {
            return arg.rows
        }
        return versionData["rows"].map(arg => {
            return {
                id: arg.id,
                name: arg.versioncode
            }
        })
    })
};
/**
 * 返回弹窗供货头部
 */
export const IGetSupplyVersionTitle = key => {
    let _da = [{
        title: '日期',
        dataIndex: "showName",
        key: "showName"
    },
        {
            title: '可售面积（㎡）',
            dataIndex: "area",
            key: "area"
        },
        {
            title: '货值（万元）',
            dataIndex: "housecount",
            key: "housecount"
        },
        {
            title: '套数（套）',
            dataIndex: "value",
            key: "value"
        }];
    return Promise.resolve(_da);
}
/**
 * 获取弹出供货及校验
 * /SignAContract/IGetSupplyVersionData?signAContractVersionId=签约ID
 * @param {*} key
 */
export const IGetSupplyVersionData = key => {

    let _data = [{
        "showId": "f8a6f4a8-ff9b-731b-0c54-53ca93df980a",
        "showName": "地下平层",
        "value": [
            {
                "showName": "2017年1月",
                "area": 0,
                "housecount": 0,
                "value": 0
            }
        ]

    }]
    return Promise.resolve(_data)
}

/**
 * 获取签约动态数据
 * /SignAContract/IGetSignAContractData?stageVersionId=884dd5a6-ff48-4628-f4fa-294472d49b37&token=xxx
 * 签约取数：项目级（东南-长沙-zk供货cs001）：/SignAContract/IGetSignAContractData?stageVersionId=1929e83c-d5c1-7c87-742c-381e4c2bb333
 分期前两个阶段（东南-长沙-zk供货分期项目ce001）：/SignAContract/IGetSignAContractData?stageVersionId=f8a6f4a8-ff9b-731b-0c54-53ca93df980a
 分期后三个阶段：/SignAContract/IGetSignAContractData?stageVersionId=884dd5a6-ff48-4628-f4fa-294472d49b37
 */
export const IGetSignAContractData = (dataKey) => {
    if (!dataKey) {
        return Promise.resolve([]);
    }
    return iss.fetch({
        url: "/SignAContract/IGetSignAContractData",
        data: {
            "stageVersionId": dataKey //"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(da => da.rows)
};
/**
 * 获取起始年
 * @param {*} dataKey 4100835d-2464-2f9e-5086-bc46a8af14f4
 */
export const IGetSignAContractBaseInfo = (dataKey) => {
    return iss.fetch({
        url: "/SignAContract/IGetSignAContractBaseInfo",
        data: {
            versionId: dataKey
        }
    })
        .then(arg => {
            return arg.rows
        })
}
/**
 * 获取动态数据头部
 * /SignAContract/IGetSignAContractTableTitle?versionid=884dd5a6-ff48-4628-f4fa-294472d49b37
 * @param {*} dataKey
 */
export const IGetSignAContractTableTitle = (dataKey) => {
    return iss.fetch({
        url: "/SignAContract/IGetSignAContractTableTitle",
        data: {
            "versionId": dataKey//"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(res => res.rows)
};
/**
 * 获取考核版数据
 * @param {*} arg
 */
export const IGetBudgetList = versionId => {
    return iss.fetch({
        url: "/SignAContract/IGetBudgetList",
        data: {
            versionId
        }
    })
        .then(arg => {
            return arg.rows.map(key => {
                return {
                    id: key.ID,
                    name: key.showname
                }
            })
        })
};

/**
 * 保存签约数据
 */
export const ISaveSignAContractData = (data) => {
    return iss.fetch({
        url: "/SignAContract/ISaveSignAContractData",
        data
    })
};
/**
 * 提交动态签约数据
 * @param {*} signAContractVersionId
 */
export const ISubmitSignAContractData = (signAContractVersionId) => {
    return iss.fetch({
        url: "/SignAContract/ISubmitSignAContractData",
        data: {
            signAContractVersionId
        }
    })
};

/**
 * 驳回
 * @param {*} arg
 */
export const ISendBackSignAContractData = signAContractVersionId => {
    return iss.fetch({
        url: "/SignAContract/ISendBackSignAContractData",
        data: {
            signAContractVersionId
        }
    })
};

/**
 * 获取回款动态调整版本数据
 * /Income/IGetIncomeListEditForAdjustment?dataKey=32172052-2da4-85c9-c266-81faf2b1f10f&projectLevel=project
 */
export const IGetIncomeListEditForAdjustment=({dataKey,mode:projectLevel})=>{
    
    return iss.fetch({
        url:"/Income/IGetIncomeListEditForAdjustment",
        data:{
            dataKey,
            projectLevel
        }
    }).then(arg=>arg.rows)
}
/**
 * 获取回款考核版版本
 * /Income/IGetVersionList?dataKey=32172052-2da4-85c9-c266-81faf2b1f10f&projectLevel=project
 */
export const IGetVersionList=({dataKey,mode:projectLevel})=>{
  
    return iss.fetch({
        url:"/Income/IGetVersionList",
        data:{
            dataKey,
            projectLevel
        }
    })
    .then(ThenListener);
}
/**
 * 获取回款考核版数据
 * /Income/IGetIncomeListEditForCheck?versionId=&dataKey=&projectLevel=
 */
export const IGetIncomeListEditForCheck=({dataKey,versionId,mode:projectLevel})=>{
    return iss.fetch({
        url:"/Income/IGetIncomeListEditForCheck",
        data:{dataKey,versionId,projectLevel}
    })
}

const ThenListener=(arg)=>{
    return arg.rows;
}
/**
 * 获取回款版本
 */
export const getPaymentVersion = () => {

};

/**
 * 获取回款数据
 */
export const getPaymentData = () => {

};

/**
 * 保存回款数据
 */
export const savePaymentData = () => {

};

