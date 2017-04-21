import angular from 'angular';
import uiRouter from 'angular-ui-router'
import PokemonSelectorController from './pokemon-selector.controller'
import pokemonSelectorTemplate from './pokemon-selector.template.html'

// Styles
import './pokemon-selector.scss'

angular
  .module('pokemonSelector.component', [
    uiRouter
  ])
  .component(
    'pokemonSelectorComponent', {
      controller: PokemonSelectorController,
      controllerAs: 'pokemonSelector',
      template: pokemonSelectorTemplate
    }
  )
