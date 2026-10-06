import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";


var baseUrl = window.location.origin;
var companyLogo = baseUrl + "/public/landingImages/companyLogo.png";


export default class DashboardFooter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,

        }

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }


    handleClose() {
        this.setState({
            Show: false,
        })
    }

    handleShow() {
        this.setState({
            Show: true,
        })
    }



    render() {
        return (
            <div style={{ position: "relative" }}>


                <section className="footer-section footer-section2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-6 footer-logo-col"><Link to={'/'}><img className="img-fluid" src={window.location.origin + '/public/landingImages/footerLogo.png'} /></Link>
                                <p>Help health insurance agents optimize the process of generating and analyzing group health insurance quotes.</p>
                                {/*<ul className="list-inline">
                    <li className="list-inline-item"><a href="#"><i className="fab fa-instagram" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fas fa-globe" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fab fa-twitter" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="fab fa-youtube" /></a></li>
                </ul>*/}
                            </div>
                            <div className="col-5 col-md-3 footer-pages-col">
                                <h5>Pages</h5>
                                <ul>
                                    <li><a href="/about">About</a></li>
                                    <li><a href="/pricing">Pricing</a></li>
                                    <li><a href="/contact-us">Contact</a></li>

                                    {/*<li><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
        Open modal
      </button></li>*/}






                                </ul>
                            </div>
                            <div className="col-7 col-md-3 reachUs-col">
                                <h5>Reach us</h5>
                                <ul>
                                    <li><i className="fas fa-envelope" />contact@example.com</li>
                                    <li><i className="fas fa-mobile-alt" />+1 (555) 000-0000</li>
                                    <li><i className="fas fa-map-marker-alt" />Demo Business Address</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="footer-bar footer-bar2">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-6 copy-right">
                                <p>© 2026 Xecute Quotes Demo</p>
                            </div>
                            <div className="col-12 col-md-7 col-lg-6 terms-condition">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a>Terms &amp; Conditions</a></li>
                                    <li className="list-inline-item"><a>Privacy Policy</a></li>
                                    <li className="list-inline-item"><a>Sitemap</a></li>
                                    <li className="list-inline-item"><a href="#" data-toggle="modal" data-target="#disclaimerModal" >Disclaimer</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>





            </div>
        )
    }
}
