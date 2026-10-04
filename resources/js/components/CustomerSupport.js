import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;



export default class ManageBilling extends Component {
    constructor (props){
        super(props);
        this.state = {clients: '',userid:''};
        this.url = window.location.origin;
        
}

    componentDidMount() {
    
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
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link>Customer Support </h4>
                                </div>
                                
                                <div className="col-md-7 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Customer Support </h5>

                                            <form noValidate={true}>
                                            <div className="form-group">
                                            <label>Email Address </label>
                        <input type="text" disabled placeholder="patrick@xecutequotes.com" className="form-control"/>
                                    </div>
                                                <div className="form-group">
                                            <label>Contact number </label>
                        <input type="text" disabled placeholder="505-235-9021" className="form-control"/>
                                    </div>
							 
							 <div className="form-group">
                                                    <label>Location </label>
                        <input type="text" disabled placeholder="9577 Osuna Rd NE,
Suite 3
 Albuquerque, NM 87111" className="form-control"/>
							 </div>
                                               
                                            </form>
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