import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';
import { BrowserRouter as Router, Route, hashHistory, IndexLink  } from 'react-router-dom';
import $ from 'jquery';


var baseUrl = window.location.origin;
var DashboardLogo =  baseUrl+"/public/landingImages/DashboardLogo.png";
var Vector1 = baseUrl+'/public/landingImages/Vector1.png';
var Vector2 = baseUrl+'/public/landingImages/Vector2.png';
var Vector3 = baseUrl+'/public/landingImages/Vector3.png';
var Vector4 = baseUrl+'/public/landingImages/Vector4.png';
var Vector5 = baseUrl+'/public/landingImages/Vector5.png';
var Vector6 = baseUrl+'/public/landingImages/Vector6.png';
var history = baseUrl+'/public/landingImages/history.png';
var bill = baseUrl+'/public/landingImages/bill.png';
var UpgradeIcon = baseUrl+'/public/landingImages/upgradeIcon.png';
var Ellipse3 = baseUrl+'/public/landingImages/Ellipse3.png';
var Ellipse4 = baseUrl+'/public/landingImages/Ellipse4.png';
var Ellipse5 = baseUrl+'/public/landingImages/Ellipse5.png';
var Ellipse6 = baseUrl+'/public/landingImages/Ellipse6.png';



export default class Sidebar extends Component {
    constructor (props){
        super(props);
        
        this.state = {
            isLoggedIn: false,
            user: {},
            active:'',
            userid:'',
            role_id:'',
            hidden:'block'
        }
        this.url = window.location.origin;
        this.handleLogoutClick = this.handleLogoutClick.bind(this);

}

    componentWillMount()
    {
                let state = localStorage["appState"];
            
            
            if (state) {
            let AppState = JSON.parse(state);
        console.log('user',AppState);
          if(AppState.user.role_id == 3)
          {
           
            this.setState({
                hidden:'none'
            })   
          }
    }
    }


