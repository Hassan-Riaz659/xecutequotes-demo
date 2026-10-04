import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
import { Link } from 'react-router-dom';


export default class ManagePlans extends Component {
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
          <h1 className="h3 mb-0 text-gray-800">Manage Plans</h1>
          <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>

            <li className="breadcrumb-item active" aria-current="page">Manage Plans</li>
          </ol>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12">
            <div className="card mb-12">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Company Info</h6>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <img src="https://integrityinsurance.dev505.io/public/theme/img/1.png" />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="name" style={{fontWeight: 'bold'}}>Name</label>
                        <p>TrueHealth</p>
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="total_plans" style={{fontWeight: 'bold'}}>Total Plans</label>
                        <p>0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-12 mt-3">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Plans</h6>
                {/*<div><a class="pull-right btn btn-primary"  href="https://integrityinsurance.dev505.io/public/add-plan?id=1">Add Plan</a></div>*/}
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12 table-responsive">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Monthly Premium</th>
                          <th>Deductibles</th>
                          <th>Type</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
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
