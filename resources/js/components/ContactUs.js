import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';

import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class contactUs extends Component {
    constructor(props) {
        super(props);
        
        this.state={
            auth_user_id:'',
            isLoggedIn:false,
            name:'',
            phone_number:'',
            email:'',
            loggedIn:'block',
            message:'',
            errorEmailType:'none',
            disabledProp:'',
            errorPhoneNumber:'none',
            errors: {
            name:'',
            phone_number:'',
            email:'',
            message:'',
            errors: {}
            }
        }
        
    this.handleChange0 = this.handleChange0.bind(this);
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleNumberLimit = this.handleNumberLimit.bind(this);
    
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
 
 
handleNumberLimit(e)
{   

    let isnum = /^\+?\d*$/.test(e.target.value);
    
    if(isnum === true)
    {
        this.setState({
          phone_number: e.target.value,
          errorPhoneNumber: 'none',
          disabledProp:false
        })        
               
    }
    else
    {   

        this.setState({
          errorPhoneNumber: 'block',
          disabledProp:true
        }) 
    }
}


    handleChange0(e)
    {
        if(e.target.value == ''){
         
         this.setState({
            name: e.target.value
         })
        }
        else
        {
          let errors = this.state.errors;
          errors.name = '';
          this.setState({
            name: e.target.value,
            errors: errors
        })
        }
    }
    
    handleChange1(e)
    {
        if(e.target.value == ''){
         
         this.setState({
            email: e.target.value,
         })
        }
        else
        {

          let email = e.target.value;
          let errors = this.state.errors;
          errors.email = '';
          this.setState({
            errors: errors
        })
           let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                  if (reg.test(email) === false) {
                    this.setState({ 
                        errorEmailType: 'block',
                        disabledProp:true, 
                        email: e.target.value
                    })
                    //return false;
                  }
                  else
                  {
                    this.setState({
                        errorEmailType: 'none',
                        disabledProp:false,
                        email: e.target.value
                        })
                        if(this.state.errorPhoneNumber ==='none')
                        {
                            this.setState({
                                disabledProp:false,
                                })
                        }
                        else
                        {
                            this.setState({
                                disabledProp:true,
                            })
                        }
                      
                  }
        }
    }    

    handleChange2(e){
        if(e.target.value == ''){
        this.setState({
            message: e.target.value,
            
        })
        }
        else
        {
          let errors = this.state.errors;
          errors.message = '';
          this.setState({
            message: e.target.value,
            errors: errors
        })  
        }
        
    }
    
    
    handleValidation(e){
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.name){
        formIsValid = false;
        errors['name'] = 'Cannot be empty';
    }
    
    if(!this.state.phone_number){
        formIsValid = false;
        errors['phone_number'] = 'Cannot be empty';
    }
    
    
    if(!this.state.email){
        formIsValid = false;
        errors['email'] = 'Email Required';
    }
    if(!this.state.message){
        formIsValid = false;
        errors['message'] = 'Message Required';
    }
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }
    
    onSubmit(e){
    e.preventDefault();
    
    let userid = null;
    
    let state = localStorage["appState"];
    
    const postData = {
        name: this.state.name,
        phone_number: this.state.phone_number,
        email: this.state.email,
        message:this.state.message,
    }
    

    if(this.handleValidation()){
         /* adding entry for the account */
        axios.put(this.url+'/api/contactUs', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag==1)
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Message sent successfully. We will get back to you soon',
                  showConfirmButton: false,
                  timer: 2000
                })
                this.props.history.push('/')
            }
        });
    }
    // else{
    //     Swal.fire({
    //       title: 'Form has Errors',
    //       text: 'Please fill all the fields!',
    //       icon: 'warning',
    //     })
    // }
}

    
    componentDidMount() {
        $(".App-header").hide();
        
this.handleScroll();
     
    }    
    
    componentWillMount() {
        
                let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
        //this.setState({:AppState.isLoggedIn});
       if(AppState.isLoggedIn === true)
       {
           this.setState({loggedIn:'none'});
       }
       else
       {
               this.setState({loggedIn:'block'});
       }
    
     
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
                                    <span>This helps users feel like they are connecting with real people, not just a faceless brand.</span>
                                    <Link to="/register">
								<h4 style={{display:this.state.loggedIn,color:"white"}}>Sign Up</h4></Link>
                                    
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Contact Us</h1>

                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="email">Your Name</label>
                                        <input type="text" className="form-control common-input mb-20" id="name" name="name" placeholder="Your Name" required autoComplete="name" onChange={this.handleChange0}/>
                                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                    </div>
                                    
                                    <div className="form-group">
                                        <label htmlFor="email">Email Account</label>
                                        <input type="email" className="form-control common-input mb-20" id="email" name="email" placeholder="Your E-mail" autoComplete="email" required onChange={this.handleChange1} />
                            <span style={{color: "red"}}>{this.state.errors["email"]}</span>
                            <span style={{display:this.state.errorEmailType,'color':'red'}} >Email type error.</span> 
                                    </div>
                                    <div className="form-group" style={{position:"relative"}}>
                                        <label htmlFor="email">Your Phone Number</label>
                                        <input type="text"  className="form-control" id="phone" maxLength="15" name="phone" placeholder="Your Phone Number" required  autoComplete="phone" onChange={this.handleNumberLimit} />
							<span style={{color: "red"}}>{this.state.errors["phone_number"]}</span>
                            <br/>
                            <span id='errorPhoneNumer' style={{display:this.state.errorPhoneNumber,'color': 'red'}}>Please type only numbers</span>
                            

                                    </div>
                                    
                                    
                                    
                                    <div className="form-group">
                                        <label htmlFor="email">Your Message</label>
                                        <textarea className="form-control" onChange={this.handleChange2} id="message" name="message" placeholder="Enter your message" onChnage></textarea>
                                        <span style={{color: "red"}}>{this.state.errors["message"]}</span>
                                    </div>
                                    
                                    
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