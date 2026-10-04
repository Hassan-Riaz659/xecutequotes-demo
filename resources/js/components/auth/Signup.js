import React, { Component } from 'react';
import $ from "jquery";

var baseUrl = window.location.origin;
var Logo = baseUrl+'/public/landingImages/logo.png';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstStep: 'block',
            secondStep: 'none',
        }
        this.nextBtn = this.nextBtn.bind(this);
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

    nextBtn(){
        this.setState({
            firstStep: 'none',
            secondStep: 'block',
        })
    }


    render() {
        return (
            <div ref={this.myRef}>
                <div className="container-fluid auth-container">
                    <div className="row">
                        <div className="col-12 col-md-5 auth-desc">
                            <div className="auth-form">
                                <img className="logo" src={Logo} />

                                <h1>Simply your insurance </h1>

                                <p>Xecute is dedicated to simplifying the process
                                of generating group health insurance quotes. No
                                more wasting your valuable time manually
                                inputting data for every single employee with
                                every insurance provider!</p>

                                <div className="auth-info">
                                    <span>Simply your insurance </span>
                                    <h4>Log In</h4>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 col-md-7 auth-desc2">
                            <div className="auth-form2">
                                <h1>sign up</h1>

                                <form style={{display: this.state.firstStep}}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Account</label>
                                        <input type="email" className="form-control" placeholder="Enter email" id="email" />
                                    </div>
                                    <div className="form-group form-group2">
                                        <label htmlFor="pwd">Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="pwd">Confirm Password</label>
                                        <input type="password" className="form-control" placeholder="Enter password" id="pwd" />
                                    </div>

                                    

                                    <button type="button" onClick={()=> this.nextBtn()} className="btn submit-btn btn-primary">Next</button>
                                </form>

                                <form style={{display: this.state.secondStep}}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Account</label>
                                        <input type="email" className="form-control" placeholder="Enter email" id="email" />
                                    </div>

                                    <div className="form-group form-group2">
                                        <div className="row">
                                            <div className="col-12 col-md-6 yourName-col">
                                            <label htmlFor="">Your Name</label>
                                            <input type="text" className="form-control" placeholder=""  />
                                            </div>

                                            <div className="col-12 col-md-6 companyName-col">
                                            <label htmlFor="">Company Phone Number</label>
                                        <input type="text" className="form-control" placeholder=""  />
                                            </div>
                                        </div>
                                       
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="">Company URL</label>
                                        <input type="text" className="form-control" placeholder="" />
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
