import React, { Component } from 'react';
import Navigation from '../navigation/index';
import $ from "jquery";
import "../Style/style.css";

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

// import BannerBackground from "../../components/imgs/bannerbg.png";
// import BannerMac from "../../components/imgs/bannerMac.png";
// import Mac2 from "../../components/imgs/mac2.png";
// import Mac3 from "../../components/imgs/mac3.png";
// import Abouticon from "../../components/imgs/aboutUs-icon.png";
// import Abouticon2 from "../../components/imgs/aboutUs-icon2.png";
// import Abouticon3 from "../../components/imgs/aboutUs-icon3.png";
// import check from "../../components/imgs/check.png";
// import footerLogo from "../../components/imgs/footerLogo.png";
// import SubBannerBackground from "../../components/imgs/SubBannerbg.png";
// import testimonialbg from "../../components/imgs/testimonialbg.png";
// import testimonialImg1 from "../../components/imgs/testimonialImg1.png";
// import testimonialImg2 from "../../components/imgs/testimonialImg2.png";
// import testimonialImg3 from "../../components/imgs/testimonialImg3.png";
// import Ellipse9 from "../../components/imgs/Ellipse9.png";
// import Ellipse11 from "../../components/imgs/Ellipse11.png";
// import Ellipse20 from "../../components/imgs/Ellipse20.png";
// import Ellipse12 from "../../components/imgs/Ellipse12.png";
// import Ellipse8 from "../../components/imgs/Ellipse8.png";
// import Ellipse14 from "../../components/imgs/Ellipse14.png";
// import Ellipse15 from "../../components/imgs/Ellipse15.png";
// import Ellipse18 from "../../components/imgs/Ellipse18.png";
// import Ellipse19 from "../../components/imgs/Ellipse19.png";
// // import Ellipse20 from "../../components/imgs/Ellipse20.png";
// import Group136 from "../../components/imgs/Group136.png";
// import Group137 from "../../components/imgs/Group137.png";
// import Group138 from "../../components/imgs/Group138.png";
// import Group139 from "../../components/imgs/Group139.png";
// import Group36 from "../../components/imgs/Group36.png";

// import phone1 from "../../components/imgs/phone1.png";
// import phone2 from "../../components/imgs/phone2.png";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

        $(".custome-carousel-indicators li:nth-of-type(1)").click(function(){
        
            $(".custome-carousel-indicators-imgs li:nth-of-type(1)").addClass("active");
            $(".custome-carousel-indicators-imgs li:nth-of-type(1)").siblings().removeClass("active");

    })

        $(".custome-carousel-indicators li:nth-of-type(2)").click(function(){
        
            $(".custome-carousel-indicators-imgs li:nth-of-type(2)").addClass("active");
            $(".custome-carousel-indicators-imgs li:nth-of-type(2)").siblings().removeClass("active");

    })

    $(".custome-carousel-indicators li:nth-of-type(3)").click(function(){
        
        $(".custome-carousel-indicators-imgs li:nth-of-type(3)").addClass("active");
        $(".custome-carousel-indicators-imgs li:nth-of-type(3)").siblings().removeClass("active");

})


