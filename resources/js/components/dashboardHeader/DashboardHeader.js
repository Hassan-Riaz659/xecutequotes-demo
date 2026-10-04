import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import { Link, withRouter } from 'react-router-dom';

// import user from "../../components/imgs/user.png";
import Dashboard from "../Dashboard";
var baseUrl = window.location.origin;
var user =  baseUrl + "/public/landingImages/user.png";

export default class DashboardHeader extends Component {
    constructor (props){
        super(props);
        this.url = window.location.origin;
        this.state = {
            logo_link:'/',
            dashboard_link:'/',
            company_logo:'',
            isLoggedIn: false,
            user: {},
            userid:'',
            authUserName:'',
            authUser:false,
            navbarTogglerActive: '',
            rememberMe:false,
            searched_item:''
            
        };
        
        this.handleLogoutClick =this.handleLogoutClick.bind(this);
        this.navbarTogglerActive =  this.navbarTogglerActive.bind(this);
        this.searchSomeThing=this.searchSomeThing.bind(this);
        
}


navbarTogglerActive() {
    if(this.state.navbarTogglerActive == '') {
        this.setState({
            navbarTogglerActive: 'active',
            })
            return
    }
    
    if(this.state.navbarTogglerActive == 'active') {
        this.setState({
            navbarTogglerActive: '',
            })
            return
    }
}

componentDidMount() {
    $("#navbarDropdownMenuLink").click(function(){
        $(".dropdown-menu").toggleClass("show")
       
    });
    
    $("main-panel").click(function(){
        $(".dropdown-menu").removeClass("show")
    })
    
    $(".navbar-toggler").click(function(){
        $(".sidebar2").toggleClass("active");
    })
    
    
    
    
    let state = localStorage["appState"];
    let remeberMe=localStorage["credentials"];
    if(remeberMe){
        let credentials=JSON.parse(remeberMe);
        this.setState({rememberMe:credentials.rememberMe})
    }
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, userid: AppState.user.id,authUserName:AppState.user.name, company_logo:AppState.user.company_logo });
      this.setState({logo_link:'/dashboard',authUser:true});
      
    }else{
        this.setState({logo_link:'/',authUser:false});
    } 
}

handleLogoutClick(e){
    if(this.state.rememberMe==false){
    window.localStorage.clear(); //clear all localstorage
}else {
    localStorage.removeItem('appState');
}
    //  this.props.history.push('/login');
  }

searchSomeThing(e){
    this.setState({
        searched_item:e.target.value
    })
}
    render() {
        return (
            <div className="mbl-menu">

                <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute">
          <div className="container-fluid">
            <div className="navbar-wrapper">
              <div className="navbar-toggle">
                <button type="button" className={`${this.state.navbarTogglerActive} navbar-toggler`} onClick={()=> this.navbarTogglerActive()}>
                  <span className="navbar-toggler-bar bar1" />
                  <span className="navbar-toggler-bar bar2" />
                  <span className="navbar-toggler-bar bar3" />
                </button>
              </div>
            {/*
              <form className="header-bar-form">
                <div className="">
                  <input type="text"  className="form-control" placeholder="Search Something..." onChange={this.searchSomeThing}/>
                  <i className="fa fa-search"/>
                </div>
              </form>
              */}
            </div>
           
            
            <div className="collapse navbar-collapse justify-content-end" id="navigation">
              
              <ul className="navbar-nav header-nav">
               <li className="nav-item ">
                  <Link to='/profile-settings' >
                

                  
                    { this.state.company_logo !== "No Image" ?
                    <div className="user-img-col"><img className="img-fluid" style={{height:'37px',maxWidth: '100%',display: this.state.company_logo ? 'block' : 'none', borderRadius:"25%"}} src={window.location.origin+'/public/images/companies_logos/'+this.state.company_logo} /> 
    
                 </div>
                 :
                 <div></div>
                 }
                     <span>
                     { this.state.authUserName}
                     </span>
                    
                  </Link>
                  
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" style={{ zIndex:'9999'}}>
                    
                    <span className="ml-2 d-none d-lg-inline text-white small"></span>

                    
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" style={{padding:'10px'}}>
                    <li className="nav-item">
                                        {this.state.authUser==true? <Link to="/login" onClick={this.handleLogoutClick} style={{cursor:'pointer'}}>Logout</Link>
                                            :<Link to="/login">Logout</Link>
                                        }
                                        </li>
                    
                  </div>
                </li>


                
              </ul>
            </div>
            
          </div>
        </nav>
        
        <ul className="navbar-nav header-nav d-flex d-md-none">
               <li className="nav-item ">
                  <Link to='/profile-settings' >
                

                  
                    { this.state.company_logo !== "No Image" ?
                    <div className="user-img-col"><img className="img-fluid" style={{height:'37px',maxWidth: '100%',display: this.state.company_logo ? 'block' : 'none', borderRadius:"25%"}} src={window.location.origin+'/public/images/profile_image/'+this.state.company_logo} /> 
    
                 </div>
                 :
                 <div></div>
                 }
                     <span>{this.state.authUserName}</span>
                    
                  </Link>
                  
                </li>
                
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown" style={{ zIndex:'9999'}}>
                    
                    <span className="ml-2 d-none d-lg-inline text-white small"></span>

                    
                  </a>
                  <div className="dropdown-menu dropdown-menu-right" style={{padding:'10px'}}>
                    <li className="nav-item">
                                        {this.state.authUser==true? <Link to="/login" onClick={this.handleLogoutClick} style={{cursor:'pointer'}}>Logout</Link>
                                            :<Link to="/login">Logout</Link>
                                        }
                                        </li>
                    
                  </div>
                </li>


                
              </ul>

            </div>
        )
    }
}
