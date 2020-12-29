import { LOGIN_SUCCESS, LOGIN_FAILURE, PROFILE_SUCCESS, PROFILE_FAILURE } from "../utils"

const initialState = {
    login: null,
    profil:null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                login: action.payload
            }
        case LOGIN_FAILURE:
            return {
                message: action.payload.message
            }
        case PROFILE_SUCCESS:
            return{
                profil: action.payload
            }
        case PROFILE_FAILURE:
            return{
                message: action.payload.message
            }
        default:
            return state
    }
}