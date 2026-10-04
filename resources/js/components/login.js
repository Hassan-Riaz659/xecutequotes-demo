import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';
import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class Login extends Component {
    constructor(props) {
        super(props);
        
        this.state = {email: '',password: '', isLoggedIn: false, user: {email: '',password: ''}, resendFlag:'none',agentFlag:'none',disabledProp:false,
            rememberMe: false,
        };
        
    this.handleChange = this.handleChange.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.showPass      = this.showPass.bind(this);
    
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSubmit2 = this.onSubmit2.bind(this);
    
    this.handleScroll =  this.handleScroll.bind(this);
        this.myRef = React.createRef();
         window.scrollTo(0, 0);
    
    this.url = window.location.origin;
    }
    
    
    handleScroll() {
    const { index, selected } = this.props
    if (index === selected) {
      setTimeout(() => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
 }

  handleChange(e){
      
    const input = e.target;
    const value = input.type === 'checkbox' ? input.checked : input.value;
    this.setState({ rememberMe: value });
  };


handleChange1(e){
    if(e.target.value === '')
    {
        this.setState({
            disabledProp:true,
            resendFlag:'none',
            agentFlag:'none'
        })
        
    }
    else
    {    
        this.setState({
            email: e.target.value,
            resendFlag:'none',
            agentFlag:'none',
            disabledProp:false
        })
    }
}
    
    handleChange2(e){

    if(e.target.value === '')
    {
        this.setState({
            disabledProp:true,
            resendFlag:'none',
            agentFlag:'none'
        })
          
    }
    else
    {    
        this.setState({
            password: e.target.value,
            resendFlag:'none',
            agentFlag:'none',
            disabledProp:false
        })
    }
        
        
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

onSubmit2(e){
    e.preventDefault();
    
    const postData = {
        email: this.state.email
        
    }
    axios.post(this.url+'/api/resend-email', postData).then((response) => {
            // console.log('res',response);
            if(response.data.flag==1)
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Please check Your email!',
                  showConfirmButton: false,
                  timer: 1500
                })
            }
            else
            {
                  Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Please provide correct email!',
                  showConfirmButton: false,
                  timer: 1500
                })
            }
        });
}

handleSubmit(e){
    e.preventDefault();
    
//    console.log('remember me',this.state.rememberMe);  

    
    const postData = {
      email: this.state.email,
      password: this.state.password
    }
    
    let uri = baseUrl+'/api/user-login';
    axios.post(uri, postData).then((response) => {
        
        console.log(response.data,"ddataaa");
        if(response.data.status==0)
        {
            this.setState({
              resendFlag:'block'
          })
        }
        else if(response.data.status==4)
        {
            //Please check your email to verify your account
            this.setState({
              agentFlag:'block'
          })
            
        }
        else if(response.data.status==2)
        {
         Swal.fire({
          icon: 'warning',
          title: "Entered email doesn't associate with any account!",
          text: 'Please Enter Valid Email and Password!',
        })
        }
        else if(response.data.status==3)
        {
         Swal.fire({
          icon: 'warning',
          title: "Password entered wrong!",
          text: 'Please Enter Valid Password!',
        })
        }
        else
        {

      if(this.state.rememberMe === true)
      {
           let credentials = {
             email: this.state.email,
             password: this.state.password,
             rememberMe:true
           };
           localStorage["credentials"] = JSON.stringify(credentials);
           this.setState({
              email:credentials.email,
              password:credentials.password,
              rememberMe:credentials.rememberMe,
              error: ''
           });
            
      }else{
          let credentials = {
              email: '',
             password: '',
             rememberMe:false
           };
           localStorage["credentials"] = JSON.stringify(credentials);
      }
    
            $('#email').val('');
            $('#password').val('');
        let appState = {
             isLoggedIn: true,
             user: response['data']['user']
           };
           localStorage["accessToken"] = response['data']['access_token'];
           localStorage["appState"] = JSON.stringify(appState);
           

           this.setState({
              isLoggedIn: appState.isLoggedIn,
              user: appState.user,
              error: ''
           });
           
            this.props.history.push('/dashboard');
        
            
        }
    })
    .catch(error => {
    console.log('error',error);
          icon: 'warning',
    Swal.fire({
          title: 'Empty credentials!',
          text: 'Please Enter Email and Password!',
        })
});
  }
    
    
    componentWillMount() {
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      if(AppState.isLoggedIn ===true)
      {
        this.props.history.push('/');   
      }
      //this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
    }
    

        
    }

componentDidMount() {
    this.handleScroll();
    
        $(".App-header").hide();
         let credentials = localStorage["credentials"];
    if (credentials) {
      let userCredentials = JSON.parse(credentials);
        this.setState({
            rememberMe:userCredentials.rememberMe,
            email:userCredentials.email,
            password:userCredentials.password
        }) 
      //this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
    }
        
    }


    render() {
        return (
            <div ref={this.myRef}>
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

                                <div className="auth-info">
                                    <span>Don't have an account ?</span>
                                    
                                    <Link to="/register">
								<h4 style={{color:"white"}}>Sign Up</h4></Link>
                                    
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Log In</h1>

                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Account</label>
                                        <input type="email" className="form-control common-input mb-20" id="email" name="email" placeholder="Your E-mail" required defaultValue={this.state.email} onChange={this.handleChange1} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password</label>
                                     <p className="showPasswordEyeDiv">   <input id="password" type="password" className="form-control common-input mb-20" name="password" defaultValue={this.state.password} required id="password" placeholder="Your Password" onChange={this.handleChange2} />
                                        <i class="far fa-eye" id="togglePassword" onClick={this.showPass}></i> </p>
                                        <span style={{fontSize:"14px"}}>Forgot Password? <Link to="/forgot-password/" style={{paddingLeft:"7px"}}>Click here to Reset Password!</Link></span>
                                    </div>
                                    <div className="form-group form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" name="rememberMe" checked={this.state.rememberMe}  onChange={this.handleChange} type="checkbox" /> Remember me
                                        
                                        </label>
                                    </div>
                                    {this.state.resendFlag==='block'?<div className="col-md-12 form-group form-group-col2" style={{display:this.state.resendFlag}}>
                                    <p>Your account is inactive. Please <a href="#" onClick={this.onSubmit2}>click here</a> to resend validation email</p></div>:''}
                                    
                                    {this.state.agentFlag==='block'?<div className="col-md-12 form-group form-group-col2" style={{display:this.state.agentFlag}}>
                                    <p>An email has already been sent to you please create password.</p></div>:''}
                                    
                                    <button type="submit" disabled={this.state.disabledProp} className="btn btn-gradient">Submit</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}
