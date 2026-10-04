@extends('layouts.admin')

@section('content')
<!-- Container Fluid-->
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Census</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Census</li>
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
                        <div class="col-md-12 table-responsive">
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Member Type</th>
                                        <th>First & Last Name</th>
                                        <th>DOB</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                            <button class="btn btn-primary">Add Row</button>
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                            <a class="btn btn-primary" href="{{ route('calculate-census') }}">Calculate</a>
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                            <button class="btn btn-primary">Reset Table</button>
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