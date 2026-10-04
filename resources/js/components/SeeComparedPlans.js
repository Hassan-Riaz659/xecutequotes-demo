import React, { Component } from 'react';
import { Link } from "react-router-dom";
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import HeaderBar from './headerBar';
import { Row, Column } from 'react-foundation';
import jsPDF from 'jspdf';

import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';

import $ from 'jquery';


var baseUrl = window.location.origin;
var trendingUp = baseUrl+"/public/landingImages/trending-up.png";
var calendar = baseUrl+'/public/landingImages/calendar.png';
var Group1 = baseUrl+'/public/landingImages/Group1.png';
var Group3 = baseUrl+'/public/landingImages/Group3.png';
var Group4 = baseUrl+'/public/landingImages/Group4.png';
export default class SeeComparedPlans extends Component {
    constructor (props){
        super(props);
        
        //logo
       this.url = window.location.origin;
        this.renderSwitch = this.renderSwitch.bind(this);
        
        this.state={
            compare_plans:[],
            client_id:0,
            logo:'',
            total_tables:0,
            user_id : '',
            last_quote : '',
            quoteId:'',
            quoteInfo:'',
            
        }
     
     
        this.handlePdfPrint = this.handlePdfPrint.bind(this);
        this.handleCalculate = this.handleCalculate.bind(this);
        this.handleSaveQuote = this.handleSaveQuote.bind(this);
        
        this.goBack = this.goBack.bind(this);
        this.url = window.location.origin;
}

componentDidMount() {



$(".hide-show-toggle").click(function(){
  $(".table-col").addClass("expand-reduce-table");
  $(".hide-show-toggle").hide();
    $(".hide-toggle").show();

});


 $(".hide-toggle").click(function(){
    $(".table-col").removeClass("expand-reduce-table");
   $(".hide-toggle").hide();
     $(".hide-show-toggle").show();
    
 });   
//     let client_id = localStorage["calculate_client_id"];
//     if (client_id) {
//       let AppState = JSON.parse(client_id);
      
//         var arr = [];
//         arr[0] = this.props.location.state;
//         arr[1] = AppState.client_id;
        
        
//         this.setState({
//             client_id:arr[1]
//         })
//   console.log('data in arr',arr);
      
    axios.get(this.url+'/api/see-compared-plans/'+this.props.match.params.id)
      .then(res => {

        this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote,
            quoteId:res.data.last_quote.id,quoteInfo:res.data.quotePlansInfo
        });

      });
      
    // }
    
      
    //   $('a.printPage').click(function(){
    //       window.print();
    //       return false;
    //     });

}

renderSwitch(e)
{
    switch(e) {
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

handleCalculate()
{
    

        

        let client_id =this.state.client_id;
        let quote_id =this.state.quoteId;
        localStorage["edit_client_id"] = JSON.stringify(client_id);
        localStorage["edit_quote_id"] = JSON.stringify(quote_id);
        
        this.props.history.push('/reset-quote-plans');
        // localStorage["calculate_client_id"] = JSON.stringify(client_id);
        // this.props.history.push('/calculate')
        
}

handleSaveQuote(e)
{
 

    const postData={
        client_id:this.state.quoteInfo.client_id,
        user_id:this.state.quoteInfo.user_id,
        quote_id:this.state.quoteInfo.quote_id,
        quote_plans_id:this.state.quoteInfo.id,
        
    }
    
    axios.put(this.url+'/api/save-quote/', postData)
      .then(res => {
            if(res.data.success=='success'){
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Quote saved successfully!',
                  showConfirmButton: false,
                  timer: 1900
                })
            }
            else if(res.data.success== 'Already saved')
            {
                Swal.fire({
                  position: 'center',
                  icon: 'warning',
                  title: 'Quote already saved',
                  showConfirmButton: false,
                  timer: 1900
                })
            }
            else
            {
                
            }
          
      });
    
}

