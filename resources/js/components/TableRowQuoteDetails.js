import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Link } from 'react-router-dom';

class TableRowQuoteDetails extends Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
        <tr>
          <td>
          {this.props.obj.f_name} {this.props.obj.l_name}
          </td>
          <td>
          {this.props.obj.member_type}
          </td>
          <td>
          {this.props.obj.dob}
          </td>
          <td>
          {this.props.obj.age}
          </td>
        </tr>
    );
  }
}
export default TableRowQuoteDetails;