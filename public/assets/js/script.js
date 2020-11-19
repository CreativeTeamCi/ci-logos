// Strict Mode
"use strict";

// Window Load Event
$(window).on("load", function() {
	// Loader Fade Out
    $(".crt-loader").fadeOut();
    return false;
});

// Mobile Menu
$(".crt-header-mobile i").on("click",function(){
	if($(".crt-menu").css("left") !== "0px"){
		$(".crt-menu").css("left","0px");
		$(this).text("close");
	}
	else{
		$(".crt-menu").css("left","-100%");
		$(this).text("menu");
	}
});

// Search Form
$(".crt-search-btn i").on("click",function(){
	$(".crt-header-content > div").css("opacity","0.0");
	$(".crt-header-search").css({"display":"block","opacity":"1.0"});
	$(".crt-header-search input[type='text']").focus();
});
$(".crt-header-search input[type='button']").on("click",function(){
	$(".crt-header-content > div").css("opacity","1.0");
	$(".crt-header-search").css({"display":"none"});
});

// Theme Style
$(".crt-theme-style a").on("click",function(){
	if($("link[title]").attr("href") !== "assets/css/light_style.css"){
		$("link[title]").attr("href","assets/css/light_style.css");
		$(this).text("Dark Mode");
	}
	else{
		$("link[title]").attr("href","assets/css/dark_style.css");
		$(this).text("Light Mode");
	}
});

// Logo submission
function logo_submit() {
	window.location.href= "submission.html";
}
