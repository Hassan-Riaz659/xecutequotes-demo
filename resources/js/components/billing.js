import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';


import $ from 'jquery';

var baseUrl = window.location.origin;



export default class CardDetails extends Component {
    constructor (props){
        super(props);
        this.url = window.location.origin;
        this.state={
            annualValue:2500.00,
            amountVal:0,
            card_num:'',
            cvv:'',
            card_expiry:'',
            exp_month:'',
            exp_year:'',
            no_of_licenses:'',
            gTotal:'',
            licenseArray:[],
            packagesArray:[],
            no_of_packages:0,
            cardNumberOK:0,
            expiryDate:0,
            cvvOK:0,
            licensesOK:0,
            errorEmptyCard:'none',
            errorCardLessDigits:'none',
            errorEmptyCvv:'none',
            errorCvvLessDigits:'none',
            choice:'',
            disabledProp:false,
            subscription_type:'',
            currentYear:'',
            mmError:'none',
            twoDigits:'none',
            user_id:'',
            userEmail:'',
            packageChoice:''
        }
        this.handleChangeAdditionalLicense = this.handleChangeAdditionalLicense.bind(this);
        this.handleChangePackages = this.handleChangePackages.bind(this);
        this.handleChangeCardNumber = this.handleChangeCardNumber.bind(this);
        this.handleChangeCVV = this.handleChangeCVV.bind(this);
        this.handleChangeCardExpiry1 = this.handleChangeCardExpiry1.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleCreditQuestion = this.handleCreditQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    componentWillMount() {
        
        var list = [];
        for (var i = 1; i <= 10; i++) {
            list.push(i);
        }
        this.setState({
            licenseArray:list,
            packagesArray:list,
            amountVal:this.state.annualValue
        })
        
      //     let state = localStorage["appState"];
    // if (state) {
    //   let AppState = JSON.parse(state);
    //   if(AppState.isLoggedIn ===true)
    //   {
    //     this.props.history.push('/');   
    //   }
    //   //this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
    // }
    

     
        
        let state = localStorage["appState"];
        
        
        if (state) {
        let AppState = JSON.parse(state);

      if(AppState.user.role_id == 3)
      {

        this.props.history.push('/');   
      }
      
        if(AppState.user.subscription_type=='free'){
            
            var amount = 2500.00;
            var bought_credits = AppState.user.bought_credits;
            if(bought_credits != null)
            {
             bought_credits = bought_credits * 25.00;
             amount = 2500.00 - bought_credits;
            }
            
            
            this.setState({
                annualValue:2500.00,
                user_id:AppState.user.id,
                userEmail:AppState.user.email,
                subscription_type:'free',
                amountVal:amount
            })
        }
        else if(AppState.user.subscription_type=='annual'){
            this.setState({
                annualValue:0,
                amountVal:0,
                user_id:AppState.user.id,
                subscription_type:'annual',
                userEmail:AppState.user.email
            })
        }
        else{
            this.setState({
                annualValue:0,
                subscription_type:AppState.user.subscription_type
            })
        }
        }
        
    }
    

    componentDidMount() {
        $(document).ready(function () {
            $(".App-header").hide();
        })
        
        let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
      if(AppState.user.subscription_type =='annual'){
        //so when end date has come just change the subscription_type in user table to expired 
        
        Swal.fire({
                  icon: 'info',
                  title: 'You have already subscribed to annual plan',
                  text: 'Please buy extra licenses',
                })
        $("#submitBtn").prop('disabled', true);
        
      this.setState({annualValue: 0 });
      }
      else
      {
          $("#submitBtn").prop('disabled', true);
            var amount = 2500.00;
            var bought_credits = AppState.user.bought_credits;
            if(bought_credits != null)
            {
             bought_credits = bought_credits * 25.00;
             amount = 2500.00 - bought_credits;
            }
            this.setState({annualValue: amount});
      }
      
    }
    var date = new Date().getFullYear();
        this.setState({
            currentYear:date
        });
    }
    

    

    
    handleChangeCardNumber(e){
    
     if(e.target.value == '' || e.target.value.length != 16 )
     {  
         $("#submitBtn").prop('disabled', true);
         if(e.target.value == '')
         {
           this.setState({
            errorEmptyCard:'block',
           })             
         }
         else if(e.target.value.length != 16)
         {
            this.setState({
            errorCardLessDigits:'block',
           })                 
         }
         else
         {
             
         }
    
     }
     else
     {
        //  $("#submitBtn").prop('disabled', false);
        //  console.log("disabled false 1");
        this.setState({
            card_num:e.target.value,
            errorEmptyCard:'none',
            errorCardLessDigits:'none',
            cardNumberOK:1
        })
        if(this.state.card_expiry == '' || this.state.errorEmptyCvv == 'block' || this.errorCvvLessDigits == 'block' || this.state.cvv == '' || this.state.choice == '' || this.state.mmError== "block")
        {
          $("#submitBtn").prop('disabled', true);        
        }
        else
        {
          $("#submitBtn").prop('disabled', false);  
         
        }
    }
    }
    
    
    handleChangeCVV(e)
    {
    if(e.target.value == '' || e.target.value.length != 3)
     {   
        $("#submitBtn").prop('disabled', true);
        if(e.target.value == '')
         {
           this.setState({
            errorEmptyCvv:'block',
           })             
         }
         else if(e.target.value.length != 3)
         {
            this.setState({
            errorCvvLessDigits:'block',
           })                 
         }
         else
         {
             
         }
     }
     else
     {
        $("#submitBtn").prop('disabled', false);
        
        this.setState({
            cvv:e.target.value,
            errorEmptyCvv:'none',
            errorCvvLessDigits:'none',
            cvvOK:1,
        })
    	if(this.state.card_expiry == '' || this.state.errorCardLessDigits == 'block' || this.state.errorEmptyCard == 'block' || this.state.card_num == ''  || this.state.choice == '' || this.state.mmError== "block")
        {
          $("#submitBtn").prop('disabled', true);        
        }
        else
        {
          $("#submitBtn").prop('disabled', false);
        
        }
     }    
    }
    
