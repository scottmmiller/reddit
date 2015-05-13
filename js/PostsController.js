var app = angular.module('reddit');

app.controller('PostsController', function($scope, firebaseService) {

	var getPosts = function() {
		firebaseService.getData()
			.then(function(data) {
		$scope.posts = data;
		console.log('data', data);
		});
	}
	getPosts();

});