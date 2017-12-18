import iss from '../js/iss';

/**
 * 参数
 * id/
 */
const getColumns = (step, mode, versionId, descType = "Building") => {
        return iss.fetch({
            url: "",
            type: "get",
            data: {
                // step: step.code,
                // projectLevel: mode,
                // versionId,
                // descType: descType,
            },
        }).then(res => res.rows);
    };
    export{
        getColumns
    }