    handleSubmit(e){
        e.preventDefault();
        
        let state = localStorage["appState"];
       if(this.state.amountVal != 0 ){
        if (state) {
        let AppState = JSON.parse(state);
        const postData = {
                amount:this.state.amountVal,
                licenses:this.state.no_of_licenses,
                gTotal:this.state.gTotal,
                user_id:AppState.user.id,
                card_num:this.state.card_num,
                cvv: this.state.cvv,
                exp_month: this.state.exp_month,
                exp_year: this.state.exp_year,
                extra_lisences:this.state.choice,
                subscription_type:this.state.subscription_type
            }
    axios.post(this.url+'/api/update-billing', postData)
      .then(response => {
      if(response.data.data==1){
        //   Swal.fire({
        //           position: 'center',
        //           icon: 'success',
        //           title: 'Payment successful!',
        //           showConfirmButton: false,
        //           timer: 1500
        //         })

                 let appState = {
                     isLoggedIn: true,
                     user: response['data']['user']
                  };
                  localStorage["appState"] = JSON.stringify(appState);
              
          this.props.history.push('/dashboard')
          
          
      }else{
          
            // Swal.fire({
            //       icon: 'error',
            //       title: ' Payment not successful!',
            //       text: 'Please enter valid details!',
            //     })
      }
      });

        }
       }
      else{
        // Swal.fire({
        //           icon: 'error',
        //           title: 'Amount is invalid!',
        //           text: 'Please enter valid amount!',
        //         })
      }
        
    }
    
