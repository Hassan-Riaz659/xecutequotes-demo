import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;



export default class ProfileSetting2 extends Component {
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
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Profile Setting</h4>
                                </div>
                                
                                <div className="col-md-7 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Profile</h5>

                                            <form action="/action_page.php">

                                                

                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <input type="text" className="form-control" />

                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Phone Number</label>
                                                    <input type="number" className="form-control" />

                                                </div>

                                               

                                                <button type="button" className="btn next-btn">Save</button>


                                            </form>
                                        </div>

                                    </div>

                                </div>
                                
                                
                                <div className="col-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Email Update</h5>

                                            <form action="/action_page.php">

                                                

                                                <div className="form-group">
                                                    <label>Email Address</label>
                                                    <input type="email" className="form-control" />

                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Verify Code</label>
                                                    <input type="number" className="form-control" />

                                                </div>

                                               

                                                <button type="button" className="btn next-btn">Change Email</button>


                                            </form>
                                        </div>

                                    </div>

                                </div>
                                </div>
                                
                                
                                <div className="col-md-5 col-12 profile-setting-col2">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Account Settings</h5>

                                            <form action="/action_page.php">

                                                

                                                <div className="form-group">
                                                    <label>Old Password</label>
                                                    <input type="password" className="form-control" />

                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>New Password</label>
                                                    <input type="password" className="form-control" />

                                                </div>
                                                
                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <input type="password" className="form-control" />

                                                </div>

                                               

                                                <button type="button" className="btn next-btn">Change Password</button>


                                            </form>
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
