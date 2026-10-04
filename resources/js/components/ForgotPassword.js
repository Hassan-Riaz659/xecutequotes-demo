import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';
import {browserHistory} from 'react-router';
import swal from 'sweetalert';
import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state={
            auth_user_id:'',
            isLoggedIn:false,
            email:'',
            errorEmptyEmail:'none',
            formSubmitting:'false',
            
            errors: {
            email:'',
            errors: {}
            }
        }
        this.handleChange1 = this.handleChange1.bind(this);
 
        this.onSubmit = this.onSubmit.bind(this);
        
        this.url = window.location.origin;
    }
componentDidMount () {
    $(".App-header").hide();
   let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, auth_user_id: AppState.user.id,formSubmitting:true});
    }
    
    /* removing any local storage */
        localStorage.removeItem('account');
        localStorage.removeItem('main_view_details');
}

    handleChange1(e){
        if(e.target.value ==='')
        {
            this.setState({formSubmitting:true});
        }
        else
        {
              this.setState({
                  formSubmitting:false,
                  email: e.target.value
            })
        }
    }

onSubmit(e){
    //console.log(this.state.email);
    //console.log(this.props.match.params.token,"token");
    e.preventDefault();
    const postData = {
      email: this.state.email,

    }
    
    let uri = baseUrl+'/api/forgot-password';
    axios.post(uri, postData).then((response) => {
        if(response.data.flag=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Check your email for reset password!',
                  showConfirmButton: false,
                  timer: 1500
                })

            }else{
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: "Entered email doesn't associate with any account!",
                  showConfirmButton: false,
                  timer: 1500
                })
            }
        });
        this.setState({
                    email:'',
                    value:''
                })
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
                                    <span>Are you an existing user ?</span>
                                    <Link to="/login"><h4 style={{color:"white"}}>Log In</h4></Link>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Password Reset</h1>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="password">Email</label>
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Your E-mail" required="" onChange={this.handleChange1} />
                                    <span style={{display:this.state.errorEmptyEmail,color:"red"}}>Email is empty</span>
                                    </div>
                                    
                                    <button className="btn btn-gradient" type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Submit</button>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}