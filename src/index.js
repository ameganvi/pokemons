import angular from 'angular';
import uirouter from 'angular-ui-router';

import home from './app/modules/home/home.module'
import randomPokemon from './app/modules/random-pokemon/random-pokemon.module.js'
import pokemonSelector from './app/modules/pokemon-selector/pokemon-selector.module.js'


import styles from './assets/styles/main.scss'

// angular.module('main', [
//   uirouter,
//   home, randomPokemon
// ]);

angular.element(document).ready(() => {
  angular.bootstrap(
    document.getElementById("home"), ['home']
  );
  angular.bootstrap(
    document.getElementById("randomPokemon"), ['randomPokemon']
  );
  angular.bootstrap(
    document.getElementById("pokemonSelector"), ['pokemonSelector']
  );
});
