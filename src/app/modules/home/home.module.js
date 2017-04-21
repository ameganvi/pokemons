import angular from 'angular'

// Styles
import "./../../commons/foo-bar/foo-bar.scss";
import "./components/home.scss";

// Components
import home from './components/home.component'

angular
  .module('home', [
    'app.commons',

    'home.component'
  ])
  .config(($locationProvider, $urlRouterProvider) => {})

// angular
//   .bootstrap(document.getElementById("home"), ['home']);