    handleCreditQuestion(e)
    {
        //console.log('credit question',e.target.value);
        if(e.target.value == "yes")
        {
          this.setState({
            choice:"no"        
          })            
        }
        this.setState({
            packageChoice:e.target.value        
        })
        $("#submitBtn").prop('disabled', true);
    }
    
    handleQuestion(e){
    
    this.setState({
        choice: e.target.value  
    })
    
        let state = localStorage["appState"];
        
        if (state) {
        let AppState = JSON.parse(state);
        
    if(e.target.value == 'no' && AppState.user.subscription_type=='annual' )
    {

         $("#submitBtn").prop('disabled', true);    
         this.setState({
            amountVal:0
             
         })
            if(this.state.mmError === "block")
            {

                $("#submitBtn").prop('disabled', true);           
            }
            else
            {

                $("#submitBtn").prop('disabled', true);
            }
    }
    else if(e.target.value == 'yes' && AppState.user.subscription_type=='annual' )
    {

         $("#submitBtn").prop('disabled', true);    
         
            if(this.state.mmError === "block")
            {

                $("#submitBtn").prop('disabled', true);           
            }
            else
            {

                $("#submitBtn").prop('disabled', true);
            }
    }

    else if(e.target.value == 'no' && AppState.user.subscription_type=='free')
    {

        this.setState({
            amountVal:this.state.amountVal
        })
        
            if(this.state.mmError === "block")
            {

                $("#submitBtn").prop('disabled', true);           
            }
            else
            {

                $("#submitBtn").prop('disabled', false);
                
            }
     //$("#submitBtn").prop('disabled', false);   
    }
    
    else if(e.target.value == 'no' && AppState.user.subscription_type==0)
    {

        this.setState({
            amountVal:2500.00
        })
        
            if(this.state.mmError === "block")
            {

                $("#submitBtn").prop('disabled', true);           
            }
            else
            {

                $("#submitBtn").prop('disabled', false);
                
            }
    //$("#submitBtn").prop('disabled', false);        
    }
    else
    {

        $("#submitBtn").prop('disabled', false);
       
        
            if(this.state.mmError === "block")
            {

                $("#submitBtn").prop('disabled', true);           
            }
            else
            {

                $("#submitBtn").prop('disabled', false);
                
            }
    //$("#submitBtn").prop('disabled', false);    
    }
    }
    }
    
    handleChangePackages(e)
    {
        
        var total = 100.00 * e.target.value;
        total = total.toFixed(2);
        this.setState({
            amountVal:total,
            no_of_packages:e.target.value,
            choice:"no"
        })
        $("#submitBtn").prop('disabled', false);
       
    }
    
