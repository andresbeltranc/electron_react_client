import React from "react";
import './RegisterFace.css'

const RegisterFace =(props)=>{
    const onRegisterFace = () =>{
        console.log(props)
       // props.history.push('/main/register_face')
    }

    return (
        <div className="">
            <h1 className="title">Face Register</h1>
            <div className = "registed-faces">
                <button onClick={onRegisterFace}>regis</button>
            </div>
        </div >
    );
 
};

//const formWrapped = reduxForm({form:'login_page',validate}) (LoginPage);

//export default connect(null,{login})(formWrapped);
export default RegisterFace;