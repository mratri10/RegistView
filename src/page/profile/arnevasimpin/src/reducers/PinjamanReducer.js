import {POST_PINJAMAN_SUCCESS, POST_PINJAMAN_FAILURE, GET_PINJAMAN_SUCCESS, GET_PINJAMAN_FAILURE, GET_ANGSURAN_SUCCESS, GET_ANGSURAN_FAILURE } from "../utils"


const initialState = {
    pinjam: null,
    post_pinjam:null,
    ajukan:null,
    angsuran:null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PINJAMAN_SUCCESS:
            return {
                pinjam: action.payload
            }
        case GET_PINJAMAN_FAILURE:
            return {
                message: action.payload.message
            }
        case POST_PINJAMAN_SUCCESS:
            return {
                post_pinjam: action.payload
            }
        case POST_PINJAMAN_FAILURE:
            return {
                message: action.payload.message
            }
        case GET_ANGSURAN_SUCCESS:
            return {
                angsuran: action.payload
            }
        case GET_ANGSURAN_FAILURE:
            return {
                message: action.payload.message
            }
        default:
            return state
    }
}