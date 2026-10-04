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

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state={
            nemail:'',
            
            errors: {
            nemail:'',
            errors: {}
            }
        }
        
        this.handleValidation = this.handleValidation.bind(this);
        this.handleChangeNemail = this.handleChangeNemail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleScroll =  this.handleScroll.bind(this);
        this.myRef = React.createRef();
         window.scrollTo(0, 0);
         
        this.url = window.location.origin;
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
        
        this.handleScroll();
        
        function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

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

handleChangeNemail(e){
        this.setState({
            nemail: e.target.value
        })
    }
    
    
    handleValidation(e){
    
    let errors = {};
    let formIsValid = true;
    
    if(!this.state.nemail){
        formIsValid = false;
        errors['nemail'] = 'Valid Email Required';
    }
    
    this.setState({
            errors:errors
        })
        return formIsValid;
    }
    
    
    onSubmit(e){
    e.preventDefault();
    
    const postData = {
        nemail: this.state.nemail,
    }
        if(this.handleValidation()){
         /* adding entry for the account */
        axios.post(this.url+'/api/newsletter', postData).then((response) => {
            //console.log('res',response);
            if(response.data.flag==1)
            {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Email Successfully Subscribed!',
                  showConfirmButton: false,
                  timer: 1500
                })
            }else{
                Swal.fire({
                  icon: 'error',
                  title: 'Email already exist',
                  text: 'Please Enter Valid Email!',
                })
            }
        });
        
        this.setState({
                    nemail:'',
                    value:''
                })
}
}


    render() {
        return (
            <div ref={this.myRef}>
            <Navigation/>

                <div className="banner-bg" style={{ backgroundImage: `url(${BannerBackground})` }}>
                    <img className="Ellipse9" src={Ellipse9}/>
                    <img className="Ellipse Ellipse12" src={Ellipse12}/>
                    <img className="Group136 Ellipse2" src={Group136}/>
                    <img className="Ellipse8 Ellipse" src={Ellipse8}/>

                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 banner-desc">
                                <h1 className="main-title">Suitable Payment Options</h1>

                                

                            <p>Just Once! Input individual employee data one time and our integrated software will generate quotes for every major health care provider in New Mexico.</p>
                            <p>With Xecute the process of generating health insurance quotes has never been easier. We have two packages to choose from: 

Our Starter Package is an excellent way to test our intuitive software for yourself. It’s just $25 for a single quote and access to our full quote-generating services.

Once you experience how fast, easy, and efficient our software is you can access unlimited health insurance quotes for a flat-rate of $2,500 annually.</p>

                                
                            </div>

                            <div className="col-12 col-md-6 banner-img" >
                                <img className="img-fluid" src={BannerMac} />
                                
                                
                            </div>
                        </div>
                    </div>

                    <img className="Group139 Ellipse2" src={Group139}/>
                </div>


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
                                            <h1>$2,500<small>/year</small></h1>
                                            <h4>one year subscription</h4>
                                            <h5>Unlimited Quotes ( $500 for each additional license )</h5>

                                            <ul>
                                                <li><img src={check} />Unlimited Quotes</li>
                                                <li><img src={check} />Secure Online Transfer Indeed</li>
                                                <li><img src={check} />Unlimited Styles for interface</li>
                                                <li><img src={check} />Reliable Customer Service</li>
                                                <li><img src={check} />Manual Backup Provided</li>
                                            </ul>
                                            <Link className="btn enroll-btn" to="/register">Enroll</Link>
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

                                            <Link className="btn enroll-btn" to="/register">Enroll</Link>
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
                                    <li><i className="fas fa-mobile-alt" />505-797-3380</li>
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
                                    <li className="list-inline-item"><Link to="/termsConditions">Terms & Conditions</Link></li>
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
