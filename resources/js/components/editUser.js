import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
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


export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.url = window.location.origin;
        this.state={
             adminUser:'',
             userName:'',
            password:'',
            confirm_password:'',
            errorSentenceFlag:'none',
            SentenceFlag:'none',
            disabledProp:false,
             employees:[],
             isLoggedIn:false,
            isEnable:false,
            ExtraCredits:0,
            files: [
      ]
         };
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);
        this.handleChange6 = this.handleChange6.bind(this);
        this.showConfPass  = this.showConfPass.bind(this);
        this.showPass      = this.showPass.bind(this);
        this.onSubmit      = this.onSubmit.bind(this);
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })

    //console.log('userid',this.props.match.params.id);
    this.setState({
        adminUser:this.props.match.params.id    
    });
    
    axios.get(this.url + '/api/get-user/'+ this.props.match.params.id)
       .then(response => {
           //console.log(response);
         this.setState({userName: response.data.user.name,disabledProp:true});
         
         
       })
       .catch(function (error) {
         console.log(error);
       });
    
    }

showConfPass(e)
{
      var x = document.getElementById("confrim_password");
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
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

handleChange3(e)
{
    this.setState({userName:e.target.value});
}


handleChange4(e){
   
     this.setState({
      password: e.target.value
    })
    
    if(this.state.confirm_password != '')
    {
        if(this.state.confirm_password == e.target.value)
        {
            this.setState({
              confirm_password: e.target.value,
              disabledProp:false,
              errorSentenceFlag:'none',
              SentenceFlag:'block'
            })
        }
       else
       {
           this.setState({errorSentenceFlag:'block',disabledProp:true,SentenceFlag:'none'});
       }
    }
}


handleChange5(e){
   
   if(this.state.password == e.target.value){
     
     this.setState({
      confirm_password: e.target.value,
      disabledProp:false,
      errorSentenceFlag:'none',
      SentenceFlag:'block'
    })
   }
   else
   {
       this.setState({errorSentenceFlag:'block',disabledProp:true,SentenceFlag:'none'});
   }
}



handleChange6(e){
   
     this.setState({
      ExtraCredits: e.target.value,
    })
    if(e.target.value.length > 0)
    {
        this.setState({
              disabledProp:false,
        })
    }
    else
    {
        if(this.state.SentenceFlag == 'block')
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

    
    onSubmit(e){
    e.preventDefault();
    

    const user = {
      id:this.state.adminUser,
      password:this.state.confirm_password,
      name:this.state.userName,
      extraCredits:this.state.ExtraCredits,
    }
    
    
       //console.log("rrrr", this.props.match.params.id);
       let uri = this.url + '/api/update-admin-password';
            axios.post(uri, user).then((response) => {
                if(response.data.flag==1)
                {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Password updated for the user '+this.state.userName,
                  showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                  },
                  hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                  }
                })
                this.props.history.push('/admin-control')
                }
                else{ 
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Password updated successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
                 
                }
            });
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
                                    <h4><Link to="/admin-control"><i className="fas fa-long-arrow-alt-left"/></Link> Update User</h4>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">

                                            <form onSubmit={this.onSubmit}>
                                               
                                               

            <div className="form-group">
                        <label >Name</label>
        <input type="text" className="form-control" placeholder="Enter Name" value={this.state.userName} onChange={this.handleChange3} id="name" required />       
            
            </div>
                                                
                    <div className="form-group">
                         <label htmlFor="exampleInputEmail1">Password</label>
                     <p className="showPasswordEyeDiv">      <input type="password" className="form-control" name="password" id="password" placeholder="Enter password" onChange={this.handleChange4} minLength="8"  />
                     <i href="" class="far fa-eye" id="togglePassword" onClick={this.showPass} style={{'marginTop': '-13px'}}></i> </p>
                    </div>
                    <div className="form-group">
                         <label htmlFor="confirmPass"> Confirm Password</label>
                   <p className="showPasswordEyeDiv">   <input type="password" className="form-control" name="confirm_password" id="confrim_password" placeholder="Enter password" onChange={this.handleChange5} minLength="8"  />
                   <i href="" class="far fa-eye" id="togglePassword" onClick={this.showConfPass} style={{'marginTop': '-13px'}}></i> </p>
                    <span style={{display:this.state.errorSentenceFlag,'color':'red'}} >Password does not match.</span>
                    <span style={{display:this.state.SentenceFlag,'color':'green'}} >Password matched.</span>
                    </div>
                    
                    <div className="form-group">
                         <label htmlFor="InputExtraCredits">Extra Credits</label>
                         <input type="Number" className="form-control" name="ExtraCredits" id="ExtraCredits" placeholder="Enter Extra Credits" onChange={this.handleChange6} min="1"  />
                    </div>
                                                
        <button className="btn next-btn" type="submit" disabled={this.state.disabledProp}>Update</button>
                                                
                                                
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
