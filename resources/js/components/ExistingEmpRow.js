import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

class ExistingEmpRow extends Component {
  constructor(props) {
      super(props);
              this.state = {
                dob:'',
                age:'',
                date:''
              };
       this.handleDob = this.handleDob.bind(this);
  }

componentDidMount () {
    console.log('check date',this.props.date);
    this.setState({
        dob : this.props.obj.dob,
        age : this.props.obj.age,
        date: this.props.date
    })
}

handleDob(e)
{

    let dob = e.target.value;
    console.log("dob",dob);
     
     this.setState({
         dob:dob
     })
      console.log(dob);
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
            console.log('dob check date',today);
            var age = Math.floor((today-dobb) / (365.25 * 24 * 60 * 60 * 1000));
            console.log('age',age);
             this.setState({
              age :age  
            })

            
        }
    
    }
}

  render() {
    return (
        <tr className="no-border" data-row-id={this.props.obj.id}>
                                <td>
                                  <select className="form-control" name="member_type"  id={`member_type${this.props.obj.id}`}>
                                    <option value="{this.props.obj.member_type}">{this.props.obj.member_type}</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Dependent">Dependent</option>
                                  </select>
                                </td>
                                <td><input className="input" type="text" name="f_name" value={this.props.obj.f_name} autoFocus className="form-control" id={`f_name${this.props.obj.id}`}/></td>
                                <td><input className="input fields" type="text" name="l_name" value={this.props.obj.l_name} className="form-control" id={`l_name${this.props.obj.id}`}/></td>
                                <td>
                                
                     <input className="input" onChange={this.handleDob} type="date" name="dob" id="dob" value={this.state.dob} max="2050-12-31" className="form-control"  />
                                                        
                                </td>
                                <td><input className="input" type="number" name="age" value={this.state.age} className="form-control" disabled id={`age${this.props.obj.id}`}/></td>
                                
                                
                                {/*
                                {id==0?<td></td>:
                                <td><button type="button" onClick={()=>removeRow(id)}><i className="fa fa-times"></i></button></td>}
                                */}
                              </tr>
    );
  }
}
export default ExistingEmpRow;