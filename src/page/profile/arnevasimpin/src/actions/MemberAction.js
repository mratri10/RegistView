import { fetch, GET } from "../apis"
import { GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE } from "../utils"

export const getMember = (parameters) =>{
    return async dispacth =>{
        fetch(GET, 'member', parameters)
            .then(response =>{
                dispacth({
                    type:GET_MEMBER_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:GET_MEMBER_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}