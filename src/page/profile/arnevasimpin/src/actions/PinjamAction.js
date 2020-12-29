import { GET, fetch, POST } from "../apis"
import {GET_PINJAMAN_SUCCESS, GET_PINJAMAN_FAILURE, POST_PINJAMAN_SUCCESS, POST_PINJAMAN_FAILURE, GET_ANGSURAN_SUCCESS, GET_ANGSURAN_FAILURE } from "../utils"

export const getPinjam = (parameters) =>{
    console.log(JSON.stringify(parameters))
    return async dispacth =>{
        console.log('respons: '+JSON.stringify(parameters))
        fetch(GET, 'Data_pengajuan_api', parameters)
            .then(response =>{
                
                dispacth({
                    type:GET_PINJAMAN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:GET_PINJAMAN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const getAngsuran = (parameters) =>{
    return async dispacth =>{
        fetch(GET, 'Angsuran_Pinjaman', parameters)
            .then(response =>{
                dispacth({
                    type:GET_ANGSURAN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:GET_ANGSURAN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}

export const postPinjam = (parameters) =>{
    return async dispacth =>{

        fetch(POST, 'Data_pengajuan_api', parameters)
            .then(response =>{
                dispacth({
                    type:POST_PINJAMAN_SUCCESS,
                    payload:{
                        ...response
                    }
                })
            })
            .catch(err =>{
                dispacth({
                    type:POST_PINJAMAN_FAILURE,
                    payload:{
                        message: err
                    }
                })
            })
    }
}