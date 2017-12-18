import iss from '../js/iss'
import { locale } from 'moment';
/**
 * 获取签约版本
 * /SignAContract/IGenerateBudgetVersion?adjustmentVersionId=f8a6f4a8-ff9b-731b-0c54-53ca93df980a
 */
export const IGenerateBudgetVersion = (dataKey) => {
     let  adjustmentVersionId = "f8a6f4a8-ff9b-731b-0c54-53ca93df980a";
     let versionData={
        "message": "成功",
        "errorcode": 200,
        "stackTrace": "",
        "rows": [
        {
        "id": "1E281021816741C7B1EA6A5421645C59",
        "versioncode": "2",
        "step": 4,
        "parentid": "3a111ca8-029d-79d6-a6ac-4044cce00eab",
        "status": 99,
        "statusname": "审批通过",
        "statusCode": "approvaled"
        },
        {
        "id": "0A9B3AA0B0DD449AB94F7E2C134022E1",
        "versioncode": "1",
        "step": 4,
        "parentid": "df644014-c818-3ce3-62a0-ff8cc22283a0",
        "status": 99,
        "statusname": "审批通过",
        "statusCode": "approvaled"
        }
        ],
        "total": 0,
        "token": ""
        };
        iss.fetch({
            url:"/SignAContract/IGenerateBudgetVersion",
            data:{
                "adjustmentVersionId":adjustmentVersionId||dataKey
            }
        }).then(arg=>{
            
        })
        let _data = versionData["rows"].map(arg=>{
            return {
                id:arg.id,
                name:arg.versioncode
            }
        })
        return Promise.resolve(_data)
};

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
        if(response.rows){
            localStorage.setItem("IGetSignAContractData",JSON.stringify(response.rows))
        }
        return response.rows?response.rows:JSON.parse(localStorage.getItem("IGetSignAContractData"));
    }).catch(e=>{ 
        console.log(`/SignAContract/IGetSignAContractData 请求未拿到数据`);
        return e;
    })
};
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
 * 保存签约数据
 */
export const saveSignData = () => {

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

