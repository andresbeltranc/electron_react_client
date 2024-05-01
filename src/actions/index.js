import { SIGN_OUT, SIGN_IN,UPDATE_AGREEMENT,CREATE_USER_PASSWORD} from "../actions/types";
import history from '../history'; 
import engine from "../apis/engine"
import { useNavigate } from "react-router-dom";

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};
export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};
export const updateAgreement = (navigation) => async dispatch =>{
    
    const response = await engine.put('/user_agreement');
    dispatch({type:UPDATE_AGREEMENT,payload:response.data});
    //props.history.push('/create_password');
    navigation('/create_password')
}
export const createUserPassword = (password,props,navigate) => async () =>{
    const response = await engine.post('/create_user_password',password);

    console.log(response)
    if(response.status == 201){
        console.log("history")
        console.log(history)
        console.log("history props")
        console.log(props.history)
        navigate('/')
        //props.history.push("/")
        return "success"
    }
    return "error"
    //history.push('/login');
}
export const login = (password, props,navigate) => async () =>{
    const response = await engine.post('/login',password);
    if(response.status == 202){
        console.log("pass 202 response")
        navigate('/main/')
       // props.history.push("/main")
    }
    else{
        console.log(response)
    }
}
