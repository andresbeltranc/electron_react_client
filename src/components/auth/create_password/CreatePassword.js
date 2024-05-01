import React from "react";
import './CreatePassword.css'
import { connect } from "react-redux";
import { Field, reduxForm} from 'redux-form';
import { createUserPassword } from '../../../actions';
//import {createPassword} from '../../actions'
import { useNavigate } from "react-router-dom";


const CreatePassword = (props) =>{
    let navigate = useNavigate();

    const onAceptCreatePassword= (formValues) =>{
        //console.log(formValues.password)
        props.createUserPassword(formValues.password,props,navigate)
        //this.props.history.push("/")
        //console.log(c)
    }
    const renderEmpty = () =>{
        return(
            <div>
            </div>
        );
    }
    const renderError = ({error, touched}) =>{
        if(error){
            return(
                <div className="create-password-error">
                    {error}
                </div>
            );
        };

    }; 
    const renderPassword =({input,label,meta})=>{
        //console.log(meta)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        console.log(meta.touched)
        let message
        if (meta.touched){
             message = renderError(meta)
        }
        else{message = renderEmpty() }
        return( 
            <div className='field'>
                <div className="logo-password"/>
                <input placeholder={label} type="password" {...input} autoComplete="off"/>
                {message}
    
            </div>
        );
        
    };
    const renderConfirmPassword =({input,label,meta})=>{
        //console.log(meta)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return( 
            <div className='field'>
                <div className="logo-password"/>
                <input placeholder={label} type="password" {...input} autoComplete="off"/>
                {renderError(meta)}
    
            </div>
        );
        
    };

    return (
        <div className="login">
            <div className="logo">
            </div>
            <form onSubmit={props.handleSubmit(onAceptCreatePassword)}>
                <div className="login-info"> 
                    <label className="login-semiTitle">Create Your Password</label>   
                    <Field name="password" label="Password" component={renderPassword} /> 
                    <Field name="confirm_password" label="Confirm Password" component={renderConfirmPassword} /> 
                </div>
                <div className="login-button">
                    <button className="button-accept"> Create Password</button>
                </div>   
            </form>   
        </div>
    );

};

const validate = (formValues)=>{
    const error= {};
    const success = {};
    let pwd = formValues.password
    let confirmPwd = formValues.confirm_password

    if (pwd != undefined){
        if(pwd.search(/.*[!@#$%^&*() =+_-]/) < 0){
            error.password = 'Your password must contain at least one symbol';
        }
        if(pwd.length < 8){
            error.password = 'your password at least must have 8 characters';
        }
        if(pwd.search(/.*\d/) < 0){
            error.password = 'Your password must contain at least one digit ';
        }
        if(pwd.search(/[a-z]/) < 0){
            error.password = 'Your password must contain at least one letter ';
        }
        if(pwd.search(/[A-Z]/) < 0){
           // console.log('entra uper');
            error.password = 'Your password must contain at least one Uper letter ';
        }
    }
    else{
        error.password = "Your password must contain something"
    }
    if (confirmPwd != undefined){
        if (pwd != confirmPwd){

            error.confirm_password = "the confirm password need to be the same that password field";
        }
        if (pwd ===confirmPwd){
            success.confirm_password = "Correct Confirm Password"
        }
    }
    else{
        error.confirm_password = "Your password must contain something"
    }
       // error.title = 'you must enter a title';
    

    return error;

}

const formWrapped = reduxForm({form:'create_password',validate}) (CreatePassword);

export default connect(null,{createUserPassword})(formWrapped);
