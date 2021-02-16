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
