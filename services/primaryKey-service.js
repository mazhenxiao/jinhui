import iss from '../js/iss';

/**
 * 参数
 * KPI/IGetTargetBaseInfo?id=
 */
export const IGetTargetBaseInfo = (id) => {
        return iss.fetch({
            url: "/KPI/IGetTargetBaseInfo",
            type: "get",
            data: {
                id
            }
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
