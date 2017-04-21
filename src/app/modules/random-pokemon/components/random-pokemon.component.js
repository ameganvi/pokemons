import angular from 'angular';
import uiRouter from 'angular-ui-router'
import RandomPokemonController from './random-pokemon.controller'
import randomPokemonTemplate from './random-pokemon.template.html'

// Styles
import './random-pokemon.scss'

angular
  .module('randomPokemon.component', [
    uiRouter
  ])
  .component(
    'randomPokemonComponent', {
      controller: RandomPokemonController,
      controllerAs: 'randomPokemon',
      template: randomPokemonTemplate
    }
  )
