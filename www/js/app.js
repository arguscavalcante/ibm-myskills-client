// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'SkillAssessment'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });


    $ionicPlatform.registerBackButtonAction(function(event) {
      event.preventDefault();
      event.stopPropagation();
      console.log('backbutton');
    }, 101);
  })
  .config(function(LoopBackResourceProvider, $stateProvider, $urlRouterProvider) {
    LoopBackResourceProvider.setUrlBase('http://ibm-myskills-server.mybluemix.net/api');
    //LoopBackResourceProvider.setUrlBase('http://localhost:3000/api');
  })
  .config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider


      .state('pesquisa', {
      url: '/pesquisa',
      cache: false,
      templateUrl: 'templates/pesquisa.html',
      controller: 'pesquisaCtrl'
    })

    .state('categoria', {
      url: '/categoria',
      cache: false,
      templateUrl: 'templates/categoria.html',
      controller: 'categoriaCtrl'
    })

    .state('categoriaInicial', {
      url: '/categoriaInicial',
      cache: false,
      templateUrl: 'templates/categoriaInicial.html',
      controller: 'categoriaInicialCtrl'
    })

    .state('instrucoes', {
      url: '/instrucoes',
      templateUrl: 'templates/instrucoes.html',
      controller: 'instrucoesCtrl'
    })

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/login');
  });
