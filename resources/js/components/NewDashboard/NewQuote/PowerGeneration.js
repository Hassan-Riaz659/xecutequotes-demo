import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';

import $ from 'jquery';

var baseUrl = window.location.origin;
var companyLogo = baseUrl + "/public/landingImages/companyLogo.png"


export default class PowerGeneration extends Component {
    constructor(props) {
        super(props);
        
  
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        });
        
        
        
        
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

                                <div className="col-12 title-col add-employee-title mb-4">
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Power Generation</h4>
                                    
                                    <Link className="btn" to=""> Compare</Link>
                                </div>

                                <div className="col-lg-3 group-information-col">
                                    <div className="user-card  change-census-col">
                                     <h5>Salung Prastyo</h5>
                                     <p>2 Employees</p>
                                     <p>0 Dependents</p>
                                     <p>0 Spouses</p>
                                     <p>2 Total enrolled</p>
                                     
                                     <a href="#" className="btn census-btn">Change Census</a>
                                     
                                    <span className="custome-border"></span>
                                    
                                    <div className="form-group">
                                    <label>Plan Type</label>
                                    <select class="form-control" id="sel1" name="sellist1">
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                    </select>
                                    </div>
                                    
                                   <div className="form-group">
                                    <label>Metal Level</label>
                                    <select class="form-control" id="sel1" name="sellist1">
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                    </select>
                                    </div>
                                    
                                    <div className="form-group">
                                    <label>Sort by</label>
                                    <select class="form-control" id="sel1" name="sellist1">
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                        <option>Salung Prastyo</option>
                                    </select>
                                    </div>
                                     
                                    </div>

                                </div>
                                
                                <div className="col-lg-9 group-information-col">
                                <div className="row">
                                    <div className="col-12 col-md-6 mb-4">
                                    <div className="user-card  change-census-col2">
                                     <form>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck" name="example2" />
                                          <label className="custom-control-label" htmlFor="customCheck"></label>
                                        </div>
                                      </form>
                                      
                                     <img src={companyLogo} className="d-flex mx-auto"/>
                                     <h4 className="text-center">HMO Bronze 1</h4>
                                     
                                     <ul>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     
                                     <span className="more-details-span"><a href="#" className="btn more-details"> Details</a></span>
                                     </ul>
                                     
                                     <span className="custome-border"></span>
                                     
                                     <p className="text-center" style={{color: '#EF476F',marginBottom: '20px'}}>Monthly Premium</p>
                                     
                                     <h4 className="text-center">$365.58k</h4>
                                     
                                     <a href="#" className="btn select-btn">Select</a>
                                     
                                    </div>
                                    </div>
                                    
                                    <div className="col-12 col-md-6 mb-4">
                                    <div className="user-card  change-census-col2">
                                     <form>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck2" name="example2" />
                                          <label className="custom-control-label" htmlFor="customCheck2"></label>
                                        </div>
                                      </form>
                                      
                                     <img src={companyLogo} className="d-flex mx-auto"/>
                                     <h4 className="text-center">HMO Bronze 1</h4>
                                     
                                     <ul>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     
                                     <span className="more-details-span"><a href="#" className="btn more-details"> Details</a></span>
                                     </ul>
                                     
                                     <span className="custome-border"></span>
                                     
                                     <p className="text-center" style={{color: '#EF476F',marginBottom: '20px'}}>Monthly Premium</p>
                                     
                                     <h4 className="text-center">$365.58k</h4>
                                     
                                     <a href="#" className="btn select-btn">Select</a>
                                     
                                    </div>
                                    </div>
                                    
                                    
                                    <div className="col-12 col-md-6 mb-4">
                                    <div className="user-card  change-census-col2">
                                     <form>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck3" name="example2" />
                                          <label className="custom-control-label" htmlFor="customCheck3"></label>
                                        </div>
                                      </form>
                                      
                                     <img src={companyLogo} className="d-flex mx-auto"/>
                                     <h4 className="text-center">HMO Bronze 1</h4>
                                     
                                     <ul>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     
                                     <span className="more-details-span"><a href="#" className="btn more-details"> Details</a></span>
                                     </ul>
                                     
                                     <span className="custome-border"></span>
                                     
                                     <p className="text-center" style={{color: '#EF476F',marginBottom: '20px'}}>Monthly Premium</p>
                                     
                                     <h4 className="text-center">$365.58k</h4>
                                     
                                     <a href="#" className="btn select-btn">Select</a>
                                     
                                    </div>
                                    </div>
                                    
                                    <div className="col-12 col-md-6 mb-4">
                                    <div className="user-card  change-census-col2">
                                     <form>
                                        <div className="custom-control custom-checkbox">
                                          <input type="checkbox" className="custom-control-input" id="customCheck4" name="example2" />
                                          <label className="custom-control-label" htmlFor="customCheck4"></label>
                                        </div>
                                      </form>
                                      
                                     <img src={companyLogo} className="d-flex mx-auto"/>
                                     <h4 className="text-center">HMO Bronze 1</h4>
                                     
                                     <ul>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     <li>Deductible Individual in network 8150/16300</li>
                                     
                                     <span className="more-details-span"><a href="#" className="btn more-details"> Details</a></span>
                                     </ul>
                                     
                                     <span className="custome-border"></span>
                                     
                                     <p className="text-center" style={{color: '#EF476F',marginBottom: '20px'}}>Monthly Premium</p>
                                     
                                     <h4 className="text-center">$365.58k</h4>
                                     
                                     <a href="#" className="btn select-btn">Select</a>
                                     
                                    </div>
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
