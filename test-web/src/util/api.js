import axios from 'axios' // for fetch or access api
export const base_url = "http://localhost:1001/api/v1/movie"
export const request = (method,url,data,responseType = 'json') => { 
	   var headers = {
	    "Accept": "application/json",
	    "Content-Type": "multipart/form-data",
	    "Access-Control-Allow-Origin": "*"
		}
   /* if(data instanceof FormData){
        headers = {  'Content-Type': 'multipart/form-data'}
     }*/
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
