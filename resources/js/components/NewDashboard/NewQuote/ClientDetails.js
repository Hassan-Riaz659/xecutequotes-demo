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




const columns = [
  {
    name: 'Firstname',
    selector: 'Firstname',
    sortable: true,
     cell: row => <div>Salung</div>
   
  },
  {
    name: 'Lastname',
    selector: 'Lastname',
    sortable: true,
    cell: row => <div>Prastyo</div>
  },
  {
    name: 'Member Type',
    selector: 'Member Type',
    sortable: true,
    cell: row => <div>Employee</div>
  },
    {
    name: 'Birth of day',
    selector: 'Phone_Number',
    sortable: true,
    cell: row => <div>Jun, 21 1990</div>
  },
    {
    name: 'Age',
    selector: 'Phone_Number',
    sortable: true,
    cell: row => <div>26</div>
  },
  {
    
    sortable: true,
    cell: row => <div><a href="#"><i className="fas fa-pen"/>Edit </a><a href="#"> <i className="fas fa-trash-alt"/>Delete</a></div>

  },
];


createTheme('solarized', {
  text: {
    primary: '#36395B',
    secondary: '#2aa198',
  },
  background: {
    default: '#fff',
  },
  context: {
    background: '#fff',
    text: '#36395B',
  },
  divider: {
    default: 'rgba(0, 0, 0, 0.09)',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});


export default class ClientDetails2 extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            columns: [],
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        });
        
        
        let tableColumns = columns;
        
         this.setState ({
            columns: tableColumns
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

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/DashboardHome"><i className="fas fa-long-arrow-alt-left"/></Link> Client Details</h4>
                                </div>

                                <div className="col-lg-12 group-information-col add-employee-col">
                                    <div className="user-card client-Details-tabs">
                                        <div className="group-information">
                                           <ul className="nav nav-tabs" role="tablist">
                                              <li className="nav-item">
                                                <a className="nav-link active" data-toggle="tab" href="#home">Employee</a>
                                              </li>
                                              <li className="nav-item">
                                                <a className="nav-link" data-toggle="tab" href="#menu1">Quote</a>
                                              </li>
                                            </ul>
                                            {/* Tab panes */}
                                            <div className="tab-content">
                                              <div id="home" className=" tab-pane active"><br />
                                              
                                                <DataTable
                                                        columns={columns}
                                                        data={this.state.columns}
                                                        pagination
                                                        highlightOnHover
                                                        noHeader
                                                        noFooter
                                                        actions
                                                        theme="solarized"
                                                       
                                                      />
                                                      
                                              </div>
                                              
                                              <div id="menu1" className="tab-pane fade"><br />
                                                <DataTable
                                                        columns={columns}
                                                        data={this.state.columns}
                                                        pagination
                                                        highlightOnHover
                                                        noHeader
                                                        noFooter
                                                        actions
                                                        theme="solarized"
                                                       
                                                      />
                                              </div>
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