$(".custome-carousel-indicators-imgs li:nth-of-type(1)").click(function(){

    $(".custome-carousel-indicators-imgs li:nth-of-type(1)").addClass("active");
    $(".custome-carousel-indicators-imgs li:nth-of-type(1)").siblings().removeClass("active");
    $(".custome-carousel-indicators li:nth-of-type(1)").addClass("active");
    $(".custome-carousel-indicators li:nth-of-type(1)").siblings().removeClass("active");

})

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
                                <h1 className="main-title">Generate Health Insurance Group Quotes With Ease</h1>

                                <p>We help health insurance agents optimize the process
                                of generating and analyzing group health insurance quotes. Just Input employee data once!</p>

                                <a href="#" className="btn get-in-touch-btn">Get in touch</a>
                            </div>

                            <div className="col-12 col-md-6 banner-img">
                                <img className="img-fluid" src={BannerMac} />
                                <img className="img-fluid Group36" src={Group36} />
                                
                            </div>
                        </div>
                    </div>

                    <img className="Group139 Ellipse2" src={Group139}/>
                </div>

                <section className="mobileAccess">
                <img className="Ellipse14 Ellipse" src={Ellipse14}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 mobileAccess-img">
                                <img src={Mac2} className="img-fluid" />
                                <img src={phone1} className="img-fluid phone1" />
                            </div>

                            <div className="col-12 col-md-5 mobileAccess-desc">
                                <span className="span-title">introducing</span>

                                <h1 className="main-title">
                                    simple and easy mobile access
                                </h1>

                                <p>Access quotes and reports on the go from the
                                Integrity Insurance mobile app or from your
                                        desktop or laptop in our online portal.</p>

                                <h5>
                                    We Believe that Interior beautifies the Total Architecture
                                </h5>

                                <a href="#" className="btn btn-gradient">Get in touch</a>
                            </div>

                        </div>
                    </div>
                    <img className="Ellipse11 Ellipse" src={Ellipse11}/>
                    <img className="Ellipse15 Ellipse" src={Ellipse15}/>
                </section>


                <section className="aboutUs">
                <img className="Ellipse20 Ellipse" src={Ellipse20}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 aboutUs-col" style={{ backgroundImage: `url(${SubBannerBackground})` }}>


                                <div className="row">
                                    <div className="col-12 col-md-6 aboutus-desc" >
                                        <span className="span-title">about us</span>

                                        <h1 className="main-title">
                                            about us and what we offer
                                </h1>

                                        <p>Xecute is dedicated to simplifying the process of
                                        generating group health insurance quotes. No more
                                        wasting your valuable time manually inputting data
                                        for every single employee with every insurance provider!
                                        Our software optimizes the process of generating and
                                analyzing quotes. </p>

                                    </div>

                                    <div className="col-12 col-md-6 aboutus-img">
                                        <img src={Mac3} className="img-fluid" />
                                        <img src={phone2} className="img-fluid phone2" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>


                <section className="quote-process">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 quote-process-title">
                                <span className="span-title">feature</span>

                                <h1 className="main-title">
                                    Streamline & Simplify The Quote Process
                                </h1>

                            </div>

                            <div className="col-12 col-md-6 quote-process-desc">
                                <p>Generate and compare quotes from every major healthcare
                                insurance provider in New Mexico, by entering employee data
                                just once! This includes quotes from Blue Cross Blue Shield, True
                                Health Mexico, Presbyterian, and more.
                                </p>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-4 quote-process-subcol">
                                <div className="quote-process-subcol-desc">
                                    <span className="aboutUs-icon1"><img src={Abouticon} /></span>
                                    <h5>integrated</h5>
                                    <p>No more manually inputting data for every
                                    insurance provider! Our software is integrated
                                    so you input employee data just once.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4 quote-process-subcol">
                                <div className="quote-process-subcol-desc">
                                    <span className="aboutUs-icon2"><img src={Abouticon2} /></span>
                                    <h5>automated reporting</h5>
                                    <p>Once data is compiled you can view it in an
                                    automated report broken down by insurance
                                    provider and individual employee rates.</p>
                                </div>
                            </div>

                            <div className="col-12 col-md-4 quote-process-subcol">
                                <div className="quote-process-subcol-desc">
                                    <span className="aboutUs-icon3"><img src={Abouticon3} /></span>
                                    <h5>compare quotes</h5>
                                    <p>A clean and easy to read report visualizes data
                                    and quotes so that you can compare insurance
                                    companies side by side.</p>
                                </div>
                            </div>
                        </div>


                    </div>

                </section>


                <section className="pricing-section">

                <img className="Group137 Ellipse2" src={Group137}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-10 text-center mx-auto pricing-col">
                                <span className="span-title">pricing</span>

                                <h1 className="main-title">
                                    Suitable Payment Options </h1>

                                <p>We have two packages to choose from: Our Starter Package is an excellent way to test our intuitive
                                software for yourself. Once you experience how fast, easy, and efficient our software is you
                                can access unlimited health insurance quotes</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-10 text-center mx-auto pricing-table">
                                <div className="row">
                                    <div className="col-12 col-md-6 pricing-table-col">

                                        <div className="pricing-table-col-desc text-left">
                                            <h1>$2500<small>/month</small></h1>
                                            <h4>one year subscription</h4>
                                            <h5>Unlimited Quotes ( $500 for each additional license )</h5>

                                            <ul>
                                                <li><img src={check} />Unlimited Quotes</li>
                                                <li><img src={check} />Secure Online Transfer Indeed</li>
                                                <li><img src={check} />Unlimited Styles for interface</li>
                                                <li><img src={check} />Reliable Customer Service</li>
                                                <li><img src={check} />Manual Backup Provided</li>
                                            </ul>

                                            <a href="#" className="btn enroll-btn">Enroll</a>
                                        </div>

                                    </div>

                                    <div className="col-12 col-md-6 pricing-table-col">

                                        <div className="pricing-table-col-desc text-left">
                                            <h1>$25<small>/quote</small></h1>
                                            <h4>per quote</h4>
                                            <h5>per quote</h5>

                                            <ul>
                                                <li><img src={check} />Unlimited Quotes</li>
                                                <li><img src={check} />Secure Online Transfer Indeed</li>
                                                <li><img src={check} />Unlimited Styles for interface</li>
                                                <li><img src={check} />Reliable Customer Service</li>
                                                <li><img src={check} />Manual Backup Provided</li>
                                            </ul>

                                            <a href="#" className="btn enroll-btn">Enroll</a>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>


                <section className="testimonial-section" style={{ backgroundImage: `url(${testimonialbg})` }}>
                <img className="Ellipse18 Ellipse" src={Ellipse18}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 testimonial-carousel">
                                <div id="demo" className="carousel slide" data-ride="carousel">

                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <div className="col-12 col-md-9 mx-auto carousel-item-desc">
                                                <p>
                                                    <span>“</span>
                                                 We had an incredible experience working with Excute and were impressed they made such a big difference in only three weeks.
                                                Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly.
                                                 </p>
                                            </div>


                                        </div>
                                        <div className="carousel-item">
                                            <div className="col-12 col-md-9 mx-auto carousel-item-desc">
                                                <p>
                                                    <span>“</span>
                                                 We had an incredible experience working with Excute and were impressed they made such a big difference in only three weeks.
                                                Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly.
                                                 </p>
                                            </div>

                                        </div>
                                        <div className="carousel-item">
                                            <div className="col-12 col-md-9 mx-auto carousel-item-desc">
                                                <p>
                                                    <span>“</span>
                                                 We had an incredible experience working with Excute and were impressed they made such a big difference in only three weeks.
                                                Our team is so grateful for the wonderful improvements they made and their ability to get familiar with the product concept so quickly.
                                                 </p>
                                            </div>

                                        </div>
                                    </div>

                                    <ul className="carousel-indicators custome-carousel-indicators">
                                        <li data-target="#demo" data-slide-to={0} className="active" />
                                        <li data-target="#demo" data-slide-to={1} />
                                        <li data-target="#demo" data-slide-to={2} />
                                    </ul>

                                    <ul className="carousel-indicators custome-carousel-indicators-imgs">
                                        <li data-target="#demo" data-slide-to={0} className="active">
                                            <div className="nav-desc">
                                            <img src={testimonialImg1} />
                                            <div className="nav-title">
                                                <span>Jane Cooper</span>
                                                <span>CEO, ABC Corporation</span>
                                            </div>
                                            </div>

                                        </li>

                                        <li data-target="#demo" data-slide-to={1}>
                                        <div className="nav-desc">
                                            <img src={testimonialImg2} />
                                            <div className="nav-title">
                                                <span>Jane Cooper</span>
                                                <span>CEO, ABC Corporation</span>
                                            </div>
                                            </div>
                                            
                                        </li>
                                        <li data-target="#demo" data-slide-to={2}>

                                        <div className="nav-desc">
                                            <img src={testimonialImg3} />
                                            <div className="nav-title">
                                                <span>Jane Cooper</span>
                                                <span>CEO, ABC Corporation</span>
                                            </div>
                                            </div>

                                        </li>
                                    </ul>

                                    

                                </div>

                            </div>
                        </div>
                    </div>

                    <img className="Ellipse19 Ellipse" src={Ellipse19}/>
                </section>


                <section className="Contact-us-section">

                <img className="Group138 Ellipse" src={Group138}/>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 contact-us-col text-center" style={{ backgroundImage: `url(${SubBannerBackground})` }}>
                                <div className="row">
                                    <div className="col-12 col-md-6 mx-auto">
                                        <span className="span-title">contact us</span>

                                        <h1 className="main-title">
                                            get in touch </h1>

                                        <p>get info and updates and get closer to us</p>


                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="" />
                                            <div className="input-group-append">
                                                <button className="btn send-btn" type="submit">Send</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </section>



                <section className="footer-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 footer-logo-col">
                                <img className="img-fluid" src={footerLogo} />.
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
                                    <li><a href="#">Portfolio</a></li>
                                    <li><a href="#">About</a></li>
                                    <li><a href="#">Feature</a></li>
                                    <li><a href="#">Pricing</a></li>
                                    <li><a href="#">Contact Us</a></li>
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
                                <p>© 2020 Xecute. All rights reserved</p>
                            </div>

                            <div className="col-12 col-md-7 col-lg-6 terms-condition">
                                <ul className="list-inline">
                                    <li className="list-inline-item"><a href="#">Terms & Conditions</a></li>
                                    <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                    <li className="list-inline-item"><a href="#">Sitemap</a></li>
                                    <li className="list-inline-item"><a href="#" data-toggle="modal" data-target="#disclaimerModal">Disclaimer</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </section>


            </div>
        )
    }
}
