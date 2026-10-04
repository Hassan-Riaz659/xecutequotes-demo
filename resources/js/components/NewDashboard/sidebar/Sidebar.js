import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Ripples from 'react-ripples';

import $ from 'jquery';


var baseUrl = window.location.origin;
var DashboardLogo =  baseUrl+"/public/landingImages/DashboardLogo.png";
var Vector1 = baseUrl+'/public/landingImages/Vector1.png';
var Vector2 = baseUrl+'/public/landingImages/Vector2.png';
var Vector3 = baseUrl+'/public/landingImages/Vector3.png';
var Vector4 = baseUrl+'/public/landingImages/Vector4.png';
var Vector5 = baseUrl+'/public/landingImages/Vector5.png';
var Vector6 = baseUrl+'/public/landingImages/Vector6.png';
var UpgradeIcon = baseUrl+'/public/landingImages/upgradeIcon.png';
var Ellipse3 = baseUrl+'/public/landingImages/Ellipse3.png';
var Ellipse4 = baseUrl+'/public/landingImages/Ellipse4.png';
var Ellipse5 = baseUrl+'/public/landingImages/Ellipse5.png';
var Ellipse6 = baseUrl+'/public/landingImages/Ellipse6.png';


// import DashboardLogo from '../../components/imgs/DashboardLogo.png';
// import Vector1 from '../../components/imgs/Vector1.png';
// import Vector2 from '../../components/imgs/Vector2.png';
// import Vector3 from '../../components/imgs/Vector3.png';
// import Vector4 from '../../components/imgs/Vector4.png';
// import Vector5 from '../../components/imgs/Vector5.png';
// import Vector6 from '../../components/imgs/Vector6.png';
// import UpgradeIcon from '../../components/imgs/upgradeIcon.png';
// import Ellipse3 from '../../components/imgs/Ellipse3.png';
// import Ellipse4 from '../../components/imgs/Ellipse4.png';
// import Ellipse5 from '../../components/imgs/Ellipse5.png';
// import Ellipse6 from '../../components/imgs/Ellipse6.png';

export default class Sidebar extends Component {

  componentDidMount() {
    $(document).ready(function () {
      $(".App-header").hide();
    })
  }

  render() {
    return (
      <div>


        <div className="sidebar sidebar2">

          <div className="sidebarDiv1">

          
          <div className="logo">
            <img className="img-fluid" src={DashboardLogo} />
          </div>

          <div className="sidebar-wrapper ps" id="sidebar-wrapper">

            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/DashboardHome"> <img className="img-fluid" src={Vector1} /> Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/new-quote"> <img className="img-fluid" src={Vector2} />New Quote</Link>
              </li>
              <li className="nav-item">
                <Link to="/previous-quote"> <img className="img-fluid" src={Vector2} />Previous Quotes</Link>
              </li>
              <li className="nav-item">
                <Link to="/clients2"> <img className="img-fluid" src={Vector3} />Clients</Link>
              </li>

              <li className="nav-item">
                <Link to="/employees2"> <img className="img-fluid" src={Vector4} />Employees</Link>
              </li>

              <li className="nav-item">
                <Link to="/profile-setting2"> <img className="img-fluid" src={Vector5} /> Profile Settings</Link>
              </li>

            </ul>


          </div>

        </div>

        <div className="sidebarDiv2">
        
        <ul>
          <li><a href=""> <img className="img-fluid" src={Vector6} />Logout</a></li>
        </ul>

        <div className="upgrade-col">
        <img className="Ellipse3" src={Ellipse3}/>
        <img className="Ellipse4"  src={Ellipse4}/>
        <img className="Ellipse5"  src={Ellipse5}/>
          <img  className="Ellipse6"  src={Ellipse6}/>
          
          <p>Ready for better</p>
        <a className="btn upgarde-btn" href="#"> <img src={UpgradeIcon}/> Upgarde</a>
        </div>
        <img className="img-fluid logo" src={DashboardLogo} />


        </div>

        

        </div>


      </div>
    )
  }
}


