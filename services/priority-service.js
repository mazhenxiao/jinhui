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

export const GetProjectKeyPoint =(data)=>{
    return iss.fetch({
         url: "/ProjectKayPoint/GetProjectKeyPoint",
         data,
     })
     .then(ServiceCount)
 }

 export const Export =(data)=>{
    return iss.fetch({
         url: "/ProjectKayPoint/Export",
         data,
     })
     .then(ServiceCount)
 }
const ServiceCount=(arg)=>{
    return arg;
}   