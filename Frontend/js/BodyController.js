catalogueApp.controller('BodyController', ['$scope', function($scope) {
    // #667f00 verde institucional claro

    $scope.tab = 1;

    $scope.changeTab = function(value){
        $scope.tab = value;
    }
}]);

catalogueApp.controller('B1Controller', ['$scope', function($scope) {

    $scope.value1 = 'hola';
    $scope.value2 = "mundo";
    $scope.value3 = "test";
    $scope.tab = 1;


    $scope.changeTab = function(value){
        $scope.tab = value;
    }
}]);

catalogueApp.controller('B2Controller', ['$scope', function($scope) {

    $scope.tab = 1;
    $scope.changeTab = function(value){
        $scope.tab = value;
    }
}]);

catalogueApp.controller('B3Controller', ['$scope', function($scope) {

    $scope.tab = 1;

    $scope.changeTab = function(value){
        $scope.tab = value;
    }

}]);