import { GET, fetch, POST } from "../apis"
import { GET_SIMPANAN_SUCCESS, GET_SIMPANAN_FAILURE, POST_SIMPANAN_SUCCESS, POST_SIMPANAN_FAILURE } from "../utils"

export const getSimpan = (parameters) =>{
    console.log(JSON.stringify(parameters))
    return async dispacth =>{
        fetch(GET, 'simpanan', parameters)
            .then(response =>{
                console.log('action: '+JSON.stringify(response))
                dispacth({
                    type:GET_SIMPANAN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                console.log('err: '+JSON.stringify(err))
                dispacth({
                    type:GET_SIMPANAN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}
export const postSimpan = (parameters) =>{
    console.log(JSON.stringify(parameters))
    return async dispacth =>{
        fetch(POST, 'simpanan', parameters)
            .then(response =>{
                console.log('action: '+JSON.stringify(response))
                dispacth({
                    type:POST_SIMPANAN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                console.log('err: '+JSON.stringify(err))
                dispacth({
                    type:POST_SIMPANAN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}