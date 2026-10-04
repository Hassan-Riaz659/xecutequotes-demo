import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';


var baseUrl = window.location.origin;
var companyLogo = baseUrl + "/public/landingImages/companyLogo.png"

class TableRowPlans extends Component {
  constructor(props) {
      super(props);
      this.url = window.location.origin;
      this.onClickPlanComparison = this.onClickPlanComparison.bind(this);
      this.state={
            arr:[],
            show: false,
            clientId:'',
            plan_summary:'',
            logo:''
            }   
      
      this.handleSummary = this.handleSummary.bind(this);
      this.handleProvider = this.handleProvider.bind(this);
  }
  
  
  componentDidMount(){
      
    $(document).ready(function(){
     $('.loader').hide(); 
    });

  }
  

      

  onClickPlanComparison(e,i)
  {     

        var checked = e.target.checked;
        

        
        console.log('checked',e.target.getAttribute('id'));
        if(checked==true)
        {
            this.props.setCompareArray(e.target.getAttribute('id'),i);
        }
        else
        {
            this.props.popCompareArray(e.target.getAttribute('id'),i);
        }
  }
  
  renderDeductibleField()
  {
      function ReplaceNumberWithCommas(number) {
    //Seperates the components of the number
    var n= number.toString().split(".");
    //Comma-fies the first part
    n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //Combines the two sections
    return n.join(".");
    
}

      if(this.props.obj.plan_details[0]!=null)
      {
      return (
          
    <div className="deductibleNetworkDiv">
          <p>
         <b>{`Annual Deductible`}</b>
          </p>
         <p><b>{`Individual / family`}</b></p>
          <p>
          {`${'$'+ReplaceNumberWithCommas(this.props.obj.plan_details[0].deductible_individual_in_network)} / ${'$'+ReplaceNumberWithCommas(this.props.obj.plan_details[0].deductible_family_in_network)}`}
          </p>
    </div>
      );
      }
      else
      {
          return (
              <p>Missing Information</p>
              );
      }
      
  }
  
  renderPocketMaxField()
  {
       function ReplaceNumberWithCommas(number) {
            //Seperates the components of the number
            var n= number.toString().split(".");
            

            //Comma-fies the first part
            n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            //Combines the two sections
            return n.join(".");
            
        }
      if(this.props.obj.plan_details[0]!=null)
      {
      return (
          <div className="deductibleNetworkDiv">
          <p>
            <b>{` Out of Pocket Max`}</b>
          </p>
          <p>
            <b>{`Individual / family`}</b>
          </p>
          <p>
         {`${'$'+ReplaceNumberWithCommas(this.props.obj.plan_details[0].out_of_pocket_max_individual_in_network)} / ${'$'+ReplaceNumberWithCommas(this.props.obj.plan_details[0].out_of_pocket_max_family_in_network)}`}
          </p>
          </div>
      );
      }
      else
      {
          return (
              <p>Missing Information</p>
              );
      }
  }
   
renderSummaryOfBenefits()
  {

      if(this.props.obj.plan_details[0]!=null)
      {
      return (

    
           <button class="btn " onClick={this.handleSummary}> Summary of benefits </button>

      );
      }
      else
      {
        null
      }
  }
  handleSummary(e)
  {
         // " window.open('http://google.com','_blank')"
        window.open(this.props.obj.plan_details[0].summary_of_benefits,'_blank');
      
  }

  renderProviderFinder()
  {

      if(this.props.obj.plan_details[0]!=null)
      {
      return (
                    <button class="btn " onClick={this.handleProvider}>Provider Finder</button>
      );
      }
      else
      {
        null
      }
  }
  handleProvider(e)
  {             
        window.open(this.props.obj.plan_details[0].provider_finder,'_blank');
  }
  
  render() {
    if(this.props.obj.plan_details[0]!=null){ 
        function ReplaceNumberWithCommas(number) {
                //Seperates the components of the number
                var n= number.toString().split(".");
                // let money = 1.6;
                // money.toFixed(2); // 1.60
//console.log('jjj',toFixed(2));
                //Comma-fies the first part
                n[0] = n[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                //Combines the two sections
                return n.join(".");
            }

       return (                           <div className="col-12 col-md-6 mb-4">
                                  <div className="user-card  change-census-col2 calculat-card">
                                   
            <div class="row">

              <input type="checkbox" className="calculate-checkbox" onChange={(e)=>this.onClickPlanComparison(e,this.props.index)} id={this.props.obj.id} checked={this.props.compareArray.includes(this.props.obj.id.toString()) ? true : this.props.obj.checked}/>
                          <span style={{color:'blue',paddingTop:'-10px',marginLeft:'2rem',marginTop:'-0.3rem'}} >Compare</span>

            </div>                          
                                      
                                   
                                    
                                   <img src={window.location.origin+'/public/images/'+this.props.obj.logo} className="d-flex mx-auto img-fluid"/>
                                   <h4 className="text-center">{this.props.obj.plan_name}</h4>
                                   
                                   <ul>
                                {/*<li>{this.renderDeductibleField()} </li>*/}
                                   {/*<li>Deductible Individual in network 8150/16300</li>*/}
                                  
                                   
                                   <li>{this.renderDeductibleField()}</li>
                                   
                                   <li>{this.renderPocketMaxField()}</li>    
                                            
                                   </ul>
                                   
                                   <div className="col-md-12 text-center provider-btn change-cencus-btn mb-2">
                                   
                                    {this.renderSummaryOfBenefits()}
                                    <p className="text-center" style={{color: '#EF476F',marginBottom: '5px'}}>
                                        <b style={{display:"block",lineHeight: "13px"}}>Monthly Premium</b>
                                   
                    <span style={{fontWeight: 'bold', color: 'red',fontSize:'20px'}}>${ReplaceNumberWithCommas(Number(this.props.obj.monthly_premium).toFixed(2))}</span></p>
         
                                    {this.renderProviderFinder()}
                                    
                                        
                                        
                                      </div>
                                   
                                   
                                  </div>
                                  </div>
                                  
               
       );

            
        
    }
    else
      {
          return null;
      }
      
      
  }
}

export default TableRowPlans;