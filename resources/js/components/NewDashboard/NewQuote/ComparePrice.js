import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;
var trendingUp = baseUrl+"/public/landingImages/trending-up.png";
var calendar = baseUrl+'/public/landingImages/calendar.png';
var Group1 = baseUrl+'/public/landingImages/Group1.png';
var Group3 = baseUrl+'/public/landingImages/Group3.png';
var Group4 = baseUrl+'/public/landingImages/Group4.png';


export default class ComparePrice2 extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
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

                                <div className="col-12 title-col  add-employee-title mb-4">
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Compare Price</h4>
                                    
                                    
                                    <div className="close-btn-col add-employee-title">
                                              <a className="btn close-btn" href=""><i className="fas fa-close"/>Close</a>
                                              <Link className="btn" to=""> <i className="fas fa-print"/>Print</Link>
                                              </div>
                                    
                                </div>

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Plan Overview</h5>

                                            

                                           
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
