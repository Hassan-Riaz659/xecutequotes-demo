import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Ripples from 'react-ripples';

import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class Test extends Component {
    constructor(props) {
        super(props);
        
        this.state={
        
        }
        
    this.url = window.location.origin;
    
    this.handleClickBtn = this.handleClickBtn.bind(this);
    }
    
    componentDidMount() {
        $(".App-header").hide();
    }
    
    handleClickBtn(e){
        axios.get(this.url + 'api/test')
       .then(response => {
         console.log('response',response);
       })
       .catch(function (error) {
         console.log(error);
       });
    }


    render() {
        return (
            <div>
                <div className="container-fluid auth-container">
                    <div className="row">
                      <button className="btn btn-primary" onClick={this.handleClickBtn}>Test</button>
                    </div>
                </div>

            </div>
        )
    }
}