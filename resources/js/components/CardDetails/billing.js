import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import { Button, ButtonToolbar, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
import $ from 'jquery';

var baseUrl = window.location.origin;



export default class ManageBilling extends Component {
    constructor (props){
        super(props);
        
        this.url = window.location.origin;
        this.state={
           additionalLicenseValue:'',
           subscriptionType:'',
           creditsLeft:'',
           user_id : '',
           show: false  
        }
        
   this.handleShow = this.handleShow.bind(this);
   this.handleClose = this.handleClose.bind(this);
   this.handleReturnButton = this.handleReturnButton.bind(this);
   
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
 

    componentWillMount() {
        
        this.handleScroll();
        
        var list = [];
        for (var i = 1; i <= 10; i++) {
            list.push(i);
        }
        this.setState({
            licenseArray:list,
            amountVal:this.state.annualValue
        })

        let state = localStorage["appState"];
        if (state) {
        let AppState = JSON.parse(state);
        if(AppState.user.role_id == 3)
        {
            this.props.history.push('/');   
        }
        
        this.setState({
            user_id:AppState.user.id,
            subscriptionType:AppState.user.subscription_type,
            creditsLeft: AppState.user.credits_left,
        })
        }
        
    }

componentDidMount(){
    
       
         let state = localStorage["appState"];
        if (state) {
        let AppState = JSON.parse(state);
    axios.get(this.url+'/api/check-available-licenses/'+this.state.user_id)
      .then(response => {
        
        console.log('licenses',response.data.user_licenses);
         this.setState({ 
             additionalLicenseValue:response.data.user_licenses.additional_license});
         
      })
}
}

handleShow()
{
    this.setState({
        show:true 
        });
}
handleClose(){
    this.setState({
        show : false
        });
}

handleReturnButton()
{
    //console.log("return button clicked");
    
    const postData = {
        remove_license: 1,
        user_id:this.state.user_id
    }
    axios.put(this.url+'/api/return-license', postData).then((response) => {
             console.log('res',response.data.user);
            if(response.data.flag == 1)
            {
                 let appState = {
                     isLoggedIn: true,
                     user: response.data.user
                 };
                 
             localStorage["appState"] = JSON.stringify(appState);
            
            this.setState({
                additionalLicenseValue : response.data.user.additional_license
            });
            
              Swal.fire({
                      position: 'center',
                      icon: 'success',
                      title: 'License returned successfully,you will not be charged for this license in next recharge',
                      showConfirmButton: true,
                      
                    })  
            }
        });
    
}


    render() {


        return (
            <div ref={this.myRef} >

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Manage Billing</h4>
                                </div>
                                
                                <div className="col-md-7 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Manage Billing</h5>

            <form noValidate={true}>
            <div className="form-group mt-2">
                <label>Available Licenses</label>
                <input type="text" disabled value={this.state.additionalLicenseValue} className="form-control"/>
                {/* <button type="button" className="btn btn-lg btn-danger mt-2" style={{fontSize: 11}}   onClick={this.handleShow} >Edit</button>*/}
            </div>
            <div className="form-group mt-2">
              <label>Subscription Plan</label>
                <input type="text" disabled value={this.state.subscriptionType =='annual' ? 'Annual' : 'Free' } className="form-control"/>
			</div>
			 <div className="form-group mt-2">
              <label>Credits Left</label>
                <input type="text" disabled value={this.state.creditsLeft =='unlimited' ? 'Unlimited' : this.state.creditsLeft} className="form-control"/>
			</div>
                                               
            <Link to={'/update-billing'}><button className="btn next-btn" type="submit" >Upgrade</button></Link>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                </div>
                                
                                
                                
                            </div>
{/*<Modal show={this.state.show} onHide={this.handleClose}>
       
 <Modal.Header closeButton>
      
  <Modal.Title style={{color: "#191d23"}}>Update License</Modal.Title>
        
   </Modal.Header>
        
	<Modal.Body> 
      
      <form onSubmit="">
              
	   <div className="row">
             
		<div className="col-12 col-md-12">
              
    	  <div className="form-group Login-input">
             <label>Total Licenses</label>
             <input className="form-control" disabled value={this.state.additionalLicenseValue} type="text" name="licenses" required />
           </div>
          <div className="form-group Login-input">
             <label>Return Licenses</label>
             <p><button type="button" onClick={this.handleReturnButton} className="btn btn-danger">Return</button></p>              
 
          </div>
          <div className="form-group Login-input">
             <label>Buy New Licenses</label>
               <p><Link to={'/update-billing'}><button className="btn btn-success" type="submit" >Buy</button></Link></p>              
 
          </div>

        </div>
          
             <div className="col-12 col-md-12">
               <button style={{float:"right"}} type="button" onClick={this.handleClose} className="btn btn-info">Close</button>
             </div>
       </div>
  
          </form>
     
   </Modal.Body>
   
   </Modal>*/}
                            
                        </div>
                        <DashboardFooter />
                    </div>
                </div>
            </div>
        )
    }
}