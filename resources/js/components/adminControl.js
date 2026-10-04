import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
    selector: 'name',
    sortable: true,
  },
  {
    name: 'Role',
    selector: 'role_id',
    sortable: true,
  },
  {
    name: 'Phone Number',
    selector: 'phone_number',
    sortable: true,
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
  },
  {
    name: 'licenses left',
    selector: 'additional_license',
    sortable: true,
  },
  {
    name: 'Subscription Type',
    selector: 'subscription_type',
    sortable: true,
  },
  {
    name: 'Next charge Date',
    selector: 'next_charge_date',
    sortable: true,
  },
  {
    name: 'Free Credits Left',
    selector: 'credits_left',
    sortable: true,
  },
  {
    name: 'Bought Credits Left',
    selector: 'bought_credits',
    sortable: true,
  },
  {
    name: 'Action',
    selector: 'id',
    sortable: true,
     cell: row => <div><Link className="btn btn-md btn-info" to={"/edit-user/"+row.id}>Edit</Link></div>
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



export default class adminControl extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: '', userid:'', users: []};
            
        this.url = window.location.origin;
         this.goBack = this.goBack.bind(this);
        }
    
    

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
           
        })
        
         let state = localStorage["appState"];
        if (state) {
      let AppState = JSON.parse(state);
      //console.log('state',AppState.user);


        axios.get(this.url + '/api/get-users/')
       .then(response => {
           console.log('users', response.data.users);
         this.setState({ users: response.data.users });
         
       })
       
       .catch(function (error) {
         console.log(error);
       });
       
        }
        
        // let tableColumns = columns;
        
        //  this.setState ({
        //     columns: tableColumns
        // });
        
        //console.log(this.state.columns, " faiq");
        //console.log(tableColumns, " faiq2");
       
    }

  goBack(){
    this.props.history.goBack();
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
                            <div className="col-12 title-col add-employee-titlt mb-4">
                             
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link>Admin Control panel</h4>
                             
                             </div>
                        
         <div className="row" style={{marginBottom:"40px"}}>
                            <div className="col-lg-6 broker-dashboard-col">
                              <div className="user-card">
                              <Link to={"#"}>
                               <div className="percentage-col">
                                <h3>{"#"}<span><img src={trendingUp}/> {"#"}%</span></h3>
                                <span className="group group1"><img src={calendar }/></span>
                               </div>
                               <p>Paying Users</p>
                               </Link>
                            </div>
                          </div>
                        
                        <div className="col-lg-6 broker-dashboard-col">
                              <div className="user-card">
                              <Link to={"/CustomerSupport"}>
                               <div className="percentage-col">
                                <h3>19 <span><img src={trendingUp}/> 20.4%</span></h3>
                                <span className="group group4"><img src={Group4 }/></span>
                               </div>
                               <p>Free Users</p>
                               </Link>
                            </div>
                      </div>
          </div>
                            <div className="row">

                                <div className="col-lg-12 ">
                                    <div className="user-card Previous-Quote group-information-col">
                                     <h5 className="mb-2" style={{paddingLeft:'36px'}}>List of All Users</h5>
                                    
                                         <DataTable
                                                        columns={columns}
                                                        data={this.state.users}
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
