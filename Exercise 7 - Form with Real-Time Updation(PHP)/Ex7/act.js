var app=angular.module('cc',['ngRoute']);
app.config(['$routeProvider',function($routeProvider){
	$routeProvider
	.when('/insert' , {
		templateUrl:'./insert.html',
		controller: "inserter"
	})
	.when("/see",{
		templateUrl:'./see.html',
		controller: "seer"
	})
	.otherwise({
		redirectTo: "/insert"
	})
}]);
app.controller("seer",function($scope,$http){
	$http.get("./see.php")
		.then(function(response) {
			$scope.tableData = response.data;
		});
	$scope.other_part='Insert records';
});
app.controller("inserter",function($scope){
	$scope.other_part='See data';
});
