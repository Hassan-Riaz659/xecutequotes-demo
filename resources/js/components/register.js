import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';
import Navigation from './navigation/index';

import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state={
            firstStep: 'block',
            secondStep: 'none',
            auth_user_id:'',
            isLoggedIn:false,
            name:'',
            phone_number:'',
            company_url:'',
            email:'',
            errorSentenceFlag:'none',
            errorCompanyUrl:'none',
            errorSentenceFlag:'none',
            errorSentenceEmpty:'none',
            errorSentencePassEmpty:'none',
            errorSentencePassConfEmpty:'none',
            errorEmailType:'none',
            errorPhoneNumber:'none',
            password:'',
            password_confirm:'',
            prevbtn:'none',
            disabledProp:false,
           formSubmitting:false,
           passwordError:0,
            
            
            errors: {
            name:'',
            phone_number:'',
            company_url:'',
            email:'',
            password:'',
            password_confirm:'',
            errors: {}
            }
        }
        
        this.nextBtn = this.nextBtn.bind(this)
        this.handleChange0 = this.handleChange0.bind(this);
    
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    this.handleCompanyUrl = this.handleCompanyUrl.bind(this);
    this.nextPrev = this.nextPrev.bind(this);
    
    this.onChange1 = this.onChange1.bind(this);
    this.onBlurEmail = this.onBlurEmail.bind(this);
    
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirm = this.onChangePasswordConfirm.bind(this);
    this.showPass = this.showPass.bind(this);
    this.showPassConf = this.showPassConf.bind(this);
    

        this.onSubmit = this.onSubmit.bind(this);
        
         
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
 
    componentWillMount() {
            
            
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      if(AppState.isLoggedIn === true)
      {
        this.props.history.push('/');   
      }
     
    }
        
    }


    componentDidMount () {
        $(".App-header").hide();
        this.handleScroll();
//   let state = localStorage["appState"];
//     if (state) {
//       let AppState = JSON.parse(state);
//       this.setState({ isLoggedIn: AppState.isLoggedIn, auth_user_id: AppState.user.id });
//     }
    
    /* removing any local storage */
        localStorage.removeItem('account');
        localStorage.removeItem('main_view_details');
}
nextPrev(){
    
    this.setState({
            firstStep: 'block',
            prevbtn:'none',
            secondStep: 'none',
            formSubmitting: true
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

nextBtn(){
    
       const string = this.state.email;
        const substring = "@";
        var ans = string.includes(substring)

    if(this.state.email == '' || this.state.password == '' || this.state.password_confirm == ''){
    if(this.state.email == '' ){
        
       this.setState({
            errorSentenceEmpty:'block'
        }) 
    }
    else
    {
        
        this.setState({
            errorSentenceEmpty:'none'
        })
        

    }
    

    
     if(this.state.password == '' ){
        
       this.setState({
            errorSentencePassEmpty:'block'
            }) 
    }
    else
    {
        this.setState({
            errorSentencePassEmpty:'none'
        })
    }
    
    if(this.state.password_confirm == '' ){
        
       this.setState({
            errorSentencePassConfEmpty:'block'
        }) 
    }
    else
    {
        this.setState({
            errorSentencePassConfEmpty:'none'
        })
    }
    }
    
    // else if(string.includes(substring))
    // {
    //         console.log('inculed substring');
    //         this.setState({
    //             disabledprop:false;
    //         })
    // }

    else{
     this.setState({
            firstStep: 'none',
            prevbtn:'block',
            secondStep: 'block',
        }) 
        return
        
}
}
    

    onChangePhoneNumber(e)
    {
        let isnum = /^\+?\d*$/.test(e.target.value);
        
        if(isnum === true)
        {
            this.setState({
              phone_number: e.target.value,
              errorPhoneNumber: 'none',
              formSubmitting:false
            })        
                   
        }
        else
        {   
    
            this.setState({
              errorPhoneNumber: 'block',
              formSubmitting:true
            }) 
        }
    }
    
    handleCompanyUrl(e)
    {
        const string = e.target.value;
        const substring = ".";
        
        if(string.includes(substring))
        {
            
            this.setState({
                company_url: e.target.value,
                errorCompanyUrl:'none',
               formSubmitting:false
            })
            if(this.state.errorPhoneNumber === 'block')
            {
              this.setState({
               formSubmitting:true
            })  
            }
            else
            {
             this.setState({
               formSubmitting:false
            })  
            }
        }
        else
        {

            this.setState({
                errorCompanyUrl:'block',
                formSubmitting:true
            })
        }
    }
    
    handleChange0(e)
    {
        this.setState({
            name: e.target.value
        })
    }
    
    onChangePassword(e){
        // this.setState({
        //     password:e.target.value
        // })
    

    
     if(e.target.value == '' ){
        
       this.setState({
            errorSentencePassEmpty:'block',
            passwordError: 0,
        }) 
    }
    else
    {
        this.setState({
            errorSentencePassEmpty:'none',
              password:e.target.value
        })
        if(this.state.password_confirm !== '')
        {
         if(e.target.value != this.state.password_confirm)
          {
    
              this.setState({
                    passwordError: 1,
                    password:e.target.value,
                    disabledProp:true
                })
              
              //swal("Password Mismatch!", "Password doesn't match!", "error");
          }
          else
          {

             if(this.state.errorSentenceEmpty === 'block' || this.state.errorEmailType === "block" || this.state.errorSentenceFlag ==='block')
              {
                    this.setState({
                    passwordError: 0,
                    password:e.target.value,
                    disabledProp:true
                })              
              }
              else
              {
                  this.setState({
                    passwordError: 0,
                    password:e.target.value,
                    disabledProp:false
                })
              }

          }            
        }
    }
        
  }
    
    onChangePasswordConfirm(e) {
      let value = e.target.value;
//      console.log('pass',this.state.password,'confrim',value)
      if(value != this.state.password)
      {

          this.setState({
                passwordError: 1,
                password_confirm:e.target.value,
                disabledProp:true
            })
          
          //swal("Password Mismatch!", "Password doesn't match!", "error");
      }
      else
      {
            if(this.state.errorSentenceEmpty === 'block' || this.state.errorEmailType === "block" || this.state.errorSentenceFlag ==='block')
            {
                this.setState({
                passwordError: 0,
                password_confirm:e.target.value,
                disabledProp:true
            })              
          }
          else
          {
              this.setState({
                passwordError: 0,
                password_confirm:e.target.value,
                disabledProp:false
            })
          }

      }
     if(e.target.value == '' ){
        
       this.setState({
            errorSentencePassConfEmpty:'block',
            passwordError: 0
        }) 
    }
    else
    {
        if(this.state.errorSentenceEmpty === 'block' || this.state.errorEmailType === "block" || this.state.errorSentenceFlag ==='block')
          {
                this.setState({
                    errorSentencePassConfEmpty:'none',
                    disabledProp:true
                })
          }
          else
          {
                this.setState({
                    errorSentencePassConfEmpty:'none',
                    disabledProp:false
                })
          }

    }
    
    }

onChange1(e){
    
    let email = e.target.value;
    
    if(email == '' ){
        
       this.setState({
            errorSentenceEmpty:'block',
            errorEmailType: 'none',
            disabledProp:true
        }) 
    }
    else
    {
        this.setState({
            disabledProp:false,
            errorSentenceEmpty:'none',
            disabledProp:false
        })
    
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(email) === false) {
        
        this.setState({ errorEmailType: 'block',disabledProp:true })
        //return false;
      }
      else {
        
        
                this.setState({
                email: e.target.value,
                errorEmailType:'none',
                disabledProp:false
            })
        
         const postData = {
      email:e.target.value
    }
    
    axios.post(this.url+'/api/check-existing-email', postData).then((response) => {
            //console.log('resuu',response);
            if(response.data.flag==true)
            {
                        
                this.setState({errorSentenceFlag:'block',emailExists:true,disabledProp:true})

            }else{

               this.setState({
                   errorSentenceFlag:'none',
                   emailExists:false
               })
                if(this.state.errorSentencePassEmpty === "block" || this.state.errorSentencePassConfEmpty ==="block" )// password mot match error then disabled prop ko true.
                  {
                        this.setState({disabledProp:true})
                  }
                else
                  {
                        this.setState({disabledProp:false})
                  }
            }
             
        })
        
      }
    }
    
    if(this.state.emailExists == false && email != ''){
        this.setState({
            errorSentenceFlag:'none'
        });
}
}
    
onBlurEmail(e)
{
    //   const postData = {
    //   email:this.state.email
    // }
    
    // axios.post(this.url+'/api/check-existing-email', postData).then((response) => {
    //         //console.log('resuu',response);
    //         if(response.data.flag==true)
    //         {
                
    //         this.setState({errorSentenceFlag:'block',emailExists:true,disabledProp:true})

    //         }else{
                
    //     this.setState({errorSentenceFlag:'none',emailExists:false,disabledProp:false})

    //         }
             
    //     })
    

}


    
    onSubmit(e){
    e.preventDefault();
    let userid = null;
    

    
    
    //  let state = localStorage["appState"];
    // if (state) {
    //   let AppState = JSON.parse(state);
    //   this.setState({ isLoggedIn: AppState.isLoggedIn, auth_user_id: AppState.user.id });
    //   userid = AppState.user.id;
    // }
    const postData = {
        //user_id:userid,
        name: this.state.name,
        phone_number: this.state.phone_number,
        company_url: this.state.company_url,
        email: this.state.email,
        password: this.state.password,
        password_confirm: this.state.password_confirm,
    }

         /* adding entry for the account */
        axios.put(this.url+'/api/register', postData).then((response) => {
            //console.log('res',response.data.flag);
            if(response.data.flag==1)
            {
                //console.log('success');
               Swal.fire({
                  title: 'Thanks for signing up. Please verify your email!',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })

                this.props.history.push('/login')
            }
            // else{
            //     Swal.fire({
            //       icon: 'error',
            //       title: 'The email has already been taken',
            //       text: 'Please Enter Valid Password!',
            //     })
            // }
        });
}


    render() {
        return (
            <div ref={this.myRef}>
                <div className="container-fluid auth-container">
                    <div className="row">
                        <div className="col-12 col-md-5 auth-desc">
                            <div className="auth-form">
                                <Link to="/" className="navbar-brand"><img className="img-fluid logo" src={baseUrl + '/public/images/insurance_logo.png'} /></Link>

                                <h1>Simply your insurance </h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                <div className="auth-info">
                                    <span>Simply your insurance </span>
                                    <Link to="/login">
								<h4 style={{color:"white"}}>Log In</h4></Link>
                                    
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>sign up <button type="button" className="btn btn btn-gradient" id="prevBtn" onClick={()=>this.nextPrev()} style={{display: this.state.prevbtn}}>Previous</button></h1> 

    <form style={{display: this.state.firstStep}}>
      <div className="form-group">
        <label htmlFor="email">Email Account</label>
           <input type="email" className="form-control" placeholder="Your E-mail" onChange={this.onChange1} onBlur={this.onBlurEmail} />
           
           <span style={{display:this.state.errorSentenceFlag, color: "red",marginBottom:"15px",}} >{this.state.errors["email"]}Email already exists.</span>
            <span style={{display:this.state.errorSentenceEmpty,'color':'red'}} >Field Empty.</span>
            <span style={{display:this.state.errorEmailType,'color':'red'}} >Not email type.</span>
      </div>
                                    
                                    <div className="form-group form-group2">
                                        <label htmlFor="pwd">Password</label>
                                        <p><input type="password" className="form-control" id="password" name="password" placeholder="Your Password" minLength="8" autoComplete="password" onChange={this.onChangePassword} required/>
                                        <i class="far fa-eye" id="togglePassword" onClick={this.showPass}></i></p> 
                                        <span style={{display:this.state.errorSentencePassEmpty,'color':'red'}} >Password Empty.</span>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="pwd">Confirm Password</label>
                                        <p><input type="password" className="form-control" id="password_confirm" name="password_confirm" placeholder="Confirm Password" className="form-control" autoComplete="new-password" minLength="8" onChange={this.onChangePasswordConfirm} required />
                                        <i class="far fa-eye" id="togglePassword" onClick={this.showPassConf}></i> </p>
                                        <span style={{color: "red",marginBottom:"15px",display:"block"}}>{this.state.errors["password_confirm"]}</span>
                                {(() => { 
        
                                if(this.state.passwordError === 1 || this.state.errorSentencePassConfEmpty === 'block' ){
                                    return(
                                        
                                        <span style={{color:'red'}}> Password doesn't match!</span>
            				
                                      )}
                 
                                })()}                      
                                </div>

                                    <button type="button" onClick={()=> this.nextBtn()} disabled={this.state.disabledProp} className="btn btn-gradient">Next</button>
                                </form>

                                <form style={{display: this.state.secondStep}} onSubmit={this.onSubmit}>
                                    

                                    <div className="form-group form-group2">
                                    
                                        <div className="row">
                                            <div className="col-12 col-md-6 yourName-col">
                                            <label htmlFor="">Your Name </label>
                                            <input type="text" className="form-control" id="name" name="name" placeholder="Your Name"  autoComplete="name" onChange={this.handleChange0} required/>
                                            <span style={{color: "red",marginBottom:"15px",display:"block"}}>{this.state.errors["name"]}</span>
                                            </div>

                                            <div className="col-12 col-md-6 companyName-col">
                                            <label htmlFor="">Company Phone Number</label>

                                        <input type="text" className="form-control" id="phone" name="phone" maxLength="15" placeholder="Company Phone Number" required="" autoComplete="phone" onChange={this.onChangePhoneNumber} required/>
                                        
							            <span style={{color: "red",marginBottom:"15px",display:"block"}}>{this.state.errors["phone_number"]}</span>
                                        <br/>
                            <span id='errorPhoneNumer' style={{display:this.state.errorPhoneNumber,'color': 'red'}}>Please type only numbers</span>
                                            </div>
                                        </div>
                                       
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Company URL</label>
                                        <input type="text" className="form-control" id="homepage" name="homepage" placeholder="Company URL" autoComplete="homepage" onChange={this.handleCompanyUrl} required/>
                                        <span style={{color: "red",marginBottom:"15px",display:"block"}}>{this.state.errors["company_url"]}</span>
                                    </div>
                                    
						
                                    <button type="submit" className="btn btn-gradient" disabled={this.state.formSubmitting}>Submit</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}
