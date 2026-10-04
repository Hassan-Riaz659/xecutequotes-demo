import React, { Component } from 'react';
import SelectSearch from 'react-select-search';
import Ripples from 'react-ripples';
import Sidebar from './Sidebar';
import $ from 'jquery';
import axios from 'axios';
import ExistingEmpRow from './ExistingEmpRow';
import DashboardHeader from './dashboardHeader/DashboardHeader';
import DashboardFooter from './dashboardFooter/DashboardFooter';



import { Link } from "react-router-dom";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Button, ButtonToolbar, Modal, DropdownButton, Dropdown } from 'react-bootstrap';
var baseUrl = window.location.origin;
var trendingUp = baseUrl+"/public/landingImages/trending-up.png";
var calendar = baseUrl+'/public/landingImages/calendar.png';
var Group1 = baseUrl+'/public/landingImages/Group1.png';
var Group3 = baseUrl+'/public/landingImages/Group3.png';
var Group4 = baseUrl+'/public/landingImages/Group4.png';


var popup_flag = 0;



export default class ExistingNewQuote extends Component {
    constructor (props){
        super(props);
        
        this.url = window.location.origin;
        
        this.state={
            effective_date:"01-01-2020",
            age:[],
            name:'',
            clientDetails:'',
            zip:'',
            nickName:'',
            date:'',
            client_id:'',
            user_id:'',
            value: '',
            credits_left:'',
            spanErrorStatus:'none',
            isEnable:false,
            disabledProp:false,
            data:[0],
            errorSentenceFlag:'none',
            errorSentenceFlag2:'none',
            errorSentenceFlag3:'none',
            errorSentenceFlag4:'none',
            number: 0,
            currentTab:0,
            show: false,
            useExistingQuote:'',
            previousQuotes:[],
            clientExits:0,
            quoteId:'',
            existingClName:'',
            existingClId:'',
            existingClZip:'',
            flagExisting:false,
            emp_data:1,
            existingEmployees:[],
            all_employees:[],
            existingCleffectiveDate:"",
            tempExistingEmployees:[{memberType:null,fname:'',lname:'',dob:'',age:'',id:null}],
            newExistingEmployees:[],
            client_detail:'',
            quote_detail:'',
            previousFlag:false,
            client_changed_flag:false,
            zip_changed_flag:false,
            nickName_changed_flag:false,
            effective_changed_flag:false
        }
        this.nextPrev=this.nextPrev.bind(this);
        this.validateForm=this.validateForm.bind(this);
        this.onBlurClientName = this.onBlurClientName.bind(this);
        this.handleChangeNickname = this.handleChangeNickname.bind(this);
        this.handleChange3 = this.handleChange3.bind(this);
        this.handleChange5 = this.handleChange5.bind(this);

        this.addClientInformation = this.addClientInformation.bind(this);
        this.addEmpInformation = this.addEmpInformation.bind(this);
        this.deleteAllEmpData = this.deleteAllEmpData.bind(this);
        this.checkAllEmpData = this.checkAllEmpData.bind(this);
        this.calculateEstimate = this.calculateEstimate.bind(this);
        this.inputCheck = this.inputCheck.bind(this);
        this.showAge = this.showAge.bind(this);
        this.appendChild = this.appendChild.bind(this);
        this.handleChange4 = this.handleChange4.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.changeDob = this.changeDob.bind(this);
        this.inputFirstName = React.createRef(this);
        this.ExistingQuotehandleSubmit = this.ExistingQuotehandleSubmit.bind(this);
        this.tableExistEmployeesRow = this.tableExistEmployeesRow.bind(this);


       
    }
    
    
    

componentDidMount () {
    
$(".plus-btn").mouseenter(function() {
        
        $(this).removeAttr("href");
    });  
    
    $(".plus-btn").mouseout(function() {
        
        $(this).attr("href" , "#");
    }); 
    
    $(".plus-btn i").mouseenter(function() {
        
        $(".plus-btn").removeAttr("href");
    });  
    
    $(".plus-btn i").mouseout(function() {
        
        $(".plus-btn").attr("href" , "#");
    }); 
    
    
     let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      //console.log('state',AppState);
      this.setState({user: AppState.user, userid: AppState.user.id, credits_left:AppState.user.credits_left});
        console.log('credits left',AppState.user.credits_left,'type',AppState.user.subscription_type);
     if(AppState.user.subscription_type =='free'){
        if( AppState.user.bought_credits == null || AppState.user.bought_credits == 0){
            if(AppState.user.credits_left == 0)
            {
            this.setState({disabledProp:true,spanErrorStatus:'block'}) ; 
        
                Swal.fire({
                          icon: 'error',
                          title: 'You are out of credits. Click here to update Billing Info!',
                          text: 'Please Update Your Quotes!',
                        })
        
                this.props.history.push('/update-billing')
            }
      }
    }
    
    
            this.showTab(this.state.currentTab); // Display the current tab
    const clientId = this.props.match.params.id;
    
//    console.log('id',clientId);
     axios.get(this.url+'/api/client/'+clientId)
      .then((response) => {
        this.setState({
            user_id:response.data.clientDetails.user_id,
            name:response.data.clientDetails.name,
            zip:response.data.clientDetails.zip,
            date:response.data.clientDetails.effective_date,
            nickName:response.data.clientDetails.nickName
        });
      })
      
}
}


 Row  (id ,changeDob,index){
     
     
     return(
    
        <tr className="no-border" data-row-id={`${id}`}>
                                <td autoFocus>
                                  <select className="form-control selectmember" name="member_type"  id={`member_type${id}`} onChange={(e)=>this.handleMemberType(e,index)} autoFocus value ={this.state.tempExistingEmployees[index].memberType}>
                               
                       
                        
                                    <option value ={this.state.tempExistingEmployees[index].memberType}  disabled selected>{this.state.tempExistingEmployees[index].memberType != null ? this.state.tempExistingEmployees[index].memberType : "Choose Type"}</option>
                             
        
                                
                                
                                 
                                      <option value="Employee">Employee</option>
                                    <option value="Spouse">Spouse</option>
                                    <option value="Dependent">Dependent</option>
                                    
                                  </select>
                
                                </td>
                                <td><input className="input" type="text" name="f_name"   className="form-control" id={`f_name${id}`} onChange={(e)=> this.handleFName(e,index)} value ={this.state.tempExistingEmployees[index].fname}/></td>
                                <td><input className="input fields" type="text" name="l_name" className="form-control" id={`l_name${id}`} onChange={(e)=> this.handleLName(e,index)} value ={this.state.tempExistingEmployees[index].lname}/></td>
                                <td>
                                
                                <input className="input" onChange={(e)=>{
                                    changeDob(id)
                                }} type="date" name="dob" max="2050-12-31" className="form-control" id={`dob${id}`} onChange={(e)=> this.handleDate(e,index)} value ={this.state.tempExistingEmployees[index].dob} />
                                
                                </td>
                                <td><input className="input" type="number" name="age" className="form-control" disabled id={`age${id}`} value ={this.state.tempExistingEmployees[index].age}/></td>
                                
                                
                               
                                {this.state.tempExistingEmployees.length<=1?<td></td>:
                                <td><a className="minus-btn" onClick={()=>this.removeRow(index)}><i className="fas fa-minus"></i></a></td>}


                                                      
                              </tr>
             )       
}


