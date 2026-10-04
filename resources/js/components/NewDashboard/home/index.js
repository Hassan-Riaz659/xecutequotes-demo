import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import { Link } from 'react-router-dom';



// import bannercolimg from "../../components/imgs/banner-col-img.png";
// import installmentimg1 from "../../components/imgs/installmentimg1.png";
// import installmentimg2 from "../../components/imgs/installmentimg2.png";
// import installmentimg3 from "../../components/imgs/installmentimg3.png";
// import circle1 from "../../components/imgs/circle1.png";
// import circle2 from "../../components/imgs/circle2.png";
// import circle3 from "../../components/imgs/circle3.png";
// import teamimg1 from "../../components/imgs/team-mg1.png";
// import teamimg2 from "../../components/imgs/team-mg2.png";
// import teamimg3 from "../../components/imgs/team-mg3.png";
// import teamimg4 from "../../components/imgs/team-mg4.png";
// import quotationmarks from "../../components/imgs/quotation-marks.png";
// import quotecolimg from "../../components/imgs/quote-col-img.png";
// import quotecolimg2 from "../../components/imgs/quote-col-img2.png";
// import quotecolimg3 from "../../components/imgs/quote-col-img3.png";
// import quotecolimg4 from "../../components/imgs/quote-col-img4.png";

var baseUrl = window.location.origin;
var bannercolimg = baseUrl+ "/public/landingImages/banner-col-img.png";
var installmentimg1 = baseUrl+'/public/landingImages/installmentimg1.png';
var installmentimg2 = baseUrl+'/public/landingImages/installmentimg2.png';
var installmentimg3 = baseUrl+'/public/landingImages/installmentimg3.png';
var circle1 = baseUrl+'/public/landingImages/circle1.png';
var circle2 = baseUrl+'/public/landingImages/circle2.png';
var circle3 = baseUrl+'/public/landingImages/circle3.png';
var teamimg1 = baseUrl+'/public/landingImages/team-mg1.png';
var teamimg2 = baseUrl+'/public/landingImages/team-mg2.png';
var teamimg3 = baseUrl+'/public/landingImages/team-mg3.png';
var teamimg4 = baseUrl+'/public/landingImages/team-mg4.png';
var quotationmarks = baseUrl+'/public/landingImages/quotation-marks.png';
var quotecolimg = baseUrl+'/public/landingImages/quote-col-img.png';
var quotecolimg2 = baseUrl+'/public/landingImages/quote-col-img2.png';
var quotecolimg3 = baseUrl+'/public/landingImages/quote-col-img3.png';
var quotecolimg4 = baseUrl+'/public/landingImages/quote-col-img4.png';


export default class Home extends Component {
    constructor (props){
        super(props);
}


