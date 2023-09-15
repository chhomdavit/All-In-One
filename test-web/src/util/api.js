import axios from 'axios' // for fetch or access api
export const base_url = "http://localhost:8080"
export const request = (method,url,data,responseType = 'json') => { 
    var headers = {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
    // if(data instanceof FormData){
    //     header = {  'Content-Type': 'multipart/form-data'}
    // }
    const instance = axios.create({ headers })
    return instance.request({
        method : method,
        url : base_url + url,
        data : data,
        responseType : responseType
    }).then(res=>{
        return res
    }).catch(error=>{
        return error
    })
}
