import React from "react";
import './Home.css'
import history from '../../../history'; 
import { Link } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';

const Home =(props)=>{


    return (
        <div className="">
            <h1 className="title">Home</h1>
            <div className = "registed-faces">
                <Link to="/main/setup_camera">Home</Link>
            </div>
        </div >
    );

};

//const formWrapped = reduxForm({form:'login_page',validate}) (LoginPage);

//export default connect(null,{login})(formWrapped);
export default Home