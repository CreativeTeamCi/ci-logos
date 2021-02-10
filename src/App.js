import logo from './logo.svg';
import { useEffect } from 'react'
import './App.css';
import Home from './components/Home'
import SubmitLogo from './components/SubmitLogo'
import {
  BrowserRouter,
  Switch,
  Route
} from 'react-router-dom'
import $ from 'jquery'


function App() {

  useEffect(() => {
    // Window Load Event
    $(window).on("load", function () {
      // Loader Fade Out
      $(".crt-loader").fadeOut();
      return false;
    });
    // Search Form
    $(".crt-search-btn i").on("click", function () {
      $(".crt-header-content > div").css("opacity", "0.0");
      $(".crt-header-search").css({ "display": "block", "opacity": "1.0" });
      $(".crt-header-search input[type='text']").focus();
    });
    $(".crt-header-search input[type='button']").on("click", function () {
      $(".crt-header-content > div").css("opacity", "1.0");
      $(".crt-header-search").css({ "display": "none" });
    });
    // Theme Style
    $(".crt-theme-style a").on("click", function () {
      if ($("link[title]").attr("href") !== "assets/css/light_style.css") {
        $("link[title]").attr("href", "assets/css/light_style.css");
        $(this).text("Dark Mode");
      }
      else {
        $("link[title]").attr("href", "assets/css/dark_style.css");
        $(this).text("Light Mode");
      }
    });
  })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/submit-logo' component={SubmitLogo} />
        <Route component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