handlePdfPrint(e)
{
    
    $("body").addClass("active");
    
       setTimeout(function(){
   $('body').removeClass("active");// or fade, css display however you'd like.
}, 8000);

                
    Swal.fire({
                  title: "Would you like to include employee rates?",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText:'No',
                  confirmButtonText: 'Yes'
                }).then((result) => {
                    this.setState({
                          displayMsgPdf:'block',
                      })
                  if (result.isConfirmed) {
                      
                              var post =[];
                                post[1] = this.props.match.params.id;
                                post[0] = "yes";
                                
                                axios.post(this.url+'/api/see-compared-plans-print',post)
                              .then(res => {
                                window.open(res.data.data,'_blank');
                                        });

                      
                      
                                          //'<a href={response.data.data}></a>'
                                          window.open(res.data.data,'_blank');
                            this.setState({
                                  displayMsgPdf:'none',
                              })
                                          //console.log('user id',res.data.user_id,'quote_id',res.data.last_quote);
                                        //this.setState({compare_plans: res.data.data,logo:res.data.logo,client_id:res.data.client_id,user_id:res.data.user_id,last_quote:res.data.last_quote});
                        
                        
                  }
                else if(result.isConfirmed == false)
                {
                              var post =[];
                                post[0] = "no";
                                post[1] = this.props.match.params.id;
                                
                                axios.post(this.url+'/api/see-compared-plans-print',post)
                              .then(res => {
                                window.open(res.data.data,'_blank');
                                        });

                      
                      
                                          //'<a href={response.data.data}></a>'
                                          window.open(res.data.data,'_blank');
                            this.setState({
                                  displayMsgPdf:'none',
                              })
                    
                }
                else
                {
                    
                }
                })            
                
}

 goBack(e)
 {
     
  this.props.history.push('/previous-quote-preview/'+this.props.match.params.id);
 }

    render() {
        return (
            <div>
                <div id="wrapper compare-price-wrapper">
                   <Sidebar/>
                        <div className="main-panel">
                        {/* Navbar */}

                           <DashboardHeader />

                                 <div className="content">
                                 <div className="row">

                    
                                <div className="col-12 title-col  add-employee-title mb-4">
                                    <h4><a href="" onClick={this.goBack}><i className="fas fa-long-arrow-alt-left"/></a> Compare Price</h4>

                                 <div className="close-btn-col add-employee-title">
                                     <a className="btn close-btn" href={"/dashboard"}><i className="fas fa-close"/>Go to dashboard</a>
                                     <a className="btn mr-2" onClick={this.handleSaveQuote}>Save quote</a>
                                     <input className="btn print-btn printPage" target="_blank" onClick={this.handlePdfPrint} type='button' id='btn' value='Print'/>
                                         <button className="btn ml-2" style={{color:"#fff"}} onClick={this.handleCalculate} >Edit Plans</button>
                                 </div>
                                   
                                </div>              
                                       
                  <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
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

           
          <table  className="table">
            <thead>
                <tr>
                <th style={{paddingTop:"1rem"}}>Carrier</th>
                    {this.state.compare_plans.map((plan, index) => (
                    
                    index > 3 ?
                    
                    <th style={{pageBreakBefore: 'always'}}>
                  <img className="table-logos-img img-fluid" style={{width: "90%",height: "auto"}} src={window.location.origin+'/public/images/'+plan.logo} />
                </th>
                    
                    :
                    <th  >
                  <img className="table-logos-img img-fluid" style={{width: "90%",height: "auto"}} src={window.location.origin+'/public/images/'+plan.logo} />
                </th>
                
              ))}
              </tr>
            </thead>
            
            <tbody >
               <tr>
                <td>Plan Name</td>
                {this.state.compare_plans.map((plan,index )=> (
                index > 3 ?
            <td   style={{pageBreakBefore: 'always'}}>
              {plan.plan_name}
            </td>
            :
            <td>
              {plan.plan_name}
            </td>
            
          ))}
              </tr>
              
              <tr  className="monthly-premium-col">
                <td  >
                  Monthly Premium
                </td>
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                
                <td   style={{pageBreakBefore: 'always'}}> ${plan.monthly_premium} </td>
                
                :
                <td> ${plan.monthly_premium} </td>
               

            
          ))}
          
          
              </tr>
              <tr className="list-rate-col">
                <td>
                  List Rate
                </td>
                 {this.state.compare_plans.map((plan,index) => (
                 
                 index > 3 ?
            <td style={{pageBreakBefore: 'always'}}>
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
                 {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                
                <td style={{pageBreakBefore: 'always'}}> {plan.plan_tier} </td>
                
                :
                <td> {plan.plan_tier} </td>
             
          ))}
                
                
              </tr>
              <tr className>
                <td>
                  Health Saving account Qualified
                </td>
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
            <td style={{pageBreakBefore: 'always'}}>
              {plan.plan_details.hsa_compliant==null?'':plan.plan_details.hsa_compliant}
            </td>
            :
            
            <td>
              {plan.plan_details.hsa_compliant==null?'':plan.plan_details.hsa_compliant}
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
                 {this.state.compare_plans.map((plan,index) => (
                 
                 index > 3 ?
                 
            <td style={{pageBreakBefore: 'always',fontSize:"0.8rem"}}>
            
              <span>Individual: ${plan.deductible_in} </span>
              <span>Family: ${plan.family_in}</span>
            </td>
            
            :
            
            <td style={{fontSize:"0.75rem"}}>
              
              <span>Individual: ${plan.deductible_in} </span>
              <span>Family: ${plan.family_in}</span>
            </td>
            
            
          ))}
              </tr>
              
              
              <tr>
                <td>
                  Out of Pocket Max
                </td>
                 {this.state.compare_plans.map((plan,index) => (
                 
                 index > 3 ? 
            <td style={{pageBreakBefore: 'always',fontSize:"0.8rem"}} >
           
              <span>Individual: { plan.max_individual_in  !== "0"  ?
                   "$"+plan.max_individual_in : 'N/A'  
               } </span>
              <span>Family: { plan.max_family_in  !== "0"  ?
                   "$"+plan.max_family_in : 'N/A'  
               }</span>
            </td>
            :
            
            <td style={{fontSize:"0.75rem"}}>
              <span>Individual: { plan.max_individual_in  !== "0"  ?
                   "$"+plan.max_individual_in : 'N/A'  
               } </span>
              <span>Family: { plan.max_family_in  !== "0"  ?
                   "$"+plan.max_family_in : 'N/A'  
               }</span>
               </td>
            
          ))}
            </tr>
              
              
              <tr className="network-row">
                <td>
                  <b>Drugs</b>
                </td>
                <td>
                  
                </td>
                <td>
             
                </td>
              </tr>
              
              <tr className="network-row">
                <td>
                  Generic Drugs
                </td>
                
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
             <td style={{pageBreakBefore: 'always'}}>
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
                  Preferred Generic Drugs
                </td>
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                  Non Preferred Brand Drugs
                </td>
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                  Specialty Drugs
                </td>
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                
                <td style={{pageBreakBefore: 'always'}}>
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
                  Preventive Care Services
                </td>
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ? 
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index )=> (
                
                index > 3 ? 
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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
                {this.state.compare_plans.map((plan,index) => (
                index > 3 ?
                <td style={{pageBreakBefore: 'always'}}>
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