handleFName(e,index){
    
    
    //{memberType:'',fname:'',lname:'',dob:'',age:''}
    
    let employee_array= [...this.state.tempExistingEmployees];
    
    employee_array[index].fname = e.target.value;
    
    this.setState({
        tempExistingEmployees:employee_array
    })
    
    
    
}

handleChangeNickname(e)
{
    this.setState({nickName:e.target.value});
    if(this.state.previousFlag == true && this.state.nickName != this.state.quote_detail.nickName)
       {

            this.setState({
                nickName_changed_flag:true
                });  
        }
}

handleLName(e,index){
    

    
     let employee_array= [...this.state.tempExistingEmployees];
    
    employee_array[index].lname = e.target.value;
    
    this.setState({
        tempExistingEmployees:employee_array
    })
}

handleMemberType(e,index){
    
    
     let employee_array= [...this.state.tempExistingEmployees];
    
    employee_array[index].memberType = e.target.value;
    
    this.setState({
        tempExistingEmployees:employee_array
    })
    
}


handleDate(e,index){
    
    
     let employee_array= [...this.state.tempExistingEmployees];
    
    employee_array[index].dob = e.target.value;
    
    this.changeDob(e.target.value,index);
    
    this.setState({
        tempExistingEmployees:employee_array
    })
    
}


removeRow(index)
            {
            
             let employee_array= [...this.state.tempExistingEmployees];
            
            employee_array.splice(index, 1);
                
                 this.setState({
        tempExistingEmployees:employee_array
    })
                  
                
            }


changeDob(date,index){
    //let dob = $('#dob'+e).val();
    
    let dob = date;
    
     $("#nextBtn").prop('disabled', false);
    
    if(dob!='')
    {
        var dobb = new Date(dob);
        //console.log('dob',dobb.getYear());
        if(dobb.getYear()>1000){
            var new_val = dob.slice(0, -1);
            
            
    //         let employee_array= [...this.state.tempExistingEmployees];
    
    // employee_array[index].dob = new_val;
    
   
    
    // this.setState({
    //     tempExistingEmployees:employee_array
    // })
            
            
            
            //$('#dob'+e).val(new_val);
        }
        else
        {
            var today = new Date(this.state.date);

            var age = Math.floor((today-dobb) / (365.25 * 24 * 60 * 60 * 1000));
            if(age==0||age<1 || age >= 110){
                $("#nextBtn").prop('disabled', true);
            }
            // var exact_age = $('#age'+e).val(age);
            
            
            
            let employee_array= [...this.state.tempExistingEmployees];
    
    employee_array[index].age = age;
    
   
    
    this.setState({
        tempExistingEmployees:employee_array
    })
            
        }
    }
}

