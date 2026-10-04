import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from '../sidebar/Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import $ from 'jquery';

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




const columns = [
  {
    name: 'Name',
    selector: 'Name',
    sortable: true,
     cell: row => <div>faiq</div>
   
  },
  {
    name: 'Zip',
    selector: 'Zip',
    sortable: true,
    cell: row => <div>87109</div>
  },
  {
    name: 'Effective Date',
    selector: 'Effective_Date',
    sortable: true,
    cell: row => <div>jan, 21 2021</div>
  },
  {
    name: 'Plan Assigned',
    selector: 'Plan_Assigned',
    sortable: true,
    cell: row => <div>-</div>

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



export default class PreviousQuote2 extends Component {
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

                                <div className="col-12 title-col mb-4">
                                    <h4>Previous Quote</h4>
                                </div>

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card Previous-Quote">
                                     <h5 className="pl-4 mb-2 ml-3">Previous Quote</h5>
                                    
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
