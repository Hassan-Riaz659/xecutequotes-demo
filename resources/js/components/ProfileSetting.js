import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;

export default class ProfileSetting extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoggedIn: false,
            user: {},
            email:'',
            code:'',
            userid:'',
            password:'',
            new_password:'',
            confirm_password:'',
            name:'',
            phone_number:'',
            logo:'',
            profile_img:'',
            disabledProp:false,
            errorEmptyName:'none',
            errorPhoneNumber:'none',
            errorEmptyPhoneNumber:'none',
            errorSameEmail:'none',
            codeBtn:true,
            submit5:true,
            errorSentenceFlag:'none',
            existingName:'',
            existingPhone_number:'',            
            imageStatus:false,
            errorEmailType:'none',
            errors: {
            email:'',
            code:'',
            password:'',
            new_password:'',
            confirm_password:'',
            name:'',
            phone_number:'',
            
            errors: {},
            selectedFile: null
            
            }
            
        }
        
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeNewPassword = this.handleChangeNewPassword.bind(this);
        this.handleChangeConfirmPassword = this.handleChangeConfirmPassword.bind(this);
    
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeCode = this.handleChangeCode.bind(this);
        

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
        this.handleChangeLogo = this.handleChangeLogo.bind(this);
        
        
        
        this.handleValidation = this.handleValidation.bind(this);

        this.handleValidation3 = this.handleValidation3.bind(this);
        
        
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmit2 = this.onSubmit2.bind(this);
        this.onSubmit3 = this.onSubmit3.bind(this);
        this.onSubmit4 = this.onSubmit4.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.url = window.location.origin;
        
        this.handleScroll =  this.handleScroll.bind(this);
        this.myRef = React.createRef();
         window.scrollTo(0, 0);
    }
    
    handleScroll() {
    const { index, selected } = this.props
    if (index === selected) {
      setTimeout(() => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
 }
    
    

    componentDidMount() {
         this.handleScroll(); 
         
        $(document).ready(function () {
            $(".App-header").hide();
        })
        
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);

      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, userid: AppState.user.id,phone_number:AppState.user.phone_number,name:AppState.user.name, logo:AppState.user.company_logo,existingName:AppState.user.name,            
            existingPhone_number:AppState.user.phone_number});
            
      axios.get((this.url+'/api/fetch-user-data/'+ AppState.user.id))
      .then(res => {
       // this.setState({ email:state.user.email, user:state.user.name });
      })
       //console.log('profiel imae',AppState.user.profile_img)
    }
   
            //this.setState({submit4:true});

    }
    


    
    
    
    onDelete(){
    axios.delete(this.url+'/api/delete-logo/'+this.state.userid)
    .then(res => {
        if(res.data.flag=='success')
        {
                
                let appState = {
                     isLoggedIn: true,
                     user: res['data']['user']
                  };
                  console.log('user data',res['data']['user']);
                  localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                     logo:res['data']['user']['company_logo'],
                     selectedFile: null,
                     imageStatus:true
                    
                })
                
        }
        })
  }


  
  

   
    
    handleChangeEmail(e){
        let email =  e.target.value;
            //this.setState({codeBtn:false});
            
          let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          
          if (reg.test(email) === false) {
            console.log('why');
            this.setState({ errorEmailType: 'block',codeBtn:true})
            //return false;
          }
          else
          {
            
            this.setState({ errorEmailType: 'none'})
            if(this.state.user.email === email)
            {
                this.setState
                ({
                    errorSameEmail:'block',codeBtn:true
                })   
            }
            else
            {
                this.setState
                ({
                    errorSameEmail:'none',codeBtn:false
                    
                })  
            const postData = {
              email:email
            }
            
            axios.post(this.url+'/api/check-existing-email', postData).then((response) => {
                    //console.log('resuu',response);
                    if(response.data.flag==true)
                    {
                                
                           this.setState({ errorSentenceFlag: 'block',codeBtn:true})
        
                    }
                    else
                    {
        
                        this.setState({ errorSentenceFlag: 'none',codeBtn:false,email:email})
                    }
                })
        }
    }

        
    }
    
    handleChangeCode(e){
        this.setState({
            code: e.target.value
        })
    }
    
    handleChangeName(e){

        if(e.target.value === '')
        {
            this.setState({disabledProp:true,
            errorEmptyName:'block'});
                   
        }
        else
        {

            this.setState({
            name:e.target.value,
            errorEmptyName:'none'
        });
        if(this.state.errorPhoneNumber ==='block')
        {
           this.setState({
            disabledProp:true,
            }); 
        }
        else
        {

            this.setState({
            disabledProp:false,
            }); 
        }
        }

    }
    
    
    
    handleChangePhoneNumber(e){
         
        if(e.target.value === '')
        {
            this.setState({disabledProp:true,
            errorEmptyPhoneNumber:'block'});
                   
        }
        else
        {  
        
             let isnum = /^\+?\d*$/.test(e.target.value);
        
        if(isnum === true)
        {
            this.setState({
              phone_number: e.target.value,
              errorPhoneNumber: 'none',
              errorEmptyPhoneNumber:'none',
              disabledProp:false
            })      
        }
        else
        {   
    
            this.setState({
              errorPhoneNumber: 'block',
              errorEmptyPhoneNumber:'none',
              disabledProp:true
            }) 
        }
        

    }
        
    }

    handleChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    
    handleChangeNewPassword(e){
        this.setState({
            new_password: e.target.value
        })
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
    
    if(!this.state.password){
        formIsValid = false;
        errors['password'] = 'Cannot be empty';
    }
    
    
    if(!this.state.new_password){
        formIsValid = false;
        errors['new_password'] = 'Cannot be empty';
    }
    
    if(this.state.new_password != this.state.confirm_password){
        formIsValid = false;
        errors['new_password'] = 'Password does not match';
    }
    
    if(!this.state.confirm_password){
        formIsValid = false;
        errors['confirm_password'] = 'Cannot be empty';
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
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, auth_user_id: AppState.user.id });
      userid = AppState.user.id;
    }
    const postData = {
        user_id:userid,
        password: this.state.password,
        new_password: this.state.new_password,
        confirm_password: this.state.confirm_password,
        
    }
    
    if(this.handleValidation()){
         /* adding entry for the account */
        axios.post(this.url+'/api/password-update', postData).then((response) => {
            // console.log('res',response);
            
            this.setState({
                    password:'',
                    new_password:'',
                    confirm_password:'',
                    value:''
                })
            if(response.data.flag=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your Password has been Successfully Updated!',
                  showConfirmButton: false,
                  timer: 2000
                })

            }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'Old Password is wrong!',
                  text: 'Please Enter Valid Password!',
                })
            }
        });
    }
}

