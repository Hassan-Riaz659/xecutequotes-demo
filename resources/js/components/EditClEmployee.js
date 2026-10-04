import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
//import TableRow from './tablerow2';
import { Link } from 'react-router-dom';

import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
export default class EditClEmployee extends Component {
    constructor (props){
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
        
        //this.onDelete = this.onDelete.bind(this);
    //    this.onViewDetails = this.onViewDetails.bind(this);
       
}

componentDidMount () {
    //console.log("Page loaded",this.props.match.params.id);
        
   let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
      if(AppState.user.credits_left === 0 && AppState.user.subscription_type=='free'){
        this.setState({disabledProp:true,spanErrorStatus:'block'}) ;
      }

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
       .catch(function (error) {
         //console.log(error);
       });
      /* fetch logged in broker employees */
}
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
    else
    {
        console.log('here is comming');
    }
    
    // this.setState({
    //      dob:dob
    //  })
    //   console.log(dob);
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

                this.props.history.push('/client-details/'+this.state.client_id);
                    
                }else{ 
                Swal.fire({
                  icon: 'error',
                  title: 'Employee update failed!',
                  text: 'Something went wrong!',
                })

                 this.props.history.push('/client-details/'+this.state.client_id);
                }
            });
    }

}



//to get all the employees from the database in an array 



 
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
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Update Employee
                        <Link className="btn btn-md btn-primary ml-4" to={"/client-details/"+this.state.client_id}>Back</Link>
                       </h1> 
          
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            {/* Form Basic */}
            <div className="card mb-12 group-information-col">

              <div className="card-body">
                         <form onSubmit={this.onSubmit}>
                        <div className="col-md-12 table-responsive  group-information-col">
                          <div className="user-card user-card2">
                          
                          <div className="table-responsive cencus-table">
                          <table className="table " id="employee_data_table">
                            <thead>
                              <tr>
                                <th>Member Type</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>DOB</th>
                                <th>Age</th>
                              </tr>
                            </thead>
                            <tbody id="add_row">
                           
                                <tr className="no-border">
                                <td>
                                  <select className="form-control" name="member_type" onChange={this.handleMemberType}  id="member_type">
                                    <option value="{this.state.member_type}" disabled={this.state.member_type ? "disabled": ""}>{this.state.member_type}</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Dependent">Dependent</option>
                                  </select>
                                </td>
                                <td><input className="input" type="text" name="f_name" onChange={this.handleFname} autoFocus value={this.state.f_name} className="form-control" required/>
                                </td>
                                
                                <td><input className="input fields" type="text" name="l_name" onChange={this.handleLname} value={this.state.l_name} className="form-control" required/></td>
                                <td>
                                
                                <input className="input" onChange={this.handleDob} type="date" name="dob" id="dob" value={this.state.dob} max="2050-12-31" className="form-control"  />
                                
                                </td>
                                <td><input className="input" type="number" name="age" id="age" value={this.state.age} className="form-control" disabled/>
                                <span style={{display:this.state.errorAge,color:"red"}}>Age invalid</span>
                                </td>
                                
                                
                                {/*
                                {id==0?<td></td>:
                                <td><button type="button" onClick={()=>removeRow(id)}><i className="fa fa-times"></i></button></td>}
                                */}
                              </tr>
                            </tbody>
                            
                          </table>
                        </div>
                             </div>
                  <div className="form-group">
                    <button className="primary-btn" style={{margin:"2rem"}} type="submit" >Update</button>
                  </div>
                  </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
        {/*Row*/}
      </div>
      </div>

      </div>
      </div>
    
        )
    }
}
