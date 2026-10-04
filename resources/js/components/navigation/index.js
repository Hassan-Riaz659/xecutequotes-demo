import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Ripples from 'react-ripples';

var baseUrl = window.location.origin;

class Navigation extends Component {
    
     constructor (props){
        super(props);
        this.url = window.location.origin;
        this.state = {
            logo_link:'/',
            dashboard_link:'/',
            authUser:false
        };
        
        this.handleLogoutClick =this.handleLogoutClick.bind(this);
        
        
}

componentDidMount(){
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({logo_link:'/dashboard',authUser:true});
      
    }else{
        this.setState({logo_link:'/',authUser:false});
    }
    
    
        $(".navbar-toggler").click(function(){
        $(".sidebar2").toggleClass("active");
        $(this).toggleClass("active");
    });
}

handleLogoutClick(e){
    /*let appState = {
      isLoggedIn: false,
      user: {}
    };
    localStorage["appState"] = JSON.stringify(appState);
    this.setState(appState);*/
    window.localStorage.clear(); //clear all localstorage


    /*let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
    }*/
    
     this.props.history.push('/login');
  }
  


    render() {
        return (
            <div>
                <div className="navbar-section landing-mbl-menu mbl-menu" id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-12 navigation">


                            <nav className="navbar navbar-expand-md navbar-dark">
                                <Link to={this.state.logo_link} className="navbar-brand"><img className="img-fluid logo" src={baseUrl + '/public/images/insurance_logo.png'} /></Link>
                                
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                                    <span className="navbar-toggler-bar bar1" />
                                    <span className="navbar-toggler-bar bar2" />
                                    <span className="navbar-toggler-bar bar3" />
                                    
                                </button>
                                
                                
                                
                                <div className="collapse navbar-collapse custom-navbar" id="collapsibleNavbar">
                                    <ul className="navbar-nav">
                                    
                                    <li className="nav-item">
                                        {
                                        this.state.authUser==true? <Link to="/dashboard" style={{cursor:'pointer'}}>Dashboard</Link>
                                            :<Link to={this.state.logo_link}></Link>
                                        }
                                        </li>
                                        
                                        <li className="nav-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        
                                        <li className="nav-item">
                                            <Link to="/about">About</Link>
                                        </li>
                                        
                                        <li className="nav-item">
                                            <Link to="/pricing">Pricing</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/contact-us">Contact</Link>
                                        </li>
                      
                                        <li className="nav-item">
                                        {this.state.authUser==true? <a onClick={this.handleLogoutClick} style={{cursor:'pointer'}}>Logout</a>
                                            :<Link to="/login">Login</Link>
                                        }
                                        </li>

                                        <li className="nav-item">
                                        {this.state.authUser!=true ?
                                            <Link to="/register">Register</Link>:null
                                        }
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Navigation);
