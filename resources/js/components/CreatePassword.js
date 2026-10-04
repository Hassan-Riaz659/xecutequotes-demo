import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';

import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class CreatePassword extends Component {
    constructor (props) {
        super(props);

    this.state = {
                NewPassword: '', 
                ConfirmNewPassword:'',
                
                errors: {
                NewPassword: '', 
                ConfirmNewPassword:'',
                errors: {}
            }
    }
    
    this.state={
            nemail:'',
            
            errors: {
            nemail:'',
            errors: {}
            }
        }
                
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
        this.handleChangeNemail = this.handleChangeNemail.bind(this);
    
    
        this.handleValidation  = this.handleValidation.bind(this);
        this.handleValidation2 = this.handleValidation2.bind(this);
        this.showPass          = this.showPass.bind(this);
        this.showPassConf      = this.showPassConf.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        
        this.url = window.location.origin;
    }



    componentWillMount() {
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      console.log('state',AppState);
      if(AppState.isLoggedIn === true)
      {
        window.localStorage.clear();  
      }
     
    }
        
    }    
    
    
        handleChangeNewPassword(e){
        this.setState({
            new_password: e.target.value
        })
    }
    
    showPass(e)
    {
          var x = document.getElementById("password");
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
    }
    
    showPassConf(e)
    {
          var x = document.getElementById("password_confirm");
          if (x.type === "password") {
            x.type = "text";
          } else {
            x.type = "password";
          }
    }
        
    handleChangeConfirmPassword(e){
        this.setState({
            confirm_password: e.target.value
        })
    }
        handlenChangeConfirmPassword(e) {
  let value = e.target.value;
  this.setState({formSubmitting: false});
  if(value!=this.state.password)
  {
      this.setState({formSubmitting: true});
      this.setState({
            passwordError: 1,
            new_password:e.target.value
        })
      
      //swal("Password Mismatch!", "Password doesn't match!", "error");
  }
  else
  {
      this.setState({
            passwordError: 0,
            confirm_password:e.target.value
        })
  }
}

handleValidation(e){
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.new_password){
        formIsValid = false;
        errors['newpassword'] = 'Cannot be empty';
    }
    
    if(!this.state.confirm_password){
        formIsValid = false;
        errors['ConfirmNewPassword'] = 'Cannot be empty';
    }
    
    if(this.state.new_password != this.state.confirm_password){
        formIsValid = false;
        errors['ConfirmNewPassword'] = 'Password does not match';
    }
    
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }


     onSubmit(e){
         //console.log(this.props.match.params.token,"token");
    e.preventDefault();
    
    const postData = {
        new_password: this.state.new_password,
        token: this.props.match.params.token
    }
    
    if(this.handleValidation()){
         /* adding entry for the account */
         //console.log('abc');
        axios.put(this.url+'/api/create-password', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag=='1')
            {
                  Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your Password has been Successfully Created!',
                  showConfirmButton: false,
                  timer: 1500
                })

                
                this.props.history.push('/login')
            }else{
                alert('Please Type Match Password!')
            }
        });
                // this.setState({
                //     NewPassword: '',
                //     ConfirmNewPassword:'',
                //     value:''
                // })
    }
}

    handleChangeNemail(e){
        this.setState({
            nemail: e.target.value
        })
    }
    
    handleValidation2(e){
    
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.nemail){
        formIsValid = false;
        errors['nemail'] = 'Valid Email Required';
    }
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }
    
    onSubmit2(e){
    e.preventDefault();
    
    const postData = {
        nemail: this.state.nemail,
    }
        if(this.handleValidation2()){
         /* adding entry for the account */
        axios.post(this.url+'/api/newsletter', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag==1)
            {
                alert('Email Successfully Subscribed!');
            }else{
                alert('Email already exist');
            }
        });
        
        this.setState({
                    nemail:''
                })
    }
}

    render() {
        return (
        <div>
                <div className="container-fluid auth-container">
                    <div className="row">
                        <div className="col-12 col-md-5 auth-desc">
                            <div className="auth-form">
                                <Link to="/" className="navbar-brand"><img className="img-fluid logo" src={baseUrl + '/public/images/insurance_logo.png'} /></Link>

                                <h1>let us help make it <br></br>
                                    easier for you</h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Create Password</h1>


		                        <form onSubmit={this.onSubmit}>
                                <div className="row">
							    <div className="col-md-12 form-group form-group-col">
                                        <label htmlFor="pwd">Password</label>
                                     <p className="showPasswordEyeDiv">     <input id="password" type="password" minLength='8' className="form-control common-input mb-20" name="NewPassword" required="" placeholder="Your New Password" autoComplete="password" value={this.state.NewPassword} onChange={this.handleChangeNewPassword} />
                                        <i class="far fa-eye" id="togglePassword" onClick={this.showPass}></i> </p>
                                    <span style={{color: "red"}}>{this.state.errors['newpassword']}</span>
                                </div>

							
							<div className="col-md-12 form-group form-group-col">
                                <label htmlFor="pwd">Confirm Password</label>
                                     <p className="showPasswordEyeDiv">     <input id="password_confirm" type="password" minLength='8' name="ConfirmNewPassword" placeholder="Confirm Password" className="form-control" autoComplete="new-password" value={this.state.ConfirmNewPassword} onChange={this.handleChangeConfirmPassword} />
                                     <i class="far fa-eye" id="togglePassword" onClick={this.showPassConf}></i> </p>
                                <span style={{color: "red"}}>{this.state.errors['ConfirmNewPassword']}</span>
                            </div>
							
							<div className="col-md-12 form-group form-group-col2">
							  {this.state.passwordError === 1 ? 
							    <span> Password doesn't match!</span>
							    :null
							}
    <button type="submit" disabled={this.state.formSubmitting ? "disabled": ""} className="btn btn-gradient">Submit</button>
							</div>
						</div>
					</form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}