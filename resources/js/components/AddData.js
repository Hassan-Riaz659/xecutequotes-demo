import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;

export default class AddData extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoggedIn: false,
            provider:"",
            year:2021,
            quarter:"",
            county:"",
            planName:"",
            value:"",
            
        }

        this.handlePlanName = this.handlePlanName.bind(this);
        this.handleProviderName = this.handleProviderName.bind(this);
        this.handleQuarter = this.handleQuarter.bind(this);
        this.handleCountyName = this.handleCountyName.bind(this);
        this.values = this.values.bind(this);

        
        this.onSubmit2 = this.onSubmit2.bind(this);
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
    

    handleProviderName(e){
        this.setState({
            provider:e.target.value
        })
    }
    
    handleQuarter(e){
        this.setState({
            quarter:e.target.value
        })
    }
    
    handlePlanName(e){
        this.setState({
            planName:e.target.value
        })
    }
    
    handleCountyName(e){
      
        this.setState({
            county:e.target.value
        })
    }
    values(e){
        this.setState({
            value:e.target.value
        })
    }

    
    onSubmit2(e){
        e.preventDefault();
        const postData = {
        provider:this.state.provider,
        year:this.state.year,
        quarter:this.state.quarter,
        planName:this.state.planName,
        county:this.state.county,
        values:this.state.value,
    }
    //    console.log('pressed submit',this.state.provider,this.state.year,this.state.quarter,this.state.planName,this.state.county,this.state.value);
        
        axios.post(this.url + '/api/get-files', postData).then((response) => {
        
            
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
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link>ADD Data</h4>
                                </div>
                                
                                <div className="col-md-7 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Profile</h5>

                                            <form onSubmit={this.onSubmit2} method="post" enctype="multipart/form-data">
                                            
             
                                         <div className="form-group">
                                              <label>Provider Name</label>
                                              <input type="textarea" className="form-control" id="name" name="name" placeholder="Your Name" required="" autoComplete="name" onChange={this.handleProviderName}  required/>
                            			 </div>
                            			 
                            			 <div className="form-group">
                                                <label for="quarter">Choose a quarter:</label>
                                                  <select name="quarter" id="quarter"  onChange={this.handleQuarter} required>
                                                    <option value="1st">1st</option>
                                                    <option value="2nd">2nd</option>
                                                    <option value="3rd">3rd</option>
                                                    <option value="4th">4th</option>
                                                  </select> 
                            			 </div>
                            			 
                            			 <div className="form-group">
                                              <label>Plan Name</label>
                                              <input type="textarea" className="form-control" id="name" name="name" placeholder="Your Name" required="" autoComplete="name" onChange={this.handlePlanName}  required/>
                            			 </div>
                                            
                                          <div className="form-group">
                                            <label>County Name</label>
                                            <input type="text" className="form-control" id="name" name="name" placeholder="Your Name" required="" autoComplete="name" onChange={this.handleCountyName}  required/>
                            			  </div>                                            
                            			  
                            			 <div className="form-group">
                                              <label>Values</label>
                                              <input type="textarea" className="form-control" id="name" name="name" placeholder="Your Name" required="" autoComplete="name" onChange={this.values}  required/>
                            			 </div>                                


                
        
                            <button className="btn next-btn" type="submit" >Save</button>
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