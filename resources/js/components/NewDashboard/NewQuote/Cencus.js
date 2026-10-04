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


export default class Census2 extends Component {
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
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Cencus</h4>
                                </div>

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                    <h5 className="mb-4">Cencus</h5>
                                        <div className="table-responsive cencus-table">
                                                <table className="table ">
                                                  <thead>
                                                    <tr>
                                                      <th>Member Type</th>
                                                      <th>Firstname</th>
                                                      <th>Lastname</th>
                                                      <th>DOB</th>
                                                      <th>Age</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                    <td>
                                                      <select class="form-control" id="sel1" name="sellist1">
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                    </select>
                                                      
                                                      </td>
                                                      <td>
                                                      <input type="text" className="form-control"/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="text" className="form-control"/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="date" className="form-control"/>
                                                      </td>
                                                      <td>
                                                      <input type="number" className="form-control"/>
                                                      
                                                      <a className="minus-btn" href=""><i className="fas fa-minus"/></a>
                                                      </td>
                                                    </tr>
                                                    
                                                    <tr>
                                                    <td>
                                                      <select class="form-control" id="sel1" name="sellist1">
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                        <option>Salung Prastyo</option>
                                                    </select>
                                                      
                                                      </td>
                                                      <td>
                                                      <input type="text" className="form-control"/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="text" className="form-control"/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="date" className="form-control"/>
                                                      </td>
                                                      <td>
                                                      <input type="number" className="form-control"/>
                                                      <a className="minus-btn" href=""><i className="fas fa-minus"/></a>
                                                      </td>
                                                    </tr>
                                                    
                                                  </tbody>
                                                </table>
                                                
                                                <a className="plus-btn" href=""><i className="fas fa-plus"/></a>
                                              </div>
                                              
                                              <div className="calculate-btn-col add-employee-title">
                                              <a className="btn Previous-btn" href="">Previous</a>
                                              <a className="btn Calculate-btn" href="">Calculate</a>
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
