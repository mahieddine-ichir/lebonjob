/**
 * App module.
 */
angular.module('app', ['ngMaterial', 'ngRoute'])
//.config(function($mdIconProvider) {
//    $mdIconProvider.iconSet('social', 'icons/facebook.svg', 24)
//    .defaultIconSet('icons/facebook.svg', 24);
//})
.config(function($routeProvider) {
    $routeProvider
	    .when("/", {
	        templateUrl : "views/search-basic.html",
	        controller : 'SearchController'
	    })
	    .when("/advanced", {
	        templateUrl : "views/search-advanced.html",
	        controller : 'SearchAdvancedController'
	    })
	    .when('/search-results', {
	        templateUrl : "views/search-results.html",
	        controller : 'SearchResultsController'
	    })
	    .otherwise({
	        redirectTo: "/"
	    });
})
.service('SearchService', function() {
	
	var data = [];
	data.push({
		siret: '123456789',
		last_name: 'Ichir',
		first_name: 'Mahieddine, Mehdi',
		availability: '3',
		address: '2 Rue du Languedoc, 91300 Massy',
		skills: 'Java, Javascript, NodeJS, Devops, AWS, Docker, Spring, JEE',
		social_networks: ['facebook', 'twitter', 'github'],
		cv_checked: true,
		rank: 4,
		email: 'mahieddine.ichir@gmail.com',
		phone: '+3361234567890, +213555303010'
	});
	
	data.push({
		siret: '123451230',
		last_name: 'MICHELIN',
		first_name: 'David',
		availability: '2',
		address: '10 Rue du d\'Italie, 75010 Paris',
		skills: 'Pilotage de Projet, Scrum coaching, Guide agile',
		social_networks: ['facebook', 'twitter'],
		cv_checked: false,
		rank: 3,
		email: 'david.michelin@lebonjob.fr',
		phone: '061234567890'
	});
	
	data.push({
		siret: '123451230',
		last_name: 'Dupont',
		first_name: 'Michel',
		availability: '4',
		address: '10 Rue du Street, 75010 City',
		skills: 'AngularJS, NodeJS, Devops, Docker',
		social_networks: ['facebook', 'bitbucket'],
		cv_checked: false,
		rank: 3,
		email: 'dupont.michel@lebonjob.fr',
		phone: '0612345678XX'
	});
	
	return {
		
		search: function(q, fn) {
			var results = [];
			angular.forEach(data, function(d) {
				if (
						d.siret.toLowerCase().indexOf(q) !== -1
						||
						d.last_name.toLowerCase().indexOf(q) !== -1
						||
						d.first_name.toLowerCase().indexOf(q) !== -1
						||
						d.skills.toLowerCase().indexOf(q) !== -1
						) {
					// fixme
					d.rankmax = 5;
					results.push(d);
				}
			});
			fn(results);
		}
		
	};
})
.run(function($rootScope, SearchService, $timeout) {
	$rootScope.search = function(q, fn) {
		if (!q) {
			return;
		}
		$timeout(function() {
			SearchService.search(q.toLowerCase(), function(data) {
				$rootScope.datas = data;
				fn();
			});
		}, 1000);
	};
})
.controller("SearchController", function($scope, $document, $rootScope, $location) {
	$document.bind('keypress', function(event) {
		if (event.keyCode == 13) {
			$scope.search($scope.query);
		}
	});
	$scope.search = function(q) {
		$rootScope.search(q, function() {
			$location.path("/search-results");
		});
	};
})
.controller("SearchAdvancedController", function($scope) {
	
})
.controller("SearchResultsController", function($scope, $location, $rootScope, $document) {
	if (!$rootScope.datas) {
		$location.path("/");
	}
	$document.bind('keypress', function(event) {
		if (event.keyCode == 13) {
			$rootScope.search($scope.query, function() {});
		}
	});
})