inputCheck(e)
{
    //console.log('tks');
    /* pick last row of table */
    var count = $('#employee_data_table tr:last').attr('data-row-id');
    var type = $('#member_type'+count).val();
    var fname = $('#f_name'+count).val();
    var lname = $('#l_name'+count).val();
    var age = $('#age'+count).val();

    if(type!=''&&fname!=''&&lname!=''&&age!='')
    {
        this.setState({
            isEnable: false
        });
    }
    else
    {
        this.setState({
            isEnable: true
        });
    }
}



onBlurClientName(e)
{
    // if(this.state.name !== ''){
    // axios.get(this.url+'/api/check-existing-client/'+ this.state.name)
    //   .then(res => {
    //       //console.log(res.data.status,'yyyy');
    //     if(res.data.status==true && this.state.previousFlag == false)
    //     {
    //         console.log('hhh');
    //         $("#nextBtn").prop('disabled', true);
    //         this.setState({errorSentenceFlag3:'block'})
    //     }
    //     else if(res.data.status===false && this.state.previousFlag === false)
    //     {
    //         console.log('hhh hre');
    //         if(this.state.value == '' || this.state.date == '' || this.state.errorSentenceFlag2==='block' ||this.state.errorSentenceFlag==='block')
    //         {  
                
    //             console.log('hhh if hre',this.state.value,this.state.date,this.state.errorSentenceFlag3,this.state.errorSentenceFlag);
    //             $("#nextBtn").prop('disabled', true);
    //             this.setState({errorSentenceFlag3:'none'})  
    //         }
    //         else
    //         {
    //             console.log('hhh else hre');
    //             $("#nextBtn").prop('disabled', false);
    //             this.setState({errorSentenceFlag3:'none'})
    //         }
    //     }
    //     else if(res.data.status==false && this.state.previousFlag == true && this.state.name != this.state.client_detail.name)
    //     {
    //         this.setState({
    //             client_changed_flag:true,
    //             errorSentenceFlag3:'none'
    //         });  
    //     }
    //     else{
            
    //         if(this.state.errorSentenceFlag2 ==='block')
    //         {
    //             $("#nextBtn").prop('disabled', true);
    //         }
    //         else{
    //         //console.log('kkk');{
    //         $("#nextBtn").prop('disabled', false);
    //         this.setState({errorSentenceFlag3:'none'})
    //         }            
    //   }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    // }
    // else
    // {
    //     this.setState({errorSentenceFlag3:'none'})
    // }
}

addClientInformation(e)
{
    
    const client = {
      userid:this.state.user_id,
      clientId:this.props.match.params.id,
      name: this.state.name,
      nickName: this.state.nickName,
      zip: this.state.zip,
      date: this.state.date,
      existing_client: "yes"
    }
    
    axios.put(this.url+'/api/add-client/', client)
      .then((response) => {

          this.setState({client_id: response.data.data,quoteId:response.data.quote.id,flagExisting:response.data.flagExisting,existingEmployees:response.data.existing_employees,client_detail:response.data.client_detail,quote_detail:response.data.quote})        
      
      
         let responseArray = response.data.existing_employees;
         
         let new_emp=[]; 
          
          for (let i=0;i<response.data.existing_employees.length;i++){
              
    new_emp.push({memberType:responseArray[i].member_type,fname: responseArray[i].f_name,lname:responseArray[i].l_name,dob:responseArray[i].dob,
    age:responseArray[i].age,id:responseArray[i].id});
    
          }
          
       
          if(new_emp.length > 0){
           this.setState({tempExistingEmployees:new_emp});    
          }
      });


   //ider call kar lo agr client existing hai phr us client ki id get kar k quote main 
    //new quote create hogi or data from employees table display hoga

    //axios.  
        /*Swal.fire(
      'Good job!',
      'Expense Added Successfully',
      'success'
    )*/
}

addEmpInformation(e)
{

    var count = this.state.emp_data - 1;
    var type = $('#member_type'+count).val();
    var fname = $('#f_name'+count).val();
    var lname = $('#l_name'+count).val();
    
    var dob = $('#dob'+count).val();
    
    // if(dob!='')
    // {
    //     var dobb = new Date(dob);
    //     var today = new Date();
    //     var age = Math.floor((today-dobb) / (365.25 * 24 * 60 * 60 * 1000));
    //     var exact_age = $('#age'+count).val(age);
    // }
    var age = $('#age'+count).val();

    // if(type==''||fname==''||lname==''||age=='')
    // {  
    //     Swal.fire({
    //               icon: 'error',
    //               title: 'Please fill all the fields!',
    //               text: 'Something went wrong!',
    //             })

    //     return false;
    // }
    

    
    const employee1 = {
      id:this.state.client_id,
      quote_id:this.state.quoteId,
      type: type,
      fname: fname,
      lname: lname,
      dob:dob,
      age:age,
      
    }
    
    let new_emp = [...this.state.all_employees];
    new_emp.push(employee1);
    
    this.setState({all_employees:new_emp});
    
    // employees        
    // const newItemInput = this.state.newItemInput;

    // const obj = {'item':newItemInput, 'columnType':newRadioValue};
    // this.setState({
    //     employees: [employee1]
    // });
    
      return true;

}



