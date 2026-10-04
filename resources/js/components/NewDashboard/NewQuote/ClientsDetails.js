import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;

export default class ClientDetails2 extends Component {
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

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Client Details</h4>
                                </div>

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                           
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
