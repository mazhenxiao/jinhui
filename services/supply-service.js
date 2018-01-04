/**
 * 供货模块
 */

/**
 *  获取版本
 */
export const getBaseData = (dataKey, mode) => {
    return iss.fetch({
        url: "/Supply/IGetSupplyBaseInfo",
        type: "get",
        data: {
            id: dataKey,
            datalevel: mode,
        },
    })
        .then(res => res.rows)
        .then(data => {
            const obj = {
                //供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
                supplyType: data.SupplyType,
                //权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
                permission: data.eSaveType,
                dynamicId: data.DynamicId,//动态调整板Id
                versionId: data.ApprovedId,
                error: data.Error,
                versionData: [],
                baseInfo: {
                    isCheck: data.Ischeck === 1,//是否是考核版
                    currentMonth: data.StartDate,//"201711",
                    switchMonth: [],
                    currentYear: data.StartYear,
                    switchYear: [data.StartYear, data.StartYear + 1, data.StartYear + 2, (data.StartYear + 3)],
                }
            };

            if(data.VersionList){
                obj.versionData = data.VersionList.map(version => {
                    return {
                        id: version.ID,
                        name: version.Name,
                    };
                });
            }

            if(data.AjuestMonthList){
                obj.baseInfo.switchMonth = data.AjuestMonthList.map(month => {
                    return {
                        id: month.ID,
                        name: month.Name,
                    };
                });
            }

            return obj;
        });
};

/**
 * 根据版本获取计划数据
 */
export const getPlanData = (versionId) => {
    if(!versionId){
        return Promise.resolve({});
    }
    return iss.fetch({
        url: "/Supply/IApprovedView",
        type: "get",
        data: {
            id: versionId,
        },
    })
        .then(res => res.rows)
};

/**
 * 根据项目id/分期id, 获取动态调整数据
 */
export const getDynamicAdjustData = (dynamicId) => {
    if(!dynamicId){
        return Promise.resolve({});
    }
    return iss.fetch({
        url: "Supply/IApprovedView",
        type: "get",
        data: {
            id: dynamicId,
        },
    })
        .then(res => res.rows)
};

/**
 *  获取 楼栋供货 的数据
 */
export const getSupplyData = (dataKey, mode) => {
    return iss.fetch({
        url: "Supply/IGetSelectSupplyData",
        type: "get",
        data: {
            id: dataKey,
            datalevel: mode,
        },
    })
        .then(res => res.rows)
        .then(data => {
            return {
                supplyId: data.SupplyId,
                supplyData: data.DataSource,
            };
        });
};

/**
 * 保存 楼栋供货
 * @param supplyId
 * @param changeData
 */
export const saveSupplyData = (dataKey, mode, SupplyID, currentMonth, DataSource) => {
    const paramsValue = {
        id: dataKey,
        datalevel: mode,
        SupplyID,
        AdjustDate: currentMonth,
        DataSource,
    };
    return iss.fetch({
        url: "Supply/ISaveInfo",
        type: "post",
        data: JSON.stringify(paramsValue),
    })
};

export const submitSupplyData = (dataKey, mode) => {
    const paramsValue = {
        id: dataKey,
        datalevel: mode,
    };
    return iss.fetch({
        url: "Supply/ISubmintInfo",
        type: "post",
        data: JSON.stringify(paramsValue),
    })
};




