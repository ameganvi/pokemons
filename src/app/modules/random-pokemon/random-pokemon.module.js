import angular from 'angular'

// Styles
import "./components/random-pokemon.scss";

// Components
import randomPokemon from './components/random-pokemon.component'

angular
  .module('randomPokemon', [
    'randomPokemon.component'
  ])
  .config(($locationProvider, $urlRouterProvider) => {})

//angular
//  .bootstrap(document.getElementById("randomPokemon"), ['randomPokemon']);
// angular.bootstrap(document, ['randomPokemon']);
