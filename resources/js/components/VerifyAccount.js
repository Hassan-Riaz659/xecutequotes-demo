import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';
import swal from 'sweetalert';

var baseUrl = window.location.origin;
var Background = baseUrl+'/public/images/xecute_logo_fav.png';
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class VerifyAccount extends Component {
    constructor (props){
        super(props);
        this.url = window.location.origin;
        this.state={
            email:'',
            password:''
        }
        
}

componentDidMount(){
    
    
    
    const postData={
        code:this.props.match.params.code
    }
    axios.post(this.url+'/api/verify-account',postData)
    .then(function (response) {
        if(response.data=='success'){
            console.log('ok');
        }
    })
  
    $(".App-header").hide();
    
    /* removing any local storage */
        localStorage.removeItem('account');
        localStorage.removeItem('main_view_details');
}
    render() {
        return (
            <div>
            <div className="container-fluid auth-container">
                    <div className="row">
                        <div className="col-12 col-md-5 auth-desc">
                            <div className="auth-form">
                                <img className="logo" src={Logo} />

                                <h1>let us help make it <br></br>
                                    easier for you</h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                {/*<div className="auth-info">
                                    <span>not Have an account ?</span>
                                    <h4>sign up</h4>
                                </div>
                                */}

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1 className="text-center">CONGRATS!</h1>

                                <p className="text-center" style={{fontSize:'20px'}}>Your account is successfully verified! <Link style={{display: "block"}} to="/login">Click here to Login now</Link></p>
                                
                            </div>
                        </div>


                    </div>
                </div>
                
                
              {/*  <div className="container">
                    <div className="row mt-4">
                        <div className="col-12 col-md-5 verify-account-col mx-auto login-col">
                        <h1 className="text-center">CONGRATS!</h1>
                        <p style={{fontSize:'20px'}}>Your account is successfully verified! <Link to="/login">Click here to Login now</Link></p>
                        </div>
                    </div>
                </div>*/}
                
            </div>
        )
    }
}