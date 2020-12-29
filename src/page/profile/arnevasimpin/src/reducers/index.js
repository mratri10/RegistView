import AuthReducer from "./AuthReducer";
import PinjamanReducer from "./PinjamanReducer";
import MemberReducer from "./MemberReducer";
import SimpananReducer from "./SimpananReducer";

const { combineReducers } = require("redux");

const initialState ={
    data:[],
    loading: false
}

const dataReducer = (state = initialState, action) =>{
    switch (action.type) {
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    dataReducer,
    auth: AuthReducer,
    pinjam: PinjamanReducer,
    member: MemberReducer,
    simpan: SimpananReducer
})

export default rootReducer;