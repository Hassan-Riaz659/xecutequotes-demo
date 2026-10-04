@extends('layouts.admin')

@section('content')

<style>

.card .table td{
    padding:0px;
}

/* Style the input fields */
input {
  padding: 10px;
  width: 100%;
  font-size: 17px;
  font-family: Raleway;
  border: 1px solid #aaaaaa;
}

/* Mark input boxes that gets an error on validation: */
input.invalid {
  background-color: #ffdddd;
}

/* Hide all steps by default: */
.tab {
  display: none;
}

/* Make circles that indicate the steps of the form: */
.step {
  height: 15px;
  width: 15px;
  margin: 0 2px;
  background-color: #bbbbbb;
  border: none;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.5;
}

/* Mark the active step: */
.step.active {
  opacity: 1;
}

/* Mark the steps that are finished and valid: */
.step.finish {
  background-color: #4CAF50;
}
    
</style>

<form id="regForm" method="Post" action="{{url('calculate-estimate')}}">
    @csrf
<!-- Container Fluid-->
<div class="tab">
        <div class="container-fluid" id="container-wrapper">
          <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Quote for Power Generation</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">New Quote</li>
            </ol>
          </div>

          <div class="row mb-3">
            <div class="col-lg-12">
              <!-- Form Basic -->
              <div class="card mb-12">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                  <h6 class="m-0 font-weight-bold text-primary">New Group Information</h6>
                </div>
                <div class="card-body">
                      <div class="form-group">
                      <label for="exampleInputEmail1">Client Name</label>
                      <input type="text" class="form-control" name="name" placeholder="Enter Client Name" oninput="this.className = ''" required>
                    </div>
                    
                    <div class="form-group">
                      <label for="zip_codes">ZIP Code:</label>
                      <select class="form-control" id="zip_codes" name="zip_codes">
                        @foreach($zipcodes as $zipcode)
                            <option>{{$zipcode->zip_code}}</option>
                        @endforeach
                      </select>
                    </div>
                    
                    <div class="form-group">
                      <label for="exampleInputEmail1">Effective Date</label>
                      <input type="date" class="form-control" oninput="this.className = ''" name="effective_date" placeholder="Enter your effective date" required>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->
        </div>
        </div>
        <div class="tab">
            
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
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>DOB</th>
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody id="add_row">
                                    <tr>
                                        <td>
                                          <select class="form-control" name="member_type">
                                            <option>Employee</option>
                                            <option>Spouse</option>
                                            <option>Dependent</option>
                                          </select>
                                        </td>
                                        <td><input type="text" name="f_name" class="form-control"></td>
                                        <td><input type="text" name="l_name" class="form-control"></td>
                                        <td><input type="date" name="dob" class="form-control"></td>
                                        <td><input type="number" name="age" class="form-control"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                            <button type="button" onclick="addRow()" class="btn btn-primary">Add Row</button>
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                        <!--    <a class="btn btn-primary" href="{{ route('calculate-census') }}">Calculate</a>-->
                        </div>
                        <div class="col-md-4 mt-2 text-center">
                            <button type="button" onclick="resetTable()" class="btn btn-primary">Reset Table</button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <!--Row-->
        </div>
        </div>
        </form>
        <div style="overflow:auto;">
          <div style="float:right;">
            <button type="button" class="btn btn-primary" id="prevBtn" onclick="nextPrev(-1)">Previous</button>
            <button type="button" class="btn btn-primary" id="nextBtn" onclick="nextPrev(1)">Next</button>
          </div>
        </div>
        
        <div style="text-align:center;margin-top:40px;">
          <span class="step"></span>
          <span class="step"></span>
        </div>
        <!---Container Fluid-->
        
        <script>
        
            function addRow()
            {
                var html='';
                html+='<tr><td><select class="form-control" name="member_type"><option>Employee</option><option>Spouse</option><option>Dependent</option></select></td><td><input type="text" name="f_name" class="form-control"></td><td><input type="text" name="l_name" class="form-control"></td><td><input type="date" name="dob" class="form-control"></td><td><input type="number" name="age" class="form-control"></tr>';
                $("#add_row").append(html);
            }
            
            function resetTable()
            {
                $("#add_row tr").next().remove();
            }
            
            var currentTab = 0; // Current tab is set to be the first tab (0)
            showTab(currentTab); // Display the current tab
            
            function showTab(n) {
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
              fixStepIndicator(n)
            }
            
            function nextPrev(n) {
              // This function will figure out which tab to display
              var x = document.getElementsByClassName("tab");
              // Exit the function if any field in the current tab is invalid:
              if (n == 1 && !validateForm()) return false;
              // Hide the current tab:
              x[currentTab].style.display = "none";
              // Increase or decrease the current tab by 1:
              currentTab = currentTab + n;
              // if you have reached the end of the form... :
              if (currentTab >= x.length) {
                //...the form gets submitted:
                document.getElementById("regForm").submit();
                return false;
              }
              // Otherwise, display the correct tab:
              showTab(currentTab);
            }
            
            function validateForm() {
              // This function deals with validation of the form fields
              var x, y, i, valid = true;
              x = document.getElementsByClassName("tab");
              y = x[currentTab].getElementsByTagName("input");
              // A loop that checks every input field in the current tab:
              for (i = 0; i < y.length; i++) {
                // If a field is empty...
                if (y[i].value == "") {
                  // add an "invalid" class to the field:
                  y[i].className += " invalid";
                  // and set the current valid status to false:
                  valid = false;
                }
              }
              // If the valid status is true, mark the step as finished and valid:
              if (valid) {
                document.getElementsByClassName("step")[currentTab].className += " finish";
              }
              return valid; // return the valid status
            }
            
            function fixStepIndicator(n) {
              // This function removes the "active" class of all steps...
              var i, x = document.getElementsByClassName("step");
              for (i = 0; i < x.length; i++) {
                x[i].className = x[i].className.replace(" active", "");
              }
              //... and adds the "active" class to the current step:
              x[n].className += " active";
            }
            
        </script>
        
@endsection