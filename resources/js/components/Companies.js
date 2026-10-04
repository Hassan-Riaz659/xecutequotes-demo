import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
import { Link } from 'react-router-dom';

export default class Companies extends Component {
    constructor (props){
        super(props);
         this.url = window.location.origin;
         this.state={
             companyName:'',
             email:'',
             phone_no:'',
             value:'',
            isEnable:false,
         }
         this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
         this.addCompany = this.addCompany.bind(this);
}


addCompany(e)
{
    e.preventDefault();
    const company = {
      name: this.state.companyName,
      email: this.state.email,
      phone: this.state.phone_no
    }
    
      let uri = this.url + 'api/add-employee';
            axios.post(uri, company).then((response) => {
                alert("Company added successfully!");
                 this.props.history.push('/companies');
              
            });

}

handleChange2(e){
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({value: e.target.value})
    }
     this.setState({
      phone_no: e.target.value
    })
}

handleChange1(e){
   
     this.setState({
      companyName: e.target.value
    })
}
handleChange3(e){
   
     this.setState({
      email: e.target.value
    })
}


    render() {
        return (
            <div>

            <div id="wrapper">

                <Sidebar/>

                <div className="d-flex flex-column" id="container-wrapper" style={{width: "100%"}}>

                <HeaderBar/>

                <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Add Company</h1>
          <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>

            <li className="breadcrumb-item active" aria-current="page">Add Company</li>
          </ol>
        </div>
        
        
        <div className="row mb-3">
          <div className="col-lg-12">
            {/* Form Basic */}
            <div className="card mb-12">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Add Company</h6>
              </div>
              <div className="card-body">
                <form onSubmit={this.addCompany}>
                  <input type="hidden" name="_token" defaultValue="ZdqiFhMns0Yr5cLe2zeoa3LaLlshHAHqcEe3PJQe" />     
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" className="form-control" name="name" placeholder="Enter Company Name" onChange={this.handleChange1} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email</label>
                    <input type="email" className="form-control" name="email" placeholder="Enter Company Email" onChange={this.handleChange3} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Phone Number</label>
                    <input type="text" className="form-control" name="phone" placeholder="Enter Company Phone" value={this.state.value} onChange={this.handleChange2} required/>
                  </div>
                  <div className="form-group">
                    <input type="submit" className="btn btn-primary pull-right" defaultValue="Submit"  />
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