// handleValidation2(e){
//         let errors = {};
//     let formIsValid = true;
//     if(!this.state.name){
//         formIsValid = false;
//         errors['name'] = 'Cannot be empty';
//     }
//     else if(!this.state.phone_number){
//         formIsValid = false;
//         errors['phone_number'] = 'Cannot be empty';
//     }
    
//     this.setState({
//             errors:errors
//         })
//         return formIsValid;
//     }
    handleChangeLogo(e){
        this.setState({ selectedFile: event.target.files[0],imageStatus:true });
    }
 

    
    checkIfchanged()
    {


        if(this.state.name !== this.state.existingName || this.state.phone_number !== this.state.existingPhone_number || this.state.imageStatus === true)
        {

            return true;
            //stop submit
        }
        else
        {

            return false;
            //let go
        }
    }
    
    onSubmit2(e){
        e.preventDefault();
    
        if(this.checkIfchanged())
        {
        
        let userid = null;
        let state = localStorage["appState"];
        const formData = new FormData();
        
        if(this.state.selectedFile)
         {
           
            
              formData.append(
            "myFile",
            this.state.selectedFile,
            
            formData.append('user_id', this.state.userid),
            formData.append('name', this.state.name),
            formData.append('phone_number', this.state.phone_number),
            );
        }
         else if(this.state.userid !='' || this.state.name !='' || this.state.phone_number != ''){
              console.log("here");
            formData.append('user_id', this.state.userid);
            formData.append('name', this.state.name);

            formData.append('phone_number', this.state.phone_number);
         }
         else{
            formData.append('user_id', this.state.userid);
            formData.append('name', this.state.name);

            formData.append('phone_number', this.state.phone_number);
             
         }
         
         /* adding entry for the account */
         //console.log('form data',formData);
        axios.post(this.url+'/api/info-update',formData).then((response) => {
             
             //console.log('res',response);
            if(response.data.flag=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your information has been successfully saved!',
                  showConfirmButton: false,
                  timer: 1500
                })

                console.log('user',response['data']['user']);
              let appState = {
                     isLoggedIn: true,
                     user: response['data']['user']
                  };
                  
                  localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                    logo:response['data']['user']['company_logo'],
                    existingName:response['data']['user']['name'],            
                    existingPhone_number:response['data']['user']['phone_number']
                })
                
            }
            
        });
    
    // else{
    //     Swal.fire({
    //       title: 'Form has Errors',
    //       text: "Please fill as update",
    //       icon: 'warning',
    //     })
    // }
    
    // axios.post(this.url+'/api/profile-image',formData).then((response) => {
             
    //          //console.log('res',response);
    //         if(response.data.flag=='1')
    //         {
    //             Swal.fire({
    //               position: 'center',
    //               icon: 'success',
    //               title: 'Your information has been successfully saved!',
    //               showConfirmButton: false,
    //               timer: 1500
    //             })

                
                
    //         }
            
    //     });
    
    
    }
    else
    {
            Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Your information is unchnged!',
                  showConfirmButton: true,
                  closeOnConfirm: true
                })
    }
}

