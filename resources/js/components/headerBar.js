import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import { Route , Link, withRouter } from 'react-router-dom';
import { hashHistory } from 'react-router';


export default class HeaderBar extends Component {
    constructor (props){
        super(props);
        
        this.state = {
            isLoggedIn: false,
            user: {},
            userid:'',
            authUserName:'',
            upgradeFlag:'none',
            
        }
        
   
}

componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, userid: AppState.user.id,authUserName:AppState.user.name });
      if(AppState.user.subscription_type=='free' || AppState.user.subscription_type=='annual' || AppState.user.subscription_type=='0' ){
          this.setState({
              upgradeFlag:'block',
              
          })
      }
}
         $(document).ready(function(){
             
                $(".sideMenuShow").click(function(){
                $(".sidebar").toggleClass("showSideBar");
                });
                });  
                
    
}



    
    

    render() {
        return (
            <div>

<nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
        <div className="menuBarPhone">
        <i class='fas fa-bars sideMenuShow'></i>
        </div>
        
        {/*<Link
          className="nav-link mr-4" to={"/dashboard"}>
            <i class="fas fa-igloo"></i>
            <span>Menu</span>
            </Link>*/}
            
        <Link
          className="btn btn-light mr-2" to={"/update-billing"} style={{display:this.state.upgradeFlag}}>
            <i className="far fa-money-bill-alt" />
            <span>Upgrade</span>
            </Link>
            
            
        <ul className="navbar-nav ml-auto">
         {/* <li className="nav-item dropdown no-arrow">
            <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="fas fa-search fa-fw" />
            </a>
            <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
              <form className="navbar-search">
                <div className="input-group">
                  <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?" aria-label="Search" aria-describedby="basic-addon2" style={{borderColor: '#3f51b5'}} />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="fas fa-search fa-sm" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>*/}
          <div className="topbar-divider d-none d-sm-block" />
          <li className="nav-item dropdown no-arrow">
            <Link className="nav-link dropdown-toggle" to={"/profile-settings"}>
              <img className="img-profile rounded-circle" src={window.location.origin+'/public/theme/img/boy.png'} style={{maxWidth: '60px'}} />
              <span className="ml-2 d-none d-lg-inline text-white small">{this.state.authUserName}</span>
            </Link>
            <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
              <a className="dropdown-item" href="#">
                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                Settings
              </a>
              <a className="dropdown-item" href="#">
                <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                Activity Log
              </a>
              <div className="dropdown-divider" />
              <a className="dropdown-item" href={window.location.origin+'/logout'}>
                <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
                </div>
        )
    }
}
