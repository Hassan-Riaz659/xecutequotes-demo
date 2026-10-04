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

import moment from "moment";




const columns = [
//     {
//     name: 'Quote ID',
//     selector: 'id',
//     sortable: true,
//      cell: row => <div>{row.id}</div>
   
//   },
  {
    name: 'Client',
    selector: 'client',
    sortable: true,
     cell: row => <div>{row.client}</div>
   
  },
  {
    name: 'Nick Name',
    selector: 'nickName',
    sortable: true,
     cell: row => <div>{row.nickName}</div>
   
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
  
  {
    name: 'Generate Date',
    selector: 'created_at',
    sortable: true,
    cell: row => <div>{moment(row.created_at).format("MM/DD/YYYY") || "-" }</div>

  },
  
  {
    name: 'Preview',
    selector: 'id',
    sortable: true,
    cell: row => <div><Link className="btn btn-md btn-info" to={"/previous-quote-preview/"+row.id}>Preview</Link></div>

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
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            filter_quotes:[],
            userid:'',
            logo:'',
            columns: [],
            bName:'',
            boughtCredits:'',
            freeCredits:'',
            subscriptType:'free',
        };
        this.url = window.location.origin;
        this.handleTest = this.handleTest.bind(this);
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
       

                                
                                
    let state = localStorage["appState"];
    if (state) {
        
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, userid: AppState.user.id });
      
      if(AppState.user.subscription_type == "annual" || AppState.user.role_id == 3)
      {
          
          this.setState({
              subscriptType:'Annual'
          })
      }
      else
      {
          this.setState({
              freeCredits:AppState.user.credits_left,
              boughtCredits:AppState.user.bought_credits
          })
      }
      
     axios.get(this.url +'/api/previous-quotes/'+AppState.user.id)
     
     .then(response =>{

             this.setState({quotes:response.data.quotes,filter_quotes:response.data.quotes,logo:response.data.logo,bName:AppState.user.b_name});
     })
     .catch(function(error){
         console.log(error);
     })
     
    $(document).ready(function () {
            $(".App-header").hide();
        })
    
}
        
        let tableColumns = columns;
        
         this.setState ({
            columns: tableColumns
        });
        
        // console.log(this.state.columns, " faiq");
        // console.log(tableColumns, " faiq2");
       
    }
    handleTest(e)
    {
         axios.get(this.url +'/api/add-details') 
         .then(response =>{
                    console.log('responded')
       
         })
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
                                
                                    <h4>Broker Dashboard</h4>
                       
                  { this.state.logo !== "No Image" ?
                    <div style={{height:'250px',maxWidth: '100%'}}>
                    <img className="img-fluid" style={{display: this.state.logo ? 'block' : 'none', borderRadius:"25%",margin: "0px auto",height:"100%"}} src={window.location.origin+'/public/images/companies_logos/'+this.state.logo} /> 
    
                 </div>
                 :
                 <div></div>
                 }
               
                    { this.state.subscriptType !='free' ?
                    <p style={{textAlign:"end"}}>Subscription Type : Annual</p> : 
                    <div>
                    <h7>Credits Left : </h7>
                    <h9>Free Credits : <Link to={'/update-billing'}>{this.state.freeCredits}</Link></h9><br/>
                    <h9 style={{marginLeft:'0.1rem'}}>Bought Credits : <Link to={'/update-billing'}>{this.state.boughtCredits}</Link></h9>
                    </div>
                    }
                
                
                                </div>
                            <div className="col-lg-12 group-information-col">
                            
                              

                                
                                    <div className="user-card Previous-Quote">
                                        <div className="displayHeadingSearchBar">
                                            <h5 className="pl-4 mb-2 ml-3">Previous Quotes</h5>
                                                <div className="searchBarFormIcon pr-4 mb-2 mr-3">
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
                                                        data={this.state.quotes}
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
