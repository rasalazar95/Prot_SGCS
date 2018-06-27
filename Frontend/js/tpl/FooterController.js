catalogueApp.controller('FooterController', ['$scope', '$window', function($scope,$window) {

    $scope.redirectSubscribe = function (){

        $window.location.href = 'https://www.sgc.gov.co/Paginas/crear-suscripcion.aspx';
    };


    $scope.redirectTerms = function (){

        $window.location.href = 'https://www2.sgc.gov.co/Paginas/terminos-y-condiciones.aspx';
    };


    $scope.redirectNotifications = function (){

        $window.location.href = 'https://www2.sgc.gov.co/Paginas/notificaciones-judiciales.aspx';
    };

    $scope.redirectOurHQ = function (){
        $window.location.href = 'https://www2.sgc.gov.co/Nosotros/NuestrasSedes/Paginas/nuestras-sedes.aspx';
    };

    $scope.redirectLogin = function (){

        $window.location.href = 'https://www2.sgc.gov.co/_layouts/15/SHP13.SGC.FormsSignInPage/login.aspx?ReturnUrl=/_layouts/15/Authenticate.aspx?Source=/Paginas/notificaciones-judiciales.aspx&Source=/Paginas/notificaciones-judiciales.aspx';
    };

}]);