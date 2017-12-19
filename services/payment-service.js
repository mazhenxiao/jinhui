import iss from '../js/iss'
import { locale } from 'moment';

/**
 * 获取签约版本
 * 
 * /SignAContract/IGenerateBudgetVersion?adjustmentVersionId=f8a6f4a8-ff9b-731b-0c54-53ca93df980a
 */
export const IGenerateBudgetVersion = (dataKey) => {
     
        return iss.fetch({
            url:"/SignAContract/IGenerateBudgetVersion",
            data:{
                "adjustmentVersionId":dataKey
            }
        }).then(arg=>{
            debugger
             if(arg.rows&&typeof arg.rows=="object"){
                 return arg.rows
             }
             return versionData["rows"].map(arg=>{
                return {
                    id:arg.id,
                    name:arg.versioncode
                }
            })
        })
  
};
/**
 * 返回弹窗供货头部
 */
export const IGetSupplyVersionTitle=key=>{
    let _da=[{
        title: '日期',
        dataIndex:"showName",
        key:"showName"
    },
    {
        title: '可售面积（㎡）',
        dataIndex:"area",
        key:"area"
    },
    {
        title: '货值（万元）',
        dataIndex:"housecount",
        key:"housecount"
    },
    {
        title: '套数（套）',
        dataIndex:"value",
        key:"value"
    }];
    return Promise.resolve(_da);
}
/**
 * 获取弹出供货及校验
 * /SignAContract/IGetSupplyVersionData?signAContractVersionId=签约ID
 * @param {*} key 
 */
export const IGetSupplyVersionData=key=>{
    
    let _data = [{
        "showId":"f8a6f4a8-ff9b-731b-0c54-53ca93df980a",
        "showName":"地下平层",
        "value":[
            {
                "showName":"2017年1月",
                "area":0,
                "housecount":0,
                "value":0
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
    return iss.fetch({
        url:"/SignAContract/IGetSignAContractData",
        data:{
            "stageVersionId":dataKey //"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(response=>{
        if(response.rows.length){
            //localStorage.setItem("IGetSignAContractData",JSON.stringify(response.rows))
            return response.rows
        }else{
            iss.error("动态表格没拿到数据")
          //  return  JSON.parse(localStorage.getItem("IGetSignAContractData"));
        }
       
    }).catch(e=>{ 
        console.log(`/SignAContract/IGetSignAContractData 请求未拿到数据`);
        return e;
    })
};
/**
 * 获取起始年
 * @param {*} dataKey 4100835d-2464-2f9e-5086-bc46a8af14f4
 */
export const IGetSignAContractBaseInfo=(dataKey)=>{
    return iss.fetch({
        url:"/SignAContract/IGetSignAContractBaseInfo",
        data:{
            versionId:dataKey
        }
    })
    .then(arg=>{
        
        return arg.rows
    })
    .catch(err=>{
        console.log("获取起始年份失败",err);
    })
}
/**
 * 获取动态数据头部
 * /SignAContract/IGetSignAContractTableTitle?versionid=884dd5a6-ff48-4628-f4fa-294472d49b37
 * @param {*} dataKey 
 */
export const IGetSignAContractTableTitle = (dataKey) => {
    return iss.fetch({
        url:"/SignAContract/IGetSignAContractTableTitle",
        data:{
            "versionId":dataKey//"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(response=>{
        return response.rows
    }).catch(e=>{ 
        console.log(`/SignAContract/IGetSignAContractTableTitle 请求未拿到数据`);
        return e;
    })
};
/**
 * 获取考核版数据
 * @param {*} arg 
 */
export const IGetBudgetList=versionId=>{
    return iss.fetch({
        url:"/SignAContract/IGetBudgetList",
        data:{
            versionId 
        }
    })
    .then(arg=>{
        return arg.rows.map(key=>{
          return {
            id:key.ID,
            name:key.versioncode
          }
        })
    })
    .catch(err=>{
        console.log("IGetBudgetList获取考核版数据失败",err)
    })
}
/**
 * 保存签约数据
 */
export const  ISaveSignAContractData = (data) => {
    
    return  iss.fetch({
           url:"/SignAContract/ISaveSignAContractData",
           data
       })
       .then(arg=>{
          
       })
       .catch(err=>{
           console.log("SignAContractSaveData保存失败",err)
       })
};



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

