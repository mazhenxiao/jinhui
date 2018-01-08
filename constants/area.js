/**
 * 阶段
 * "approvaled"  审批通过
 * "undraft"     未编制
 * "draft"       编制中
 * "approvaling" 审批中
 */
const AreaManageStep = [
    {"guid": "1", "name": "投决会", "code": "Vote"},
    {"guid": "2", "name": "产品定位会", "code": "ProductPosition"},
    {"guid": "3", "name": "项目定位会", "code": "ProjectPosition"},
    {"guid": "4", "name": "启动会", "code": "Startup"},
    {"guid": "5", "name": "工规证", "code": "Rules"},
    {"guid": "6", "name": "决策书", "code": "Decision"},
];

/**
 * 阶段简介
 */
const Legend = [
    {"guid": "l1", "text": "未编制", "class": "legend-white"},
    {"guid": "l2", "text": "编制中", "class": "legend-blue"},
    {"guid": "l3", "text": "审批中", "class": "legend-yellow"},
    {"guid": "l4", "text": "审批通过", "class": "legend-green"},
];

export {
    AreaManageStep,
    Legend,
}

