import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;
var trendingUp = baseUrl+"/public/landingImages/trending-up.png";
var calendar = baseUrl+'/public/landingImages/calendar.png';
var Group1 = baseUrl+'/public/landingImages/Group1.png';
var Group3 = baseUrl+'/public/landingImages/Group3.png';
var Group4 = baseUrl+'/public/landingImages/Group4.png';


export default class EditChangeCensus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: '',
            userid:'',
            date:'',
            empId:'',
            //addEmpStatus:'none',
            spanErrorStatus:'none',
            isLoggedIn:false,
            member_type:'',
            f_name:'',
            l_name:'',
            dob:'',
            age:'',
            client_id:'',
            errorAge:'none'
            
        };
        
        this.url = window.location.origin;
        this.handleMemberType = this.handleMemberType.bind(this);
        this.handleFname = this.handleFname.bind(this);
        this.handleLname = this.handleLname.bind(this);
        this.handleDob = this.handleDob.bind(this);
        
        this.handleValidation = this.handleValidation.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        
        axios.get(this.url + '/api/edit-clientemployee/'+this.props.match.params.id).then(response => {
         this.setState({empId : response.data.employee.id,
             member_type: response.data.employee.member_type,
             f_name:response.data.employee.f_name,
             l_name: response.data.employee.l_name,
             dob: response.data.employee.dob,
             age: response.data.employee.age,
            client_id:response.data.employee.client_id,
            date:response.data.date
         });
         
       })
    }
    
    handleMemberType(e){
   
     this.setState({
      member_type: e.target.value
    })
}

    handleFname(e)
{
    this.setState({
        f_name : e.target.value
    })
}

    handleLname(e)
{
    this.setState({
      l_name : e.target.value  
    })
}

    handleDob(e)
{
    let dob = e.target.value;
    console.log("abcfeddddd");
     if(dob!='')
     {
      var dobb = new Date(dob);
        //console.log('dob',dobb.getYear());
        if(dobb.getYear()>1000){
            var new_val = dob.slice(0, -1);
            
            this.setState({
              dob :new_val  
            })
            console.log("new val",new_val)
        }
        else
        {
            var today = new Date(this.state.date);
            
            
            var age = Math.floor((today-dobb) / (365.25 * 24 * 60 * 60 * 1000));
            console.log('age',age);
             this.setState({
              age :age,
              dob:dob
            })
            if(age > 0 || age < 109)
            {
                this.setState({
                    errorAge:'none'
                })
            }
            else
            {
                this.setState({
                    errorAge:'block'
                })
            }

            
        }
    
    }
}
    handleValidation(e){
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.f_name){
        formIsValid = false;
        errors['f_name'] = 'Cannot be empty';
    }
    
    
    if(!this.state.l_name){
        formIsValid = false;
        errors['l_name'] = 'Cannot be empty';
    }
    
    if(this.state.age > 109 || this.state.age <= 0){
        console.log("here in age minus");
        formIsValid = false;
        errors['age'] = 'Age invalid';
        this.setState({
            errorAge:'block'
        });
    }
    else
    {
        formIsValid = true;
        
        this.setState({
            errorAge:'none'
        });
    }
    
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }
    
    onSubmit(e){
    e.preventDefault();

    const employee = {
      empId:this.state.empId,
      member_type:this.state.member_type,
      fName: this.state.f_name,
      lName: this.state.l_name,
      dob: this.state.dob,
      age: this.state.age,
    
        
    }
    if(this.handleValidation()){
       //console.log("iddddd", this.props.match.params.id);
       let uri = this.url + '/api/update-client-employee';
            axios.post(uri, employee).then((response) => {
                if(response.data.flag=='1')
                {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Employee updated successfully',
                  showConfirmButton: false,
                  timer: 1500
                })

                this.props.history.push('/changeCensus/');
                    
                }else{ 
                Swal.fire({
                  icon: 'error',
                  title: 'Employee update failed!',
                  text: 'Something went wrong!',
                })

                 this.props.history.push('/changeCensus/');
                }
            });
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

                                <div className="col-12 title-col mb-4">
                                    <h4><Link to={"/changeCensus/"}><i className="fas fa-long-arrow-alt-left"/></Link> Update Employee</h4>
                                </div>

                                <div className="col-lg-12 group-information-col">
                                <form onSubmit={this.onSubmit}>
                                    <div className="user-card user-card2">
                                    <h5 className="mb-4">Update Employee</h5>
                                        <div className="table-responsive cencus-table">
                                                <table className="table ">
                                                  <thead>
                                                    <tr>
                                                      <th>Member Type</th>
                                                      <th>Firstname</th>
                                                      <th>Lastname</th>
                                                      <th>DOB</th>
                                                      <th>Age</th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr>
                                                    <td>
                                                      <select class="form-control" name="member_type" onChange={this.handleMemberType}  id="member_type">
                                                      
                                          <option value="{this.state.member_type}" disabled={this.state.member_type ? "disabled": ""}>{this.state.member_type}</option>
                                          
                                        <option value="Employee">Employee</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Dependent">Dependent</option>
                                    
                                                    </select>
                                                      
                                                      </td>
                                                      <td>
                                                      <input type="text" className="form-control" name="f_name" onChange={this.handleFname} autoFocus value={this.state.f_name} required/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="text" className="form-control" name="l_name" onChange={this.handleLname} value={this.state.l_name} required/>
                                                      </td>
                                                      
                                                      <td>
                                                      <input type="date" className="form-control" onChange={this.handleDob} type="date" name="dob" id="dob" value={this.state.dob} max="2050-12-31"/>
                                                      </td>
                                                      <td>
                                                      <input type="number" className="form-control" name="age" id="age" value={this.state.age} className="form-control" disabled/>
                                         <span style={{display:this.state.errorAge,color:"red"}}>Age invalid</span>             
                                                      
                                                      </td>
                                                    </tr>
                                                    
                                                  </tbody>
                                                </table>
                                                
                                                
                                              </div>
                                              
                                              <div className="calculate-btn-col add-employee-title">
                                              
                                              <button className="btn Calculate-btn" type="submit" >Update</button>
                                              </div>

                                    </div>
</form>
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
