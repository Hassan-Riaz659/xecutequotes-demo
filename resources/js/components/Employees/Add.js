import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import $ from 'jquery';

import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);



var baseUrl = window.location.origin;
var uploadCloud = baseUrl+"/public/landingImages/uploadCloud.png";


export default class AddEmployee extends Component {
    constructor(props) {    
        super(props);
        this.url = window.location.origin;
        this.state={
             first_name:'',
             last_name:'',
             phone_no:'',
             email:'',
             value:'',
             userid:'',
            isEnable:false,
            errorPhoneNumber:'none',
            emailError:'none',
            formSubmitting:false,
            files: [
      ],
      additionalLicenseValue:''
         };
         this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleCheckEmail = this.handleCheckEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

        componentWillMount() {

       let state = localStorage["appState"];
        
        
    if (state) {
        let AppState = JSON.parse(state);
        console.log('user',AppState);
          if(AppState.user.role_id == 3)
          {
           
            this.props.history.push('/');   
          }
    }
}

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, userid: AppState.user.id });
    axios.get(this.url+'/api/check-available-licenses/'+AppState.user.id)
      .then(response => {
        
        console.log('licenses',response.data.user_licenses);
         this.setState({ 
             additionalLicenseValue:response.data.user_licenses.additional_license});
         
      })
        
    }
    }
    

    
    handleCheckEmail(e)
    {

        const postData = {
      email: e.target.value
    }
    
    //   let uri = this.url + 'api/add-broker-employee';
            axios.post(this.url+'/api/check-broker-email', postData).then((response) => {
                if(response.data.flag === true)
                {    
                    console.log('email exist');
                    this.setState({
                        emailError:'block',
                        formSubmitting:true
                    });
                }
                else
                {
                    
                    this.setState({
                        emailError:'none',
                        formSubmitting:false
                    });
                    if(this.state.errorPhoneNumber === 'block')
                    {
                       this.setState({
                        formSubmitting:true
                    }); 
                    }
                    else
                    {
                       this.setState({
                        formSubmitting:false
                    }); 
                    }
                }
            })
        
        
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_no: this.state.phone_no,
      user_id:userid,
    }
    
    //   let uri = this.url + 'api/add-broker-employee';
            axios.post(this.url+'/api/add-broker-employee', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag==1)
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Agent has been added successfully',
                  text: 'Agent can set their account password from their email entered!',
                  showConfirmButton: true,
                })

                this.props.history.push('/agents')
            }
            else
            {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'An error occured',
                  showConfirmButton: true,
                })
            }
        });


}

handleChange2(e){
    
        var value = e.target.value;

        let isnum = /^\+?\d*$/.test(value);
        if(isnum === true)
        {  
            this.setState({
              phone_no: e.target.value,
              errorPhoneNumber: 'none',
              formSubmitting:false
            })        
              if(this.state.emailError === 'block')
                    {
                      this.setState({
                        formSubmitting:true
                    }); 
                    }
                    else
                    {
                      this.setState({
                        formSubmitting:false
                    }); 
                    }          
        }
        else
        {   
            this.setState({
              errorPhoneNumber: 'block',
              formSubmitting:true
            }) 
        }
}


handleChange5(e)
{
      this.setState({
      last_name: e.target.value
    })    
}


handleChange1(e){
   
     this.setState({
      first_name: e.target.value
    })
}
handleChange4(e){
   
     this.setState({
      last_name: e.target.value
    })
}

handleChange3(e){
   
     this.setState({
      email: e.target.value
    })
}
    render() {
        return (
            <div>
                <div className="wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        {/* Navbar */}
                        <DashboardHeader />
                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/agents"><i className="fas fa-long-arrow-alt-left"/></Link> Add Agent</h4>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">

                                            <form onSubmit={this.onSubmit} method="post" enctype="multipart/form-data">
                <div className="form-group">
                  <span>
                    
                   <label style={{float: "right",marginTop:"-2rem"}}>Available Licenses:<span style={{marginLeft:"1rem"}}>{this.state.additionalLicenseValue}</span></label>
                     
                   </span>
                                             
        
                </div>
                                       
        
              

                                                <div className="form-group">
                                                <label>First Name</label>
                    <input type="text" className="form-control" name="name" onChange={this.handleChange1} placeholder="Enter first name"  required />
                                                </div>
            <div className="form-group">
                    <label>Last Name</label>
            <input type="text" className="form-control" name="lname" placeholder="Enter last name" onChange={this.handleChange5}  required />
            </div>                                        
                                                
                                                {/*<div className="form-group col-md-6 col-12 pl-0">
                                                <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter Last Name" onChange={this.handleChange4} value={this.state.last_name} required />
                                                </div>*/}

                                                <div className="form-group">
                                                    <label>Email</label>
                    <input type="email" className="form-control" name="email" onChange={this.handleChange3} placeholder="Enter  email" onBlur={this.handleCheckEmail} required />
                     <span style={{display:this.state.emailError,color:"red"}}  >Email already exists.</span>                           </div>

                                                <div className="form-group">
                                                    <label>Phone Number</label>
                    <input type="text" maxLength="15" className="form-control" name="phone" id="phone" onChange={this.handleChange2}  placeholder="Enter phone number"  required/>
                                    <span id='errorPhoneNumer' style={{display:this.state.errorPhoneNumber,'color': 'red'}}>Please type only numbers</span>   
                                                </div>

                                                <button className="btn next-btn" type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Add Agent</button>
                                                
                                            </form>
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
