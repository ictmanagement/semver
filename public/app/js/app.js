var app = angular.module('semver', []);

app.controller('AppController', function ($scope, $http) {

	$scope.package = 'anahkiasen/rocketeer';
	$scope.version = '~2.1';
	$scope.exists = false;

	$scope.versions = [];
	$scope.matchingVersions = [];

	/**
	 * Fetches all versions of the specified package
	 */
	$scope.fetchVersions = function () {
		$http.get('/packages/'+$scope.package).success(function (response) {
			$scope.versions = response.data;
			$scope.exists = true;
			$scope.fetchMatchingVersions();
		}).error(function() {
			$scope.exists = false;
		});
	};

	/**
	 * Fetches all versions matching a specified range
	 */
	$scope.fetchMatchingVersions = function () {
		$scope.matchingVersions = [$scope.version];
	};

	/**
	 * Checks if a version is within the specified version range
	 *
	 * @param {string} version
	 *
	 * @returns {boolean}
	 */
	$scope.matches = function (version) {
		return $scope.matchingVersions.indexOf(version) !== -1;
	};

});
