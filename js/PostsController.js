var app = angular.module('reddit');

app.controller('PostsController', function($scope, firebaseService) {

	$scope.addPost = function() {
		$scope.newPost.timestamp = Date.now();
		$scope.newPost.comments = [];
		$scope.newPost.karma = 0;
		$scope.newPost.id = guid();
		firebaseService.addPost($scope.newPost)
			.then(function(data) {
				getPosts();
			});		
	};

	$scope.vote = function(id, direction) {
		console.log('scope.vote posts: ', $scope.posts[id]);
		firebaseService.vote(id, direction, $scope.posts[id].karma)
			.then(function(data) {
				getPosts();
			});
	};

	var getPosts = function() {
		firebaseService.getData()
			.then(function(data) {
		$scope.posts = data;
		console.log(' Ctrlr getPosts data: ', data);
		});
	}
	getPosts();

	var guid = function() {
	    var s4 = function() {
	      return Math.floor((1 + Math.random()) * 0x10000)
	        .toString(16)
	        .substring(1);
	    };
	    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	      s4() + '-' + s4() + s4() + s4();
	};


});