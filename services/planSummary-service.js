import iss from '../js/iss';
///Report/GetGroupProjectInventory?pageIndex=1&pageSize=10
/**
 * 获取张权项目清单数据
 */

export const YearSupplyMarkSummary=(data)=>{
    return iss.fetch({
         url:"/Report/YearSupplyMarkSummary",
         data,
     })
     .then(success)
     .catch(error)
 }
const success=(da)=>{
    return da
}
const error=(e)=>{
    return Promise.reject(e)
}   