    handleChangeAdditionalLicense(e){
        let state = localStorage["appState"];
        if (state) {
        let AppState = JSON.parse(state);
        if(e.target.value==''){
            if(AppState.user.subscription_type == 0 || AppState.user.subscription_type == 'free')
            {
            
            this.setState({
            amountVal:this.state.annualValue,
            no_of_licenses:e.target.value
            })
            
            }
            else
            {
                
              this.setState({
            amountVal:0,
            no_of_licenses:e.target.value
            })  
            }
        }
        else{
            
        this.setState({
            amountVal:this.state.annualValue,
            no_of_licenses:e.target.value,
            gTotal:e.target.value
        })
        

            
            axios.get(this.url+'/api/billing-cycle',  {params: {
                data: e.target.value,
                user_id:AppState.user.id
              }}).then((response) => {
         
            var num = response.data.gTotal.toFixed(2)
            if(num > 0)
            {
              if(this.state.errorCardLessDigits == 'block' || this.state.errorEmptyCard == 'block' || this.state.errorEmptyCvv == 'block' || this.state.errorCvvLessDigits == 'block' || this.state.card_num =='' || this.state.card_expiry == '')
              {
                  $("#submitBtn").prop('disabled', true);
              }
              else
              {
                $("#submitBtn").prop('disabled', false);   
               
              }
            }
            else
            {
                $("#submitBtn").prop('disabled', true);
            }
             this.setState({
            amountVal:num
            })
            
            });
            var additional_license = parseInt(e.target.value);
            var value = this.state.annualValue;
            var total = value*additional_license;
            value = total+value;        
        }
        }
    }

handleChangeCardExpiry(e){


	this.setState({
		card_expiry:e.target.value
	})
    if(e.target.value =='')
    {
      $("#submitBtn").prop('disabled', true);  
    }
    else
    {
      $("#submitBtn").prop('disabled', false);  
     
    }
    
    if(e.target.value.length==1 && e.target.value > 1)
    {
        this.setState({
            twoDigits:'block'
        })
    
    }
    
    else
    {
        this.setState({
            twoDigits:'none'
        })
    
    }

	if(e.target.value.length==2 && e.target.value >= 13){
      
      if(e.target.value.length==2 && e.target.value > 12)
        {  
               this.setState({
                twoDigits:'block'
            })
    
        }
        else
        {
            this.setState({
                twoDigits:'none'
            })
    
        }	    
	    e.target.value=e.target.value.slice(0, -1);
	    
	    this.setState({
	        card_expiry: e.target.value
	    })
	}
	else if(e.target.value.length==2){
	    if (e.target.value.indexOf('/') > -1){
	        /* leave empty */
	    }else{
		    this.setState({
    	        card_expiry: e.target.value+'/'
    	    })
	    }
	}
	
	if(e.target.value.length==5){
	    var current_year=new Date().getFullYear().toString().substr(-2);
	    var user_year=e.target.value.split('/');
	    //console.log("user_year",user_year);
	    var int_year=parseInt(user_year[1]);
	    
	    if(user_year[1]<current_year){
	        e.target.value=e.target.value.slice(0, -2);
            this.setState({
    	        card_expiry: e.target.value
    	    })
	    }
	    if(user_year[0] >= 13)
	    {
	      this.setState({
	        mmError: "block"
	    })  
         
         $("#submitBtn").prop('disabled', true);   

	    }
	    else
	    {
	     this.setState({
	        mmError: "none"
	    })

	    if(this.state.errorCardLessDigits == 'block' || this.state.errorEmptyCard == 'block' || this.state.errorEmptyCvv == 'block' || this.state.errorCvvLessDigits == 'block' || this.state.card_num =='' || this.state.cvv =='' || this.state.choice == '')
	    {
	      $("#submitBtn").prop('disabled', true);   
	    }
	    else
	    {
	      $("#submitBtn").prop('disabled', false);
	
	    }
	    }
	}

}

handleChangeCardExpiry1(e){
    this.setState({
    	        card_expiry: e.target.value
    	    })
    if(e.target.value.length==2 && e.target.value<=12){
	    if (e.target.value.indexOf('/') > -1){
	        /* leave empty */
	    }else{
		    this.setState({
    	        card_expiry: e.target.value+'/'
    	    })
	    }
	    $("#submitBtn").prop('disabled', true);
	}
	else if(e.target.value.length==2 && e.target.value>12){
	    e.target.value=e.target.value.slice(0, -1);
	    
	    this.setState({
	        card_expiry: e.target.value
	    });
	    Swal.fire({
                  icon: 'error',
                  title: 'Please enter a valid month!',
                })
                $("#submitBtn").prop('disabled', true);
	}
	else if(e.target.value.length==5){
	    var current_year=new Date().getFullYear().toString().substr(-2);
	    var user_year=e.target.value.split('/');
	    if(user_year[0].length==1){
	        Swal.fire({
                  icon: 'error',
                  title: 'Please follow the format MM/YY!',
                })
                $("#submitBtn").prop('disabled', true);
	    }
	    else if(user_year[1]<current_year){
	        e.target.value=e.target.value.slice(0, -2);
            this.setState({
    	        card_expiry: e.target.value
    	    })
	    Swal.fire({
                  icon: 'error',
                  title: 'Please enter year equal to or greater than 20'+current_year+'!',
                })
                $("#submitBtn").prop('disabled', true);
	}
	else if(user_year[1]==current_year){
	    var current_month=new Date().getMonth()+1;  //adding 1 since getMonth() counts jan=0 and dec=11
	    if(user_year[0]<current_month){
	        Swal.fire({
                  icon: 'error',
                  title: 'Please enter month equal to or greater than '+current_month+'!',
                })
                $("#submitBtn").prop('disabled', true);
	    }
	}
	}else{
	    
	    if(e.target.value == " " || e.target.value.length !=4 || this.state.errorCardLessDigits == 'block' || this.state.errorEmptyCard == 'block' || this.state.errorEmptyCvv == 'block' || this.state.errorCvvLessDigits == 'block' || this.state.card_num =='' || this.state.cvv =='' || this.state.choice == '')
	    {
	      $("#submitBtn").prop('disabled', true);   
	        
	        
	    }
	    else
	    {
	      $("#submitBtn").prop('disabled', false);
	       
	    }
	    
	}
}