ExistingQuotehandleSubmit(e)
{
    const userid = this.props.match.params.id;
    axios.get(this.url+'/api/quotes/'+userid)
      .then((response) => {
        this.setState({previousQuotes:response.data.data});

         var list = [];
        for (var i = 0; i < response.data.data.length; i++) {
            list.push(response.data.data[i]);
        }
        
        this.setState({
            previousQuotes:list
        })
    
    

      });      

        
}

deleteAllEmpData(e)
{
//    $('.fields').val();
    $('.fields').removeAttr('value');
    $('.selectmember').val('');

}

handleChange3(e){

    
    //console.log('date from handle change 3:',e.target.value);
    //var today = new Date(e.target.value);    
    
    if(e.target.value===''){
 
            $("#date_msg").attr("hidden",false);
            $("#nextBtn").prop('disabled', true);

    }else{
       
        $("#date_msg").attr("hidden",true);

    const dateee = e.target.value;    
    
    if(dateee !='')
     {
      var datee = new Date(dateee);
        //console.log('dob',dobb.getYear());
        if(datee.getYear()>1000){
            //var new_val = datee.slice(0, -1);
            
            //console.log("new val",new_val)
        }
        else
        {
            
         this.setState({
           date: e.target.value
         });
         
    }
}
    if(e.target.value !== '' && this.state.name !== '' && this.state.zip !== '')
    {

        axios.get(this.url+'/api/check-credentialDate', {params: {ID: e.target.value}}).then((response) => {
                    if(response.data.flag==true)
                        {
                              
                            if(this.state.errorSentenceFlag3==='block' || this.state.errorSentenceFlag2 ==='block')
                            {
                                console.log('here 11');
                                $("#nextBtn").prop('disabled', true);
                            }
                            else
                            {//yahan pe check nhi laga hua age ka
                                console.log('here 10');
                                $("#nextBtn").prop('disabled', false);
                                const postData = {
                                    name: this.state.name,
                                    zip:this.state.zip,
                                    effective_date:dateee
                                }
                                
                                axios.put(this.url+'/api/check-credentials',postData).then((response) => {
                                  if(response.data.status ===true)
                                  {
                                    this.setState({
                                        errorSentenceFlag4:'block'
                                    })  
                                    $("#nextBtn").prop('disabled', true);
                                  } 
                                  else
                                  {
                                      this.setState({
                                        errorSentenceFlag4:'none'
                                    })
                                    $("#nextBtn").prop('disabled', false);
                                  }
                                    
                                })
                                
                            }
                                 $("#date_msg").attr("hidden",true);
                                this.setState({errorSentenceFlag:'none'})
                            
                            
                            if(this.state.previousFlag == true && this.state.date != this.state.quote_detail.effective_date)
                            {
                                this.setState({effective_changed_flag:true});
                            }

                        }
                        else{
                            console.log('here 9');
                                 $("#nextBtn").prop('disabled', true);
                                 this.setState({errorSentenceFlag:'block'})   
                        }
                    }); 
        //$("#nextBtn").prop('disabled', false);
    }
    else if(e.target.value === '' || this.state.name === '' || this.state.zip === '')
    {
        
                axios.get(this.url+'/api/check-credentialDate', {params: {ID:e.target.value}}).then((response) => {
                    if(response.data.flag==true)
                        {
                              
                            if(this.state.errorSentenceFlag3==='block' || this.state.errorSentenceFlag2 === 'block')
                            {
                                console.log('here 8');
                                $("#nextBtn").prop('disabled', true);
                            }
                            else
                            {
                                //console.log('its this enables');
                                 
                                if(this.state.name == '' || this.state.zip == '')
                                {
                                    console.log('here 7');
                                    $("#nextBtn").prop('disabled', true);
                                }
                                else
                                {
                                    console.log('here 6');
                                $("#nextBtn").prop('disabled', false);
                               
                                $("#date_msg").attr("hidden",true);
                                this.setState({errorSentenceFlag:'none'})
                                
                                }
                            }
                            
                            if(this.state.previousFlag == true && this.state.date != this.state.quote_detail.effective_date)
                            {
                                this.setState({effective_changed_flag:true});
                            }

                        }
                        else{
                                console.log('here 5');
                                 $("#nextBtn").prop('disabled', true);
                                 this.setState({errorSentenceFlag:'block'})
                        }
                    }); 
            $("#nextBtn").prop('disabled', true);
    }
    else
    {

        axios.get(this.url+'/api/check-credentialDate', {params: {ID: today
        }}).then((response) => {
                    if(response.data.flag==true)
                        {
                              
                            if(this.state.errorSentenceFlag3==='block' || this.state.errorSentenceFlag2 ==='block') 
                            {
                                console.log('here 3');
                                $("#nextBtn").prop('disabled', true);
                            }
                            else
                            {
                                console.log('here 2');
                                $("#nextBtn").prop('disabled', false);
                                
                                $("#date_msg").attr("hidden",true);
                                this.setState({errorSentenceFlag:'none'})
                                
                            }
                            
                            if(this.state.previousFlag == true && this.state.date != this.state.quote_detail.effective_date)
                            {
                                this.setState({effective_changed_flag:true});
                            }

                        }
                        else{
                            console.log('here');                                
                                 $("#nextBtn").prop('disabled', true);
                                 this.setState({errorSentenceFlag:'block'}) 
                        }
                    }); 
        $("#nextBtn").prop('disabled', false);
    }
    }
   
}





    

