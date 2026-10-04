import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from '../Sidebar';
import DashboardHeader from '../dashboardHeader/DashboardHeader';
import DashboardFooter from '../dashboardFooter/DashboardFooter';
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



export default class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: '',
            userid:'',
            //addEmpStatus:'none',
            spanErrorStatus:'none',
            isLoggedIn:false
            
        };
        this.url = window.location.origin;
        this.onDelete = this.onDelete.bind(this);
        this.handleAddAgent = this.handleAddAgent.bind(this);
    //    this.onViewDetails = this.onViewDetails.bind(this);
    
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
 
    componentWillMount() {

       let state = localStorage["appState"];
        
        
    if (state) {
        let AppState = JSON.parse(state);
        console.log('user',AppState);
          if(AppState.user.role_id == 3)
          {
           
            this.props.history.push('/');   
          }
    }
}

    componentDidMount() {
        this.handleScroll();
        
        
        $(document).ready(function () {
            $(".App-header").hide();
        })
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
      if(AppState.user.credits_left === 0 && AppState.user.subscription_type=='free'){
        this.setState({disabledProp:true,spanErrorStatus:'block'}) ;
      }
      
    //   console.log(this.url + 'api/show-employees/'+AppState.user.id);
    //   console.log("abcccc");
      /* fetch logged in broker employees */
      axios.get(this.url + '/api/employees/'+AppState.user.id)
       .then(response => {
         
         this.setState({employees: response.data.data});
         
       })
       .catch(function (error) {
         //console.log(error);
       });
       
    }
       // let tableColumns = columns;
        
        //  this.setState ({
        //     columns: tableColumns
        // });
        
        // console.log(this.state.columns, " faiq");
        // console.log(tableColumns, " faiq2");
       
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
      
    const employees = this.state.employees.filter(item => item.id !== id);
    axios.delete(this.url+'/api/delete-employees/'+id)
    .then(res => {
        //console.log('kkk', res);
        if(res.data.flag=='success')
        {
            Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Agent deleted successfully!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.props.history.push('/agents')
                this.setState({ employees: employees });
        }
        })
  };
  
  
  

  
  handleAddAgent(e)
  {
      console.log('add button clicked');
      axios.get(this.url+'/api/check-license/'+this.state.userid)
      .then(response =>{
          console.log('Data',response.data.flag);
        if(response.data.flag == 1)
        {
            //to={"/add-broker-employee"}
            this.props.history.push('/add-agent');
        }
        else{
            
            Swal.fire({
            icon: 'error',
            title: "You're out of licenses!",
            text: ' Please upgrade your billing to add an agent!',
            })
            
        }
          
      })
        
  }


    render() {
        
        const column = [
  {
    name: 'Name',
    selector: 'first_name',
    sortable: true,
     cell: row => <div>{row.first_name} {row.last_name}</div>
   
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    cell: row => <div>{row.email}</div>
  },
  {
    name: 'Phone Number',
    selector: 'Phone_Number',
    sortable: true,
    cell: row => <div>{row.phone_no}</div>
  },
  {
    
    sortable: true,
    cell: row => <div><Link to={"/edit-agent/"+row.id}><i className="fas fa-pen"/>Edit</Link>&nbsp;<Link  onClick={() => (Swal.fire({
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
            <div ref={this.myRef}>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-title mb-4">
                                <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link>Agents</h4>
                                  
                                    <Link className="btn"  onClick={this.handleAddAgent}><img src={userPlus}/> Add Agent</Link>
                                    
                                </div>

                                <div className="col-lg-12 add-employee-col">
                                    <div className="user-card Previous-Quote agentsCol">
                                        <div className="displayHeadingSearchBar">
                                            <h5 className="pl-4 mb-2 ml-3">Agents</h5>
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
