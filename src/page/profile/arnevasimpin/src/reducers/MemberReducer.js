import { GET_MEMBER_SUCCESS, GET_MEMBER_FAILURE } from "../utils"


const initialState = {
    list: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_MEMBER_SUCCESS:
            return {
                list: action.payload
            }
        case GET_MEMBER_FAILURE:
            return {
                message: action.payload.message
            }
        default:
            return state
    }
}