// not allowing anything other than the numbers in zip

handleChange4(e){
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === '' || re.test(e.target.value)) {
       this.setState({value: e.target.value})
       
    }
    
    
    
    const postData = {
        user_id: userid,
        zip: this.state.zip,
        effective_date: this.state.effective_date
    }
    if(zip==''||effective_date=='')
    {
        Swal.fire({
                  icon: 'error',
                  title: 'Please fill all the fields!',
                  text: 'Something went wrong!',
                })

        return false;
    }
    
        
    axios.get(this.url+'/api/test-value').then((response) => {
        
        //     if(response.data.flag==0)
        //     {
        //         alert('what....');
                
        //     }
        //
        alert('hello');        
        });
}

handleChange5(e){
    //console.log("Value comming,",e.target.value)
    const client_id = e.target.value;

     axios.get(this.url+'/api/existing-client/'+client_id)
      .then((response) => {

        this.setState({existingClName:response.data.existingClInfo.name,
        name:response.data.existingClInfo.name,
        nickName:response.data.existingClInfo.nickName,
        existingClId:response.data.existingClInfo.id,
        existingClZip:'yes',
        value:response.data.existingClInfo.zip,
        zip:response.data.existingClInfo.zip,
        existingCleffectiveDate:'yes',
        date:response.data.existingClInfo.effective_date,
            
        });
      })
          $("#nextBtn").prop('disabled', false);

    
}


showAge(e){
   // console.log("aaaaa");
}

focus(e){
    
 
     var last = $('#employee_data_table tr:last').attr('data-row-id');
        
        var flag = parseInt(last)+1;
    
    // console.log('flag',flag);
    
    // console.log($('#fname'+flag).val());
    $('#f_name'+flag).focus();
       
    
}


appendChild(e){

    var flag = true;
    
    
    let new_emp = [...this.state.tempExistingEmployees];
    new_emp.push({memberType:null,fname:'',lname:'',dob:'',age:'',id:null});
    
    
    this.setState ({
        tempExistingEmployees:new_emp,
    })
    
   
    
    
//     if(this.state.emp_data!=0)
//     {
        
//         flag = this.addEmpInformation();
            
//     }
    

//     if(flag==true)
//     {
    

//     let data = this.state.data;

//     var flag = data.push(data.length); // data.length is one more than actual length since array starts from 0.
//     // Every time you call append row it adds new element to this array. 
//     // You can also add objects here and use that to create row if you want.
//     this.setState({
//       data: data
//     });
//          var last = $('#employee_data_table tr:last').attr('data-row-id');
        
//         var flag = parseInt(last)+1;

//     var fname = $('#f_name1').val();
//         this.state.emp_data = this.state.emp_data + 1;
//          this.focus();
//     }

//   console.log('this is the data',this.state.all_employees); 
  }

checkAllEmpData(e)
{
    //console.log('all data will be shown here')
    //this.state.all_employees
    let check = true;
    

        for(let i = 0; i<this.state.all_employees.length; i++)
        {
              let object =  this.state.all_employees[i];
              
              
              
            
    if(object.type != null && object.fname!= '' && object.lname!= ''  && object.age!= '')
    {

        check =  true;
    }
    
    else if(object.type == null && object.fname== '' && object.lname== ''  && object.age== '')
    {

         check =  true;
     
        
    }

    else{
        

              Swal.fire({
                  icon: 'error',
                  title: 'Please fill the missing field!',
                  text: 'Something went wrong!',
                    })
         
            check =  false;
       }
        }
//        this.state.data.map((item,i) => <li key={i}>Test</li>)


if(check == true){
 var count = this.state.emp_data - 1;
    
    var type = $('#member_type'+count).val();
    var fname = $('#f_name'+count).val();
    var lname = $('#l_name'+count).val();
    var dob = $('#dob'+count).val();
var age = $('#age'+count).val();

console.log('a',type,fname,lname,dob,age);

if(type != null && fname!= '' && lname!= ''  && age!= '')
    {
     
        check =  true;
    }
else if(type == null && fname== '' && lname== ''  && age== '')
    {

        check =  true;
    }
    else{

        check =  false;
        Swal.fire({
                  icon: 'error',
                  title: 'Please fill the missing field!',
                  text: 'Something went wrong!',
                    })
    }
}
return check;
    }


