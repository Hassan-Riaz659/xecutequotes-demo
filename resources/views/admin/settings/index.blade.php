@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Account Settings</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Profile Settings</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-8">
              <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Profile</h6>
                </div>
                <div class="card-body">
                  <form>
                      <div class="form-group">
                      <label for="exampleInputEmail1">Account ID</label>
                      <input type="text" class="form-control" value="123456" disabled>
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Username</label>
                      <input type="text" class="form-control" name="username" placeholder="Enter your username" value="Integrity">
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Phone Number</label>
                      <input type="text" class="form-control" name="phone_no" placeholder="Enter your phone number" value="(444) 123-4567">
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email">
                      <small id="emailHelp" class="form-text text-muted">We'll never share your
                        email with anyone else.</small>
                    </div>
                  
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
                <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Account Settings</h6>
                </div>
                <div class="card-body">
                  <form>
                    
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                    </div>
                   
                    <button type="submit" class="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
@endsection