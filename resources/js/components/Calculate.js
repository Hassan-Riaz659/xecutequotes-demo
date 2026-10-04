import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import {Link} from 'react-router-dom';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';
import DataTable, { createTheme } from 'react-data-table-component';
import TableRowPlans from './TableRowPlans';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

import $ from 'jquery';

var baseUrl = window.location.origin;
var companyLogo = baseUrl + "/public/landingImages/companyLogo.png";



export default class Calculate extends Component {
    constructor (props){
        super(props);
        
        this.url = window.location.origin;

        this.state = {
            clientid:'',
            calculated_client_id:'',
            clientname: '',
            no_of_employees:'',
            no_of_dependents:'',
            no_of_spouses:'',
            total_people:'',
            plans:[],
            compare_array:[],
            Check_compare_array:[],
            selectedPlanType:'',
            selectedMetalLevel:'',
            selectedCompanyType:'',
            sortByPrice:'',
            disabledProp:true,
            modalShow:'none',
            modalArray:[],
            filters: {
                type: '',
                metal:'',
                sort_by_price:''
            },
            filterCheck:'',
            user_id:'',
            type:'',
            planTypeArray:[],
            metalTypeArray:[],
            companyTypeArray:[],
            metalType:'',
            priceType:'',
            companyType:'',
        };
        
        this.comparePlans = this.comparePlans.bind(this);
        this.changeCensus = this.changeCensus.bind(this);
        this.setCompareArray = this.setCompareArray.bind(this);
        this.popCompareArray = this.popCompareArray.bind(this);
        this.planTypeFilter = this.planTypeFilter.bind(this);
        this.companyTypeFilter = this.companyTypeFilter.bind(this);
        this.metallevelFilter = this.metallevelFilter.bind(this);
        this.priceFilterChange = this.priceFilterChange.bind(this);
        this.handleScroll =  this.handleScroll.bind(this);
        this.myRef = React.createRef();
        this.afterSetStateFinished = this.afterSetStateFinished.bind(this);
        this.ifPlanChecked = this.ifPlanChecked.bind(this);
        this.ifMetalChecked = this.ifMetalChecked.bind(this);
        this.ifPriceChecked = this.ifPriceChecked.bind(this);
        this.ifInsCompany  = this.ifInsCompany.bind(this);
        
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
    setTimeout(function(){
        $('#loading').fadeIn();
    });

});


 
       

