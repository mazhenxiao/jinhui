import iss from '../js/iss';
///Report/GetGroupProjectInventory?pageIndex=1&pageSize=10
/**
 * 获取张权项目清单数据
 */
export const GetGroupProjectInventory=()=>{
   return iss.fetch({
        url:"/Report/GetGroupProjectInventory",
        data:{
            pageIndex:1,
            pageSize:10000
        }
    })
    .then(success)
    .catch(error)
}
const success=(da)=>{
    return da.rows
}
const error=(e)=>{
    return Promise.reject(e)
}   