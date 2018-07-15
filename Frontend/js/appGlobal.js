// App de angular
var catalogueApp = angular.module('catalogueApp',
    [
        'uiGmapgoogle-maps',
        'ui.bootstrap',
    ]
)

    .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
  GoogleMapApi.configure({
      //    key: 'AIzaSyBweDD_lz9uuu9XvGJOrnVLNCVwHOJekiQ',
    // v: '3.20',
    libraries: 'weather,geometry,visualization'
  });
}])

catalogueApp.controller('appController', ['$scope', function($scope){


}]);