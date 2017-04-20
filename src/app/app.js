import angular from 'angular'

import home from './pages/home/home'
import styles from './styles/main.scss'

angular
  .module('app', [
    'app.components',

    'app.home'
  ])
  .config(($locationProvider, $urlRouterProvider) => {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/home')
  })
