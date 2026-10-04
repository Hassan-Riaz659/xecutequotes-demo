import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import $ from 'jquery';

var baseUrl = window.location.origin;
var userPlus = baseUrl+"/public/landingImages/userplus.png";




const columns = [
  {
    name: 'Name',
    selector: 'Name',
    sortable: true,
     cell: row => <div>faiq</div>
   
  },
  {
    name: 'Email',
    selector: 'Email',
    sortable: true,
    cell: row => <div>jhon@email.com</div>
  },
  {
    name: 'Phone Number',
    selector: 'Phone_Number',
    sortable: true,
    cell: row => <div>+62 789768789</div>
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



export default class Employees2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
        }
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        
        let tableColumns = columns;
        
         this.setState ({
            columns: tableColumns
        });
        
        console.log(this.state.columns, " faiq");
        console.log(tableColumns, " faiq2");
       
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
                                    <h4>Employees</h4>
                                    
                                    <Link className="btn" to="/add-employee2"><img src={userPlus}/> Add Employee</Link>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card Previous-Quote">
                                     <h5 className="pl-4 mb-2 ml-3">Lists</h5>
                                    
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


                        <DashboardFooter />
                    </div>


                </div>
            </div>
        )
    }
}
