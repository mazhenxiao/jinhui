/**
 * 供货模块
 */

/**
 *  获取版本
 */
export const getVersionData = (dataKey, mode) => {
    return [
        {
            id: "001",
            name: "1月动态调整板",
        },
        {
            id: "002",
            name: "2月动态调整板",
        },
        {
            id: "003",
            name: "3月动态调整板",
        }
    ];

    // return iss.fetch({
    //     url: "/Common/xxxxxxx",
    //     type: "get",
    //     data: {},
    // })
};

/**
 * 根据版本获取计划数据
 */
export const getPlanData = (versionId) => {

};