calculateEstimate(e)
{
    


    // var count = this.state.emp_data - 1;
    
    // var type = $('#member_type'+count).val();
    // var fname = $('#f_name'+count).val();
    // var lname = $('#l_name'+count).val();
    // var dob = $('#dob'+count).val();
    
    // if(dob!='')
    // {
    //     var dobb = new Date(dob);
    //     //console.log('dob',dobb.getYear());
    //     if(dobb.getYear()>1000){
    //         var new_val = dob.slice(0, -1);
    //         $('#dob'+e).val(new_val);
    //     }
    //     else
    //     {
    //         var today = new Date(this.state.date);

    //         var age = Math.floor((today-dobb) / (365.25 * 24 * 60 * 60 * 1000));
    //         if(age==0||age<1){
    //             $("#nextBtn").prop('disabled', true);
    //         }
    //         var exact_age = $('#age'+e).val(age);
    //     }
    // }
    // var age = $('#age'+count).val();
    
     
    //console.log('type',type,'fname',fname,'lname',lname,'age',age);
    
    
    //  console.log('data',this.state.date,'effectuve_date',this.state.effective_date); 
    
    Swal.fire({
                  title: 'Are you sure?',
                  text: "This is your last chance to make a change to this client. If you want to click on calculate, you can't go back to change census!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  cancelButtonText:'No let me check',
                  confirmButtonText: 'Yes, run my quote!'
                }).then((result) => {
                  if (result.isConfirmed) {
    
    
    let check = true;
    let all_empty_row = [];

    for(let i = 0; i<this.state.tempExistingEmployees.length; i++)
        {
              let object =  this.state.tempExistingEmployees[i];
    
    if(object.memberType != null && object.fname!= '' && object.lname!= ''  && object.dob!='' && object.age != '')
    {
        //console.log('age in not empty',object.age);
     
        var age = object.age;
        if(age <=0 || age >=110)
        {
              Swal.fire({
                  icon: 'error',
                  title: 'Age is invalid',
                  text: 'Something went wrong!',
                    })
         
            check =  false;
            break;   
        }
        else{
        check =  true;
        }
    }

    else if(object.memberType == null && object.fname== '' && object.lname== '' && object.dob=='' && object.age== '')
    {
        
        all_empty_row.push (true);
        
    }

    else{
            var age = object.age;
            if(age <=0 || age >=110)
            {
                  Swal.fire({
                      icon: 'error',
                      title: 'Age is invalid',
                      text: 'Something went wrong!',
                        })
             
                check =  false;
                break;   
            }
            else
            {
                
                
                  Swal.fire({
                      icon: 'error',
                      title: 'Please fill the missing field',
                      text: 'Something went wrong!',
                        })
             
                check =  false;
                break;                
            }

       }
    
        }
    
    if(all_empty_row.length == this.state.tempExistingEmployees.length)
    {
     Swal.fire({
                  icon: 'error',
                  title: 'Please fill at least one row',
                  text: 'Something went wrong!',
                    })
         
            return;
    }
    if(this.state.date != '' && this.state.zip != ''){
    if (check == true){
        
        
      const employee = {
      client_id:this.state.client_id,
      quote_id :this.state.quoteId,
      all_employees:this.state.tempExistingEmployees,
    }
        
        
        
    //this.checkAllEmpData();
    axios.put(this.url+'/api/add-employee/',employee).then((response) => {
        let client_id = {
                 client_id: this.state.client_id,
                 
              };
            localStorage["calculate_client_id"] = JSON.stringify(client_id);
        this.props.history.push('/calculate')
    });
    }
    }
    else
    {
            Swal.fire({
                  icon: 'error',
                  title: 'Effective date or Zip code missing',
                  text: 'Please fill in zip and Effective date!',
                    })
    }
                  }})
      }    
    


             nextPrev(n) {
                 
                
    //console.log('anc');
              // This function will figure out which tab to display
              var x = document.getElementsByClassName("tab");
              // Exit the function if any field in the current tab is invalid:
              if (n == 1 && !this.validateForm()){
                //return false;
                
              }
              // Hide the current tab:
              x[this.state.currentTab].style.display = "none";
              // Increase or decrease the current tab by 1:
              this.state.currentTab = this.state.currentTab + n;
              // if you have reached the end of the form... :
              if (this.state.currentTab >= x.length) {
                //...the form gets submitted:
                //document.getElementById("regForm").submit();
                //return false;
              var input = document.getElementById("member_type").focus();
              }
              
              if (n == -1){
                // console.log('previous button clicked','quote details',this.state.quote_detail,'client details',this.state.client_detail);
                this.setState({
                    previousFlag:true
                });
                
              }
              // Otherwise, display the correct tab:
              this.showTab(this.state.currentTab);
            }
            addAge(e,index)
            {
                var ageArray=this.state.age;
                ageArray[index]=e.target.value;
                this.setState({age:ageArray},()=>console.log(this.state.age))
            }
            
           addRow()
            {
                
                
                {this.addEmpInformation()}  
                var length="";
                length=this.state.age.length;
               
                this.state.emp_data = this.state.emp_data + 1;
                
                this.setState({
                    isEnable: true
                });
            }
            
             resetTable()
            {
                 
                 
                 
        let new_emp = [{memberType:null,fname:'',lname:'',dob:'',age:'',id:null}];
        
        
        this.setState ({
            tempExistingEmployees:new_emp
        })
                             
             
                
                
                
                 
            //   {this.deleteAllEmpData()} 
            //     if(this.state.useExistingQuote == "yes")
            //     {
            //         //console.log('in existing emploees del');
            //         this.setState({
            //             existingEmployees:[]})
            //     }
            //     this.setState({ emp_data: 1});
            //     //  axios.delete(this.url+'/api/empty-row/'+this.state.quoteId)
            //     //     .then(res => {
            //     //         if(res.data.flag=='success')
            //     //         {
            //     //             this.setState({ employees: employees});
            //     //         }
            //     //         })
            //     //let new_arr = [];
                
            
            //     this.setState({ data:[0] })
            //     this.setState({ all_employees:[0] })
                
            //      $('input[type=text]').val('');
            //      $('input[type=number]').val('');
            //      $('input[type=date]').val('');
                  
                 
            }
            
            
            
             showTab(n) {
              // This function will display the specified tab of the form ...
              var x = document.getElementsByClassName("tab");
              
              x[n].style.display = "block";
              // ... and fix the Previous/Next buttons:
              if (n == 0) {
                document.getElementById("prevBtn").style.display = "none";
              } else {
                document.getElementById("prevBtn").style.display = "inline";
              }
              if (n == (x.length - 1)) {
                document.getElementById("nextBtn").innerHTML = "Calculate";
              } else {
                document.getElementById("nextBtn").innerHTML = "Next";
              }
              // ... and run a function that displays the correct step indicator:
              this.fixStepIndicator(n)
            }
            
            
             validateForm() {
              // This function deals with validation of the form fields
              var x, y, i, valid = true;
              x = document.getElementsByClassName("tab");
              var flag = $(x[0]).hasClass("tab1");
              y = x[this.state.currentTab].getElementsByTagName("input");
              // A loop that checks every input field in the current tab:
              for (i = 0; i < y.length; i++) {
                // If a field is empty...
                if (y[i].value == "") {
                  // add an "invalid" class to the field:
                  y[i].className += " invalid";
                  // and set the current valid status to false:
                  valid = false;
                }
                else if(y[i].id=='zip_codes' && y[i].value.length<5)
                {
                    // add an "invalid" class to the field:
                  y[i].className += " invalid";
                  // and set the current valid status to false:
                  valid = false;
                }
              }
              if(flag==true && this.state.previousFlag == false)
              {
                  {this.addClientInformation()}   
                    if(this.state.flagExisting == true)
                    {
                        
                    }
                    
                  
              }
              else if(flag==true && this.state.previousFlag == true)
              {
                 
                  if(this.state.client_changed_flag == true || this.state.zip_changed_flag == true || this.state.effective_changed_flag == true || this.state.nickName_changed_flag == true)
                  {
                      const client = {
                          userid:this.props.match.params.id,
                          clientId: this.state.client_detail.id,
                          quoteId: this.state.quote_detail.id,
                          name: this.state.name,
                          nickName:this.state.nickName,
                          ExistingName: this.state.client_detail.name,
                          zip: this.state.zip,
                          date: this.state.date,
                        }
                        //check which field is a=changed then update  it.
                        axios.put(this.url+'/api/update-client', client)
                          .then((response) => {
                        
                              this.setState({
                                  name :response.data.clientName,
                                  value:response.data.quote.zip,
                                  date :response.data.quote.effective_date
                              });
                          });
                   }
              }
              else
              {
                 null 
              }
             
              // If the valid status is true, mark the step as finished and valid:
              if (valid) {
                document.getElementsByClassName("step")[this.state.currentTab].className += " finish";
              }
              return valid; // return the valid status
            }
            
             fixStepIndicator(n) {
              // This function removes the "active" class of all steps...
              var i, x = document.getElementsByClassName("step");
              for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
              }
              //... and adds the "active" class to the current step:
              x[n].className += " active";
            }

