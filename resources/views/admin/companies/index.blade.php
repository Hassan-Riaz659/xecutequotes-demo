@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Companies</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Companies</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-12">
              <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">Companies</h6>
                </div>
                <div class="card-body">
                  <div class="row">
                      <div class="col-md-12 table-responsive">
                          <table class="table table-bordered">
                              <thead>
                                  <tr>
                                      <th>Sr. No</th>
                                      <th>Name</th>
                                      <th>Actions</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  @if($companies!=null)
                                  @foreach($companies as $company)
                                  <tr>
                                      <td>{{ $loop->iteration }}</td>
                                      <td>{{$company['name']}}</td>
                                      <td><a href="{{ route('manage-plans',['id'=>$company['id']]) }}" class="btn btn-success">Manage Plans</a></td>
                                  </tr>
                                  @endforeach
                                  @endif
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