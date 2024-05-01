import React from "react";
import './UserAgreement.css'
import { connect } from "react-redux";
import {updateAgreement} from '../../actions'
import { useNavigate } from "react-router-dom";

const UserAgreement = (props) =>{
    let navigate = useNavigate();
    const onAceptAgreementButton = () =>{
        //console.log(this.props)
        
        props.updateAgreement(navigate);
        //this.props.history.push('/create_password')
    }

        return (
            <div>
            <h3 className="agreement-title">User Agreement</h3>
            <div className="agreement-content">
                <p>
                   User Agreement
                </p>
            </div>
            <div className="buttons-content">
                <button onClick={onAceptAgreementButton} className="button-accept"> Accept</button>
                <button className ="button-cancel">Cancel</button>
            </div>

        </div>
        );
};

const mapStateToProps = (state) => {
    return {userA:state.userinfo.userA};
}

export default connect(mapStateToProps,{updateAgreement})(UserAgreement);

