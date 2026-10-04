@extends('layouts.admin')

@section('content')

<style>
    .question-mark {
    float: right;
    width: 20px;
    background-color: #6777ef;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: #fff;
    
}

.question-mark a {
    color: #fff;
    text-decoration: none;
}

.question-mark a:hover {
    color: #fff;
    text-decoration: none;
}
</style>

<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Power Generation </h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Power Generation</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-12">
              <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Census</h6>
                </div>
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-12 mb-2 text-center">
                            <h3>Power Generation</h3>
                        </div>
                        <div class="col-md-3">
                            <div class="row">
                                <div class="col-md-12 mb-1">
                                    <h5>John Smith</h5>
                                </div>
                                
                                <div class="col-md-12 mb-1">
                                    <p># Employees</p>
                                    <p># Dependents</p>
                                    <p># Total Enrolled</p>
                                </div>
                                
                                <div class="col-md-12 text-center mb-2">
                                    <a class="btn btn-primary" href="{{ url('new-quote') }}">Change Census</a>
                                </div>
                                
                                <div class="col-md-12">
                                    <h6>Plan Type  <span class="question-mark"><a href="#">?</a></span></h6>
                                    <select class="form-control">
                                        <option value="HMO">HMO</option>
                                        <option value="PPO">PPO</option>
                                    </select>
                                    
                                    <h6 class="mt-2">Metal Level <span class="question-mark"><a href="#">?</a></span></h6>
                                    <select class="form-control">
                                        <option value="bronze">Bronze</option>
                                        <option value="silver">Silver</option>
                                        <option value="gold">Gold</option>
                                        <option value="platinum">Platinum</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="row mb-2">
                                <div class="col-md-12" style="border: 1px solid black;">
                                    <a href="#" class="model-open" data-toggle="modal" data-target="#myModal">
                                    <p style="font-size:18px;">True Select Bronze A</p>
                                    <div class="row">
                                        <div class="col-md-3">
                                           <img class="img-fluid" src="theme/img/1.png" alt="">
                                        </div>
                                        <div class="col-md-3">
                                            <p>Deductible<br>$7,800/$15,600</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p>Out of Pocket Max<br>$7,900/$15,800</p>
                                        </div>
                                        <div class="col-md-3">
                                            <p><span style="font-weight:bold;color:red;">Monthly Premium</span><br>$2,000.00</p>
                                        </div>
                                    </div>
                                    
                                    </a>
                                </div>
                                
                                
                            </div>
                        </div>
                        <div class="col-md-1">
                            <div class="row">
                                <div class="col-md-12 text-center">
                                    <p style="font-size:14px;">Compare</p>
                                </div>
                                <div class="col-md-12">
                                    <p class="pb-5 pt-2 mt-3"><i class="fa fa-plus"></i></p>
                                    <p class="pb-5 pt-2 mt-2"><i class="fa fa-plus"></i></p>
                                    <p class="pb-5 pt-2 mt-2"><i class="fa fa-plus"></i></p>
                                    <p class="pb-5 pt-2 mt-2"><i class="fa fa-plus"></i></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
        
        
        
        <div class="modal fade trueselectmodal" id="myModal">
    <div class="modal-dialog modal-dialog-centered ">
      <div class="modal-content">
        
        <!-- Modal body -->
        <div class="modal-body">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            
            <span class="modal-img">
                <img class="img-fluid mx-auto" src="http://integrityinsurance.dev505.io/public/theme/img/newlogo.PNG">
                
                <a href="#" class="btn btn-primary">True Select Bronze A</a>
            </span>
            
          <a href="#" class="btn true-select-btn"> Summary of Benefits <i class="fa fa-angle-right"1></i></a>
          
          <a href="#" class="btn true-select-btn"> In-Network Provider <i class="fa fa-angle-right"1></i></a>
          
          <a href="#" class="btn true-select-btn"> Prescription Formulary <i class="fa fa-angle-right"1></i></a>
          
          <a href="#" class="btn true-select-btn"> Rates <i class="fa fa-angle-right"1></i></a>
        </div>
        
        <!-- Modal footer -->
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        
      </div>
    </div>
  </div>
  
  
@endsection