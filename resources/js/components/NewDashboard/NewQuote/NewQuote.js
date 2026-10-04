import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
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


export default class NewQuote2 extends Component {
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

                                <div className="col-12 title-col mb-4">
                                    <h4>Quote for Power Generation</h4>
                                </div>

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>New Group Information</h5>

                                            <p>Do you want to use an existing Client?</p>

                                            <form action="/action_page.php">
                                                <div className="custom-control custom-radio">
                                                    <input type="radio" className="custom-control-input" id="customRadio1" name="example1" />
                                                    <label className="custom-control-label" htmlFor="customRadio1">Yes</label>
                                                </div>
                                                <div className="custom-control custom-radio form-group">
                                                    <input type="radio" className="custom-control-input" id="customRadio2" name="example1" />
                                                    <label className="custom-control-label" htmlFor="customRadio2">No</label>
                                                </div>

                                                <div className="form-group">
                                                <label>Existing Client</label>
                                                <select class="form-control" id="sel1" name="sellist1">
                                                    <option>Salung Prastyo</option>
                                                    <option>Salung Prastyo</option>
                                                    <option>Salung Prastyo</option>
                                                    <option>Salung Prastyo</option>
                                                </select>
                                                </div>

                                                <div className="form-group">
                                                    <label>ZIP Code</label>
                                                    <input type="number" className="form-control" />

                                                </div>

                                                <div className="form-group">
                                                    <label>Effective Date</label>
                                                    <input type="date" className="form-control" />

                                                </div>

                                                <button type="button" className="btn next-btn">Next</button>


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
