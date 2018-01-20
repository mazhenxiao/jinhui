import iss from '../js/iss';

/**
 * 参数
 * KPI/IGetTargetBaseInfo?id=
 */
export const IGetTargetBaseInfo = (stageVersionId) => {
        return iss.fetch({
            url: "/KPI/IGetTargetBaseInfo",
            type: "get",
            data: {
                stageVersionId
            }
        })
        .then(ThenListener)
        .catch(ERROR)
    };

//目标保存
export const ISaveDynamciInfo = (data) => {
    return iss.fetch({
        url: "/KPI/ISaveDynamciInfo",
        type: "post",
        data,
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
