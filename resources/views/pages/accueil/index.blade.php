<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
		<title>Accueil | CI Logos - Projet opensource</title>
		<meta name="description" content="CI Logos - Projet opensource">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- General CSS Settings -->
		<link rel="stylesheet" href="{{asset('')}}assets/css/general_style.css">
		<!-- Main Style of the template -->
		<link rel="stylesheet" href="{{asset('')}}assets/css/main_style.css">
		<!-- Theme Style of the template -->
		<link rel="stylesheet" href="assets/css/light_style.css" title="theme_style">
		<!-- Landing Page Style -->
		<link rel="stylesheet" href="{{asset('')}}assets/css/reset_style.css">
		<!-- Buttons Style -->
		<link rel="stylesheet" href="{{asset('')}}assets/css/buttons.css">
		<!-- Responsive Style -->
		<link rel="stylesheet" href="{{asset('')}}assets/css/responsive.css">
		<!-- Font awesome -->
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<!-- Fav Icon -->
		<link rel="icon" href="{{asset('')}}assets/images/logo.png">
	</head>
	<body>
		<!-- Loader -->
		<div class="crt-loader">
			<div>
				<h1>CI Logos</h1>
				<img src="{{asset('')}}assets/images/oval.svg" alt="Loading" />
				<p>Powered By CreativeTeam</p>
			</div>
		</div>
		<!-- Background -->
		<div class="crt-background">
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
			<div class="crt-background-item"></div>
		</div>
		<!-- Wrapper -->
		<div class="crt-wrapper">
			<!-- Theme Style -->
			<div class="crt-theme-style">
				<a class="cursor-pointer" href="javascript:;">
                    Dark Mode
                </a>
			</div>
			<!-- Header -->
			<div class="crt-header sticky">
				<div class="crt-header-content">
					<div class="crt-header-logo">
						<a href="/">CI Logos</a>
					</div>
					<div class="crt-search-btn">
						<i class="material-icons">search</i>
					</div>
					<div class="crt-header-search">
						<form>
							<label>
								<input type="text" name="keyword" placeholder="Rechercher..." />
							</label>
							<input type="submit" name="submit" value="search" class="material-icons" />
							<input type="button" name="close" value="close" class="material-icons" />
						</form>
					</div>
					<div class="crt-clear-fix"></div>
				</div>
			</div>
			<!-- Main -->
			<div class="crt-main">
				<div class="crt-main__title">
					<div class="crt-main__title-img">
						<img src="{{asset('')}}assets/images/logo.png">
					</div>
					<h1>
						CI Logos, une collection <a href="#" target="_blank">open source</a> de logos d'entreprise ivoiriennes de haute qualité pour une utilisation gratuite.
					</h1>
					<button class="crt__btn__contribute">
						<i class="fa fa-github"></i>
						&nbsp;
						Contribuer sur GitHub
                    </button>
                    <a href="{{route('submission.index')}}">
                        <button class="crt__btn__submission">
                            <i class="fa fa-paper-plane"></i>
                            &nbsp;
                            Soumettre un logo
                        </button>
                    </a>
                </div>

                @foreach ($business_logo as $logo)
                    <div class="crt__logo">
                        <div class="crt__logo__holder">
                            <div class="crt__logo__image">
                                <img src='{{asset('').$logo->logo_svg}}' alt='SVG logo'>
                            </div>
                            <div class="crt__logo__download">
                                <div class="crt__logo__download__overlay">
                                    <a href="{{asset('').'/'.$logo->logo_svg}}" download="{{$logo->business_name}} SVG Logo">
                                        <span class="crt__logo__download__overlay--svg">
                                            Download SVG
                                        </span>
                                    </a>

                                    <a href="{{asset('').'/'.$logo->logo_png}}" download="{{$logo->business_name}} PNG Logo">
                                        <span class="crt__logo__download__overlay--png">
                                            Download PNG
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="crt__logo__text">
                            <p class="crt__logo__text--primary">{{$logo->business_name}}</p>
                            <p class="crt__logo__text--secondary">{{$logo->activity_area}}</p>
                        </div>
                    </div> <!-- end crt-logo -->
                @endforeach
            </div>
		<!-- JQuery -->
		<script src="{{asset('')}}assets/js/jquery-3.5.0.min.js"></script>
		<!-- Main Script -->
		<script src="{{asset('')}}assets/js/script.js"></script>
	</body>
</html>
