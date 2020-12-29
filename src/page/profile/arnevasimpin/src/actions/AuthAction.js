import { fetch, POST, GET } from "../apis"
import { AsyncStorage } from "react-native"
import { LOGIN_SUCCESS, LOGIN_FAILURE, PROFILE_SUCCESS, PROFILE_FAILURE } from "../utils"


export const postLogin = (parameters) =>{
    return async dispacth =>{
        fetch(POST, 'auth/login', parameters)
            .then(response =>{
                AsyncStorage.setItem('userToken',response.token);
                AsyncStorage.setItem('userEmail',response.data.email);
                AsyncStorage.setItem('userRole',response.data.role);
                if(response.data.role === 'member'){
                    AsyncStorage.setItem('idUser',response.data.user_id.toString());
                    AsyncStorage.setItem('idKop', response.data.member.cooperative_id.toString())
                }else{
                    AsyncStorage.setItem('idUser',response.data.user_id.toString());
                }
                dispacth({
                    type:LOGIN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:LOGIN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const getProfile = (parameters) =>{
    return async dispacth =>{
        fetch(GET, 'profile', parameters)
            .then(response =>{
                dispacth({
                    type:PROFILE_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:PROFILE_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}