    render() {
        const {value} = this.state;
     
        return (
            <div>
                <div className="wrapper">
                    <Sidebar />
                    <div className="main-panel">
                        {/* Navbar */}
                        <DashboardHeader />
                        {/* End Navbar */}
                        <div className="content">
                            <div className="row">
                                <div className="col-12 title-col add-employee-titlt mb-4">
                                    <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left"/></Link> Update Billing Method</h4>
                                </div>
                                
                                <div className="col-md-12 col-12 profile-setting-col pl-0 pr-0">
                                <div className="col-12 group-information-col mb-4">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>Update Billing Method</h5>
                                    <form id="VelocityCheckoutForm" name="VelocityCheckoutForm" className="row">
                                            <div className="form-group col-md-12">
                                                <label>Card Number</label>
                                                <input type="text" id="PAN" name="PAN" onChange={this.handleChangeCardNumber} className="form-control"  placeholder="Enter Card No" maxLength = "16" required />
                                                <span style={{display:this.state.errorEmptyCard,color:'red'}}>Card field is empty</span>
                                                <span style={{display:this.state.errorCardLessDigits,color:'red'}}>Please enter 16 digits</span>
                                                </div>
                                                
                                                
                                                
                    <div className="form-group col-md-6">
                        <label htmlFor="exampleInputEmail1">Expiry Date</label> 
                        <input type="text" className="form-control" id="Expire" name="Expire" maxLength={5} placeholder="MM/YY" onChange={this.handleChangeCardExpiry1} value={this.state.card_expiry} required/>
                        <span style={{ display:this.state.mmError,'color':'red'}}>Month is invalid</span>
                        <span style={{ display:this.state.twoDigits,'color':'red'}}>Please add 0 before month</span>
                    </div>

                                                
                    <div className="form-group col-md-6">
                    <label>Card CVV</label>
                    <input type="text" id="CVV" name="CVV" className="form-control" onChange={this.handleChangeCVV} placeholder="Enter cvv" maxLength = "3" required />
                    <span style={{display:this.state.errorEmptyCvv,color:"red"}}>Cvv field is empty</span>
                    <span style={{display:this.state.errorCvvLessDigits,color:"red"}}>Please enter 3 digits</span>
                    </div>
                                                
                    <div className="form-group col-md-12">
                    <label>Email</label>
                    <input type="email" id="Email" name="Email" value={this.state.userEmail} className="form-control" />
                    </div>
                
            {(() => { 
        
                
                   if(this.state.subscription_type === 'free'){
                        return(                
                <div className="form-group col-md-12">
		            <div className="form-group ">
                        <label>Do you want to buy credit(s)?</label>
                          <div className="form-group">
                            
                            <select onChange={this.handleCreditQuestion} required className="form-control">
                                        <option value="" disabled selected>Choose Option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                        
                             </select>
                           </div>
                    </div>
                </div>
                 )}
            
            })()}                        

                
            {(() => { 
        
                
                   if(this.state.packageChoice === 'yes'){
                        return(
                   <div className="form-group col-md-12">
                       <label>How many package(s) do you want to buy? ($100 per each package)</label>
                       <p>Note:4 credits in a package</p>
                        <select className="form-control" onChange={this.handleChangePackages}>
                        <option value="">None</option>
                         {this.state.packagesArray.map(opt => (
                           <option value={opt}>{opt}</option>
                        ))}
                        </select>
                   </div>
                        )}
            
            })()}
            
            {(() => { 
        
                        if(this.state.packageChoice === 'no' || this.state.subscription_type =='annual'){
                        return(    
                <div className="form-group col-md-12">
		            <div className="form-group ">
                        <label>Do you want an extra license(s)?</label>
                          <div className="form-group">
                            
                            <select onChange={this.handleQuestion} required className="form-control">
                                        <option value="" disabled selected>Choose Option</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                        
                             </select>
                           </div>
                    </div>
                </div>
                 )}
            
            })()}
            
                
                    {(() => { 
        
                        if(this.state.choice === 'yes'){
                        return(
                   <div className="form-group col-md-12">
                       <label>How many license(s) you want to buy additional? ($1000 per each license)</label>
                        <select className="form-control" onChange={this.handleChangeAdditionalLicense}>
                        <option value="">None</option>
                         {this.state.licenseArray.map(opt => (
                           <option value={opt}>{opt}</option>
                        ))}
                        </select>
                   </div>
                        )}
                      else if(this.state.choice === 'no'){
                      
                          }
                        else{ 
                        
                            
                        }
                              
                        
                    })()}
                    <div className="form-group col-md-12">
                    <label>Total Amount to be Paid</label>
                    <input type="amount" id="Amount" name="Amount" className="form-control"  value={this.state.amountVal==2500?"2500.00":this.state.amountVal} disabled/>
                    </div>
                    
              <div>
                    <input type="hidden" name="userId" id="userId" value={this.state.user_id}/>
                    <input type="hidden" name="noOfLicenses" id="noOfLicenses" value={this.state.no_of_licenses}/>
                    <input type="hidden" name="noOfPackages" id="noOfPackages" value={this.state.no_of_packages}/>
                    <input type="hidden" name="extraLicenses" id="extraLicenses" value={this.state.choice}/>
                    <input type="hidden" name="packageChoice" id="packageChoice" value={this.state.packageChoice}/>
                    <input type="hidden" name="subscriptionType" id="subscriptionType" value={this.state.subscription_type}/>
                    <input type="hidden" name="FailureCallback" defaultValue="velocityFailureCallback" /><input type="hidden" name="SuccessCallback" defaultValue="velocitySuccessCallback" /><input type="hidden" name="PublicKey" defaultValue="eyAidGVybWluYWxQcm9maWxlSWQiOiA0ODAyOSB9" /><input type="hidden" id="reCaptcha" name="Captcha" value=""/>
            </div>
      <div className="g-recaptcha" 
        id="g-recaptcha" 
        data-callback="responseCaptcha" 
        data-sitekey="6LcCXwwUAAAAAO8617hw-277eL5cMAJ5SBsebhWk">
      </div>

         
    <div>
                    {(() => { 
        
                        if(this.state.amountVal == 0){
                        return(
                            <button disabled="true" type="button" id="submitBtn" className="btn next-btn">Send Payment</button>
                        )
                        }
                        else
                        {
                        return(
                              <button onClick={()=>Velocity.sendPost()} type="button" id="submitBtn" className="btn next-btn">Send Payment</button>                            
                        )
                            
                        }
                    })()}

    </div>
                  
                </form>


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
