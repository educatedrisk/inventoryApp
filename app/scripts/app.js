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
	



inventoryApp.service('CustomerService', function () {
    //to create unique customer id
    var uid = 1;
    var i;
     
    //customer array to hold list of all customers  
	var customers = [
			{
				id : 1, 
				name : 'Adbarcode', 
				address : "1232 Main Street W.",
				address2 : "unit 2",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [
					{
						name: "John Smith", 
						email: "johnsmith@hotmail.com",
						phone: "905-525-4568",
						phone_ext: "324"
					},
					{ 
						name: "Sally Johnson", 
						email: "sallyjohnson@hotmail.com",
						phone: "905-525-1111",
						phone_ext: "224"
					}
				]
			},
			{
				id : 2, 
				name : 'John Lepore Foods', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 3, 
				name : 'Zarky Fine Foods', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 4, 
				name : 'RPR Environmental', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 5, 
				name : 'Bartek Ingredients',
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 6, 
				name : 'Gen Pack', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 7, 
				name : 'P & F Meat Products',
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			}
		];

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
 
    //simply search customers list for given id
    //and returns the customer object if found
    this.get = function (id) {
        for (i in customers) {
            if (customers[i].id == id) {
                return customers[i];
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
 
    //simply returns the customers list
    this.list = function () {
        return customers;
    }
});

	inventoryApp.controller('CustomerDetailCtrl', ['$stateParams','CustomerService', function($stateParams, CustomerService){
		this.customerid = $stateParams.id;
		this.customer = CustomerService.get(this.customerid);
		
	}])


	inventoryApp.controller('CustomerCtrl', function(CustomerService){

		this.listofcustomers = CustomerService.list();
		/*
		this.listofcustomers = [
			{
				id : 1, 
				name : 'Adbarcode', 
				address : "1232 Main Street W.",
				address2 : "unit 2",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [
					{
						contact_name: "John Smith", 
						email: "johnsmith@hotmail.com",
						phone: "905-525-4568",
						phone_ext: "324"
					},
					{ 
						contact_name: "Sally Johnson", 
						email: "sallyjohnson@hotmail.com",
						phone: "905-525-1111",
						phone_ext: "224"
					}
				]
			},
			{
				id : 2, 
				name : 'John Lepore Foods', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 3, 
				name : 'Zarky Fine Foods', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 4, 
				name : 'RPR Environmental', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 5, 
				name : 'Bartek Ingredients',
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 6, 
				name : 'Gen Pack', 
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			},
			{
				id : 7, 
				name : 'P & F Meat Products',
				address : "1232 James St.",
				address2 : "unit 454",
				city : "Hamilton",
				province : "Ontario",
				country : "Canada",
				contacts : [ ]
			}
		];
			*/
	})
