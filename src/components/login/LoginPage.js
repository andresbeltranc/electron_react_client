import React from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'
import GoogleAuth from "../auth/GoogleAuth";
import './LoginPage.css'
import TextInput from '../textInput/TextInput';
import { Field, reduxForm} from 'redux-form';
import { login } from '../../actions';
import { useNavigate } from "react-router-dom";

// <GoogleAuth/>
const LoginPage =(props)=>{
    let navigate = useNavigate();
    const onAceptLogin= (formValues) =>{
        //console.log(formValues.password)
        props.login(formValues.password,props,navigate)
        //this.props.history.push("/")
        //console.log(c)
    }
    const renderError = ({error, touched}) =>{
        if(error){
            return(
                <div className="create-password-error">
                    <div className="header">{error}</div>
                </div>
            );
        };
    }; 
    const renderPassword =({input,label,meta})=>{
        //console.log(meta)
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return( 
            <div className={className}>
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
            <form onSubmit={props.handleSubmit(onAceptLogin)}>
                <div className="login-info"> 
                    <label className="login-semiTitle">Login</label>   
                    <Field name="password" label="Password" component={renderPassword} /> 
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
    const warning = {};
    const c_pwdWarning = {};

    let pwd = formValues.password
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
       // error.title = 'you must enter a title';
    }

    return error;

}
const formWrapped = reduxForm({form:'login_page',validate}) (LoginPage);

export default connect(null,{login})(formWrapped);