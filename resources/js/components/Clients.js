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
     cell: row => <div><Link to={"/client-details/"+row.id}>{row.name}</Link></div>
  },
  {
    name: 'Zip',
    selector: 'zip',
    sortable: true,
    cell: row => <div><Link to={"/client-details/"+row.id}>{row.zip}</Link></div>
  },
  {
    name: 'Total Employees',
    selector: 'employees_count',
    sortable: true,
    cell: row => <div><Link to={{pathname: '/client-details/'+row.id, state: { type: 'emp' }}}>{row.employees_count}</Link></div>
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



export default class Clients extends Component {
    constructor(props) {
        super(props);
        this.state = {clients: '', userid:'', columns: []};
            
        this.url = window.location.origin;
         this.goBack = this.goBack.bind(this);
         this.handleScroll =  this.handleScroll.bind(this);
        this.myRef = React.createRef();
         window.scrollTo(0, 0);
        }
    
    
handleScroll() {
    const { index, selected } = this.props
    if (index === selected) {
      setTimeout(() => {
        this.myRef.current.scrollIntoView({ behavior: 'smooth' })
      }, 10)
    }
 }
 
 
    componentDidMount() {
        
            this.handleScroll();
        
                $(".data-table-col").hide();
        
         $(".loader").addClass("active");
        
       if(this.state.quotes !== []) {

    // Hide the div
    setTimeout(function(){
   $('.loader').hide();// or fade, css display however you'd like.
}, 3000);
    
       setTimeout(function(){
   $('.data-table-col').show();// or fade, css display however you'd like.
}, 3000);

       }
       
       
       
       
        $(document).ready(function () {
            $(".App-header").hide();
           
        })
        
         let state = localStorage["appState"];
        if (state) {
      let AppState = JSON.parse(state);
      //console.log('state',AppState.user);


        axios.get(this.url + '/api/clients/'+AppState.user.id)
       .then(response => {
           //console.log('hhhhh', response);
         this.setState({ clients: response.data.data });
         
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
            <div ref={this.myRef}>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Clients</h4>
                                </div>

                                <div className="col-lg-12 ">
                                    <div className="user-card Previous-Quote group-information-col">
                                        <div className="displayHeadingSearchBar">
                                            <h5 className="mb-2" style={{paddingLeft:'36px'}}>Clients</h5>
                                                <div className="searchBarFormIcon" style={{paddingRight:'36px'}}>
                                                    <input type="text" placeholder="Search" className="searchBarFormQuotes" />
                                                        <i>
                                                            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M4.95833 9.29167C7.35157 9.29167 9.29167 7.35157 9.29167 4.95833C9.29167 2.5651 7.35157 0.625 4.95833 0.625C2.5651 0.625 0.625 2.5651 0.625 4.95833C0.625 7.35157 2.5651 9.29167 4.95833 9.29167Z" stroke="#9094BF" stroke-linecap="round" stroke-linejoin="round"/>
                                                                <path d="M10.375 10.375L8.0188 8.01874" stroke="#9094BF" stroke-linecap="round" stroke-linejoin="round"/>
                                                            </svg>
                                                        </i>
                                                </div>
                                        </div>
                                     <div className="loader" id="#loading">
                                </div>
                                    
                                    
                                    <div className="data-table-col">
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
                        </div>


                        <DashboardFooter />
                    </div>


                </div>
            </div>
        )
    }
}
