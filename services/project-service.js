/**
 * 项目需要Stage/IGetProVersion?id
 */
export const IGetProVersion=(arg)=>{
  return iss.fetch({
        type:"GET",
        url:"/Stage/IGetProVersion",
        data:{
           "id":arg 
        }
    })
    .then(arg=>{
        return arg["rows"];
    })
    .catch(err=>{
        return Promise.reject(err);
    })
}
