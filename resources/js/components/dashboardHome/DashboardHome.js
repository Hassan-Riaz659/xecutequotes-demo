import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from '../Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';

import $ from 'jquery';
import '../style.css';


var baseUrl = window.location.origin;
var trendingUp = baseUrl+"/public/landingImages/trending-up.png";
var calendar = baseUrl+'/public/landingImages/calendar.png';
var Group1 = baseUrl+'/public/landingImages/Group1.png';
var Group3 = baseUrl+'/public/landingImages/Group3.png';
var Group4 = baseUrl+'/public/landingImages/Group4.png';

// import trendingUp from "../../components/imgs/trending-up.png";
// import calendar from "../../components/imgs/calendar.png";
// import Group1 from "../../components/imgs/Group1.png";
// import Group3 from "../../components/imgs/Group3.png";
// import Group4 from "../../components/imgs/Group4.png";

export default class DashboardHome extends Component {
    constructor (props){
        super(props);
}

componentDidMount() {
    $(document).ready(function(){
      $(".App-header").hide();
    })
}


    render() {
        return (
            <div>

                <div className="wrapper">

                    <Sidebar/>


                    <div className="main-panel">
        {/* Navbar */}

        <DashboardHeader/>
        
        {/* End Navbar */}      
        <div className="content">

          <div className="row">

            <div className="col-12 title-col mb-4">
              <h4>Broker Dashboard</h4>
            </div>

            <div className="col-lg-3">
              <div className="user-card">
               <div className="percentage-col">
                <h3>20 <span><img src={trendingUp}/> 3.48%</span></h3>

                <span className="group group1"><img src={calendar }/></span>
               </div>

               <p>Quotes in last 30 days</p>
            </div>
                
          </div>

          <div className="col-lg-3">
              <div className="user-card">
               <div className="percentage-col">
                <h3>New Nesting 1 <span><img src={trendingUp}/> 12%</span></h3>

                <span className="group group2"><img src={Group1 }/></span>
               </div>

               <p>Last quote and users</p>
            </div>
                
          </div>

          <div className="col-lg-3">
              <div className="user-card">
               <div className="percentage-col">
                <h3>22 <span><img src={trendingUp}/> 20.4%</span></h3>

                <span className="group group3"><img src={Group3}/></span>
               </div>

               <p>Total Clients</p>
            </div>
                
          </div>

          <div className="col-lg-3">
              <div className="user-card">
               <div className="percentage-col">
                <h3>18 <span><img src={trendingUp}/> 20.4%</span></h3>

                <span className="group group4"><img src={Group4 }/></span>
               </div>

               <p>Customer Support</p>
            </div>
                
          </div>

          
        </div>
        </div>

        
<DashboardFooter/>
        </div>


               </div>
            </div>
        )
    }
}
