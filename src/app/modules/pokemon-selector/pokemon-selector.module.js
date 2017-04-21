import angular from 'angular'

// Styles
import "./components/pokemon-selector.scss";

// Components
import pokemonSelector from './components/pokemon-selector.component'

angular
  .module('pokemonSelector', [
    'app.commons',
    'pokemonSelector.component'
  ])
  .config(($locationProvider, $urlRouterProvider) => {})