handleValidation3(e){
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.email){
        formIsValid = false;
        errors['email'] = 'Cannot be empty';
    }
    
    if(!this.state.code){
        formIsValid = false;
        errors['code'] = 'Cannot be empty';
    }
    
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }
    
    onSubmit3(e){
    e.preventDefault();

    let userid = null;
    
     let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, auth_user_id: AppState.user.id });
      userid = AppState.user.id;
    }
    const postData = {
        user_id:userid,
        email: this.state.email,
        code: this.state.code,
    }
    
    if(this.handleValidation3()){
         /* adding entry for the account */
        axios.post(this.url+'/api/email-update', postData).then((response) => {
            // console.log('res',response);

            if(response.data.flag=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Your email has been Successfully updated!',
                  showConfirmButton: true,
                  
                })

                this.props.history.push('/dashboard')
                let appState = {
                     isLoggedIn: true,
                     user: response['data']['user']
                  };
                  console.log('user data',response['data']['user']['email']);
                  localStorage["appState"] = JSON.stringify(appState);
                this.setState({
                     email:response['data']['user']['email']
                })
                
            }else{
                Swal.fire({
          title: 'Code is Wrong',
          icon: 'warning',
        })

            }
        });
    }else{
        Swal.fire({
          title: 'Verification code is missing',
          text: "Please fill verify code field",
          icon: 'warning',
        })

    }
}

