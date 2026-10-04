import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';
import {browserHistory} from 'react-router';
import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
                NewPassword: '', 
                confirm_password:'',
                
                errors: {
                NewPassword: '', 
                confirm_password:'',
                errors: {}
            }
    }
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
        
    
        this.handleValidation = this.handleValidation.bind(this);
        
        this.showPass = this.showPass.bind(this);
        this.showPassConf = this.showPassConf.bind(this);
    
        this.onSubmit = this.onSubmit.bind(this);
        
        this.url = window.location.origin;
    }
    
    componentDidMount() {
        $(".App-header").hide();
    }
    
    handleChangeNewPassword(e){
        let errors = {};   
        if(e.target.value === '')
        {
            errors['NewPassword'] = 'Field cannot be empty';           
            this.setState({
            errors:errors
            })
        }
        else
        {
            errors['NewPassword'] = '';
            
            this.setState({
                    new_password:e.target.value,
                    })
            
            if(this.state.confirm_password == ''){
                    this.setState({
                        passwordError: 0,
                        errors:errors
                    })
                    
            }
            else
            {
                if(e.target.value != this.state.confirm_password)
                    {
                        console.log('here');
                          this.setState({
                              formSubmitting: true,
                                passwordError: 1,
                                errors:errors,
                                new_password: e.target.value
                            })
                      //swal("Password Mismatch!", "Password doesn't match!", "error");
                    }
                    else
                    {
                          errors['ConfirmNewPassword'] = '';
                          this.setState({
                                passwordError: 0,
                                new_password:e.target.value,
                                formSubmitting: false,
                                errors:errors
                            })
                    }
            }

        }
    }
    
    
    handlePasswordConfirm(e) {
  let value = e.target.value;
      let errors = {};
  this.setState({formSubmitting: false});
  console.log('new',this.state.new_password,'confrim pass',value);
  if(value != this.state.new_password)
  {
    
      this.setState({
          formSubmitting: true,
            passwordError: 1,
            confirm_password:e.target.value
        })

      //swal("Password Mismatch!", "Password doesn't match!", "error");
  }
  else
  {
      this.setState({
            passwordError: 0,
            confirm_password:e.target.value,
            formSubmitting: false,   
        })
         errors['ConfirmNewPassword'] = '';
  }
  
   this.setState({
            errors:errors
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




    handleValidation(e){
    let errors = {};
    let formIsValid = true;
    if(!this.state.new_password){
        formIsValid = false;
        errors['NewPassword'] = 'Field cannot be empty';
    }
    
    if(this.state.new_password !== this.state.confirm_password){
        
        formIsValid = false;
        errors['ConfirmNewPassword'] = 'Password does not match';
    }
    
    if(!this.state.confirm_password){
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
        confirm_password: this.state.confirm_password,
        token: this.props.match.params.token
    }
    
    if(this.handleValidation()){
         /* adding entry for the account */
         //console.log('abc');
        axios.put(this.url+'/api/reset-password', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your Password has been Successfully Changed!',
                  showConfirmButton: false,
                  timer: 1500
                })

                this.props.history.push('/login')
            }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Please Type Match Password!',
                  text: 'Something went wrong!',
                })
            }
        });
                this.setState({
                    NewPassword: '',
                    ConfirmNewPassword:'',
                    value:''
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

                                <h1>Simply your life</h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                <div className="auth-info">
                                    <span>Simply your insurance </span>
                                    <Link to="/login">
								<h4 style={{color:"white"}}>Login</h4></Link>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Reset Your Password</h1>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="password">New Password</label>
                                    <p><input id="password" type="password" className="form-control common-input mb-20" minLength='8' name="NewPassword" required="" placeholder="Your New Password" autoComplete="password"  onChange={this.handleChangeNewPassword} />
                                    <i class="far fa-eye" id="togglePassword" onClick={this.showPass}></i></p> 
                                    <span style={{color: "red"}}>{this.state.errors["NewPassword"]}</span>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="password">Confirm New Password</label>
                                        <p><input id="password_confirm" type="password" name="ConfirmNewPassword" minLength='8' placeholder="Confirm Password" className="form-control" autoComplete="new-password" onChange={this.handlePasswordConfirm} />
                                        <i class="far fa-eye" id="togglePassword" onClick={this.showPassConf}></i></p>
                                
                                    </div>
                                    
							
							                                {(() => { 
        
                                if(this.state.passwordError === 1 || this.state.errors["ConfirmNewPassword"] === 'Password does not match' ){
                                    return(
                                        
                                        <span style={{color:'red'}}> Password doesn't matched!</span>
            				
                                      )}
                 
                                })()}  
							
							
							
                                    <button className="btn btn-gradient" style={{fontSize:"17px"}} type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Reset Password</button>
                                    
                                </form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}
