/**
 * 项目需要
 */
export const IGetProVersion=(arg)=>{
    iss.fetch({
        type:"GET",
        url:"/Stage/IGetProVersion",
        data:{
           "id":arg 
        }
    })
    .done(arg=>{
        console.log(arg);
    })
    .catch(err=>{
        console.log(err);
    })
}