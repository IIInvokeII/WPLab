var myApp = angular.module('myApp' , ['ngRoute']);
myApp.config(function($routeProvider){
	$routeProvider
	.when("/" , {
		templateUrl: "pages/home.html"
	})
	.when("/calculator" , {
		templateUrl: "pages/calculator.html"
	})
	.when("/todo" , {
		templateUrl: "pages/todo.html",
		controller: 'mainController'
	})
})
myApp.controller('mainController', function($scope){
	$scope.name="";
	$scope.task_list=[];
	$scope.completed_task_list=[];
	console.log($scope.task_list);
	$scope.addTask = function(task){
		$scope.task = "";
		$scope.task_list.push(task);
	}
	
	$scope.delTask = function(index){
		$scope.del_task="";
		$scope.completed_task_list.push($scope.task_list[index]);
		$scope.task_list.splice(index-1,1);
		
	}
});