  componentDidMount() {
    $(document).ready(function () {
      $(".App-header").hide();
    });
    
    
    $(".sidebar2-nav li").click(function(){
        $(".sidebar2").removeClass("active")
    })
    
    
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user, userid: AppState.user.id,role_id: AppState.user.role_id, active:window.location.href });
    
        console.log('role_id',AppState.user.role_id);
    }
    
  }
  
  handleLogoutClick(e){
    //window.localStorage.clear(); 
    window.localStorage.removeItem('appState')//clear all localstorage
    //   this.props.history.push('/login');
  }

  render() {
    return (
      <div>


        <div className="sidebar sidebar2">

          <div className="sidebarDiv1">

          
          <div className="logo">
            <Link to={'/'}><img className="img-fluid" src={DashboardLogo} /></Link>
          </div>

          <div className="sidebar-wrapper ps" id="sidebar-wrapper">
          
          
          <form className="header-bar-form  mbl-header-bar-form d-none">
                <div className="header-bar-form-col">
                  <input type="text"  className="form-control" placeholder="Search Something..." />
                  <i className="fa fa-search"/>
                </div>
              </form>
              
            
    

            <ul className="navbar-nav sidebar2-nav">
                
                
                
                {(() => { 
                            if(this.state.role_id == 1){
                            if(this.state.active == this.url+'/admin-control'){
                            return(
                            <li className="nav-item active">
                            <Link to="/admin-control"> <img className="img-fluid" src={Vector5} />Admin Control Panel
                            </Link>
                            </li>
                            )}
                            else{ 
                            return(
                            <li className="nav-item">
                                <Link to="/admin-control"> <img className="img-fluid" src={Vector5} />Admin Control Panel
                                </Link>
                            </li>
                            )
                                
                            }
                                
                            }
                     })()}    
                

              <li className="nav-item">
                <Link to="/dashboard"> <img className="img-fluid" src={Vector1} />Dashboard</Link>
              </li>
            

              
                {(() => { 
        
        if(this.state.active == this.url+'/new-quote/'+this.state.userid){
        return(        
        <li className="nav-item active" >
        <Link to={"/new-quote/"+this.state.userid}> <img className="img-fluid" src={Vector2} />New Quote</Link>
        </li>
        
        )}
        else{ 
        return(
        <li className="nav-item" >
        <Link to={"/new-quote/"+this.state.userid}> <img className="img-fluid" src={Vector2} />New Quote</Link>
        </li>
        
        )
        }
        })()}
          
             
        
        {(() => { 
        
        if(this.state.active == this.url+'/clients'){
        return(
        
        <li className="nav-item active">
        <Link to="/clients"> <img className="img-fluid" src={Vector3} />Clients</Link>
        </li>
        )}
        else{ 
        return(
        <li className="nav-item">
        <Link to="/clients"> <img className="img-fluid" src={Vector3} />Clients</Link>
        </li>
        
        )}
        
        })()}

        {(() => { 
        
        if(this.state.active == this.url+'/saved-quotes'){
        return(
        <li className="nav-item active">
        <Link to="/saved-quotes"> <img className="img-fluid" src={Vector5} />Saved Quotes
        </Link>
        </li>
        )}
        else{ 
        return(
        <li className="nav-item">
            <Link to="/saved-quotes"> <img className="img-fluid" src={Vector5} />Saved Quotes
            </Link>
        </li>
        )
            
        }
        })()}
         
    {(() => { 
        
        if(this.state.active == this.url+'/agents'){
        return(
        <li  className="nav-item active" style={{display:this.state.hidden}}>
          <Link to="/agents"> <img className="img-fluid" src={Vector4} />Agents</Link>
        </li>
        )} else{ 
        return(
        <li  className="nav-item" style={{display:this.state.hidden}}>
        
         <Link to="/agents"> <img className="img-fluid" src={Vector4} />Agents</Link>
        </li>
        )
        }
        })()}      

        {(() => { 
        if(this.state.role_id != 3){
        
        if(this.state.active == this.url+'/manage-billing'){
        return(
        <li  className="nav-item active">
            <Link to="/manage-billing"> <img className="img-fluid" src={bill} />Manage Billing</Link>
        </li>
        
        )} else{ 
        return(
            <li  className="nav-item">
            <Link to="/manage-billing"> <img className="img-fluid" src={bill} />Manage Billing</Link>
        
        </li>
        )
        }
        }
        })()}
        
        {(() => { 
        
        if(this.state.active == this.url+'/profile-setting'){
        return(
        <li className="nav-item active">
        <Link to="/profile-settings"> <img className="img-fluid" src={Vector5} />Profile Settings
        </Link>
        </li>
        )}
        else{ 
        return(
        <li className="nav-item">
            <Link to="/profile-settings"> <img className="img-fluid" src={Vector5} />Profile Settings
            </Link>
        </li>
        )
            
        }
        })()}
        
        {(() => { 
            if(this.state.role_id == 1){
            if(this.state.active == this.url+'/admin-control'){
            return(
            <li className="nav-item active">
            <Link to="/add-data"> <img className="img-fluid" src={Vector5} />Add data
            </Link>
            </li>
            )}
            else{ 
            return(
            <li className="nav-item">
            <Link to="/add-data"> <img className="img-fluid" src={Vector5} />Add data
            </Link>
            </li>
            )                    
            }                   
            }
            })()}
        


            <li><Link to="/login" className="" onClick={this.handleLogoutClick}> <img className="img-fluid" src={Vector6} />Logout</Link></li>
            </ul>

          </div>

        </div>

        <div className="sidebarDiv2">
       
        <div className="upgrade-col" style={{display:this.state.hidden}}>
        <img className="Ellipse3" src={Ellipse3}/>
        <img className="Ellipse4"  src={Ellipse4}/>
        <img className="Ellipse5"  src={Ellipse5}/>
        <img  className="Ellipse6"  src={Ellipse6}/>
          
        <p>Ready for better</p>
          <Link to={'/update-billing'} className="btn upgarde-btn"> <img src={UpgradeIcon}/> Upgarde</Link>
        </div>
        
        <Link to={'/'}><img className="img-fluid logo" src={DashboardLogo} /></Link>
         </div>
        


        </div>

        

        </div>


   
    )
  }
}