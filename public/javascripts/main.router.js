angular.module('Comparonics', ['ngResource', 'ngRoute']);

function config($routeProvider, $locationProvider) {
    $routeProvider
				.when('/', {
						templateUrl: 'partials/home.view.html',
						controller: 'homeCtrl',
						controllerAs: 'vm'
				})
				.when('/items', {
            templateUrl: 'partials/allItems.html',
            controller: 'itemsCtrl',
						controllerAs: 'vm'
				})
				.when('/item/:itemid', {
						templateUrl: 'partials/item.html',
						controller: 'productCtrl',
						controllerAs: 'vm'
				})
        .otherwise({redirectTo: '/'});
	
		$locationProvider.html5Mode(true);
		
};
angular
    .module('Comparonics')
    .config(['$routeProvider', '$locationProvider', config])