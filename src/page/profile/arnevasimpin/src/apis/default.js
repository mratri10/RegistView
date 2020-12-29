import Axios from "axios"

export const setBaseURL = url =>{
    Axios.defaults.baseURL= url;
    Axios.defaults.headers.common["Content-Type"] = "application/json";
    Axios.defaults.headers.common["APP-ORIGIN"] = "marketplace";
    Axios.defaults.headers.common["Accept"] = "application/json";
};

export const setCustomHeaders = customHeader =>{
    customHeader.forEach(header => {
        Axios.defaults.headers.common[header.name] = header.value;
    });
}