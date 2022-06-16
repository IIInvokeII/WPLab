// create module
var calcApp = angular.module('calcApp',[]);

// create controller
calcApp.controller('arithmeticController', ['$scope', function($scope) {
    $scope.expr = "";
    $scope.modifyExpr = function(a) {
        if (a == '') {
            $scope.expr = '';
        }
        else if (a == '<') {
            $scope.expr = $scope.expr.slice(0,-1);
        }
        else {
            $scope.expr += a;
            // console.log($scope.expr);
        }
    }

    $scope.evaluate = function() {
        try {
            $scope.expr = Function('return ' + $scope.expr + ';')().toString();
        }
        catch(e) {
            $scope.expr = "Error!"
        }
    }

}])