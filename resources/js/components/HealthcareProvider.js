import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
import { Link } from 'react-router-dom';


export default class HealthcareProvider extends Component {
    constructor (props){
        super(props);

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
          <h1 className="h3 mb-0 text-gray-800">Healthcare providers</h1>
          <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>

            <li className="breadcrumb-item active" aria-current="page">Healthcare Providers</li>
          </ol>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            {/* Form Basic */}
            <div className="card mb-12">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Healthcare Providers</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Sr. No</th>
                          <th>Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>TrueHealth</td>
                          <td><Link to="/manage-plans" className="btn btn-success">Manage Plans</Link></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Presbyterian</td>
                          <td><Link to="/manage-plans" className="btn btn-success">Manage Plans</Link></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
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
