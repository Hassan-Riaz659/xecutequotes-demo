import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import HeaderBar from './headerBar';
import { Row, Column } from 'react-foundation';
import jsPDF from 'jspdf';

import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';

var baseUrl = window.location.origin;
var trendingUp = baseUrl + "/public/landingImages/trending-up.png";
var calendar = baseUrl + '/public/landingImages/calendar.png';
var Group1 = baseUrl + '/public/landingImages/Group1.png';
var Group3 = baseUrl + '/public/landingImages/Group3.png';
var Group4 = baseUrl + '/public/landingImages/Group4.png';


export default class ComparePrice extends Component {
  constructor(props) {
    super(props);

    //logo
    this.url = window.location.origin;
    this.renderSwitch = this.renderSwitch.bind(this);

    this.state = {
      compare_plans: [],
      client_id: 0,
      logo: '',
      total_tables: 0,
      user_id: '',
      last_quote: '',
      reset_plans: false,
      recheckClientId: '',
      recheckPlan: false,
      quoteInfo: '',
      displayMsgPdf: 'none',
    }

    this.handleAssignPlan = this.handleAssignPlan.bind(this);
    this.handlePdfPrint = this.handlePdfPrint.bind(this);
    this.handleBackToPlans = this.handleBackToPlans.bind(this);
    this.handleSaveQuote = this.handleSaveQuote.bind(this);

    this.url = window.location.origin;

    this.handleScroll = this.handleScroll.bind(this);
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

    this.handleScroll();

    $(document).ready(function () {
      $(".App-header").hide();
    })

    $(".hide-show-toggle").click(function () {
      $(".table-col").addClass("expand-reduce-table");
      $(".hide-show-toggle").hide();
      $(".hide-toggle").show();

    });

    // $(".printPage").click(function(){
    //     var divToPrint=document.getElementById('DivIdToPrint');

    //   var newWin=window.open('','Print-Window');

    //   newWin.document.open();

    //   newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body></html>');

    //   newWin.document.close();

    //   setTimeout(function(){newWin.close();},100);
    // });

    //  $(".hide-toggle").click(function(){
    //     $(".table-col").removeClass("expand-reduce-table");
    //   $(".hide-toggle").hide();
    //      $(".hide-show-toggle").show();

    //  }); 

    let recheckPlan = this.props.location.state['recheckPlan'];


    if (recheckPlan === true) {


      let recheckPlan = this.props.location.state['recheckPlan'];
      let recheckClientId = this.props.location.state['clientId'];


      this.setState({
        recheckClientId: recheckClientId,
        recheckPlan: true
      });


      let AppState = JSON.parse(recheckClientId);


      var arr = [];
      arr[0] = this.props.location.state;
      arr[1] = AppState.client_id;


      this.setState({
        client_id: arr[1],
        reset_plans: true

      })

      axios.put(this.url + '/api/compare-plans/', arr)
        .then(res => {
          this.setState({ compare_plans: res.data.data, logo: res.data.logo, client_id: res.data.client_id, user_id: res.data.user_id, last_quote: res.data.last_quote, quoteInfo: res.data.quotePlansInfo });

        });

    }
    else {

      let client_id = localStorage["calculate_client_id"];

      if (client_id) {
        let AppState = JSON.parse(client_id);

        var arr = [];
        arr[0] = this.props.location.state;
        arr[1] = AppState.client_id;


        this.setState({
          client_id: arr[1]
        })

        axios.put(this.url + '/api/compare-plans/', arr)
          .then(res => {
            this.setState({ compare_plans: res.data.data, logo: res.data.logo, client_id: res.data.client_id, user_id: res.data.user_id, last_quote: res.data.last_quote, quoteInfo: res.data.quotePlansInfo });
          });

      }

    }
    //   $('a.printPage').click(function(){
    //       window.print();
    //       return false;
    //     });

  }

  renderSwitch(e) {
    switch (e) {
      case 'Employee':
        return 'E';
      case 'Spouse':
        return 'S';
      case 'Dependent':
        return 'D';
      default:
        return 'foo';
    }
  }

