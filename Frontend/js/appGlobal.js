// App de angular
var catalogueApp = angular.module('catalogueApp',
    [
        'uiGmapgoogle-maps',
        'ui.bootstrap',
        'rzModule',
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

catalogueApp.directive('ngInitial', function() {
  return {
    restrict: 'A',
    controller: [
      '$scope', '$element', '$attrs', '$parse', function($scope, $element, $attrs, $parse) {
        var getter, setter, val;
        val = $attrs.ngInitial || $attrs.value;
        getter = $parse($attrs.ngModel);
        setter = getter.assign;
        setter($scope, val);
      }
    ]
  };
});