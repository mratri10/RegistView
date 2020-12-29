import { GET, POST } from "./constants";
import Axios from "axios";

let CancelToken = Axios.CancelToken

var cancel = () =>{};
export const cancelRequest = () => {
    return cancel
}

function getQueryString(params){
    let esc = encodeURIComponent;
    return("?"+Object.keys(params).map(k => esc(k) + "=" + esc(params[k])).join("&"));
}
function getJsonBody(params){
    return params
}
export const fetch = (requestType, requestURL, parameters) =>{
    
    var token = parameters.token;
    delete parameters.token;
    switch (requestType) {
        case GET:
            console.log('urlnya: '+requestType+" "+requestURL+" "+JSON.stringify(parameters))
            return new Promise((resolve, reject) => {
                var queryString = getQueryString(parameters);
                Axios.get("/"+ requestURL+queryString, {
                    headers:{
                        Authorization:"Bearer "+token,
                        'APP-ORIGIN': 'marketplace'
                    },
                    cancelToken: new CancelToken(function executor(c){
                        cancel = c;
                    })
                })
                .then(response =>{
                    resolve(response.data);
                })
                .catch(error =>{
                    reject(error.response.data)
                })
            })
        case POST:
            console.log('urlnya: '+requestType+" "+requestURL+" "+JSON.stringify(parameters))
            return new Promise((resolve, reject) =>{
                var jsonBody = getJsonBody(parameters);
                Axios.post("/"+requestURL, jsonBody,{
                    headers:{
                        Authorization:"Bearer "+token,
                        'APP-ORIGIN': 'marketplace'
                    },
                    cancelToken:new CancelToken(function executor(c){
                        cancel= c
                    })
                })
                .then(response =>{
                    resolve(response.data)
                })
                .catch(error =>{
                    console.log('error: '+JSON.stringify(error.response.data))
                    reject(error.response.data)
                })
            })
    
        default:
            break;
    }
}