    render() {
        return (
            <div>

                <div className="banner-col" style={{ backgroundImage: `url(${require("../../components/imgs/banner-img.png")})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 banner-desc">
                                <h1>TWO INSTALLEMENTS FOR YOUR CUSTOMERS NO RISK TO YOU!</h1>

                                <Ripples className="ripplesSearchButton contact-us-btn">
                                        <button className="submit-button"> <span> Contact Us</span></button>
                                </Ripples>
                            </div>

                            <div className="banner-col-img">
                                <img src={bannercolimg} className="img-fluid bannerimg2"/>
                            </div>
                        </div>
                    </div>

                    

                </div>

                <section className="installment-section">
            
                <div className="container">
                        <div className="row">
                            <div className="col-10 mx-auto text-center installment-col">
                            <h1>INSTALLMENTS FOR ALL</h1>
                            <p>Provide installments for clothing, shoes, and much more directly to your customers on your website! QisstPay allows you to offer installments on purchases as low as 1,500PKR!</p>
                            </div>

                            <div className="col-12 col-md-4 installment-subcol">
                                 <div className="installment-inner-col text-center">
                                 <div className="installmentimg">
                                    <img src={installmentimg1} className="img-fluid d-block mx-auto"/>
                                </div>

                                    <h2>No Interest for Your Customers</h2>
                                    <p>By offering interest free installments, you will see 40%  higher orders through QisstPay.</p>
                                 </div>
                            </div>

                            <div className="col-12 col-md-4 installment-subcol">
                                 <div className="installment-inner-col text-center">
                                 <div className="installmentimg">
                                    <img src={installmentimg2} className="img-fluid d-block mx-auto"/>
                                    </div>

                                    <h2>No Risk, Get Paid Up Front</h2>
                                    <p>We pay you up front while your customer pays us. Your customers miss a payment No problem, we'll still pay you.</p>
                                 </div>
                            </div>

                            <div className="col-12 col-md-4 installment-subcol">
                                 <div className="installment-inner-col text-center">
                                     <div className="installmentimg">
                                    <img src={installmentimg3} className="img-fluid d-block mx-auto"/>
                                    </div>

                                    <h2>More <br></br>Conversion</h2>
                                    <p>By providing installments, even for small purchases, you will drastically improve your sales!</p>
                                 </div>
                            </div>

                        </div>
                    </div>
                    <img src={circle1} className="circle1 img-fluid"/>

                    </section>


                    <section className="who-we-are">

                        <div className="container">
                            <div className="row">
                            <div className="col-10 mx-auto text-center who-we-are">
                                <h1>WHO WE ARE?</h1>
                                <p>We promise you a new look and more importantly, a new attitude. We build that by getting to know you, your needs and creating the best looking clothes.</p>
                                </div>

                                <div className="col-12 col-md-6 text-right our-team-col1">
                                    <img src={teamimg1} className="img-fluid"/>
                                    <h4>Syed Saad Ahmed</h4>
                                    <h4 className="title2">Co-Founder</h4>

                                    <p>I miss the old Kanye I gotta say at that time I’d like to meet Kanye And I promise the power is in the people and I will use the power given by the people to bring everything I have back to the people.</p>
                                </div>

                                <div className="col-12 col-md-6  our-team-col2">
                                    <img src={teamimg2} className="img-fluid"/>
                                    <h4>Saddad Amin</h4>
                                    <h4 className="title2">Co-Founder</h4>

                                    <p>I miss the old Kanye I gotta say at that time I’d like to meet Kanye And I promise the power is in the people and I will use the power given by the people to bring everything I have back to the people.</p>
                                </div>

                                <div className="col-12 col-md-6 text-right our-team-col1">
                                    <img src={teamimg3} className="img-fluid"/>
                                    <h4>Neha Saud</h4>
                                    <h4 className="title2">Product Designer</h4>

                                    <p>I miss the old Kanye I gotta say at that time I’d like to meet Kanye And I promise the power is in the people and I will use the power given by the people to bring everything I have back to the people.</p>
                                </div>

                                <div className="col-12 col-md-6  our-team-col2">
                                    <img src={teamimg4} className="img-fluid"/>
                                    <h4>Zara Ahmed</h4>
                                    <h4 className="title2">Marketing Hacker</h4>

                                    <p>I miss the old Kanye I gotta say at that time I’d like to meet Kanye And I promise the power is in the people and I will use the power given by the people to bring everything I have back to the people.</p>
                                </div>


                            </div>
                        </div>

                        <img src={circle2} className="circle2 img-fluid"/>
                        <img src={circle3} className="circle3 img-fluid"/>

                    </section>
                    

<section className="testimonial-section" style={{ backgroundImage: `url(${require("../../components/imgs/testimonial-main-bg.png")})` }}>
    <div className="container">

        <h1 className="testimonial-tittle"> Clients <br></br> Testimonial</h1>
            <div className="testimonial-bg" style={{ backgroundImage: `url(${require("../../components/imgs/testimonial-bg2.png")})` }}>
            
            <img src={quotecolimg2} className="quotecolimg2 img-fluid"/>

            <img src={quotecolimg3} className="quotecolimg3 img-fluid"/>

            <img src={quotecolimg4} className="quotecolimg4 img-fluid"/>


            <div className="quote-col">
            <img src={quotationmarks} className="quotationmarks img-fluid"/>

            


                <p>Thank you so much guys for all the wonderful efforts you've been doing so far! You guys are awesome!!</p>
                <span className="client-col">
                     <img src={quotecolimg} className="img-fluid"/>
                    <h5>
                        John Doe
                        <small>Client</small>
                    </h5>
                 </span>
                </div>
            </div>
    </div>
</section>
                
                <section className="sign-section" style={{ backgroundImage: `url(${require("../../components/imgs/signup-bg.png")})` }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 mx-auto signup-col">
                                <div className="signup-col-desc">
                                    <h2>SIGN IN</h2>

                                    <div className="form-group">
                                        <input type="email" className="form-control" id="Email" placeholder="Email Address" />
                                        <i className="fa fa-envelope"></i>
                                    </div>

                                    <div className="form-group">
                                        <input type="password" className="form-control"  placeholder="Password" />
                                        <i className="fa fa-key"></i>
                                    </div>

                                    <div className="custom-control custom-radio">
                                        <input type="radio" className="custom-control-input" id="customRadio" name="example1"/>
                                        <label className="custom-control-label" for="customRadio">Remember me</label>
                                    </div>

                                    <div className="react-ripples ripplesSearchButton Login-btn" >
                                        <button className="submit-button">
                                         <span> LOGIN</span></button>
                                    </div>

                                    <div class="react-ripples ripplesSearchButton register-btn" >
                                        <button class="submit-button">
                                         <span> REGISTER</span></button>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                </section>


            <section className="work-with-us text-center">
                <div className="container">
                    <div className="row">
                        <div className="col-12 work-with-us-col">
                            <h1>Do you want to work with us</h1>
                        </div>

                        <div className="col-12 col-md-4 sub-col">
                            <i className="fa fa-map-marker"></i>
                        <h4>Visi Our Company at</h4>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                        </div>

                        <div className="col-12 col-md-4 sub-col">
                        <i className="fa fa-phone"></i>
                        <h4>Have a Question? Call Us</h4>
                        <p>000-111-222-333</p>
                        <p>000-111-222-333</p>
                        </div>

                        <div className="col-12 col-md-4 sub-col">
                        <i className="fa fa-clock-o"></i>
                        
                        <h4>Working Time</h4>
                        <p>Monday To Friday 8:00 to 18:00</p>
                        <p>Saturday 8:00 to 16:00</p>
                        </div>
                    </div>
                </div>
            </section>


                <section className="footer-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-3 consumer-col">
                                <h4>CONSUMER</h4>
                                <ul>
                                    <li><a href="#">Shop</a></li>
                                    <li><a href="#">App</a></li>
                                    <li><a href="#">Customer Sign In</a></li>
                                    <li><a href="#">How Its Work</a></li>
                                    <li><a href="#">Help</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="#">Terms of Service</a></li>
                                </ul>
                            </div>

                            <div className="col-12 col-md-3 consumer-col">
                                <h4>BUSINESSES</h4>
                                <ul>
                                    <li><a href="#">Become a QuadPay Merchant</a></li>
                                    <li><a href="#">Documentation</a></li>
                                    <li><a href="#">API Reference</a></li>
                                    <li><a href="#">Merchant Sign In</a></li>
                                    <li><a href="#">PCI DS5 Complio</a></li>
                                </ul>

                            </div>

                            <div className="col-12 col-md-2 consumer-col">
                                <h4>COMPANY</h4>
                                <ul>
                                    <li><a href="#">About</a></li>
                                    <li> <a class="btn" href="#inline" data-lity> Pay In Installments</a></li>
                                    <li><Link to="/DashboardHome">Request a demo</Link></li>
                                </ul>
                                
                            </div>

                            <div className="col-12 col-md-4 stayInTouch">
                                <h4>STAY IN TOUCH</h4>
                                <p>Receive news and promotions</p>

                                <div className="form-group">
                                        <input type="email" className="form-control" id="Email" placeholder="Enter Email Address" />
                                    </div>

                                    <div class="react-ripples ripplesSearchButton sbmt-btn">
                                        <button class="submit-button">
                                        <span> SUBMIT </span>
                                    </button>
                                    </div>
                                
                                <ul className="social-icon">

                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-instagram"></i></a></li>

                                </ul>
                            </div>

                            

                        </div>
                    </div>
                </section>

<StepForm/>
 

            </div>
        )
    }
}
