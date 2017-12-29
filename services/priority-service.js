import "babel-polyfill";  //兼容ie
import iss from "../js/iss";
/**
 * /ProjectKayPoint/GetListPage
 */
export const GetListPage = (data)=>{
    return iss.fetch({
        url:"/ProjectKayPoint/GetListPage",
        data
     })
    .then(ServiceCount)   
}
/**
 * /ProjectKayPoint/GetOrganization
 * @param {*} data 
 */
export const GetOrganization=(data)=>{
   return iss.fetch({
        url: "/ProjectKayPoint/GetOrganization",
        data,
    })
    .then(ServiceCount)
}

export const ProjectKayPointSave=(data)=>{
    return iss.fetch({
         url: "/ProjectKayPoint/Save",
         data,
     })
     .then(ServiceCount)
 }

const ServiceCount=(arg)=>{
    return arg.rows;
}   