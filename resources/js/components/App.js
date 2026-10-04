import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import about from './about';
import home from './home';

import Home from './home/index';
import Login2 from './auth/Login';

import SignUp from './auth/Signup';

import ContactUs from './ContactUs';

import pricing from './pricing';
import login from './login';
import register from './register';
import disclaimer from './disclaimer';
import VerifyAccount from './VerifyAccount';

import Dashboard from './Dashboard';
import SavedQuotes from './SavedQuotes';

import ProfileSetting from './ProfileSetting';
import addData from './AddData';
import AdminControl from './adminControl';
import EditUser from './editUser';

import Companies from './Companies';
import HealthcareProvider from './HealthcareProvider';
import ManagePlans from './ManagePlans';
import ComparePrice from './ComparePrice';
import NewQuote from './NewQuote';
import ExistingNewQuote from './ExistingNewQuote';
import Clients from './Clients';
import lastClient from './LastClient';
import Calculate from './Calculate';
import quotes30Days from './Quotes30Days';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import CustomerSupport from './CustomerSupport';
import CreatePassword from './CreatePassword';
import QuotePreview from './QuotePreview';
import PreviousQuotePreview from './PreviousQuotePreview';
import resetQuotePlans from './resetQuotePlans';
import SeeComparedPlans from './SeeComparedPlans';
import changeCensus from './changeCensus';

import Employees from './Employees/';
import AddEmployee from './Employees/Add.js';
import EditEmployee from './Employees/update.js';

import CardDetails from './billing';
import ManageBilling from './CardDetails/billing.js';
import EditChangeCensus from './EditChangeCensus';
import addCensusEmp from './AddCensusEmp';


import ClientDetails from './ClientDetails';
import EditClEmployee from './EditClEmployee';
import './dataTable/jquery.dataTables.min.css';
import './dataTable/jquery.dataTables.min.js';

import DashboardHome from './dashboardHome/DashboardHome';
// import NewQuote2 from './NewDashboard/NewQuote/NewQuote';
// import ClientDetails2 from './NewDashboard/NewQuote/ClientDetails';
// import PowerGeneration from './NewDashboard/NewQuote/PowerGeneration';
// import Cencus2 from './NewDashboard/NewQuote/Cencus';
// import ComparePrice2 from './NewDashboard/NewQuote/ComparePrice';

// import PreviousQuote2 from './NewDashboard/PreviousQuote/PreviousQuotes';
// import Clients2 from './NewDashboard/Clients/Clients';
// import Employees2 from './NewDashboard/Employees/Employees';
// import AddEmployee2 from './NewDashboard/Employees/AddEmployee';
// import ProfileSetting2 from './NewDashboard/ProfileSetting/ProfileSetting';

import Test from './test';
   

class App extends Component {
    constructor (props){
        super(props);

}



  
      render () {
        return (
          <div className="App">
      <BrowserRouter>

        <Switch>
          <Route  path="/" exact component={home}/>
          
          <Route  path="/home" exact component={Home}/>
          {/*<Route   exact path="/login2" component={Login2}/>
          
          <Route   exact path="/signup2" component={SignUp}/>*/}
          
          <Route  path="/about" component={about}/>
          <Route  path="/contact-us" component={ContactUs}/>
          <Route  path="/pricing" component={pricing}/>
          <Route  path="/termsConditions" component={disclaimer}/>

          
          <Route  path="/client-details/:id" component={ClientDetails}/>
          <Route  path="/edit-clientemployee/:id" component={EditClEmployee}/>
          <Route  path="/quote-preview/:id" component={QuotePreview}/>
          <Route  path="/previous-quote-preview/:id" component={PreviousQuotePreview}/>
          <Route  path="/reset-quote-plans" component={resetQuotePlans}/>
          <Route  path="/see-compared-plans/:id" component={SeeComparedPlans}/>
          <Route  path="/add-census-emp/:id" component={addCensusEmp}/>
          
          <Route  path="/login" component={login}/>
          <Route  path="/register" component={register}/>
          <Route path="/verify-account/:code" component={VerifyAccount}/>
          
          <Route  path="/last-quotes/:id" component={quotes30Days}/>
          <Route  path="/last-client-details/:id" component={lastClient}/>
          <Route  path="/CustomerSupport" component={CustomerSupport}/>
          <Route  path="/dashboard" component={Dashboard}/>
          <Route  path="/saved-quotes" component={SavedQuotes}/>
          <Route  path="/companies" component={Companies}/>
          <Route  path="/profile-settings" component={ProfileSetting}/>
          <Route  path="/add-data" component={addData}/>
          <Route  path="/admin-control" component={AdminControl}/>
          <Route  path="/edit-user/:id" component={EditUser}/>
          <Route  path="/heath-care-providers" component={HealthcareProvider}/>
          <Route  path="/manage-plans" component={ManagePlans}/>
          <Route  path="/compare-price" component={ComparePrice}/>
          <Route  path="/clients" component={Clients}/>
          <Route  path="/new-quote/:id" component={NewQuote}/>
          <Route  path="/existing-new-quote/:id" component={ExistingNewQuote}/>
          <Route  path="/calculate" component={Calculate}/>
          <Route  path="/changeCensus/" component={changeCensus}/>
          <Route  path="/edit-changeCensus/:id" component={EditChangeCensus}/>
          <Route path="/add-agent" component={AddEmployee}/>
          <Route path="/edit-agent/:id" component={EditEmployee}/>
          <Route path="/agents" component={Employees}/>
          
          <Route path="/update-billing" component={CardDetails}/>
          <Route path="/manage-billing" component={ManageBilling}/>
          
          <Route path="/edit-manage-card/:id" component={CardDetails}/>
         
          <Route path ="/forgot-password/" component={ForgotPassword}/>
          <Route path ="/reset-password/:token" component={ResetPassword}/>
          <Route path ="/create-password/:token" component={CreatePassword}/>
          
        {/* <Route  exact path="/DashboardHome" component={DashboardHome}/>
          <Route  exact path="/new-quote" component={NewQuote2}/> 
          <Route  exact path="/client-details2" component={ClientDetails2}/> 
          
          <Route  exact path="/previous-quote" component={Quotes}/> 
          <Route  exact path="/clients2" component={Clients2}/>
          <Route  exact path="/employees2" component={Employees2}/>
          <Route  exact path="/add-employee2" component={AddEmployee2}/>
          
          <Route  exact path="/profile-setting2" component={ProfileSetting2}/>
          <Route  exact path="/power-generation" component={PowerGeneration}/>
          <Route  exact path="/cencus2" component={Cencus2}/>
          <Route  exact path="/compare-price2" component={ComparePrice2}/>*/}

        </Switch>
      </BrowserRouter>
      
    </div>
        )
      }
    }

ReactDOM.render(<App />, document.getElementById('app'))