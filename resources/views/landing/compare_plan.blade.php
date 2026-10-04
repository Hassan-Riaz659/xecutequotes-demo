@extends('layouts.admin')

@section('content')


<style>

.table-col .table {
    font-size: 14px;
}
    .table-logos-img {
        width: 100px;
        height: 50px;
    }
    
    .monthly-premium-col {
        background-color: #def0d8;
    }
    .list-rate-col {
        background-color: #d9edf6;
    }
    .list-rate-col span {
        border-Bottom: 1px solid #e3e6f0;
        font-size: 13px;
    }
    .list-rate-col span i {
        vertical-align: middle;
    }
    .planlevel-col .bronze {
        background-color: #955a38;
        color: #fff;
    }
    .planlevel-col .Silver {
        background-color: #a8a8a8;
        color: #fff;
    }
    
.planlevel-col .gold {
        background-color: #daa341;
        color: #fff;
    }
    
.network-row td .first-span {
    display: flex;
    justify-content: space-between;
}

.network-row td .first-span span {
    width: 50%;
}
.second-span {
    padding-right: 5px;
}
.compare-btn {
    margin-bottom: 40px;
}
.compare-btn .print-btn {
    background-color: #019ba6;
    color: #fff;
}

@media(max-width: 767px) {
    .table-col {
        
        overflow-x: scroll;
    }
    .list-rate-col span {
    width: 200px;
}


}

</style>

<div class="container-fluid" id="container-wrapper">
    
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
            <h1 class="h3 mb-0 text-gray-800">Compare Price</h1>
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><a href="./">Home</a></li>
              <li class="breadcrumb-item active" aria-current="page">Compare Price</li>
            </ol>
          </div>
          
          <div class="table-col">
              
        <h4><b>Plan OverView</b></h4>
        
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>True Select Bronze A</th>
          <th>Group HMO Silver 4w/gym MemberShip</th>
          <th>True Select Gold A</th>
        </tr>
      </thead>
      
      <tbody>
          
        <tr>
          <td>Carrier</td>
          <td> 
          
          <img class="table-logos-img img-fluid" src="http://integrityinsurance.dev505.io/public/admintheme/img/logo/logo2.png">
          
          </td>
          
          <td>
          
          <img class="table-logos-img img-fluid" src="http://integrityinsurance.dev505.io/public/admintheme/img/logo/logo2.png">
          
          </td>
          
          <td>
          
          <img class="table-logos-img img-fluid" src="http://integrityinsurance.dev505.io/public/admintheme/img/logo/logo2.png">
          
          </td>
          
        </tr>
        
        <tr class="monthly-premium-col">
            <td>
                Monthly Premium
            </td>
            
            <td>
                $12224.22
            </td>
            
            <td>
                $12224.22
            </td>
            
            <td>
                $12224.22
            </td>
        </tr>
        
        <tr class="list-rate-col">
            <td>
                List Rate
            </td>
            
            <td>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
            </td>
            
            <td>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
            </td>
            
            <td>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
                <span class="d-block">
                    <i class="fa fa-angle-double-right"></i>  emp: Kevin Cockrell - $253.70
                </span>
            </td>
        </tr>
        
        <tr class="planlevel-col">
            <td>
                Plan Level (Metal: tier)
            </td>
            
            <td class="bronze">
                Expand Bronze
            </td>
            
            <td class="Silver">
                Silver
            </td6+>
            
            <td class="gold">
                Gold
            </td>
        </tr>
        
        
        <tr class="">
            <td>
                Health Saving account Qualified
            </td>
            
            <td>
                No
            </td>
            
            <td>
                No
            </td6+>
            
            <td>
                No
            </td>
        </tr>
        
        
        <tr class="">
            <td>
                Summary of benefits and coverage (SBC)
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
        </tr>
        
                <tr class="">
            <td>
                Foormulary Link
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
            
            <td>
                <a href="#">Link</a>
            </td>
        </tr>
        
        
        
      </tbody>
      
    </table>
    
  </div>
  
  
  
  
            <div class="table-col">
              
        <h4><b>Cost Sharing Overview</b></h4>
        
    <table class="table">
      <tbody>
          
        
        <tr class="">
            <td>
                Deductibies
            </td>
            
            <td>
                
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
            
            <td>
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
            
            <td>
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
        </tr>
        
        <tr class="">
            <td>
                Out of Pocket Max
            </td>
            
            <td>
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
            
            <td>
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
            
            <td>
                <span>individual: $1200.00</span> 
                
                <span>Family: $1200.00</span> 
            </td>
        </tr>
        
        <tr class="network-row">
            <td>
                <b>Drugs</b>
            </td>
            
            <td>
                <span class="first-span">
                <span>In Network </span> 
                
                <span>Out of Network</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>In Network </span> 
                
                <span>Out of Network</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                    
                <span>In Network </span> 
                
                <span>Out of Network</span> 
                
                </span>
                
            </td>
        </tr>
        
        <tr class="network-row">
            <td>
                Generic Drugs
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            
        </tr>
        
        <tr class="network-row">
            <td>
                Preffered Drugs
            </td>
            
            <td>
                <span class="first-span">
                <span class="second-span">$50.00% Coinsurance after deductible</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            
        </tr>
        
        <tr class="network-row">
            <td>
                Non Preffered Brand Drugs
            </td>
            
            <td>
                <span class="first-span">
                <span class="second-span">$50.00% Coinsurance after deductible</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            
        </tr>
        
        <tr class="network-row">
            <td>
                Specialty Drugs
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            <td>
                <span class="first-span">
                <span>$30.00 Copay</span> 
                
                <span>Not Covered</span> 
                </span>
            </td>
            
            
        </tr>
        
        
        
      </tbody>
      
    </table>
    
    <div class="col-12 compare-btn">
        <a href="#" class="btn print-btn"> Print</a>
        <a href="#" class="btn print-btn"> Close</a>
    </div>
    
  </div>
        

        </div>


@endsection