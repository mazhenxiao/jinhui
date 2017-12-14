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
export const getSignDynamicData = (dataKey) => {
    return iss.fetch({
        url:"/SignAContract/IGetSignAContractData",
        data:{
            "stageVersionId":"884dd5a6-ff48-4628-f4fa-294472d49b37"//dataKey
        }
    }).then(response=>{
        debugger
        console.log(response)
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

