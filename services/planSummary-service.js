import iss from '../js/iss';
///Report/GetGroupProjectInventory?pageIndex=1&pageSize=10
/**
 * 获取张权项目清单数据
 */

export const YearSupplyMarkSummary=()=>{
    return iss.fetch({
         url:"/Report/YearSupplyMarkSummary"
     })
 }
 export const YearSupplyMark=()=>{
    return iss.fetch({
         url:"/Exprot/YearSupplyMark"
     })
 }
const success=(da)=>{
    return da
}
const error=(e)=>{
    return Promise.reject(e)
}   