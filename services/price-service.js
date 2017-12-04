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
            stageversionid,  //项目或版本id
            step,  //当前阶段
            projectLevel //级别项目传1，分期前两个传2，后面传3
        }
    }).
    then(arg=>arg.rows)  
}
/**
 * 保存均价
 * @param {*json} data 
 */
export const SavePriceList=data=>{
    let url = "/Price/SavePrice";
    return iss.fetch({
        url,
        type:"POST",
        data:{
            "saveData":JSON.stringify(data)
        }
    }).then(da=>{
        if(da["rows"]){
            return da.rows
        }
        
    })
    .catch(e=>{
        iss.error(e);
    })
}