tableExistEmployeesRow(){
    if(this.state.existingEmployees instanceof Array){
          const employee = {
              id:this.state.existingClId,
              quote_id:this.state.quoteId,
              existingEmployees:this.state.existingEmployees,
              useExistingQuote:"yes"
            }
        
         return this.state.existingEmployees.map(function(object,i){
          return <ExistingEmpRow obj={object} date={this.state.date} key={i} index={i} />;

        }.bind(this))
       
    }
    

}


    render() {
        
        
        return (
        <div>

                <div className="wrapper">

                    <Sidebar />


                    <div className="main-panel new-quote-main-panel">
                        {/* Navbar */}

                        <DashboardHeader />

                <form id="regForm" method="Post" action="">
                {/* Container Fluid*/}


          <div className="tab tab1">
            <div className="content">
             <div className="row ml-1 mb-4">
                 <h4><Link to="/dashboard"><i className="fas fa-long-arrow-alt-left mr-2"/></Link> Generate Quote</h4>
             </div>
              <div className="row">

                            

                                <div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                        <div className="group-information">
                                            <h5>New Group Information</h5>

                                            
                      
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Client Name</label>
                                                    <input className="input" type="text" className="form-control" name="name" placeholder="Enter Client Name"  disabled defaultValue={this.state.name}/>
                                                      <span id="txtName" style={{display:this.state.errorSentenceFlag3,'color':'red'}} >This name already exist.</span>
                                                </div>                              
                      

                                    <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Nickname (Optional)</label>
                                            <input className="input" type="text" className="form-control" name="nickname" defaultValue={this.state.nickName} placeholder="Enter Nickname" onChange={this.handleChangeNickname} />
                                    </div>                              

                          <div className="form-group">
                            <label htmlFor="zip_codes">ZIP Code</label>
                           <input className="input" className="form-control" placeholder="Enter Zip" name="zip" value={this.state.zip}   disabled  id="zip_codes" required=""/>
                            <span id="zip_msg" style={{color:"red"}} hidden>Max limit for zip code is 5 digits</span>
                            <br/>
                            <span id="zip_validation" style={{display:this.state.errorSentenceFlag2,'color':'red'}} >We currently don't provide quotes for that zip code.</span>
                          </div>
 
        
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Effective Date</label>
                            <input className="input" id="txtDate"  type="date" className="form-control" value={this.state.date} onChange={this.handleChange3} name="effective_date" placeholde="Enter your effective date" required="" />
                          <br/>
                          <span id="date_msg" style={{color:"red"}} hidden>Date field is empty</span>
                          <span style={{display:this.state.errorSentenceFlag,'color':'red'}} >Please enter a valid effective date.</span>
                           
                        </div>
                        <span style={{display:this.state.errorSentenceFlag4,'color':'red'}}>Please choose another date</span>
                                        </div>
                                        

                                    </div>

                                </div>

                            </div>
              {/*Row*/}
            </div>
          </div>
          <div className="tab tab2">
            <div className="content" id="container-wrapper">
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Census</h1>
                
              </div>
              <div className="row">
<div className="col-lg-12 group-information-col">
                                    <div className="user-card user-card2">
                                    <h5 className="mb-4">Census</h5>
                                        <div className="table-responsive cencus-table">
                                                <table className="table ">
                                                  <thead>
                                                    <tr>
                                                      <th>Member Type</th>
                                                      <th>First Name</th>
                                                      <th>Last Name</th>
                                                      <th>DOB</th>
                                                      <th>Age</th>
                                                    </tr>
                                                  </thead>
                                                <tbody id="add_row">
                            
                            
                                                    {this.state.tempExistingEmployees.map((id,index) => (
                                                        // <Row id = {id} changeDob={this.changeDob} index={ind}/>
                                                        
                                                        this.Row(id,this.changeDob,index)
                                                    ))}
                                                
                                                 </tbody>
                                                </table>
                                                
                                    <div className="plus-btn-div">                                  
                                         <a className="plus-btn" id='addRow' href="#"  onClick={()=>this.appendChild ()}  disabled = {this.state.isEnable} ><i className="fas fa-plus" style={{color:'#fff'}}/></a>

                                              </div>
                                        </div>      
            <div className="add-employee-title mt-3">
             <button type="button" onClick={()=>this.resetTable()} className="btn btn-primary pull-right">Reset Table</button>
            </div>
                 </div>
                                    
                                    

                                </div>
              </div>
              {/*Row*/}
            </div>
          </div>
          
        </form>
        
        <div className="calculate-btn-col" style={{overflow: 'auto',padding: '0px 0px'}}>
          <div style={{float: 'right'}}>
            <button type="button" className="btn btn-primary prevbtn" id="prevBtn" onClick={()=>this.nextPrev(-1)}>Previous</button>
            <button type="button" className="btn btn-primary nextBtn" id="nextBtn" onClick={()=>{
                if(document.getElementById("nextBtn").innerHTML == "Calculate")
                {
                    {this.calculateEstimate()}
                    return
                }

                this.nextPrev(1)
            }} disabled={this.state.disabledProp}>Next</button>
          </div>
          <span style={{display:this.state.spanErrorStatus}}><Link to="/update-billing-method">You are out of credits. Click here to update Billing Info!</Link></span>
        </div>
        
        
        
        <div style={{textAlign: 'center', marginTop: '40px',display: "none"}}>
          <span className="step" />
          <span className="step" />
        </div>
      </div>
      </div>

      </div>
      
    
        )
    }
}
