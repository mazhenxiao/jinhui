import iss from '../js/iss';

/**
 * 参数
 * /Report/GetSignSummary
 */
//签约
export const GetSignSummary = (data) => {
    return iss.fetch({
        url: "/Report/GetSignSummary",
        type: "get",
        data
    })
    .then(ThenListener)
    .catch(ERROR)
};

//供货

export const GetSupplySummary = (data) => {
    return iss.fetch({
        url: "/Report/GetSupplySummary",
        type: "get",
        data
    })
    .then(ThenListener)
    .catch(ERROR)
};

//回款
export const GetIncomeSummary = (data) => {
    return iss.fetch({
        url: "/Report/GetIncomeSummary",
        type: "get",
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
