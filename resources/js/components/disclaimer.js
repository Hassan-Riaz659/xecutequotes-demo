import React, { Component } from 'react';
import Navigation from './navigation/index';
import { Link, withRouter } from 'react-router-dom';
import $ from "jquery";
import "./Style/style.css";

var baseUrl = window.location.origin;
var BannerBackground = baseUrl+'/public/landingImages/bannerbg.png';
var BannerMac = baseUrl+'/public/landingImages/bannerMac.png';
var Mac2 = baseUrl+'/public/landingImages/mac2.png';
var Mac3 = baseUrl+'/public/landingImages/mac3.png';
var Abouticon = baseUrl+'/public/landingImages/aboutUs-icon.png';
var Abouticon2 = baseUrl+'/public/landingImages/aboutUs-icon2.png';
var Abouticon3 = baseUrl+'/public/landingImages/aboutUs-icon3.png';
var check = baseUrl+'/public/landingImages/check.png';
var footerLogo = baseUrl+'/public/landingImages/footerLogo.png';
var SubBannerBackground = baseUrl+'/public/landingImages/SubBannerbg.png';
var testimonialbg = baseUrl+'/public/landingImages/testimonialbg.png';
var testimonialImg1 = baseUrl+'/public/landingImages/testimonialImg1.png';
var testimonialImg2 = baseUrl+'/public/landingImages/testimonialImg2.png';
var testimonialImg3 = baseUrl+'/public/landingImages/testimonialImg3.png';
var Ellipse9 = baseUrl+'/public/landingImages/Ellipse9.png';
var Ellipse11 = baseUrl+'/public/landingImages/Ellipse11.png';
var Ellipse20 = baseUrl+'/public/landingImages/Ellipse20.png';
var Ellipse12 = baseUrl+'/public/landingImages/Ellipse12.png';
var Ellipse8 = baseUrl+'/public/landingImages/Ellipse8.png';
var Ellipse14 = baseUrl+'/public/landingImages/Ellipse14.png';
var Ellipse15 = baseUrl+'/public/landingImages/Ellipse15.png';
var Ellipse18 = baseUrl+'/public/landingImages/Ellipse18.png';
var Ellipse19 = baseUrl+'/public/landingImages/Ellipse19.png';
var Group136 = baseUrl+'/public/landingImages/Group136.png';
var Group137 = baseUrl+'/public/landingImages/Group137.png';
var Group138 = baseUrl+'/public/landingImages/Group138.png';
var Group139 = baseUrl+'/public/landingImages/Group139.png';
var Group36 = baseUrl+'/public/landingImages/Group36.png';
var phone1 = baseUrl+'/public/landingImages/phone1.png';
var phone2 = baseUrl+'/public/landingImages/phone2.png';

export default class disclaimer extends Component {
    constructor(props) {
        super(props);
        
        
        this.url = window.location.origin;
    }

    componentDidMount() {
        
        function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

        

    

$(".custome-carousel-indicators-imgs li:nth-of-type(2)").click(function(){

    $(".custome-carousel-indicators-imgs li:nth-of-type(2)").addClass("active");
    $(".custome-carousel-indicators-imgs li:nth-of-type(2)").siblings().removeClass("active");
    $(".custome-carousel-indicators li:nth-of-type(2)").addClass("active");
    $(".custome-carousel-indicators li:nth-of-type(2)").siblings().removeClass("active");

})

$(".custome-carousel-indicators-imgs li:nth-of-type(3)").click(function(){

    $(".custome-carousel-indicators-imgs li:nth-of-type(3)").addClass("active");
    $(".custome-carousel-indicators-imgs li:nth-of-type(3)").siblings().removeClass("active");
    $(".custome-carousel-indicators li:nth-of-type(3)").addClass("active");
    $(".custome-carousel-indicators li:nth-of-type(3)").siblings().removeClass("active");

})

}


    
    
    
    
    


    render() {
        return (
            <div>
            <Navigation/>

                <div className="banner-bg" style={{ backgroundImage: `url(${BannerBackground})` }}>
                    <img className="Ellipse9" src={Ellipse9}/>
                    <img className="Ellipse Ellipse12" src={Ellipse12}/>
                    <img className="Group136 Ellipse2" src={Group136}/>
                    <img className="Ellipse8 Ellipse" src={Ellipse8}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 banner-desc">
                                <h1 className="main-title">About Us And What We Offer</h1>

                                <p>Xecute is dedicated to simplifying the process of generating group health insurance quotes. No more wasting your valuable time manually inputting data for every single employee with every insurance provider!

Our software optimizes the process of generating and analyzing quotes. Type essential data such as the employee’s family members, ages, and zip code just once, and our integrated software rapidly generates quotes from all major health insurance companies in New Mexico. This includes Blue Cross Blue Shield, True Health Mexico, and Presbyterian.

All quotes are automatically compiled in a visually appealing and user-friendly report so that you and your client can compare quotes—overall and by individual employees. 

It’s a time-saving solution that provides easy and fast health insurance quotes for small businesses.</p>

                                
                            </div>

                            <div className="col-12 col-md-6 banner-img">
                                <img src={Mac3} className="img-fluid" />
                                        <img src={phone2} className="img-fluid phone2" style={{top:'-22px'}} />
                                
                            </div>
                        </div>
                    </div>

                    <img className="Group139 Ellipse2" src={Group139}/>
                </div>


                <section className="footer-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 footer-logo-col">
                                <img className="img-fluid" src={footerLogo} />
                            <p>Help health insurance agents optimize the process of generating and analyzing group health insurance quotes.</p>
                                <ul className="list-inline">

                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className="fab fa-instagram" />
                                        </a>
                                    </li>

                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className="fas fa-globe" />
                                        </a>
                                    </li>

                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className="fab fa-twitter" />
                                        </a>
                                    </li>

                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className="fab fa-youtube" />
                                        </a>
                                    </li>

                                </ul>
                            </div>

                            <div className="col-5 col-md-3 footer-pages-col">
                                <h5>Pages</h5>

                                <ul>
                                    <li><Link to="/about">About</Link></li>
                                    <li><Link to="/pricing">Pricing</Link></li>
                                    <li><Link to="/contact-us">Contact</Link></li>
                                </ul>
                            </div>

                            <div className="col-7 col-md-3 reachUs-col">
                                <h5>Reach us</h5>

                                 <ul>
                                    <li><i className="fas fa-envelope" />patrick@xecutequotes.com</li>
                                    <li><i className="fas fa-mobile-alt" />505-235-9021</li>
                                    <li><i className="fas fa-map-marker-alt" />9577 Osuna Rd NE Suite E
Albuquerque, NM 87111</li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </section>

                <section className="footer-bar">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-5 col-lg-6 copy-right">
                                <p>© 2021 Xecute. All rights reserved</p>
                            </div>

                            <div className="col-12 col-md-7 col-lg-6 terms-condition">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="#">Terms & Conditions</a></li>
                                    <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                    <li className="list-inline-item"><a href="#">Sitemap</a></li>
                                    <li className="list-inline-item"><a href="#">Disclaimer</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </section>


            </div>
        )
    }
}
