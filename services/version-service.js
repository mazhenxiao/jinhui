import iss from '../js/iss';

/**
 * 参数
 * /Report/GetSignSummary
 */
//签约
export const GetCustomTagList = (data) => {
    return iss.fetch({
        url: "/Custom/GetCustomTagList",
        type: "get",
        data
    })
    .then(ThenListener)
    .catch(ERROR)
};

//签约导出
export const SaveCustomTag = (data) => {
    return iss.fetch({
        url: "/Custom/SaveCustomTag",
        type: "post",
        data
    })
    .then(ThenListener)
    .catch(ERROR)
};

/**
 * 统一处理
 * @param {*} arg 
 */
const ThenListener=(arg)=>{
    return arg.rows;
}
const ERROR=e=>{
    iss.error(e.message);
    return Promise.reject(e)
}
