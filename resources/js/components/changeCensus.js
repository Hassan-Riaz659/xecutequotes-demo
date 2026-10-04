import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import styled from 'styled-components';
import $ from 'jquery';

var baseUrl = window.location.origin;
var userPlus = baseUrl+"/public/landingImages/userplus.png";








createTheme('solarized', {
  text:{
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



export default class changeCensus extends Component {
    constructor(props) {
        super(props);
        this.state={
            employees:[],
            quote_id:'',
            client_id:'',
            
        };
        this.url = window.location.origin;
        this.onDelete = this.onDelete.bind(this);
       
        this.handleAddNewEmp = this.handleAddNewEmp.bind(this);
       
}

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        let client_id = localStorage["calculate_client_id"];
    let state = localStorage["appState"];
    
    if (client_id) {
        
      let AppState = JSON.parse(client_id);
      let AppState2 = JSON.parse(state);
    console.log('client_id',AppState.client_id,'user_id',AppState2.user.id);
    axios.get(this.url +'/api/change-census/'+AppState.client_id)
    .then(response =>{
        console.log('employes',response.data.employees);
          if(response.data.employees.length >= 1)
          {
            this.setState({
                employees:response.data.employees,
                client_id:response.data.client_id,
                quote_id:response.data.quote_id
            });
          }
      })
      .catch((error) => {
        console.log(error);
      })
    }
       
    }
    
//     onEdit(id){
      
//     let uri = this.url + '/api/edit-broker-employee/'+id;
//             axios.post(uri, employee)
            
//             .then(res => {
//         if(res.data.flag=='success')
//         {
//             this.setState({ employees: employees });
            
//         }
//         })
//   };
  
  onDelete(id){
      
      console.log("id",id,"quote_id",this.state.quote_id);
    const employees = this.state.employees.filter(item => item.id !== id);
    
        
        const posteData = {
            id : id,
            quote_id : this.state.quote_id

                }
        axios.post(this.url+'/api/delete-censusEmployees',posteData).
        then((response) => {
        if(response.data.flag=='1')
        {
            Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Employees deleted successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.props.history.push('/changeCensus')
                this.setState({ employees: employees });
        }
        });
        
        
        
        
  };
  
  handleAddNewEmp(e)
{

     const postData = {
            client_id : this.state.client_id,
            quote_id : this.state.quote_id

                }
        axios.put(this.url+'/api/add-census-emp',postData).
        then((response) => {
        
        });
        
        this.props.history.push('/add-census-emp/'+this.state.client_id);
        
        
}


    render() {
        
        const column = [
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
    name: 'Age',
    selector: 'age',
    sortable: true,
    cell: row => <div>{row.age}</div>
  },
  {
    name: 'DOB',
    selector: 'dob',
    sortable: true,
    cell: row => <div>{row.dob}</div>
  },
  {
    
    sortable: true,
    cell: row => <div><Link className="mb-3" to={"/edit-changeCensus/"+row.id}><i className="fas fa-pen"/>Edit</Link>&nbsp;<Link  onClick={() => (Swal.fire({
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
}))}><i className="fas fa-trash-alt"/>Delete</Link></div>

  },
];
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
                                <h4><Link to="/calculate"><i className="fas fa-long-arrow-alt-left"/></Link>Change Census</h4>
                                    
                                    <Link className="btn"  onClick={this.handleAddNewEmp}><img src={userPlus}/> Add New</Link>
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card Previous-Quote">
                                     <h5 className="pl-4 mb-2 ml-3">Change Census</h5>
                                    
                                         <DataTable
                                            columns={column}
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


                        <DashboardFooter />
                    </div>


                </div>
            </div>
        )
    }
}
