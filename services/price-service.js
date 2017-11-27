/* 价格服务数据获取 */
import "babel-polyfill";  //兼容ie
import "../js/iss.js";
/**
 * 价格
 * @param {*} arg 
 */
export const GetPriceList=({stageversionid,step,projectLevel}=arg)=>{
    let url = "/Price/GetPriceList";
    return iss.fetch({
        url,
        type:"GET",
        data:{
            stageversionid,
            step,
            projectLevel
        }
    }).
    then(arg=>{
        
    })  
}
