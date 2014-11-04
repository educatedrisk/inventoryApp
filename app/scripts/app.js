'use strict';

/**
 * @ngdoc overview
 * @name inventoryApp
 * @description
 * # inventoryApp
 *
 * Main module of the application.
 */
var inventoryApp = angular.module('inventoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router'
  ]);

	inventoryApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
	    .state('home', {
	      url: "/home",
	      templateUrl: "views/main.html"
	    })
	    .state('customers', {
	      url: "/customers",
	      templateUrl: "views/customers.html"
	    })
	    .state('customers.detail', {
    		templateUrl: 'views/customers.detail.html'
		})
	    .state('interactions', {
	      url: "/interactions",
	      templateUrl: "views/interactions.html"
	    })
	    .state('inventory', {
	      url: "/inventory",
	      templateUrl: "views/inventory.html"
	    })
	    .state('orders', {
	      url: "/orders",
	      templateUrl: "views/orders.html"
	    })
	    .state('products', {
	      url: "/products",
	      templateUrl: "views/products.html"
	    });


	}]);
	
	inventoryApp.controller('CustomerCtrl', function(){

		this.clients = [
			{
				name : 'Adbarcode', city : "Hamilton"
			},
			{
				name : 'John Lepore Foods', city : "Hamilton"
			},
			{
				name : 'Zarky Fine Foods', city : "Hamilton"
			},
			{
				name : 'RPR Environmental', city : "Hamilton"
			},
			{
				name : 'Bartek Ingredients', city : "Hamilton"
			},
			{
				name : 'Gen Pack', city : "Hamilton"
			},
			{
				name : 'P & F Meat Products', city : "Hamilton" 
			}
		];
		var customerDetail = function () { 

		}

	})
