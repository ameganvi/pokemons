import angular from 'angular';

module.export = function($urlRouterProvider, $stateProvider) {

  $urlRouterProvider.otherwise('/pokemon-selector');

  $stateProvider
    .state('app', {
      abstract: true //,
      // template: '<app-component></app-component>'
    })

}
