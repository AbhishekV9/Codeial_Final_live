import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from "../actions/actionTypes";

const initialAuthState={
    user:{},
    error:null,
    isLoggedIn:false,
    inProgress:false
}

export default function auth(state=initialAuthState,action){
    switch(action.type){
        case LOGIN_START:
            return{
                ...state,
                inProgress:true
            };
        case LOGIN_SUCCESS:  //login success should give jwt token as well as user object
        return{
            ...state,
            user:action.user,
            isLoggedIn:true,
            inProgress:false,
            error:null
        };
        case LOGIN_FAILED:
            return{
                ...state,
                error:action.error,
                inProgress:false
            };
       
        default:
            return state;
    }
}