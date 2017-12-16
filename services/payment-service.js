import iss from '../js/iss'
/**
 * 获取签约版本
 */
export const getSignVersion = () => {
     
};

/**
 * 获取签约动态数据
 * /SignAContract/IGetSignAContractData?stageVersionId=884dd5a6-ff48-4628-f4fa-294472d49b37&token=xxx
 */
export const IGetSignAContractData = (dataKey) => {
    return iss.fetch({
        url:"/SignAContract/IGetSignAContractData",
        data:{
            "stageVersionId":dataKey //"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(response=>{
        return response.rows
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
            "stageVersionId":dataKey//"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
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