$(window).scroll(function() {    
    var scroll = $(window).scrollTop(); 
    
    if (scroll <= 160) {
        $(".main-compare-btn").removeClass("main-compare-btn3").addClass("main-compare-btn2");
        return
    }
    if (scroll >= 160) {
        $(".main-compare-btn2").removeClass("main-compare-btn2").addClass("main-compare-btn3");
        return
    }
})  


    let client_id = localStorage["calculate_client_id"];
    
    let state = localStorage["appState"];
    
    if (client_id) {
        
      let AppState = JSON.parse(client_id);
      let AppState2 = JSON.parse(state);
    
    axios.get(this.url+'/api/get-calculated-employees/'+AppState.client_id+'/'+AppState2.user.id)
      .then(res => {
          if(res.data.data==1)
          {

             this.setState({
                user_id:AppState2.user.id,
                clientid:res.data.client.id,
                clientname: res.data.client.name,
                no_of_employees:res.data.client.employee_count,
                no_of_spouses:res.data.client.spouse_count,
                no_of_dependents:res.data.client.dependent_count,
                total_people:res.data.client.emp_count,
                plans:res.data.plans,
                emptyCheck:true
             });
             /* update local storage credit_left value */
             let appState = {
             isLoggedIn: true,
             user: res.data.user
           };
           localStorage["appState"] = JSON.stringify(appState);
             
             
             
          }
          else if(res.data.data==0)
          {
              Swal.fire({
                  icon: 'error',
                  title: 'No plans available for that zip!',
                  text: 'Please enter valid zip!',
                })

          }
          else if(res.data.data==2)
          {
              Swal.fire({
                  icon: 'error',
                  title: 'No plans available for this year!',
                  text: 'Please enter valid year!',
                })

          }
      })
      .catch((error) => {
        console.log(error);
      })
    }

  }
  
  
  
  priceFilterChange(e){
      
      
              $(".compare-row").hide();
        
         $(".loader").show();
        

    
    this.setState({
        //filters: filters,
        sortByPrice:e.target.value
        
    });
      let priceSelected = '';
      if(e.target.value == this.state.priceType)
      {
            priceSelected = priceSelected;
            this.setState({
                priceType:'',
                sortByPrice:''
            });
      }
      else
      {
          priceSelected = e.target.value;
      }
      
    
    let client_id = localStorage["calculate_client_id"];
    
    if(client_id){
        let AppState = JSON.parse(client_id);
        const filter = {
            //filters:filters,
            id: AppState.client_id,
            sortByPrice:priceSelected,
            selectedPlanType:this.state.selectedPlanType,
            selectedCompanyType:this.state.selectedCompanyType,
            selectedMetalLevel:this.state.selectedMetalLevel,
            compareArray:this.state.compare_array
        }

        axios.put(this.url+'/api/filter-plans/', filter)
      .then(res => {

            
            for (let i=0;i<this.state.compare_array.length;i++){

                let id  = this.state.compare_array[i];

            }
      
            this.setState({plans: res.data.plans});

        
    // Hide the div
    setTimeout(function(){
   $('.loader').hide();// or fade, css display however you'd like.
}, 500);
    
       setTimeout(function(){
   $('.compare-row').show();// or fade, css display however you'd like.
}, 500);

      });
    }
  }
  
  
  setCompareArray(ele,id)
  {

      this.state.compare_array.push(ele);
      if(this.state.compare_array.length >=1){
        this.setState({
            disabledProp:false
            })  
      }
    let planss= [...this.state.plans];
    
    planss[id].checked = true;

    this.setState({
        plans:planss
    })

  let result = this.state.plans.find(obj =>obj.id == ele )



      let prevArray = [...this.state.modalArray];
      prevArray.push(result);
      this.setState({
            modalArray: prevArray
            
        },()=> this.afterSetStateFinished())  
  }
  
  afterSetStateFinished()
  {
      if(this.state.compare_array.length >0)
      {

          this.setState({
                modalShow:'flex'      
          });
      }
      else
      {
          this.setState({
                modalShow:'none'      
          });
      }
  }
  
  
  planTypeFilter(e)
  {
      
    //   let planArray = [...this.state.planTypeArray];
    //   //let prevArray = [...this.state.modalArray];
    //   planArray.push(this.state.type);
       //send complete below array to backend and use and do the same for all filter except for htl and lth
       console.log('typessss',this.state.planTypeArray);
      
              $(".compare-row").hide();
        
         $(".loader").show();
        
   
   
       $(this).removeProp('checked');
   
    
    
          let array = [];
          this.setState({emptyCheck:false});
                
      this.setState({
          selectedPlanType:e.target.value
      });
      
      let planSelected = '';
      if(e.target.value == this.state.type)
      {
            planSelected = planSelected;
            this.setState({
                type:''
            });
      }
      else
      {
          planSelected = e.target.value;
      }
      

      let client_id = localStorage["calculate_client_id"];

        
    if (client_id) {
      let AppState = JSON.parse(client_id);
      const filter = {
        id: AppState.client_id,
        sortByPrice:this.state.sortByPrice,
        //selectedPlanType:planSelected,
        selectedPlanType:this.state.planTypeArray,
        selectedMetalLevel:this.state.metalTypeArray,
        selectedCompanyType:this.state.companyTypeArray,
        compareArray:this.state.compare_array
    }

      axios.put(this.url+'/api/filter-plans/', filter)
      .then(res => {

          for (let i=0;i<this.state.compare_array.length;i++){

                let id  = this.state.compare_array[i];

          }
      
        this.setState({plans: res.data.plans});

    // Hide the div
    setTimeout(function(){
   $('.loader').hide();// or fade, css display however you'd like.
}, 500);
    
       setTimeout(function(){
   $('.compare-row').show();// or fade, css display however you'd like.
}, 500);

       
       
        
        
      });
    }
  }
  
  companyTypeFilter(e)
  {
        //console.log('',)
                   $(".compare-row").hide();
        
         $(".loader").show();
        
   
   
       $(this).removeProp('checked');
   
      let companySelected = '';
      
      if(e.target.value == this.state.companyType)
      {

            companySelected = companySelected;
            this.setState({
                companyType:'',
                selectedCompanyType:''
            });
      }
      else
      {
          companySelected = e.target.value;
      }
   

          let array = [];
          this.setState({emptyCheck:false});
                
      this.setState({
          selectedCompanyType:e.target.value
      });
    
      let client_id = localStorage["calculate_client_id"];


    if (client_id) {
      let AppState = JSON.parse(client_id);
      const filter = {
        id: AppState.client_id,
        sortByPrice:this.state.sortByPrice,
        selectedPlanType:this.state.planTypeArray,
        selectedMetalLevel:this.state.metalTypeArray,
        selectedCompanyType:this.state.companyTypeArray,
        compareArray:this.state.compare_array
    }

      axios.put(this.url+'/api/filter-plans/', filter)
      .then(res => {

          for (let i=0;i<this.state.compare_array.length;i++){

                let id  = this.state.compare_array[i];
                


          }
      
        this.setState({plans: res.data.plans});
        // Hide the div
            setTimeout(function(){
           $('.loader').hide();// or fade, css display however you'd like.
        }, 500);
            
               setTimeout(function(){
           $('.compare-row').show();// or fade, css display however you'd like.
        }, 500);
        
         });
    } 
  }
  
  metallevelFilter(e)
  {
        console.log('metal',this.state.metalTypeArray);      
      $(".compare-row").hide();
        
      $(".loader").show();

      this.setState({
          selectedMetalLevel:e.target.value
      });
        
      let metalSelected = '';
      if(e.target.value == this.state.metalType)
      {
            metalSelected = metalSelected;
            this.setState({
                metalType:'',
                selectedMetalLevel:''
            });
      }
      else
      {
          metalSelected = e.target.value;
      }
    
      let client_id = localStorage["calculate_client_id"];


//metalTypeArray

    if (client_id) {
      let AppState = JSON.parse(client_id);
      const filter = {
        id: AppState.client_id,
        sortByPrice:this.state.sortByPrice,
        selectedPlanType:this.state.planTypeArray,
        selectedMetalLevel:this.state.metalTypeArray,
        selectedCompanyType:this.state.companyTypeArray,
        compareArray:this.state.compare_array
    }

      axios.put(this.url+'/api/filter-plans/', filter)
      .then(res => {
          
          for (let i=0;i<this.state.compare_array.length;i++){

                let id  = this.state.compare_array[i];
                


          }
      
        this.setState({plans: res.data.plans});

        
         // Hide the div
    setTimeout(function(){
   $('.loader').hide();// or fade, css display however you'd like.
}, 500);
    
       setTimeout(function(){
   $('.compare-row').show();// or fade, css display however you'd like.
}, 500);

      });
    }
  }
  


