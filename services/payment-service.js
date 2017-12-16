import iss from '../js/iss'
import { locale } from 'moment';
/**
 * 获取签约版本
 * 
 */
export const getSignVersion = () => {
     
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

