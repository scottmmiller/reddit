var app = angular.module('reddit');

app.service('firebaseService', function($http, $q) {

	this.getData = function() {
		return $http({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json',
			
		}).then(function(data) {
			return data.data;
		});
	};


});