popCompareArray(ele,id)
  {
      
      
    var index = this.state.compare_array.indexOf(ele);

    if (index !== -1) {
        this.state.compare_array.splice(index, 1);
        this.setState({compare_array: this.state.compare_array});
    }
      if(this.state.compare_array.length >=1){
        this.setState({
            disabledProp:false
            })  
      }
      else
      {
          this.setState({
            disabledProp:true
            })    
      } 
    
    let plan= [...this.state.plans];
    
    plan[id].checked = false;
    this.setState({
        plans:plan
    })

      
  let result = this.state.plans.find(obj => obj.id == ele)
    // let eleArray = [];
    // eleArray.push(result);
        
      
      let prevArray = [...this.state.modalArray];
      prevArray.splice(index,1);

      this.setState({
            modalArray: prevArray
        },()=> this.afterSetStateFinished())
        
  }
  
  tabRow(){
      
      if(this.state.plans instanceof Array){

            console.log('arrays',this.state.plans);
            
         return this.state.plans.map(function(objj, i){
            
             return <TableRowPlans obj={objj} key={i}  index={i} setCompareArray={this.setCompareArray} popCompareArray={this.popCompareArray}
               compareArray={this.state.compare_array} />;
         }.bind(this))
         
       }
       else
       {
           //console.log('fucked up');
       }
     }
     
     comparePlans()
     {
         this.props.history.push({
             pathname:'/compare-price',
             state:{array: this.state.compare_array,recheckPlan:false}
         }); 
     }
     
     changeCensus()
     {
            this.props.history.push({
             pathname:'/changeCensus/'});
     }
     
     ifPlanChecked(e)
     {
    //          var index = this.state.compare_array.indexOf(ele);

    // if (index !== -1) {
    //     this.state.compare_array.splice(index, 1);
    //     this.setState({compare_array: this.state.compare_array});
    // }
         
         let type = e.target.value;
         var present = false;
         var added = false;
         //this.state.type.push(type);
         if(this.state.planTypeArray.length > 0)
         {
             for(let i=0; i< this.state.planTypeArray.length; i++ )
             {

                if(this.state.planTypeArray[i] == type)
                {
                    present = true;
                    //$("#"+type).prop('unchecked', true);
                }
             }
         }
         else
         {
             this.state.planTypeArray.push(type);
             $("#"+type).prop('checked', true);
             added = true;
         }
         
         if(present == true)
         {
             //this.state.planTypeArray.pop(type);
            var index = this.state.planTypeArray.indexOf(type);

            if (index !== -1) {
                this.state.planTypeArray.splice(index, 1);
                this.setState({planTypeArray: this.state.planTypeArray});
            }
             
             $("#"+type).prop('unchecked', true);
         }
         else
         {
            if(added == false)
            {
                this.state.planTypeArray.push(type);
                $("#"+type).prop('checked', true);
            }   
         }        
         //this.state.planTypeArray.push(this.state.type);
         
        //  if(this.state.type == type)
        //  {

        //     $("#"+type).prop('unchecked', true);
        //      this.setState({
        //         type:'',
        //         selectedPlanType:''
        //     });
        //  }
         
         
        //  if(type == "HMO"){
        //  $("#PPO").prop('checked', false);
        //  $("#EPO").prop('checked', false);
        //     this.setState({
        //         type:type
        //     })   
             
        //  }
        //  else if(type == "PPO"){
        //  $("#HMO").prop('checked', false);
        //  $("#EPO").prop('checked', false);
        //     this.setState({
        //         type:type
        //     })
        //  }
        //  else if(type == "EPO"){
        //  $("#PPO").prop('checked', false);
        //  $("#HMO").prop('checked', false);
        //     this.setState({
        //         type:type
        //     })
        //  }
        //  else{
        //      $("#PPO").prop('checked', false);
        //      $("#HMO").prop('checked', false);
        //      $("#EPO").prop('checked', false);
        //     this.setState({
        //         type:'',
        //         selectedPlanType:''
        //     });
        //  }
     
         
     }
     
     ifMetalChecked(e)
     {
         let type = e.target.value;
         var present = false;
         var added = false;
         //this.state.type.push(type);
         if(this.state.metalTypeArray.length > 0)
         {
             for(let i=0; i< this.state.metalTypeArray.length; i++ )
             {

                if(this.state.metalTypeArray[i] == type)
                {
                    present = true;
                    //$("#"+type).prop('unchecked', true);
                }
             }
         }
         else
         {
             this.state.metalTypeArray.push(type);
             $("#"+type).prop('checked', true);
             added = true;
         }
         
         if(present == true)
         {
             //this.state.planTypeArray.pop(type);
            var index = this.state.metalTypeArray.indexOf(type);

            if (index !== -1) {
                this.state.metalTypeArray.splice(index, 1);
                this.setState({metalTypeArray: this.state.metalTypeArray});
            }
             
             $("#"+type).prop('unchecked', true);
         }
         else
         {
            if(added == false)
            {
                this.state.metalTypeArray.push(type);
                $("#"+type).prop('checked', true);
            }   
         }
         
         
        //  let type = e.target.value;

        //  if(this.state.metalType == type)
        //  {
        //     $("#"+type).prop('unchecked', true);
        //     this.setState({
        //         metalType:'',
        //         selectedMetalLevel:''
        //     }) 
        //  }
         
        //  if(type == "bronze"){
        //  $("#silver").prop('checked', false);
        //  $("#gold").prop('checked', false);
        //  $("#platinum").prop('checked', false);
        //     this.setState({
        //         metalType:type
        //     }) 
        //  }
         
        //  else if(type == "silver"){
        //  $("#bronze").prop('checked', false);
        //  $("#gold").prop('checked', false);
        //  $("#platinum").prop('checked', false);
        //     this.setState({
        //         metalType:type
        //     })
        //  }
         
        //  else if(type == "gold"){
        //  $("#bronze").prop('checked', false);
        //  $("#silver").prop('checked', false);
        //  $("#platinum").prop('checked', false);
        //     this.setState({
        //         metalType:type
        //     })
        //  }
         
        //  else if(type == "platinum"){
        //  $("#bronze").prop('checked', false);
        //  $("#silver").prop('checked', false);
        //  $("#gold").prop('checked', false);
        //     this.setState({
        //         metalType:type
        //     })
        //  }
        //  else{
        //      $("#bronze").prop('checked', false);
        //      $("#silver").prop('checked', false);
        //      $("#gold").prop('checked', false);
        //      $("#platinum").prop('checked', false);
        //       this.setState({
        //         metalType:'',
        //         selectedMetalLevel:''
        //     });
        //  }    

     }
     
     ifPriceChecked(e)
     {
        
        let type = e.target.value;

         if(this.state.priceType == type)
         {
            $("#"+type).prop('unchecked', true);
            this.setState({
                priceType:'',
                sortByPrice:''
            }) 
             
         }
         
         if(type == "htl"){
         $("#lth").prop('checked', false);
            this.setState({
                priceType:type
            }) 
         }
         
         else if(type == "lth"){
         $("#htl").prop('checked', false);
            this.setState({
                priceType:type
            })
         }
         else
         {
             $("#htl").prop('checked', false);
             $("#lth").prop('checked', false);
             this.setState({
                priceType:'',
                sortByPrice:''
            })
         }
         
     }
     
     ifInsCompany(e)
     {
         let type = e.target.value;
         var present = false;
         var added = false;
         //this.state.type.push(type);
         if(this.state.companyTypeArray.length > 0)
         {
             for(let i=0; i< this.state.companyTypeArray.length; i++ )
             {

                if(this.state.companyTypeArray[i] == type)
                {
                    present = true;
                    //$("#"+type).prop('unchecked', true);
                }
             }
         }
         else
         {
             this.state.companyTypeArray.push(type);
             $("#"+type).prop('checked', true);
             added = true;
         }
         
         if(present == true)
         {
             //this.state.planTypeArray.pop(type);
            var index = this.state.companyTypeArray.indexOf(type);

            if (index !== -1) {
                this.state.companyTypeArray.splice(index, 1);
                this.setState({companyTypeArray: this.state.companyTypeArray});
            }
             
             $("#"+type).prop('unchecked', true);
         }
         else
         {
            if(added == false)
            {
                this.state.companyTypeArray.push(type);
                $("#"+type).prop('checked', true);
            }   
         }
        
        
 
        //  let type = e.target.value;

        //  if(this.state.companyType == type)
        //  {
        //     $("#"+type).prop('unchecked', true);
        //     this.setState({
        //         companyType:'',
        //         selectedCompanyType:''
        //     }) 
             
        //  }
         
        //  if(type == "BCBS"){
        //  $("#THNM").prop('checked', false);
        //  $("#Presbyterian").prop('checked', false);
        //  $("#Friday").prop('checked', false);
        //     this.setState({
        //         companyType:type
        //     }) 
        //  }
         
        //  else if(type == "THNM"){
        //  $("#BCBS").prop('checked', false);
        //  $("#Presbyterian").prop('checked', false);
        //  $("#Friday").prop('checked', false);
        //   this.setState({
        //         companyType:type
        //     })
        //  }
        //  else if(type == "Presbyterian"){
        //  $("#THNM").prop('checked', false);
        //  $("#BCBS").prop('checked', false);
        //  $("#Friday").prop('checked', false);
        //     this.setState({
        //         companyType:type
        //     })
        //  }
        //  else if(type == "Friday"){
        //  $("#THNM").prop('checked', false);
        //  $("#BCBS").prop('checked', false);
        //  $("#Presbyterian").prop('checked', false);
        //     this.setState({
        //         companyType:type
        //     })
        //  }
        //  else
        //  {

        //  $("#Presbyterian").prop('checked', false);
        //  $("#THNM").prop('checked', false);
        //  $("#BCBS").prop('checked', false);
        //  $("#Friday").prop('checked', false);

        //     this.setState({
        //         companyType:'',
        //         selectedCompanyType:''
        //     });
        //   }
         
     }
     
    render() {

    return (
            <div ref={this.myRef}>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                        {/* End Navbar */}
                        <div className="content">

                            <div className="row">

                                <div className="col-12 title-col add-employee-title mb-4">
                                    <h4>{this.state.clientname}</h4>
                                    
                                    <button className="btn btn-primary main-compare-btn pull-right" disabled={this.state.disabledProp}  onClick={this.comparePlans}>Compare</button>
                                </div>

                                <div className="col-lg-3 group-information-col">
                                    <div className="user-card  change-census-col">
                                     <h5>{this.state.clientname}</h5>
                                      <p>{this.state.no_of_employees} Employees</p>
                                        <p>{this.state.no_of_dependents} Dependents</p>
                                        <p>{this.state.no_of_spouses} Spouses</p>
                                        <p>{this.state.total_people} Total Enrolled</p>
                                     
                                     
                                     
                                    <span className="custome-border"></span>
                                    
                                    <div className="form-group">
                                    <h6>Plan Type <span className="question-mark"><a href="#">?</a></span></h6>
                                    <div class="form-check" id="sel1" onChange={this.planTypeFilter} defaultValue={'DEFAULT'}>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifPlanChecked} value="HMO" id="HMO"/>
                                      <label class="form-check-label" for="HMO">
                                        HMO
                                      </label>
                                      <br/>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifPlanChecked} value="PPO" id="PPO"/>
                                      <label class="form-check-label" for="PPO">
                                        PPO
                                      </label>
                                      <br/>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifPlanChecked} value="EPO" id="EPO"/>
                                      <label class="form-check-label" for="EPO">
                                        EPO
                                      </label>
                                      <br/>
                                    </div>
                                    
                                    </div>
                                    
                                   <div className="form-group">
                                    <label>Metal Level</label>
                                    <div class="form-check" id="sel1" onChange={this.metallevelFilter} defaultValue={'DEFAULT'}>
                                         <input class="form-check-input" type="checkbox" onChange={this.ifMetalChecked} value="bronze" id="bronze"/>
                                          <label class="form-check-label" for="bronze">
                                            Bronze
                                          </label>
                                          <br/>
                                         <input class="form-check-input" type="checkbox" onChange={this.ifMetalChecked} value="silver" id="silver"/>
                                          <label class="form-check-label" for="silver">
                                            Silver
                                          </label>
                                          <br/>
                                        <input class="form-check-input" type="checkbox" onChange={this.ifMetalChecked} value="gold" id="gold"/>
                                          <label class="form-check-label" for="gold">
                                            Gold
                                          </label>
                                          <br/>
                                        
                                        <input class="form-check-input" type="checkbox" onChange={this.ifMetalChecked} value="platinum" id="platinum"/>
                                          <label class="form-check-label" for="platinum">
                                            Platinum
                                          </label>
                                          <br/>
                                            
                                    </div>
                                    </div>
                                     <div className="form-group">
                                    <h6>Insurance Company </h6>
                                    <div class="form-check" id="sel1" onChange={this.companyTypeFilter} defaultValue={'DEFAULT'}>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifInsCompany} value="BCBS" id="BCBS"/>
                                      <label class="form-check-label" for="BCBS">
                                        Blue Cross Blue Shield
                                      </label>
                                      <br/>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifInsCompany} value="THNM" id="THNM"/>
                                      <label class="form-check-label" for="THNM">
                                        True Health New Mexico
                                      </label>
                                      <br/>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifInsCompany} value="Presbyterian" id="Presbyterian"/>
                                      <label class="form-check-label" for="Presbyterian">
                                        Presbyterian
                                      </label>
                                      <br/>
                                      <input class="form-check-input" type="checkbox" onChange={this.ifInsCompany} value="Friday" id="Friday"/>
                                      <label class="form-check-label" for="Friday">
                                        Friday Health Plan
                                      </label>
                                      <br/>
                                    </div>
                                    
                                    </div>
                                    <div className="form-group">
                                    <label>Sort by</label>
                                    <div class="form-check" id="sel1" name="sellist1" onChange={this.priceFilterChange} defaultValue={'DEFAULT'}>
                                       <input class="form-check-input" type="checkbox" onChange={this.ifPriceChecked} value="htl" id="htl"/>
                                          <label class="form-check-label" for="htl">
                                            High to Low
                                          </label>
                                          <br/>
                                        <input class="form-check-input" type="checkbox" onChange={this.ifPriceChecked} value="lth" id="lth"/>
                                          <label class="form-check-label" for="lth">
                                            Low to High
                                          </label>
                                          <br/>
                                    </div>
                                    </div>
                                    
                                    <div className="col-md-12 text-center change-cencus-btn mb-2">
                                        <a className="btn " href="">Set to Default</a>
                                      </div>
                                     
                                    </div>

                                </div>
                                
                                <div className="col-lg-9 group-information-col mbl-marginTop">
                                <div className="loader" id="#loading">
                                </div>
                              <div className="row compare-row">
                                  {(() => { 
                                  if(this.state.plans.length > 0)
                                  {
                                   return(
                                     this.tabRow())  
                                  }
                                  else
                                  {
                                   return( 
                                   <div className="change-census-col">
                                        <p>No plans to show</p>
                                   </div>
                                   )   
                                  }
                                      
                                  })()}
                                    
                                </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="modal footer-modal active" id="myModal" style={{display : this.state.modalShow}}>
        <div className="modal-dialog">
          <div className="modal-content">
            
            <div className="modal-header">
              <h4 className="modal-title">Compare</h4>
              <span className="add-employee-title">
              <a href='' className="clear-btn">Clear All</a>
              <button href='' className="btn" disabled={this.state.disabledProp}  onClick={this.comparePlans}>Compare</button>
              
              </span>
            </div>
           
            <div className="modal-body">
              <OwlCarousel className="owl-theme"
              loop ={false} 
              margin={10} 
              nav
              items={1}
              dots={false}
              >
                {this.state.modalArray.map(d => (
                

                <div class="item">

                <div className="card-items">
                 <img src={window.location.origin+'/public/images/'+d.logo} className=""/>
                 <i className="fas fa-close "/>
                 <p>{d.plan_name}</p>
                 <span style={{color: "red", fontSize: "12px", marginBottom: "10px",display: "block"}}> Monthly Premium</span>
                 
                 <span style={{color: "#36395B", fontSize: "12px",display: "block",textAlign: "right"}}>${d.monthly_premium}</span>
                 
                 
                </div>
                 
                </div>                
                
                ))} 



              </OwlCarousel>
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