import React, { Component } from 'react';
import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class Login2 extends Component {
    constructor(props) {
        super(props);
        
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
 
    componentDidMount() {
        $(".App-header").hide();
    this.handleScroll();
        
    }

    render() {
        return (
            <div ref={this.myRef}>
                <div className="container-fluid auth-container">
                    <div className="row">
                        <div className="col-12 col-md-5 auth-desc">
                            <div className="auth-form">
                                <img className="logo" src={Logo} />

                                <h1>let us help make it <br></br>
                                    easier for you</h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                <div className="auth-info">
                                    <span>not Have an account ?</span>
                                    <h4>sign up</h4>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>Log In</h1>

                                <form action="/action_page.php">
                                    <div className="form-group">
                                        <label htmlFor="email">Email Account</label>
                                        <input type="email" className="form-control" placeholder="Enter email" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pwd">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
                                    </div>
                                    <div className="form-group form-check">
                                        <label className="form-check-label">
                                            <input className="form-check-input" type="checkbox" /> Remember me
                                        </label>
                                    </div>

                                    <button type="submit" className="btn submit-btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        )
    }
}
