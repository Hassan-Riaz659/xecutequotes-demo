<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/{path?}', 'PageController@app')->where('path', '.*');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
// (no route name: Auth::routes() already registers the POST /logout route named "logout", and a name can be used once)
Route::get('logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get('/compare-plan', 'PageController@comparePlan')->name('compare-plan');


/* Company Controller Routes */
Route::get('/healthcare-providers', 'CompanyController@index')->name('healthcare-providers');
Route::get('/companies', 'CompanyController@addCompany')->name('companies');
Route::post('/add-company', 'CompanyController@addCompanyPost')->name('add-company');
Route::post('/calculate-estimate', 'CompanyController@calculateEstimate')->name('calculate-estimate');
Route::get('/calculate-census', 'CompanyController@calculateCensus')->name('calculate-census');
Route::get('/show-compared-plans', 'CompanyController@comparedPlans');

/* Plan Controller Routes */
Route::get('/manage-plans', 'PlanController@managePlans')->name('manage-plans');
Route::get('/show-compared-plans', 'PlanController@comparedPlans');
Route::get('/add-plan', 'PlanController@addPlan')->name('add-plan');
Route::post('/add-plan-details', 'PlanController@addPlanDetails')->name('add-plan-details');
Route::post('/update-plan-details', 'PlanController@updatePlanDetails')->name('update-plan-details');
Route::get('/edit-plan/{id}', 'PlanController@editPlan')->name('edit-plan');
Route::get('/view-plan/{id}', 'PlanController@viewPlan')->name('view-plan');

