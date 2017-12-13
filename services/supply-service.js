/**
 * 供货模块
 */

/**
 *  获取版本
 */
export const getBaseData = (dataKey, mode) => {
    return Promise.resolve({
        //供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
        supplyType: "Building",
        //权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
        permission: "Edit",
        dynamicId: "",//动态调整板Id
        versionData: [
            {
                id: "003",
                name: "3月动态调整板",
            },
            {
                id: "002",
                name: "2月动态调整板",
            },
            {
                id: "001",
                name: "1月动态调整板",
            },
        ],
    });

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
    return Promise.resolve({});
};

/**
 * 根据项目id/分期id, 获取动态调整数据
 */
export const getDynamicAdjustData = (dynamicId) => {
    return Promise.resolve({});
};

/**
 *  获取 楼栋供货 的数据
 */
export const getBuildingSupplyData = () => {
    return Promise.resolve({
        currentYear: 2017,
        switchYear: [2017, 2018, 2019, 2020],
        supplyData: [],
    });
};

/**
 *  获取 项目比例供货/分期比例供货 的数据
 */
export const getPercentSupplyData = () => {

};





