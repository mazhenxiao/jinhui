/**
 * 公共接口
 */
import iss from '../js/iss';
/**
 * 通过小版本反向获取当前阶段
 * @param {小版本id} parame 
 */
export const getCurrentStepService=parame=>{
      return iss.fetch({
          url:"/Common/IGetParentVersionIDInfo",
          data:{
              "versionId":parame
          }
      }).then(response=>{
         console.log(response);
      })
      .catch(err=>{
         console.log(err)
      })
}