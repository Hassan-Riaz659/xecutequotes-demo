@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Add Company</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Add Company</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-12">
            @if(Session::has('message'))
            <div class="alert alert-dismissible fade show {{ Session::get('alert-class') }}" role="alert">
            	{{ Session::get('message') }}
			  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
			    <span aria-hidden="true">&times;</span>
			  </button>
			</div>
			@endif
              <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Add Company</h6>
                </div>
                <div class="card-body">
                    <form method="post" action="{{url('add-company')}}">
                        @csrf
                      <div class="form-group">
                      <label for="exampleInputEmail1">Name</label>
                      <input type="text" class="form-control" name="name" placeholder="Enter Company Name" required>
                      </div>
                      
                      <div class="form-group">
                      <label for="exampleInputEmail1">Email</label>
                      <input type="email" class="form-control" name="email" placeholder="Enter Company Email" required>
                      </div>
                    
                      <div class="form-group">
                      <label for="exampleInputEmail1">Phone Number</label>
                      <input type="number" class="form-control" name="phone" placeholder="Enter Company Phone" required>
                     </div>
                     
                     <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Submit">
                    </div>
                   </form>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->

     
        </div>
        <!---Container Fluid-->
@endsection