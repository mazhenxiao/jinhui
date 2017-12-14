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
                dynamicId: data.ID,//动态调整板Id
                versionId: data.ApprovedId,
                versionData: data.VersionList.map(version => {
                    return {
                        id: version.ID,
                        name: version.Name,
                    };
                }),
                baseInfo: {
                    currentMonth: data.StartDate,//"201711",
                    switchMonth: data.AjuestMonthList.map(month => {
                        return {
                            id: month.ID,
                            name: month.Name,
                        };
                    }),
                    currentYear: data.StartYear,
                    switchYear: [data.StartYear, data.StartYear + 1, data.StartYear + 2, data.StartYear + 3],
                }
            };
            return obj;
        });


    // return Promise.resolve({
    //     //供货分类: Building:楼栋供货, Land:项目比例供货, Stage:分期比例供货
    //     supplyType: "Building",
    //     //权限: Show:只允许查看, Add:新增, Edit:编辑, Upgrade:版本升级
    //     permission: "Edit",
    //     dynamicId: "",//动态调整板Id
    //     versionId: "003",
    //     versionData: [
    //         {
    //             id: "003",
    //             name: "3月动态调整板",
    //         },
    //         {
    //             id: "002",
    //             name: "2月动态调整板",
    //         },
    //         {
    //             id: "001",
    //             name: "1月动态调整板",
    //         },
    //     ],
    //     baseInfo: {
    //         currentMonth: "201711",
    //         switchMonth: [{id: "201711", name: "2017年11月"}, {id: "201712", name: "2017年12月"}],
    //         currentYear: 2017,
    //         switchYear: [2017, 2018, 2019, 2020],
    //     }
    // });
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
export const getBuildingSupplyData = () => {
    return Promise.resolve({
        supplyData: [{
            key: '1',
            zutuan: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: '2',
            zutuan: '胡彦祖',
            age: 42,
            address: '西湖区湖底公园1号'
        }],
    });
};

/**
 *  获取 项目比例供货/分期比例供货 的数据
 */
export const getPercentSupplyData = () => {

};





