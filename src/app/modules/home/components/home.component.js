import angular from 'angular';
import uiRouter from 'angular-ui-router'
import HomeController from './home.controller'
import homeTemplate from './home.template.html'

// Directives
import FooBar from '../../../commons/foo-bar/foo-bar.component'

// Styles
import './home.scss'

angular
  .module('home.component', [
    uiRouter
  ])
  .component(
    'homeComponent', {
      controller: HomeController,
      controllerAs: 'home',
      template: homeTemplate
    }
  )
