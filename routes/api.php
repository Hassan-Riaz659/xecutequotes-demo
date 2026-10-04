<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// The signed-in user. Needs the access token that /user-login returns.
Route::middleware('auth:api')->get('/user', 'AuthenticationController@currentUser');

// Public: signing in, registering, password recovery and the pre-login forms.
Route::group([
        'middleware' => ['cors'],
    ], function ($router) {
Route::post('/user-login', 'AuthenticationController@login');
Route::post('/send-password-reset-email', 'AuthenticationController@sendPasswordResetMail');
Route::put('/register', 'AuthenticationController@register');
Route::put('/contactUs', 'AuthenticationController@contactUs');
Route::post('/verify-account', 'AuthenticationController@verifyAccount');
Route::post('/resend-email', 'AuthenticationController@resendEmail');
Route::post('/check-existing-email', 'AuthenticationController@checkExistingEmail');
Route::put('/create-password', 'UserController@createPassword');
Route::post('/forgot-password','ForgotPasswordController@forgotPassword');
Route::put('/reset-password','ForgotPasswordController@resetPassword');
Route::post('/news-letter','HomeController@newsletter');
});

// Everything else needs a valid access token (Authorization: Bearer ...), and each call may only
// use the signed-in user's own records (App\Services\Authorization\RoutePolicy lists the rule of every route).
Route::group([
        'middleware' => ['cors', 'auth:api', 'ownership'],
    ], function ($router) {
Route::post('/password-update','AuthenticationController@passwordUpdate');
Route::post('/email-update', 'AuthenticationController@emailUpdate');
Route::post('/email-code', 'AuthenticationController@emailCode');
Route::post('/info-update', 'AuthenticationController@infoUpdate');
Route::post('/verify-code', 'AuthenticationController@verifyCode');
Route::post('/add-company', 'CompanyController@addCompanyPost');
Route::get('/check-existing-client/{name}', 'ClientController@checkExistingClient');
Route::get('/clients/{id}', 'ClientController@viewClients');
Route::put('/add-client', 'ClientController@addClient');
Route::put('/add-employee', 'ClientController@addEmployee');
Route::put('/update-client', 'ClientController@updateClient');
Route::delete('/empty-row/{id}', 'ClientController@emptyEmployeeRow');
Route::get('/get-calculated-employees/{id}/{user_id}', 'ClientController@getCalculatedEmployees');
Route::get('/change-census/{id}', 'ClientController@changeCensus');
Route::put('/add-census-employee', 'ClientController@addCensusEmp');
Route::post('/delete-censusEmployees','HelloController@deleteCensusEmployee');
Route::get('/get-date-census/{id}', 'ClientController@getDateCensus');
Route::get('/fetch-user-data/{id}', 'AuthenticationController@getUserData');
Route::delete('/delete-logo/{id}', 'AuthenticationController@deleteLogo');
Route::delete('/delete-profile-img/{id}', 'AuthenticationController@deleteProfileImg');
Route::post('/add-broker-employee', 'UserController@addBrokerEmployee');
Route::post('/check-broker-email', 'UserController@checkBrokerEmail');
Route::get('/get-users', 'UserController@getAllUsers');
Route::get('/get-user/{id}', 'UserController@getUser');
Route::post('/update-admin-password/', 'UserController@updateAdminPassword');
Route::get('/edit-broker-employee/{id}', 'UserController@editBrokerEmpDetails');
Route::post('/get-files', 'UserController@getFiles');
Route::post('/update-broker-employee', 'UserController@updateEmployee');
Route::get('/check-email', 'UserController@checkEmail');
Route::get('/employees/{userid}', 'UserController@viewEmployee');
Route::delete('/delete-employees/{id}', 'UserController@deleteEmployee');
Route::post('/update-billing', 'CardConnectController@updateBilling');
Route::get('/billing-cycle', 'CardConnectController@billingCycle');
Route::get('check-available-licenses/{id}', 'CardConnectController@checkAvailableLicenses');
Route::get('/check-license/{id}', 'CardConnectController@checkLicense');
Route::put('/return-license', 'CardConnectController@returnLicense');
Route::put('/compare-plans', 'ClientController@comparePlans');
Route::put('/save-quote', 'ClientController@saveQuote');
Route::get('/get-saved-quotes/{id}', 'ClientController@getSavedQuote');
Route::post('/print-plans', 'ClientController@printPlans');
Route::put('/remove-chosen-plans', 'ClientController@removeChosenPlans');
Route::put('/assign-plan', 'ClientController@assignPlan');
Route::get('/see-compared-plans/{id}', 'ClientController@seeComparedPlans');
Route::post('/see-compared-plans-print', 'ClientController@seeComparedPlansPrint');
Route::get('/add-details', 'ClientController@addDetails');
Route::put('/filter-plans', 'ClientController@filterPlans');
Route::post('/check-quote','QuoteController@checkQuote');
Route::get('/test-value','HomeController@testValue');
Route::get('/quotes/{id}','QuoteController@quotes');
Route::get('/client/{id}','QuoteController@client');
Route::get('/previous-quotes/{id}','QuoteController@previousQuotes');
Route::get('/reset-quote-plans/{id}/{quote_id}','QuoteController@resetQuotePlans');
Route::get('/client-details/{id}','HelloController@clientDetails');
Route::get('/quote-preview/{id}','HelloController@quotePreview');
Route::get('/edit-clientemployee/{id}','HelloController@editClientEmployee');
Route::post('/update-client-employee','HelloController@updateClientEmployee');
Route::delete('/delete-Quote/{id}','HelloController@deleteQuote');
Route::delete('/delete-Client/{id}','HelloController@deleteClient');
Route::delete('/delete-clientEmployees/{id}','HelloController@deleteClientEmployee');
Route::put('/check-credentialZip', 'ClientController@checkCredentialZip');
Route::put('/check-credentials', 'ClientController@checkCredentials');
Route::get('/check-credentialDate', 'ClientController@checkCredentialDate');
Route::get('/quotes30Days/{id}','QuoteController@quotes30Days');
Route::get('/totalquotes30Days/{id}','QuoteController@totalquotes30Days');
Route::get('/last-client-details/{id}','QuoteController@lastClientDetails');
Route::get('/existing-client/{id}','ClientController@existingClient');
});
