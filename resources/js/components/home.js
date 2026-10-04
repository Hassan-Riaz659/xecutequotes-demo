import React, { Component } from 'react';
import Navigation from './navigation/index';
import { Link, withRouter } from 'react-router-dom';
import $ from "jquery";
import "./Style/style.css";

                    
var baseUrl = window.location.origin;
var BannerBackground = baseUrl+'/public/landingImages/bannerbg.png';
var sample  =  baseUrl+'/public/landingImages/XecuteQuotes.mp4';
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
        
        //     document.getElementById('vid').play();
        //     console.log('vid',document.getElementById('vid').play());
           var video=document.getElementById("vid");

          video.muted = !video.muted;
        
        
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
        axios.post(this.url+'/api/news-letter', postData).then((response) => {
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
                  icon: 'warning',
                  title: 'Email already Subscribed!',
                  text: 'Please Enter New Email',
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
                                <h1 className="main-title">Generate Health Insurance Quotes For Small Business With Ease</h1>

                                <p>We help health insurance agents optimize the process
                                of generating and analyzing group health insurance quotes. Just Input employee data once!</p>

                                <Link className="btn get-in-touch-btn" to="/contact-us">Get in touch</Link>
                            </div>

                            <div className="col-12 col-md-6 banner-img">
                                <img className="img-fluid" src={BannerMac} />
                                <img className="img-fluid Group36" src={Group36} />
                                
                            </div>
                        </div>
                    </div>

                    <img className="Group139 Ellipse2" src={Group139}/>
                </div>
                
                 <div className="Vidcontainer">
                    <div className="row">
                         <div className="col-12 col-md-4 click-here">
                             

                         </div>    
                         <div className="col-12 col-md-4 video-tag-home">
                             <video className='videoTag' id="vid" loop="true" autoPlay="autoplay" allow="autoplay" muted controls>
                                                <source src={sample} type='video/mp4' />
                                                Your browser does not support this video format.
                             </video>
                             
                             
                        </div>    
                   
                       <div className="col-12 col-md-4 learn-more">

                       </div>
                   </div>
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

                                <Link className="btn btn-gradient"  to="/contact-us">Get in touch</Link>
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
                                        <form className="form-inline mx-auto"  onSubmit={this.onSubmit}>
                                            <input type="email" className="form-control common-input" id="email" name="email" placeholder="Your E-mail" autoComplete="email" value={this.state.nemail} required="" onChange={this.handleChangeNemail} />
                                            <span className="errorBotm" style={{color: "white"}}>{this.state.errors["nemail"]} </span>
                                            <div className="input-group-append">
                                            <button className="btn send-btn" type="submit" disabled={this.state.formSubmitting ? "disabled": ""}>Send</button>
                                                
                                            </div>
                                            </form>
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
                                {/*<ul className="list-inline">

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

                                </ul>*/}
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
                                    <li className="list-inline-item"><a href="#">Terms & Conditions</a></li>
                                    <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
                                    <li className="list-inline-item"><a href="#">Sitemap</a></li>
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
