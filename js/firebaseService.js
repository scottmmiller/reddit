var app = angular.module('reddit');

app.service('firebaseService', function($http, $q) {

	this.getData = function() {
		var deferred = $q.defer();
		$http({
			method: 'GET',
			url: 'https://devmtn.firebaseio.com/posts.json'
			
		}).then(function(data) {
			deferred.resolve(data.data);
		}, function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

	this.addPost = function(post) {
		var deferred = $q.defer();
		console.log(post);
		return $http({
			method: 'PUT',
			url: 'https://devmtn.firebaseio.com/posts/' + post.id + '.json',
			data: post
		}).then(function(data) {
			console.log('post res', data);
		});
	};

	this.vote = function(postId, direction, karma) {
		var deferred = $q.defer();

		if(direction === 'up') {
			karma++;
		}
		else if (direction === 'down') {
			karma--;
		}

		$http({
			method: 'PATCH',
			url: 'https://devmtn.firebaseio.com/posts/' + postId + '.json',
			data: {karma: karma}
		}).then(function(data) {
			console.log('karma: ', data);
			deferred.resolve(data);
		}, function(error) {
			deferred.reject(error);
		});
		return deferred.promise;
	};

});