onSubmit4(e){
    e.preventDefault();

    let userid = this.state.userid;
    console.log('email new',this.state.email,'older',this.state.user.email);
    

     let state = localStorage["appState"];
     
         this.setState({
            submit5:false
        });
        const postData = {
            user_id:userid,
            email: this.state.email    
        }
    axios.post(this.url+'/api/email-code', postData).then((response) => {
            // console.log('res',response);
            if(response.data.status=='1')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Please check your email, a code has been sent to your new email!',
                  showConfirmButton: true,
                  
                })
            

            }
        });
    }
 
    


    render() {
        return (
            <div ref={this.myRef}>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Profile Settings</h4>
                                </div>
                                
                                <div className="col-md-7 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Profile</h5>

                                            <form onSubmit={this.onSubmit2} method="post" enctype="multipart/form-data">
                                            
             
                
                <div className="form-group">
                  <label>Business Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required="" autoComplete="name" onChange={this.handleChangeName} defaultValue= {this.state.name} required/>
					<span style={{color: "red"}}>{this.state.errors["name"]}</span> 
			         <span style={{display:this.state.errorEmptyName,'color':'red'}} >Name empty.</span>				
				</div>                                

                                                <div className="form-group">
                                                    <label>Phone Number</label>
                            <input type="text" maxLength="15" className="form-control" id="phone_number" name="phone_number" placeholder="Your Phone Number"  autoComplete="phone_number" onChange={this.handleChangePhoneNumber} defaultValue= {this.state.user.phone_number} required/>
                            <span style={{display:this.state.errorEmptyPhoneNumber,'color':'red'}} >Phone number is empty.</span>
                            <span id='errorPhoneNumer' style={{display:this.state.errorPhoneNumber,'color': 'red'}}>Please type only numbers</span>
                                                </div>
        
                       
        <div className="form-group">
           <label htmlFor="file">Company Logo</label>
             { this.state.logo !== "No Image" ?
              <div> 
                <img className="img-fluid" style={{height:'40px',maxWidth: '100%', borderRadius:"30%"}} src={window.location.origin+'/public/images/companies_logos/'+this.state.logo} />
        </div>
                 :
        <div></div>
             }
         <input type="file" className="form-control btnStyle" name="image" id="image" onChange={this.handleChangeLogo}  style={{ fontSize: '16px'}}  />
            { this.state.logo  !== "No Image"  ?
         <div> <button type="button" className="btn btn-danger mt-2" style={{fontSize: 11}}  onClick={ this.onDelete}>Remove Logo</button>    
         </div>
            :
        <div></div>
            }
                            
                            
        </div>
        
                            <button className="btn next-btn" type="submit" disabled={this.state.disabledProp}>Save</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="col-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Email Update</h5>
                                            <form onSubmit={this.onSubmit3}>

                                                

                                                    <div className="form-group">
                                                    <label>Email Address</label>
                        <input type="email" className="form-control"  defaultValue= {this.state.user.email} onChange={this.handleChangeEmail}/>
                        <span style={{display:this.state.errorEmailType,'color':'red'}} >Not email type.</span>
                        <span style={{display:this.state.errorSentenceFlag, color: "red",marginBottom:"15px",}} >Email already exists.</span>
                        <span style={{display:this.state.errorSameEmail, color: "red",marginBottom:"15px",}} >Email unchanged.</span>
                                            </div>
                                                
                                                <div className="form-group">
                                                    <label>Verify Code</label>
                        <input type="text" className="form-control" required=""  onChange={this.handleChangeCode}/>
                    <button className="btn btn-warning mt-2" style={{fontSize: 11}} type="submit" disabled={this.state.codeBtn ? "disabled": ""} onClick={this.onSubmit4}>Send Code </button>
                                                </div>

                                               

                        <button className="btn next-btn" type="submit" disabled={this.state.submit5 ? "disabled": ""}>Change Email</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                
                                
                                <div className="col-md-5 col-12 profile-setting-col2">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Account Settings</h5>

                                            <form onSubmit={this.onSubmit}>

                                <div style={{position:"relative"}} className="form-group">
                                <label>Old Password</label>
                            <input id="password" type="password" className="form-control" name="password" required="" autoComplete="password" value={this.state.password} onChange={this.handleChangePassword} />
                            <span style={{color:"red",position:"absolute",top:"76px"}}>{this.state.errors["password"]} </span> </div>
                                               
                                                
                                                <div className="form-group" style={{position:"relative"}}>
                                                <label>New Password</label>
                                        <input id="password" type="password" className="form-control" name="password" required="" autoComplete="password" value={this.state.new_password} onChange={this.handleChangeNewPassword} />
                            <span style={{color: "red",position:"absolute",top:"76px"}}>{this.state.errors["new_password"]}</span> </div>
                                               
                                                
                                                <div className="form-group" style={{position:"relative"}}>
                                                <label>Confirm Password</label>
                            <input id="password" type="password" className="form-control" name="password" required="" autoComplete="password" value={this.state.confirm_password} onChange={this.handleChangeConfirmPassword} />
                            <span style={{color: "red",position:"absolute",top:"76px"}}>{this.state.errors["confirm_password"]}</span></div>
                                                
                            {this.state.passwordError === 1 ? 
							<span> Password doesn't match!</span>
							:null
							}
                                                <button className="btn next-btn mt-3"  type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Change Password</button>
                                            </form>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <DashboardFooter />
                    </div>
                </div>
            </div>
        )
    }
}