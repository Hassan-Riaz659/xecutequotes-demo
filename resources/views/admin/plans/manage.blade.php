@extends('layouts.admin')

@section('content')
<style>
    a.btn:hover {
     -webkit-transform: scale(1.1);
     -moz-transform: scale(1.1);
     -o-transform: scale(1.1);
 }
 a.btn {
     -webkit-transform: scale(0.8);
     -moz-transform: scale(0.8);
     -o-transform: scale(0.8);
     -webkit-transition-duration: 0.5s;
     -moz-transition-duration: 0.5s;
     -o-transition-duration: 0.5s;
 }
</style>
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Manage Plans</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Manage Plans</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-12">
                <div class="card mb-12">
                    <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 class="m-0 font-weight-bold text-primary">Company Info</h6>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        @if($company['file_path']!=null)
                                        <img src="{{ asset($company['file_path']) }}">
                                        @else
                                        <p>No Image</p>
                                        @endif
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="row">
                                    <div class="col-md-12">
                                        <label for="name" style="font-weight:bold;">Name</label>
                                        <p>{{$company['name']}}</p>
                                    </div>
                                    <div class="col-md-12">
                                        <label for="total_plans" style="font-weight:bold;">Total Plans</label>
                                        <p>{{sizeof($plans)}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="card mb-12 mt-3">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Plans</h6>
                  <!--<div><a class="pull-right btn btn-primary"  href="{{ route('add-plan',['id'=>$company['id']]) }}">Add Plan</a></div>-->
                </div>
                <div class="card-body">
                  <div class="row">
                      <div class="col-md-12 table-responsive">
                         <table class="table table-bordered">
                             <thead>
                                 <tr>
                                     <th>Name</th>
                                     <th>Monthly Premium</th>
                                     <th>Deductibles</th>
                                     <th>Type</th>
                                     <th>Actions</th>
                                 </tr>
                             </thead>
                             <tbody>
                                 @foreach($plans as $plan)
                                 <tr>
                                     <td>{{$plan->name}}</td>
                                     <td></td>
                                     <td></td>
                                     @if($plan->type == 0)
                                     <td>In-Network</td>
                                     @else
                                     <td>Out-Network</td>
                                     @endif
                                     <td>
                                          <a href="{{url('view-plan/'.$plan->id)}}" class="btn btn-success a-btn-slide-text">
                                                <span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span>
                                                <span><strong>View</strong></span>            
                                            </a>
                                            
                                                <a href="{{url('edit-plan/'.$plan->id)}}" class="btn btn-primary a-btn-slide-text">
                                                    <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                                    <span><strong>Edit</strong></span>            
                                                </a>
                                         
                                     </td>
                                 </tr>
                                 @endforeach()
                             </tbody>
                         </table>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
@endsection