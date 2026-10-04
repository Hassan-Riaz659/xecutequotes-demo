@extends('layouts.landing')

@section('content')
	<!-- start banner Area -->
	<section class="banner-area">
		<div class="container">
			<div class="row banner-content">
			    
			    <div class="col-12 breadcrumbs-col">
			        <div class="right-part">
						<a href="index.html">home</a>
						<span class="fa fa-caret-right"></span>
						<a href="{{ route('about') }}">about</a>
					</div>
			    </div>
			    
			    
				<div class="col-lg-12 d-flex align-items-center justify-content-between">
    
					
					<div class="left-part">
						<h1>
						    About
						</h1>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
							magna aliqua.
						</p>
					</div>
					
				</div>
			</div>
		</div>
		</div>
	</section>
	<!-- End banner Area -->


	<!-- Start about Area -->
	<section class="about-area">
		<div class="container">
		<div class="row">
		    <div class="col-md-12 text-center">
		        <p>Youtube Video</p>
		    </div>
		</div>
		</div>
	</section>
	<!-- End about Area -->
@endsection