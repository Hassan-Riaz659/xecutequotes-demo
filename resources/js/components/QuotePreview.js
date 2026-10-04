import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
import TableRowQuoteDetails from './TableRowQuoteDetails';
import { Link } from 'react-router-dom';

export default class QuotePreview extends Component {
    constructor (props){
        super(props);
        this.state = {
            ABC:'Hello',
            name:'',
            quote:'',
            employees : '',
            clientId:''
            
        };
        this.url = window.location.origin;
        //data'=>$clients,'data2'=>$employees,'data3'=>$clientSize,
}


componentDidMount()
{
    //console.log("id",this.props.match.params.id);
    axios.get(this.url +'/api/quote-preview/'+this.props.match.params.id)
    .then(response =>{
            console.log('quote',response.data.quote,'emp',response.data.employees,'client',response.data.client.name);
            this.setState({
                name:response.data.client.name,quote:response.data.quote,employees:response.data.employees,clientId:response.data.client.id
                })
    })
    .catch(function(error){
        console.log(error);
    })
}



tableRow(){
    console.log('employees',this.state.employees)
    if(this.state.employees instanceof Array){
        return this.state.employees.map(function(object,i){
            return <TableRowQuoteDetails obj={object} key={i} index={i}/>;
        }.bind(this))
        
    }
    
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
        
        
        <h1 className="h3 mb-0 text-gray-800">Quote Details <Link className="btn btn-md btn-primary ml-4"  to={"/client-details/"+this.state.clientId}>Back</Link> </h1>         
          
          <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/dashboard">Home</Link></li>

            <li className="breadcrumb-item active" aria-current="page">{this.state.name}</li>
          </ol>
        </div>
        
        
        
    <div className="row mb-3">
          
          <div className="col-lg-12">
            {/* Form Basic */}
            <div className="card mb-12">
             <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                </div>
                <div className="card-body">
                      
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <label className="mr-4">Client Name :</label>{this.state.name}</li>
                                <li className="list-group-item"><label className="mr-4">Zip Code       :</label>{this.state.quote.zip}</li>
                                <li className="list-group-item"><label className="mr-4">Effective Date :</label>{this.state.quote.effective_date}</li>
                                <li className="list-group-item"><label className="mr-4">Plan Assigned :</label>{this.state.quote.plan_assign || '-' } </li>            
                        </ul>

                      
                    </div>
                </div>
               
           
            
            <div className="card mb-12">
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold text-primary">Employees</h6>
               
              </div>
              <div className="card-body">
                <div className="row">
                         <div className="col-md-12 table-responsive">
                    <table className="table table-bordered" id="datatable">
                      <thead className=" text-primary">
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
        {/*Row*/}
      </div>

      </div>
      </div>
        )
    }
}
