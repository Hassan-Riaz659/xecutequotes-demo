import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import moment from "moment";

import $ from 'jquery';

var baseUrl = window.location.origin;





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


export default class ClientDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients   : '',
            employees : [],
            plan_name:'',
            assigned_plan:'',
            userid:'',
            quotes:[],
            columns: [],
            totalQuotes:0,
        };
        
        this.url = window.location.origin;
        this.onDelete = this.onDelete.bind(this);
        this.onDeleteQuote = this.onDeleteQuote.bind(this);
        this.onDeleteClient = this.onDeleteClient.bind(this);
        this.goBack = this.goBack.bind(this);
        
    }
    
    componentWillMount()
{
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, userid: AppState.user.id });

}
}

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        });
        
       // console.log(this.props.match.params.id,'id');
        axios.get(this.url +'/api/client-details/'+this.props.match.params.id)
    .then(response =>{
        this.setState({clients:response.data.client,
      employees:response.data.employees,
      quotes:response.data.quotes,
      assigned_plan:response.data.quotes.assigned_plan,
      totalQuotes:response.data.totalQuotes
        });
    })
    .catch(function(error){
        console.log(error);
    })

        // let tableColumns = columns;
        
        //  this.setState ({
        //     columns: tableColumns
        // });

        
    }
        goBack(){
    this.props.history.goBack();

    }

    
    
    onDelete(id){
     const employees = this.state.employees.filter(item => item.id !== id);
    axios.delete(this.url+'/api/delete-clientEmployees/'+id)
    .then(res => {
        if(res.data.flag=='1')
        {
            this.setState({ employees: employees });
        }
        })
  };
  
  onDeleteQuote(id){
  const quotes = this.state.quotes.filter(item => item.id !== id);
    axios.delete(this.url+'/api/delete-Quote/'+id)
    .then(res => {
        if(res.data.flag=='1')
        {
            Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Quote deleted successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
            this.setState({ quotes: quotes });
            this.props.history.push('/client-details/'+this.props.match.params.id);
        }
        })
  };
  
  onDeleteClient(id)
{
    axios.delete(this.url+'/api/delete-Client/'+id)
    .then(res => {
        if(res.data.flag=='1')
        {
            Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Client deleted successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
            this.props.history.push('/clients');
        }
        })
}


    render() {
        
        const quote = [
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
    name: 'Assigned Plan',
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
    
    sortable: true,
    cell: row => <div><Link className="mb-2" to={"/previous-quote-preview/"+row.id}><i class="fa fa-desktop" aria-hidden="true"></i>Preview</Link>&nbsp;<a href="#" className="btn-danger " onClick={() => (Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    { this.onDeleteQuote(row.id)}
                  }
}))}><i className="fas fa-trash-alt" aria-hidden="true" />Delete</a></div>

  },
];


const Employee = [
  {
    name: 'First Name',
    selector: 'f_name',
    sortable: true,
     cell: row => <div>{row.f_name}</div>
   
  },
  
  {
    name: 'Last Name',
    selector: 'l_name',
    sortable: true,
     cell: row => <div>{row.l_name}</div>
   
  },
  
  {
    name: 'Member Type',
    selector: 'member_type',
    sortable: true,
    cell: row => <div>{row.member_type}</div>
  },
  
  {
    name: 'DOB',
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
  
  {
    
    sortable: true,
    cell: row => <div><Link className="mb-2" to={"/edit-clientemployee/"+row.id}><i className="fas fa-pen"/>Edit</Link>&nbsp;<a className="btn-danger" onClick={() => (Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    { this.onDelete(row.id)}
                  }
}))}><i className="fas fa-trash-alt"/>Delete</a></div>

  },
];
        
        
        //console.log(this.state.clients,"client");
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
<h4>
<a href="" onClick={this.goBack}><i className="fas fa-long-arrow-alt-left" /> </a> Client Details 
<Link className="btn btn-md btn-warning float-right" style={{color:"#fff"}}   to={"/new-quote/"+this.state.userid}>New Quote</Link>
<Link className="btn btn-md btn-info float-right" style={{color:"#fff"}}   to={"/existing-new-quote/"+this.props.match.params.id}>Use for New Quote</Link>
</h4>
                                    
                                    
                                    
                                </div>
                                
        <div className="col-12 title-col add-employee-titlt mb-4">
                <label className="mr-4" style={{paddingLeft:'56px'}}>Name:</label>
                    {this.state.clients.name}
                    
                <button className="btn btn-md btn-danger float-right"  onClick={() => (Swal.fire({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                  if (result.isConfirmed) {
                    {this.onDeleteClient(this.state.clients.id)}
                  }
}))}><i className="fas fa-trash-alt"/> Delete</button>
                </div>

                                <div className="col-lg-12 group-information-col add-employee-col">
                                    <div className="user-card client-Details-tabs">
                                        <div className="group-information">
                                           <ul className="nav nav-tabs" role="tablist">
                                              <li className={`nav-item ${this.props.location.state?null:'active '}`}>
                                                <a className={`nav-link ${this.props.location.state?null:'active'}`} data-toggle="tab" href="#home">Quote ({this.state.totalQuotes})</a>
                                              </li>
                                              <li className={`nav-item ${this.props.location.state?'active':null}`}>
                                                <a className={`nav-link ${this.props.location.state?'active':null}`} data-toggle="tab" href="#menu1">Employee</a>
                                              </li>
                                            </ul>
                                            {/* Tab panes */}
                                            <div className="tab-content">
                                              <div id="home" className= {`tab-pane ${this.props.location.state?null:'active in'}`}><br />
                                              
                                                <DataTable
                                                        columns={quote}
                                                        data={this.state.quotes}
                                                        pagination
                                                        highlightOnHover
                                                        noHeader
                                                        noFooter
                                                        actions
                                                        theme="solarized"
                                                       
                                                      />
                                                      
                                              </div>
                                              
                                              <div id="menu1" className={`tab-pane fade ${this.props.location.state?'active show':null}`}><br />
                                                <DataTable
                                                        columns={Employee}
                                                        data={this.state.employees}
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
