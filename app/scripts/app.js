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
    'ui.router',
  ]);

	inventoryApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
	    .state('home', {
	      url: '/',
	      templateUrl: 'views/main.html'
	    })
	    .state('customers', {
	      url: '/customers',
	      abstract: true,
	      templateUrl: 'views/customers.html'
	    })
	    .state('customers.list', {
	    	url: '',
    		templateUrl: 'views/customers.list.html',
    		controller: 'CustomerCtrl',
    		controllerAs: 'customers'
		})
	    .state('customers.detail', {
	    	url: '/detail/{id}',
    		templateUrl: 'views/customers.detail.html',
    		controller: 'CustomerDetailCtrl',
    		controllerAs: 'customerdetail'
		})
	    .state('customers.detail.document', {
	    	url: '/document/{documentid}',
    		templateUrl: 'views/customers.detail.document.html',
    		controller: 'CustomerCtrl',
    		controllerAs: 'customers'
		})
	    .state('interactions', {
	      url: '/interactions',
	      templateUrl: 'views/interactions.html'
	    })
	    .state('inventory', {
	      url: '/inventory',
	      templateUrl: 'views/inventory.html'
	    })
	    .state('orders', {
	      url: '/orders',
	      templateUrl: 'views/orders.html'
	    })
	    .state('products', {
	      url: '/products',
	      templateUrl: 'views/products.html'
	    });


	}]);
	
inventoryApp.service('CustomerService', ['$http', function ($http) {
	    
	    var uid = 1; //to create unique customer id
	    var i;
    
	    var path = 'assets/customers.json';
	  	this.customers = $http.get(path)
		  	.then(function (data) {
		    	return data;
	  		 }); 
	    
	    //simply returns the customers list
	    this.list = function () {
	        return customers;
	    }

	    //simply search customers list for given id
	    //and returns the customer object if found
	    this.get = function (id) {
	        for (i in customers) {
	            if (customers[i].id == id) {
	                return customers[i];
	            }
	        }
	    }

	}]);

	inventoryApp.controller('CustomerDetailCtrl', ['$stateParams','CustomerService', function($stateParams, CustomerService){
		this.customerid = $stateParams.id;
		this.customer = CustomerService.get(this.customerid);
		
	}])

	inventoryApp.controller('CustomerCtrl', function(CustomerService){
		this.listofcustomers = CustomerService.list();
	})


/* 
	    //save method create a new customer if not already exists
	    //else update the existing object
	    this.save = function (customer) {
	        if (customer.id == null) {
	            //if this is new customer, add it in customers array
	            customer.id = uid++;
	            customers.push(customer);
	        } else {
	            //for existing customer, find this customer using id
	            //and update it.
	            for (i in customers) {
	                if (customers[i].id == customer.id) {
	                    customers[i] = customer;
	                }
	            }
	        }
	    }
 

     
	    //iterate through customers list and delete 
	    //customer if found
	    this.delete = function (id) {
	        for (i in customers) {
	            if (customers[i].id == id) {
	                customers.splice(i, 1);
	            }
	        }
	    }
	 
*/  