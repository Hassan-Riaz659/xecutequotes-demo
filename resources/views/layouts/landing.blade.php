<!DOCTYPE html>
<html lang="zxx" class="no-js">

<head>
	<!-- Mobile Specific Meta -->
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<!--<link rel="shortcut icon" type="image/png" href="{{ asset('theme/img/favicon.png') }}"/>-->
	<!-- Favicon-->
	<link rel="shortcut icon" href="img/fav.png">
	<!-- Author Meta -->
	<meta name="author" content="codepixer">
	<!-- Meta Description -->
	<meta name="description" content="">
	<!-- Meta Keyword -->
	<meta name="keywords" content="">
	<!-- meta character set -->
	<meta charset="UTF-8">
	<!-- Site Title -->
	<title>Integrity Insurance</title>

	<link href="https://fonts.googleapis.com/css?family=Poppins:400,600|Roboto:400,400i,500" rel="stylesheet">
	<!--
			CSS
			============================================= -->
	<link rel="stylesheet" href="{{ asset('theme/css/linearicons.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/font-awesome.min.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/bootstrap.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/magnific-popup.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/nice-select.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/hexagons.min.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/owl.carousel.css') }}">
	<link rel="stylesheet" href="{{ asset('theme/css/main.css') }}">
</head>

<body>
	<!-- start header Area -->
	<header id="header">
		<div class="container main-menu">
			<div class="row align-items-center justify-content-between d-flex">
				<div id="logo">
					<a href="{{url('/')}}"><img src="{{ asset('theme/img/newlogo.PNG') }}" alt="" title="" height="80" width="120"/></a>
				</div>
				<nav id="nav-menu-container">
					<ul class="nav-menu">
						<li class="menu-active"><a href="{{ route('welcome') }}">Home</a></li>

					<!--	<li class="menu-has-children"><a href="">Pages</a>
							<ul>
								<li><a href="elements.html">Elements</a></li>
							</ul>
						</li>-->
					<!--	<li class="menu-has-children"><a href="">Blog</a>
							<ul>
								<li><a href="blog-home.html">Blog Home</a></li>
								<li><a href="blog-single.html">Blog Single</a></li>
							</ul>
						</li>-->
						<li><a href="#">Contact</a></li>
						
						<li><a href="">Login</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
	<!-- end header Area -->
	
	@yield('content')
	
	<!-- Start Footer Area -->
	<footer class="footer-area section-gap" style="margin-top:60px;">
		<div class="container">
			<div class="row">
				<div class="col-lg-2 col-md-6 single-footer-widget">
					<h4>Top Products</h4>
					<ul>
						<li><a href="#">Managed Website</a></li>
						<li><a href="#">Manage Reputation</a></li>
						<li><a href="#">Power Tools</a></li>
						<li><a href="#">Marketing Service</a></li>
					</ul>
				</div>
				<div class="col-lg-2 col-md-6 single-footer-widget">
					<h4>Quick Links</h4>
					<ul>
						<li><a href="#">Jobs</a></li>
						<li><a href="#">Brand Assets</a></li>
						<li><a href="#">Investor Relations</a></li>
						<li><a href="#">Terms of Service</a></li>
					</ul>
				</div>
				<div class="col-lg-2 col-md-6 single-footer-widget">
					<h4>Features</h4>
					<ul>
						<li><a href="#">Jobs</a></li>
						<li><a href="#">Brand Assets</a></li>
						<li><a href="#">Investor Relations</a></li>
						<li><a href="#">Terms of Service</a></li>
					</ul>
				</div>
				<div class="col-lg-2 col-md-6 single-footer-widget">
					<h4>Resources</h4>
					<ul>
						<li><a href="#">Guides</a></li>
						<li><a href="#">Research</a></li>
						<li><a href="#">Experts</a></li>
						<li><a href="#">Agencies</a></li>
					</ul>
				</div>
				<div class="col-lg-4 col-md-6 single-footer-widget">
					<h4>Newsletter</h4>
					<p>You can trust us. we only send promo offers,</p>
					<div class="form-wrap" id="mc_embed_signup">
						<form target="_blank" action="https://spondonit.us12.list-manage.com/subscribe/post?u=1462626880ade1ac87bd9c93a&amp;id=92a4423d01"
						 method="get" class="form-inline">
							<input class="form-control" name="EMAIL" placeholder="Your Email Address" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Your Email Address '"
							 required="" type="email">
							<button class="click-btn btn btn-default"><span class="lnr lnr-arrow-right"></span></button>
							<div style="position: absolute; left: -5000px;">
								<input name="b_36c4fd991d266f23781ded980_aefe40901a" tabindex="-1" value="" type="text">
							</div>

							<div class="info"></div>
						</form>
					</div>
				</div>
			</div>
		
		</div>
	</footer>
	<!-- End Footer Area -->

	<script src="{{ asset('theme/js/vendor/jquery-2.2.4.min.js') }}"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
	 crossorigin="anonymous"></script>
	<script src="{{ asset('theme/js/tilt.jquery.min.js') }}"></script>
	<script src="{{ asset('theme/js/vendor/bootstrap.min.js') }}"></script>
	@if (config('services.google_maps.key'))
	<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key={{ config('services.google_maps.key') }}"></script>
	@endif
	<script src="{{ asset('theme/js/easing.min.js') }}"></script>
	<script src="{{ asset('theme/js/hoverIntent.js') }}"></script>
	<script src="{{ asset('theme/js/superfish.min.js') }}"></script>
	<script src="{{ asset('theme/js/jquery.ajaxchimp.min.js') }}"></script>
	<script src="{{ asset('theme/js/jquery.magnific-popup.min.js') }}"></script>
	<script src="{{ asset('theme/js/owl.carousel.min.js') }}"></script>
	<script src="{{ asset('theme/js/owl-carousel-thumb.min.js') }}"></script>
	<script src="{{ asset('theme/js/hexagons.min.js') }}"></script>
	<script src="{{ asset('theme/js/jquery.nice-select.min.js') }}"></script>
	<script src="{{ asset('theme/js/waypoints.min.js') }}"></script>
	<script src="{{ asset('theme/js/mail-script.js') }}"></script>
	<script src="{{ asset('theme/js/main.js') }}"></script>
</body>

</html>