  handleSaveQuote(e) {

    console.log('details', this.state.quoteInfo.client_id, this.state.quoteInfo.user_id, this.state.quoteInfo.quote_id, this.state.quoteInfo.id);
    const postData = {
      client_id: this.state.quoteInfo.client_id,
      user_id: this.state.quoteInfo.user_id,
      quote_id: this.state.quoteInfo.quote_id,
      quote_plans_id: this.state.quoteInfo.id,

    }

    axios.put(this.url + '/api/save-quote/', postData)
      .then(res => {
        if (res.data.success == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Quote saved successfully!',
            showConfirmButton: false,
            timer: 1900
          })
        }
        else if (res.data.success == 'Already saved') {
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: 'Quote already saved',
            showConfirmButton: false,
            timer: 1900
          })
        }
        else {

        }

      });

  }

  handleAssignPlan(e) {

    const postData = {
      client_id: this.state.client_id,
      plan_id: e
    }

    axios.put(this.url + '/api/assign-plan/', postData)
      .then(res => {
        if (res.data == 'success') {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Plan Assigned Successfully!',
            showConfirmButton: false,
            timer: 1900
          })



          this.props.history.push({
            pathname: '/dashboard',
            state: { recheckPlan: false }
          })

        }
      });
  }

  handlePdfPrint(e) {

    $("body").addClass("active");

    setTimeout(function () {
      $('body').removeClass("active");// or fade, css display however you'd like.
    }, 8000);


    Swal.fire({
      title: "For printing plans, Would you like to include employee rates?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Yes'
    }).then((result) => {
      this.setState({
        displayMsgPdf: 'block',
      })
      if (result.isConfirmed) {


        if (this.state.recheckPlan === true) {


          var arr = [];
          arr[0] = this.props.location.state;
          arr[1] = this.state.recheckClientId;
          arr[2] = "yes";

          this.setState({
            client_id: arr[1],
            employeeRates: arr[2],
          })
          //console.log('data in arr',arr);


          axios.post(this.url + '/api/print-plans', arr)
            .then(res => {
              //'<a href={response.data.data}></a>'
              window.open(res.data.data, '_blank');
              //console.log('user id',res.data.user_id,'quote_id',res.data.last_quote);
              //this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote});
              this.setState({
                displayMsgPdf: 'none',
              })
            });

        }
        else {
          let client_id = localStorage["calculate_client_id"];
          if (client_id) {
            let AppState = JSON.parse(client_id);

            var arr = [];
            arr[0] = this.props.location.state;
            arr[1] = AppState.client_id;
            arr[2] = "yes";


            this.setState({
              client_id: arr[1],
              employeeRates: arr[2],
            })
            //console.log('data in arr',arr);


            axios.post(this.url + '/api/print-plans', arr)
              .then(res => {
                //'<a href={response.data.data}></a>'
                window.open(res.data.data, '_blank');
                //console.log('user id',res.data.user_id,'quote_id',res.data.last_quote);
                //this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote});
                this.setState({
                  displayMsgPdf: 'none',
                })
              });

          }

        }
      }
      else if (result.isConfirmed == false) {
        if (this.state.recheckPlan === true) {


          var arr = [];
          arr[0] = this.props.location.state;
          arr[1] = this.state.recheckClientId;
          arr[2] = "no";


          this.setState({
            client_id: arr[1],
            employeeRates: arr[2],
          })
          //console.log('data in arr',arr);


          axios.post(this.url + '/api/print-plans', arr)
            .then(res => {
              //'<a href={response.data.data}></a>'
              window.open(res.data.data, '_blank');
              //console.log('user id',res.data.user_id,'quote_id',res.data.last_quote);
              //this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote});
              this.setState({
                displayMsgPdf: 'none',
              })
            });

        }
        else {
          let client_id = localStorage["calculate_client_id"];
          if (client_id) {
            let AppState = JSON.parse(client_id);

            var arr = [];
            arr[0] = this.props.location.state;
            arr[1] = AppState.client_id;
            arr[2] = "no";


            this.setState({
              client_id: arr[1],
              employeeRates: arr[2],
            })
            //console.log('data in arr',arr);


            axios.post(this.url + '/api/print-plans', arr)
              .then(res => {
                //'<a href={response.data.data}></a>'
                window.open(res.data.data, '_blank');
                //console.log('user id',res.data.user_id,'quote_id',res.data.last_quote);
                //this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote});
                this.setState({
                  displayMsgPdf: 'none',
                })
              });

          }

        }
      }
      else {

      }
    })



  }

  handleBackToPlans(e) {


    if (this.state.recheckPlan === true) {
      this.props.history.push({
        pathname: '/reset-quote-plans',
        state: { recheckPlan: false }
      })
    }
    else {

      this.props.history.push('/calculate');
      //   const postData={
      //     client_id:this.state.client_id,
      //     user_id:this.state.user_id,
      //     quote_id:this.state.last_quote,
      // }

      // axios.put(this.url+'/api/remove-chosen-plans/', postData)
      //   .then(res => {
      //       if(res.data.delete == 1)
      //       {
      //          this.props.history.push('/calculate')             
      //       }
      //       else
      //       {
      //           console.log('not deleted');
      //       }
      //   });
      //   if(this.state.reset_plans != true)
      //   {

      //   }
      //   else
      //   {

    }
  }


  render() {
    return (
      <div ref={this.myRef}>
        <div id="wrapper compare-price-wrapper">
          <Sidebar />
          <div className="main-panel">
            {/* Navbar */}

            <DashboardHeader />

            <div className="content">
              <div className="row">

                <div className="col-12 title-col  add-employee-title mb-4 justifyContentEnd">

                  <div className="close-btn-col add-employee-title">
                    <a className="btn mr-2" onClick={this.handleBackToPlans}>Return to quotes</a>
                    <a className="btn mr-2" onClick={this.handleSaveQuote}>Save quote</a>
                    <a className="btn close-btn" href={"/dashboard"}><i className="fas fa-close" />Go to Dashboard</a>
                    <input className="btn print-btn printPage" target="_blank" onClick={this.handlePdfPrint} type='button' id='btn' value='Print' />

                  </div>

                </div>
                <div className="col-lg-12 group-information-col">
                  <div className="user-card user-card2">
                    <div className="loadingpdfFile" style={{ display: this.state.displayMsgPdf }}>
                      <div className="loader"></div>
                      <p>loading pdf file..</p>
                    </div>
                    <div className="group-information table-group-information">
                      <h5>Plan Overview</h5>

                      <div className="col-lg-12 group-information-col">


                      </div>
                      <div className="table-col">

                        <div className="plan-buttons">
                          {/* <button className="pricerange-btn" type="button">Select Plan - $1100.30/mo</button>
          <button className="pricerange-btn" type="button">Select Plan - $1200.30/mo</button>
          <button className="pricerange-btn" type="button">Select Plan - $1300.30/mo</button>*/}
                        </div>


                        <div id='DivIdToPrint'>


                          <table className="table">
                            <thead>
                              <tr>
                                <th style={{ paddingTop: "1rem" }}>Carrier</th>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?

                                    <th style={{ pageBreakBefore: 'always' }}>
                                      <img className="table-logos-img img-fluid" style={{ width: "90%", height: "auto" }} src={window.location.origin + '/public/images/' + plan.logo} />
                                    </th>

                                    :
                                    <th  >
                                      <img className="table-logos-img img-fluid" style={{ width: "90%", height: "auto" }} src={window.location.origin + '/public/images/' + plan.logo} />
                                    </th>

                                ))}
                              </tr>
                            </thead>

                            <tbody >
                              <tr>
                                <td>Plan Name</td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always', fontSize: "0.65rem" }}>
                                      {plan.plan_name}
                                    </td>
                                    :
                                    <td style={{ fontSize: "0.65rem" }}>
                                      {plan.plan_name}
                                    </td>

                                ))}
                              </tr>

                              <tr className="monthly-premium-col">
                                <td >
                                  Monthly Premium
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always' }}> ${plan.monthly_premium} </td>

                                    :
                                    <td> ${plan.monthly_premium}</td>



                                ))}


                              </tr>
                              <tr className="list-rate-col">
                                <td>
                                  List Rate
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      {plan.employees.map(emp => (


                                        <span className="d-block">
                                          <i className="fa fa-angle-double-right" />
                                          {this.renderSwitch(emp.member_type)}: {emp.f_name} {emp.l_name} - ${emp.pricing}
                                        </span>
                                      ))}
                                    </td>

                                    :

                                    <td>
                                      {plan.employees.map(emp => (


                                        <span className="d-block">
                                          <i className="fa fa-angle-double-right" />
                                          {this.renderSwitch(emp.member_type)}: {emp.f_name} {emp.l_name} - ${emp.pricing}
                                        </span>
                                      ))}
                                    </td>

                                ))}
                              </tr>
                              <tr className="planlevel-col">
                                <td>
                                  Plan Level (Metal: tier)
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always' }}> {plan.plan_tier} </td>

                                    :
                                    <td> {plan.plan_tier} </td>

                                ))}


                              </tr>
                              <tr className>
                                <td>
                                  Health Saving account Qualified
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      {plan.plan_details.hsa_compliant == null ? '' : plan.plan_details.hsa_compliant}
                                    </td>
                                    :

                                    <td>
                                      {plan.plan_details.hsa_compliant == null ? '' : plan.plan_details.hsa_compliant}
                                    </td>

                                ))}
                              </tr>
                              {/*  <tr className>
                <td>
                  Summary of benefits and coverage (SBC)
                </td>
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
                  Missing Info
                </td>
                :
                
                <td>
                  Missing Info
                </td>
                
                ))}
              </tr>
              
              <tr className>
                <td>
                  Formulary Link
                </td>
                {this.state.compare_plans.map((plan, index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
                  Missing Info
                </td>
                :
                <td>
                  Missing Info
                </td>
                
                ))}
              </tr>*/}


                              <tr>
                                <td>
                                  Deductibles
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always', fontSize: "0.8rem" }}>

                                      <span>Individual: ${plan.deductible_in} </span>
                                      <span>Family: ${plan.family_in}</span>
                                    </td>

                                    :

                                    <td style={{ fontSize: "0.75rem" }}>

                                      <span>Individual: ${plan.deductible_in} </span>
                                      <span>Family: ${plan.family_in}</span>
                                    </td>


                                ))}
                              </tr>


                              <tr>
                                <td>
                                  Out of Pocket Max
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always', fontSize: "0.8rem" }} >

                                      <span>Individual: {plan.max_individual_in !== "0" ?
                                        "$" + plan.max_individual_in : 'N/A'
                                      } </span>
                                      <span>Family: {plan.max_family_in !== "0" ?
                                        "$" + plan.max_family_in : 'N/A'
                                      }</span>
                                    </td>
                                    :

                                    <td style={{ fontSize: "0.75rem" }}>
                                      <span>Individual: {plan.max_individual_in !== "0" ?
                                        "$" + plan.max_individual_in : 'N/A'
                                      } </span>
                                      <span>Family: {plan.max_family_in !== "0" ?
                                        "$" + plan.max_family_in : 'N/A'
                                      }</span>
                                    </td>

                                ))}
                              </tr>

                              <tr className="network-row">
                                <td>
                                  Preventive Care Services
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.preventive_care_services}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.preventive_care_services}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Primary Care Office Visit
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.primary_care_office_visit}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.primary_care_office_visit}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Specialist Care Office Visit
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.specialist_care_office_visit}</span>
                                      </span>
                                    </td>
                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.specialist_care_office_visit}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Behavioral Health Visits
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.behavioral_health_visits}</span>
                                      </span>
                                    </td>
                                    :
                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.behavioral_health_visits}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Urgent Care
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.urgent_care}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.urgent_care}</span>
                                      </span>
                                    </td>
                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Emergency Room
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.emergency_room}</span>
                                      </span>
                                    </td>
                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.emergency_room}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  CT/PET/SCAN/MRI
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.ct_pet_scan_mri}</span>
                                      </span>
                                    </td>
                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.ct_pet_scan_mri}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  X Rays
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.x_rays}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.x_rays}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Laboratory Tests
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.laboratory_tests}</span>
                                      </span>
                                    </td>
                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.laboratory_tests}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Outpatient Hospital
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.outpatient_hospital}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.outpatient_hospital}</span>
                                      </span>
                                    </td>
                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Inpatient Hospital
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.inpatient_hospital}</span>
                                      </span>
                                    </td>
                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.inpatient_hospital}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Chiropractic & Acupuncture
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.chiropractic_and_acupuncture}</span>
                                      </span>
                                    </td>
                                    :
                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.chiropractic_and_acupuncture}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Rehabilitation Therapy
                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.rehabilitation_therapy}</span>
                                      </span>
                                    </td>
                                    :
                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.rehabilitation_therapy}</span>
                                      </span>
                                    </td>
                                ))}

                              </tr>

                              <tr className="network-row">
                                <td className="drugs-td">
                                  <b>Drugs</b>
                                </td>
                              </tr>

                              <tr className="network-row">
                                <td>
                                  Tier 1:Preferred Generic Drugs
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier1}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier1}</span>
                                      </span>
                                    </td>
                                ))}

                              </tr>


                              <tr className="network-row">
                                <td>
                                  Tier 2:Generic Drugs
                                </td>

                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span>{plan.plan_details.tier2}</span>
                                      </span>
                                    </td>
                                    :
                                    <td>
                                      <span className="first-span">
                                        <span>{plan.plan_details.tier2}</span>
                                      </span>
                                    </td>

                                ))}

                              </tr>

                              <tr className="network-row">
                                <td>
                                  Tier 3:Brand Name Drugs
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier3}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier3}</span>
                                      </span>
                                    </td>

                                ))}
                              </tr>

                              <tr className="network-row">
                                <td>
                                  Tier 4:Non Preferred Brand Drugs
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier4}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier4}</span>
                                      </span>
                                    </td>

                                ))}
                              </tr>
                              <tr className="network-row">
                                <td>
                                  Tier 5:Specialty Drugs
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier5}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier5}</span>
                                      </span>
                                    </td>

                                ))}
                              </tr>

                              <tr className="network-row">
                                <td>
                                  Tier 6::Non-Pref Specialty Drugs
                                </td>
                                {this.state.compare_plans.map((plan, index) => (

                                  index > 3 ?

                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier6}</span>
                                      </span>
                                    </td>

                                    :

                                    <td>
                                      <span className="first-span">
                                        <span className="second-span">{plan.plan_details.tier6}</span>
                                      </span>
                                    </td>

                                ))}
                              </tr>

                              <tr className="network-row">
                                <td>

                                </td>
                                {this.state.compare_plans.map((plan, index) => (
                                  index > 3 ?
                                    <td style={{ pageBreakBefore: 'always' }}>
                                      <button className="btn btn-primary" onClick={() => this.handleAssignPlan(plan.id)}>Assign Plan</button>
                                    </td>

                                    :

                                    <td>
                                      <button className="btn btn-primary" onClick={() => this.handleAssignPlan(plan.id)}>Assign Plan</button>
                                    </td>

                                ))}
                              </tr>

                            </tbody>

                          </table>

                        </div>


                      </div>




                      <div className="col-12 compare-btn">
                        {/*<a href="#" className="btn print-btn printPage"> Print</a>*/}


                      </div>
                    </div>

                  </div>

                </div>
              </div>

            </div>
            <DashboardFooter />
          </div>
        </div>
      </div>
    )
  }
}