import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import $ from 'jquery';
import { Link } from 'react-router-dom';
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
    name: 'Client',
    selector: 'clientName',
    sortable: true,
     cell: row => <div><Link to={"/client-details/"+row.client_id}>{row.clientName}</Link></div>
   
  },
  
  {
    name: 'Zip',
    selector: 'zip',
    sortable: true,
    cell: row => <div>{row.zip}</div>
  },
  {
    name: 'Effective Date',
    selector: 'effective_date',
    sortable: true,
    cell: row => <div>{row.effective_date}</div>
  },
  {
    name: 'Plan Assigned',
    selector: 'assigned_plan',
    sortable: true,
    cell: row => <div>{row.assigned_plan || "-" }</div>

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



export default class Quotes extends Component {
    constructor (props){
        super(props);
        this.state = {clients: '',userid:''};
        this.url = window.location.origin;
        
}

    componentDidMount() {
       
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      console.log('state',AppState.user);

      axios.get(this.url + '/api/quotes30Days/'+AppState.user.id)
      .then(response => {
         this.setState({ clients: response.data.quotes });
         console.log('result',response.data.quotes);
         $('#datatable').DataTable();
      })
       
      .catch(function (error) {
         console.log(error);
      });
       
       
    }
        
        let tableColumns = columns;
        
         this.setState ({
            columns: tableColumns
        });
        
        // console.log(this.state.columns, " faiq");
        // console.log(tableColumns, " faiq2");
       
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
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Quotes for last 30 days</h4>
                                </div>
                            <div className="col-lg-12 group-information-col">
                                    <div className="user-card Previous-Quote">
                                     <h5 className="pl-4 mb-2 ml-3">Quotes</h5>
                                    
                                         <DataTable
                                                        columns={columns}
                                                        data={this.state.clients}
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
