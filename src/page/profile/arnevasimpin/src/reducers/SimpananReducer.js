import {POST_PINJAMAN_SUCCESS, POST_PINJAMAN_FAILURE, GET_PINJAMAN_SUCCESS, GET_PINJAMAN_FAILURE, GET_ANGSURAN_SUCCESS, GET_ANGSURAN_FAILURE, GET_SIMPANAN_SUCCESS, GET_SIMPANAN_FAILURE, POST_SIMPANAN_SUCCESS, POST_SIMPANAN_FAILURE } from "../utils"


const initialState = {
    simpan: null,
    post: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_SIMPANAN_SUCCESS:
            return {
                simpan: action.payload
            }
        case GET_SIMPANAN_FAILURE:
            return {
                message: action.payload.message
            }
        case POST_SIMPANAN_SUCCESS:
            return{
                post: action.payload
            }
        case POST_SIMPANAN_FAILURE:
            return {
                message: action.payload.message
            }
        default:
            return state
    }
}