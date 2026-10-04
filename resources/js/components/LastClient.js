import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import $ from 'jquery';
import TableRowQuoteDetails from './TableRowQuoteDetails';
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
    name: 'Name',
    selector: 'f_name',
    sortable: true,
     cell: row => <div>{row.f_name}</div>
   
  },
  {
    name: 'Member type',
    selector: 'member_type',
    sortable: true,
    cell: row => <div>{row.member_type}</div>
  },
  {
    name: 'Effective Date',
    selector: 'dob',
    sortable: true,
    cell: row => <div>{row.dob}</div>
  },
  {
    name: 'Age',
    selector: 'age',
    sortable: true,
    cell: row => <div>{row.age}</div>

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



export default class LastClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ABC:'Hello',
            name:'',
            quote:'',
            employees : '',
            clientId:'',
            planAssigned:'',
            columns: [],
            quote_id:''
            
        };
        this.url = window.location.origin;
        this.goBack = this.goBack.bind(this);
        this.checkComparedPlans = this.checkComparedPlans.bind(this);
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        
        axios.get(this.url +'/api/last-client-details/'+this.props.match.params.id)
    .then(response =>{
    //console.log(response.data,"dataaa");lastQuote,employees,client,plan_assigned
           this.setState({zip:response.data.lastQuote.zip,
            quote_id:response.data.lastQuote.id,
           effective_date:response.data.lastQuote.effective_date,
           plan_name:response.data.plan_assigned,
           name:response.data.client.name,
           employees:response.data.employees
           });
        

    })
    .catch(function(error){
        console.log(error);
    })
        
        let tableColumns = columns;
        
         this.setState ({
            columns: tableColumns
        });
        
        //console.log(this.state.columns, " faiq");
        //console.log(tableColumns, " faiq2");
       
    }
    
    goBack(){
    this.props.history.goBack();
}

checkComparedPlans(){

}

tableRow(){
 
    if(this.state.employees instanceof Array){
        return this.state.employees.map(function(object,i){
            return <TableRowQuoteDetails obj={object} key={i} index={i}/>;
        }.bind(this))
        
    }
    
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
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Client Details</h4>
                                </div>
                            
                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card Previous-Quote">
                                     <h5 className="pl-4 mb-2 ml-3">Quotes</h5>
                                    
                                        <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">

        </div>
        <div className="row mb-3">
          
          <div className="col-lg-12">
            {/* Form Basic */}
            <div className="card mb-12">
             <div className=" py-3 d-flex flex-row align-items-center justify-content-between">
                </div>
                <div className="card-body">
                      
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <label className="mr-4">Client Name :</label>{this.state.name}</li>
                                <li className="list-group-item"><label className="mr-4">Zip Code       :</label>{this.state.zip}</li>
                                <li className="list-group-item"><label className="mr-4">Effective Date :</label>{this.state.effective_date}</li>
                                <li className="list-group-item"><label className="mr-4">Plan Assigned :</label>{this.state.plan_name == '' ? '' : this.state.plan_name}</li>            
                                <li className="list-group-item"><Link className="btn btn-md btn-info" to={"/see-compared-plans/"+this.state.quote_id}>See Compared Plans</Link></li>            
                        </ul>

                      
                    </div>
                </div>
               
           
            
            <div className="card mb-12">
              <div className=" py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary ml-3">Employees</h6>
               
              </div>
              <div className="card-body">
                <div className="row">
                         <div className="col-md-12 table-responsive">
                    <table className="table table-bordered " id="datatable">
                      <thead className=" text-primary" >
                        <tr>

                          <th>Name</th>
                          <th>Member Type</th>
                          <th>Date of Birth</th>
                          <th>Age</th>
                          
                          
                        </tr>
                      </thead>
                      <tbody>
                           {this.tableRow()}                
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
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
