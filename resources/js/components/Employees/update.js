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
             id:'',
             employees:[],
             isLoggedIn:false,
            isEnable:false,
            errorPhoneNumber:'none',
            image:'',
            emailError:'none',
            files: [
      ]
         };
         this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
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
      
      //axios.get => /id
    }
    axios.get(this.url + '/api/edit-broker-employee/'+ this.props.match.params.id)
       .then(response => {
           //console.log(response);
         this.setState({employees: response.data.data});
         this.setState({first_name: response.data.data.first_name});
         this.setState({last_name: response.data.data.last_name});
         this.setState({email: response.data.data.email});
         this.setState({phone_no: response.data.data.phone_no});
         this.setState({id: response.data.data.id});
         })
       .catch(function (error) {
         console.log(error);
       });
    
    }
    
    
    
        handleCheckEmail(e)
    {

        const postData = {
      email: e.target.value,
      id:this.state.id
    }
    
    //   let uri = this.url + 'api/add-broker-employee';
            axios.post(this.url+'/api/check-broker-email', postData).then((response) => {
                if(response.data.flag === true)
                {    
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
    
    console.log("emp data",this.state.employees);
    if(this.state.first_name == this.state.employees.first_name && this.state.last_name == this.state.employees.last_name && this.state.phone_no == this.state.employees.phone_no && this.state.email == this.state.employees.email )
    {
           Swal.fire({
                  title: 'Credentials unchanged.',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
    }
    else{
    
    const employee = {
      id:this.state.id,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      phone_no: this.state.phone_no,
      user_id:this.state.userid
    }
    
       //console.log("rrrr", this.props.match.params.id);
       let uri = this.url + '/api/update-broker-employee';
            axios.post(uri, employee).then((response) => {
                if(response.data.flag==1)
                {
                Swal.fire({
                  title: 'Please check your email to create a new password.',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                this.props.history.push('/agents');
                }
                else if(response.data.alreadyExist == true)
                {
                     Swal.fire({
                  title: 'Email already exist. Please choose another.',
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })      
                }
                else{ 
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Agent updated successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
                 this.props.history.push('/agents')
                }
            });
    }

}

handleChange2(e){
    // const re = /^[0-9\b]+$/;

    // // if value is not blank, then test the regex

    // if (e.target.value === '' || re.test(e.target.value)) {
    //   this.setState({value: e.target.value})
    // }
        let isnum = /^\+?\d*$/.test(e.target.value);
        
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
                                    <h4><Link to="/agents"><i className="fas fa-long-arrow-alt-left"/></Link> Update Agent</h4>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">

                                            <form onSubmit={this.onSubmit} method="post" enctype="multipart/form-data">
                                               
                                               {/*<div className="form-group upload-img-col">
                                               <span className="upload-img-logo">
                                               <img src={uploadCloud}/> 
                                               <p>Drop or <a href="#">upload your file</a></p>
                                               </span>
                                               <label>Profile Picture</label>
                                               <FilePond
          ref={ref => (this.pond = ref)}
          files={this.state.files}
          allowMultiple={true}
          allowReorder={true}
          maxFiles={3}
          server="/api"
          name="files" 
          oninit={() => this.handleInit()}
          onupdatefiles={fileItems => {
            // Set currently active file objects to this.state
            this.setState({
              files: fileItems.map(fileItem => fileItem.file)
            });
          }}
        />
        
        </div>*/}
        
        

                                                <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">First Name</label>
                    <input type="text" className="form-control" name="first_name" placeholder="Enter First Name" onChange={this.handleChange1} value={this.state.first_name} required />
                                                </div>
                                                
                                                <div className="form-group">
                                                <label htmlFor="exampleInputEmail1">Last Name</label>
                    <input type="text" className="form-control" name="last_lname" placeholder="Enter Last Name" onChange={this.handleChange4} value={this.state.last_name} required />
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter email" onChange={this.handleChange3} defaultValue={this.state.email} onBlur={this.handleCheckEmail} required />
                    <span style={{display:this.state.emailError,color:"red"}}  >Email already exists.</span>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input type="text" maxLength="15" className="form-control" name="phone" placeholder="Enter Phone Number"  onChange={this.handleChange2} defaultValue={this.state.phone_no} required/>
                    <span id='errorPhoneNumer' style={{display:this.state.errorPhoneNumber,'color': 'red'}}>Please type only numbers</span>  
                                                </div>
                                                
<button className="btn next-btn" type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Update Agent</button>
                                                
                                                
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
