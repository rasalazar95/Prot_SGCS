catalogueApp.controller('BodyController', ['$scope', function($scope) {
    // #667f00 verde institucional claro

    $scope.tab = 1;

    $scope.changeTab = function(value){
        $scope.tab = value;
    }
}]);

catalogueApp.controller('MapTabController', ['$scope', 'uiGmapLogger', 'uiGmapGoogleMapApi', '$uibModal', '$document', function($scope, $log, GoogleMapApi, $uibModal, $document) {

    var $ctrl = this;
    $scope.tab = 1;
    $scope.loading = false;
    $scope.user = "";
    $scope.changeTab = function(value){
        $scope.tab = value;
    }

    $scope.hideLeftBar = function(){
        $scope.config.leftHiding = true;
    }
    $scope.showLeftBar = function(){
        $scope.config.leftHiding = false;
    }

    $scope.hideRightBar = function(){
        $scope.config.rightHiding = true;
    }
    $scope.showRightBar = function(){
        $scope.config.rightHiding = false;
    }
    $scope.changeActive = function(obj){
        obj.activo = !obj.activo;
    }


            //     {
            //     nombre: "Reportes",
            //     tipo:'doc',
            //     activo: true,
            //     valores : [
            //         {
            //           nombre: "sismo 1.docx",
            //           ruta: "/static/sismo1.docx"
            //         },
            //         {
            //           nombre: "sismo 1.docx",
            //           ruta: "/Frontend/static/sismo1.docx"
            //         },
            //     ]
            // },

    $scope.search = [
        {
            nombre: "Resumen de la búsqueda",
            tipo: 'info',
            activo:true,
            valores : {
                num_estaciones: 10,
                num_sismos: 80,
                num_mecanismos: 10,
                tamano_descarga: 83000000000,
            }
        },
    ]
    $scope.configs = [

    ]

    $scope.config = {

    }

    $scope.config.leftHiding = false;
    $scope.config.rightHiding = false;

    $scope.config.formats = [
        {
            nombre: ".jpg",
            activo: false,
        },
        {
            nombre: ".xml",
            activo: false,
        },
        {
            nombre: ".kml",
            activo: false,
        },
        {
            nombre: ".pdf",
            activo: false,
        },
        {
            nombre: ".mseed",
            activo: false,
        },
        {
            nombre: ".kmz",
            activo: false,
        },
        {
            nombre: ".txt",
            activo: false,
        },
    ]

    $scope.changeConfig = function(configObj, feature, value){
        configObj.feature = value;
    };

    $scope.config.leftShowable = true;

    $scope.config.timeslider = {
        minValue: 0,
        value : 20,
        maxValue: 20,
          options: {
            floor: 0,
            ceil: 100,
             draggablerage: true,
              getPointerColor: function(value){
                return "#82A43C";
              },
              getSelectionBarColor: function(){
                return "#82A43C";
              },
              noSwitching: true,
          },
        height: '5px',
        width: '100%',
        denominacion: 'Años',
        tipo_denominacion: 1,
        multiplier: 360,
    };

    $scope.config.distanceslider = {
        value : 10,
          options: {
            floor: 0,
            ceil: 30,
            vertical: true,
              getPointerColor: function(value){
                return "#82A43C";
              },
              getSelectionBarColor: function(){
                return "#82A43C";
              }
          },
        height: '800px',
        width: '5px',
        denominacion: 'km',
        tipo_denominacion: 0,
        multiplier: 1000,
    }

    $scope.config.timeDChanged = function(){
        switch($scope.config.selectedTime){
            case '0':
                $scope.config.timeslider.denominacion = "Años";
                break;
            case '1':
                $scope.config.timeslider.denominacion = "Años";
                break;
            case '2':
                $scope.config.timeslider.denominacion = "Meses";
                break;
            case '3':
                $scope.config.timeslider.denominacion = "Semanas";
                break;
            case '4':
                $scope.config.timeslider.denominacion = "Días";
                break;
            case '5':
                $scope.config.timeslider.denominacion = "Horas";
                break;
        }
    }

    $scope.config.distanceDChanged = function(){
        switch($scope.config.selectedDistance){
            case '0':
                $scope.config.distanceslider.denominacion = "km";
                $scope.config.distanceslider.multiplier = 1000;
                break;
            case '1':
                $scope.config.distanceslider.denominacion = "m";
                $scope.config.distanceslider.multiplier = 1;
                break;
        }
    }

    $scope.config.selectedTime = 1;
    $scope.config.selectedDistance = 0

    $scope.config.timeTypes = [
        {
            id:0,
            nombre:'Rango de tiempo',
            activo: false,
        },
        {
            id:1,
            nombre: 'Años',
            activo: false,
        },
        {
            id:2,
            nombre: 'Meses',
            activo: false,
        },
        {
            id:3,
            nombre: 'Semanas',
            activo: false,
        },
        {
            id:4,
            nombre: 'Días',
            activo: false,
        },
        {
            id:5,
            nombre: 'Horas',
            activo: false,
        }
    ];

    $scope.config.distanceTypes = [
        {
            id: 0,
            nombre: 'Kilometros'
        },
        {
            id: 1,
            nombre: 'Metros'
        },
    ];

    var fuentes = {
        nombre:'Fuentes y unidades de información',
        'activo': 1,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
                tipo : 1,
                icono: "/Frontend/static/seism.png",
            },
            {
                nombre:'Estaciones',
                activo: true,
                tipo : 2,
                icono: "/Frontend/static/station.png",
            },
            {
                nombre:'Mecanismos focales',
                activo: false,
                tipo : 3,
            },
            {
                nombre:'Intesidad instrumental',
                activo: false,
                tipo : 4,
            },
            {
                nombre:'Intensidades percibidas',
                activo: false,
                tipo : 5,
            },
            {
                nombre:'Modelo de velocidades',
                activo: false,
                tipo : 6,
            },
            {
                nombre:'Estaciones GNSS',
                activo: true,
                tipo : 7,
                icono: "/Frontend/static/gpsstation.png",
            },
            {
                nombre:'Movimientos en masa',
                activo: false,
                tipo : 8,
            },
            {
                nombre:'Enjambres',
                activo: false,
                tipo : 9,
            },
            ],
    }

    var RSNC = {
        nombre:'Red Sismológica',
        'activo': 1,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
                tipo : 1,
                icono: "/Frontend/static/seism.png",
            },
            {
                nombre:'Estaciones',
                activo: false,
                tipo : 2,
                icono: "/Frontend/static/station.png",
            },
            {
                nombre:'Mecanismos focales',
                activo: false,
                tipo : 3,
            },
            {
                nombre:'Intesidad instrumental',
                activo: false,
                tipo : 4,
            },
            {
                nombre:'Intensidades percibidas',
                activo: false,
                tipo : 5,
            },
            ],
    }

    var OVSM = {
        'nombre':"OVS Manizales",
        'activo': 1,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
            },
            {
                nombre:'Estaciones',
                activo: false,
                tipo : 7
            },
            {
                nombre:'Mecanismos focales',
                activo: false,
            },
            ],
    }

    var OVSP = {
        'nombre':'OVS Pasto',
        'activo': 0,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
                tipo : 9,
            },
            {
                nombre:'Estaciones',
                activo: false,
                tipo : 2,
                tipo : 10,
            },
            {
                nombre:'Mecanismos focales',
                activo: true,
                tipo : 11,
            },
            ],
    }

    var OVSPOP = {
        'nombre': 'OVS Popayán',
        'activo': 1,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
            },
            {
                nombre:'Mecanismos focales',
                activo: false,
            },
            ],
    }

    var GRED = {
        'nombre':"GeoRED",
        'activo': 1,
        'recursos':[
            {
                nombre:'Modelo de velocidades',
                activo: false,
            },
            {
                nombre:'Modelo de deformación',
                activo: false,
            },
            {
                nombre:'Estaciones GNSS',
                activo: false,
                icono: "/Frontend/static/gpsstation.png"
            },
            ],
    }

    var MMA = {
        'nombre': 'Mov. en masa',
        'activo': 1,
        'recursos':[
            {
                nombre:'Movimientos en masa',
                activo: false,
            },
            {
                nombre:'Informes',
                activo: false,
            },
            ],
    };

    var RNAC = {
        'nombre': "Red de acelerografos",
        'activo': 1,
        'recursos':[
            {
                nombre:'Mapa aceleraciones',
                activo: true,
            },
            ],
    }

    $scope.map = {
      show: true,
      control: {},
      version: "unknown",
      showTraffic: true,
      showBicycling: false,
      showWeather: false,
      showHeat: false,
        disableDefaultUI:true,
      center: {
        latitude: 1.2218581000000000001,
        longitude: -77.3679451000000000001,
          lat: 1.2218581000000000001,
          lng: -77.3679451000000000001,
      },
      options: {
        mapTypeId: google.maps.MapTypeId.HYBRID,
          zoomControl:false,
          mapTypeControl:false,
        streetViewControl: false,
        panControl: true,
        maxZoom: 14,
        minZoom: 9,
          draggable:true,
        fullscreenControl: true,
      },
      zoom: 11,
      dragging: true,
      options_far: {
        mapTypeId: google.maps.MapTypeId.HYBRID,
          zoomControl:false,
          mapTypeControl:false,
        streetViewControl: false,
        panControl: false,
        maxZoom: 3,
        minZoom: 3,
          draggable:false,
        fullscreenControl: false,
      },
    }

    $scope.config.areas = [

    ]

    $scope.config.areas.push(fuentes);
    ///
    // configuración de prueba para usuarios externos
    var externalConfig = angular.copy($scope.config);
    externalConfig.areas[0].recursos[8].activo = true;
    externalConfig.leftShowable = false;
    externalConfig.leftHiding = true;

    // configuración para usuario interno
    var internalConfig = angular.copy($scope.config);
    $scope.configs.push(externalConfig);
    $scope.configs.push(internalConfig);

    console.log($scope.user)
    if($scope.user != undefined && $scope.user == "interno"){
        $scope.config = $scope.configs[1];
    }else{
        $scope.config = $scope.configs[0];
    }



  GoogleMapApi.then(function(maps) {
            maps.visualRefresh = true;
            $scope.defaultBounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(40.82148, -73.66450),
          new google.maps.LatLng(40.66541, -74.31715));


        $scope.map.bounds = {
          northeast: {
            latitude:$scope.defaultBounds.getNorthEast().lat(),
            longitude:$scope.defaultBounds.getNorthEast().lng()
          },
          southwest: {
            latitude:$scope.defaultBounds.getSouthWest().lat(),
            longitude:-$scope.defaultBounds.getSouthWest().lng()

          }
        }
    });

   /// push everything to the areas

    $scope.generalMap = new google.maps.Map(document.getElementById('map'), {
            zoom: $scope.map.zoom,
            center: $scope.map.center,
            options: $scope.map.options,
      showTraffic: $scope.map.showTraffic,
      showBicycling: $scope.map.showBicycling,
      showWeather: $scope.map.showWeather,
      showHeat: $scope.map.showHeat,
      disableDefaultUI: $scope.map.disableDefaultUI,
       zoomControl: true,
        });
    $scope.generalMap.mapTypeId = google.maps.MapTypeId.HYBRID;

    $scope.mapFar = new google.maps.Map(document.getElementById('map_far'), {
      zoom: 3,
      showTraffic: $scope.map.showTraffic,
      showBicycling: $scope.map.showBicycling,
      showWeather: $scope.map.showWeather,
      showHeat: $scope.map.showHeat,
      disableDefaultUI: $scope.map.disableDefaultUI,
      center: {lat: 4.07087, lng: -73.31733299999998},
        options: $scope.map.options_far,
    });
    $scope.mapFar.mapTypeId = google.maps.MapTypeId.HYBRID;

    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    $scope.generalMap.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    var autocomplete = new google.maps.places.Autocomplete(input);

    // Set initial restrict to the greater list of countries.
    autocomplete.setComponentRestrictions(
        {'country': ['co']});

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }


          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push({
                position: place.geometry.location,
                image : icon,
                timeStart: 10000,
                timeEnd: 0,
                marker: new google.maps.Marker({
              map: $scope.generalMap,
              icon: icon,
              title: place.name,
              position: place.geometry.location
            })
            });
            lastValidCenter = place.geometry.location;
           allowedBounds = new google.maps.LatLngBounds(
                 new google.maps.LatLng( place.geometry.location.lat() - vby, place.geometry.location.lng() - vby),
                 new google.maps.LatLng( place.geometry.location.lat() + vby, place.geometry.location.lng() + vby)
            );
            // draw circle
             circleFar.setCenter(place.geometry.location);
             circleGeneral.setCenter(place.geometry.location);
              $scope.generalMap.setCenter(place.geometry.location);
            $scope.redraw("search");
              //
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          $scope.generalMap.fitBounds(bounds);
        });

    markers.push({
        marker: new google.maps.Marker({
            position: {
                lat: 1.2218581000000000001, lng: -77.3679451000000000001
            },
            map: $scope.generalMap,
            icon: "/Frontend/static/volcano.png"
        }),
        type:-1,
        name: "center",
    });

    var circleGeneral = new google.maps.Circle({
                map: $scope.generalMap,
                radius: 1000 * $scope.config.distanceslider.value,
                center: {lat: 1.2218581000000000001, lng: -77.3679451000000000001},
                fillColor: '#AA0000',
                fillOpacity: 0.1,
                strokeColor: '#AA0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                draggable: false,    // Dragable
                editable: false      // Resizable
    });
    var circleFar = new google.maps.Circle({
                map: $scope.mapFar,
                radius: 1000 * $scope.config.distanceslider.value ,
                center: {lat: 1.2218581000000000001, lng: -77.3679451000000000001},
                fillColor: '#AA0000',
                fillOpacity: 0.1,
                strokeColor: '#AA0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                draggable: false,    // Dragable
                editable: false      // Resizable
    });

    ///// listen to click events
    $scope.mapFar.addListener('click', function(event) {
             lastValidCenter = new google.maps.LatLng( event.latLng.lat() , event.latLng.lng());
             circleFar.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
             circleGeneral.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
             $scope.generalMap.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()}),
                 allowedBounds = new google.maps.LatLngBounds(
                     new google.maps.LatLng( event.latLng.lat() - vby, event.latLng.lng() - vby),
                     new google.maps.LatLng( event.latLng.lat() + vby, event.latLng.lng() + vby)
                );
             $scope.redraw('moved');
    });

    //////////////
    $scope.timeChanged = function(){
        $scope.redraw('time');
    }

    $scope.distanceChanged = function(){
        circleGeneral.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
        circleFar.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
        $scope.redraw('distance');
    }

    $scope.getMarkerName = function(){
        return "test";
    };

    $scope.getMarkerType = function(){
        var value = Math.floor(chance.floating({min:1,max:3.9}));
        return value;
    }

    $scope.getMarkerImage = function(type){
        if(type < 1 || type == null)
            return null;
        if(type == 1)
            return "/Frontend/static/seism.png";
        if(type == 2)
            return "/Frontend/static/station.png";
        if(type == 3)
            return "/Frontend/static/gpsstation.png";
        if(type == 4)
            return "/Frontend/static/seism.png";
        if(type == 6)
            return "/Frontend/static/seism.png";
        if(type == 7)
            return "/Frontend/static/seism.png";
        if(type == 8)
            return "/Frontend/static/seism.png";
        if(type == 9)
            return "/Frontend/static/seism.png";
        if(type == 10)
            return "/Frontend/static/seism.png";
    }

    function arePointsNear(checkPoint, centerPoint, km) {
       var ky = 40000 / 360;
       var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
       var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
       return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    // lat: 1.2218581, lng: -77.3679451
    $scope.getRandomPos = function(){
        var pos = {
            lat: chance.floating({min:1.000000000001,max:1.535865000000000001}),//getRndInteger(1.15156,1.221865),
            lng: chance.floating({min:-77.8679440000000000001,max:-77.1359470000000000001}),//getRndInteger(-77.4679440,-77.3579470)
        };
        return pos;
    };

    $scope.redraw = function(condition){
        var aux;
        for(i = 1; i < markers.length;i++){

            if(markers[i].timeEnd > markers[i].timeStart ){
                aux = markers[i].timeEnd;
                markers[i].timeEnd  = markers[i].timeStart;
                markers[i].timeStart = aux;
            }
            if(markers[i].timeEnd < 20 || markers[i].type == 1)
                markers[i].timeEnd = 0;

            if(markers[i].timeEnd <= $scope.config.timeslider.minValue &&  $scope.config.timeslider.minValue <= markers[i].timeStart){
                if(markers[i].type == 1 && $scope.config.areas[0].recursos[0].activo == true)
                {
                    markers[i].marker.setVisible($scope.getMarkerVisibility(markers[i].position))
                }else{
                    if(markers[i].type == 2 && $scope.config.areas[0].recursos[1].activo == true)
                    {
                        markers[i].marker.setVisible($scope.getMarkerVisibility(markers[i].position))
                    }else{
                        if(markers[i].type == 3 && $scope.config.areas[0].recursos[6].activo == true){
                            markers[i].marker.setVisible($scope.getMarkerVisibility(markers[i].position))
                        }else{
                        markers[i].marker.setVisible(false);

                        }
                    }
                }
            }else{
                markers[i].marker.setVisible(false);
            }
        }
    }

    $scope.getMarkerVisibility = function(position){
        if($scope.config.distanceslider.multiplier == 1000){
        return arePointsNear(position,
            {lat: circleGeneral.getCenter().lat(), lng: circleGeneral.getCenter().lng()},
            $scope.config.distanceslider.value
            )
        }else{
        return arePointsNear(position,
            {lat: circleGeneral.getCenter().lat(), lng: circleGeneral.getCenter().lng()},
            $scope.config.distanceslider.value/1000
            )
        }
    }

    function setTime(){
        var value = Math.floor(chance.floating({min:0,max:100.9}));
        return value;
    }

    var auxMarker = {};
    var randomMarkers = function(number){
        for(i = 0; i < number; i++) {
        auxMarker.type = $scope.getMarkerType();
        auxMarker.name = $scope.getMarkerName();
        auxMarker.image = $scope.getMarkerImage(auxMarker.type);
        auxMarker.position = $scope.getRandomPos();
        auxMarker.timeStart = setTime();
        auxMarker.timeEnd = setTime();
        auxMarker.marker = new google.maps.Marker({
                  map: $scope.generalMap,
                  icon: $scope.getMarkerImage(auxMarker.type),
                  title: $scope.getMarkerName(),
                  position: auxMarker.position,
                  visible : false,
                });
        auxMarker.marker.parent = auxMarker;
        auxMarker.marker.addListener('click', function() {
            $scope.selectedMarker = this;
            console.log($scope.selectedMarker)
        });

        markers.push(auxMarker);
        auxMarker = {};
        }
        $scope.redraw("start");
    }

// IMPORTANTE PARA TEST
    randomMarkers(1000);



    var vby = 0.3;
    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
     new google.maps.LatLng($scope.generalMap.center.lat() - vby, $scope.generalMap.center.lng() - vby),
     new google.maps.LatLng($scope.generalMap.center.lat() + vby, $scope.generalMap.center.lng() + vby)
    );
    var lastValidCenter = $scope.generalMap.getCenter();

    google.maps.event.addListener( $scope.generalMap, 'center_changed', function() {
        if (allowedBounds.contains( $scope.generalMap.getCenter())) {
            // still within valid bounds, so save the last valid position
            lastValidCenter =  $scope.generalMap.getCenter();
            return;
        }

        // not valid anymore => return to last valid position
         $scope.generalMap.panTo(lastValidCenter);
    });


    $scope.openConfig = function(size){
      var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: '/Frontend/templates/configModal.html',
        controller: 'configController',
        backdrop: true,
        scope: $scope,
        size: size,
        resolve: {
            config : function () {
                return $scope.config;
            },
        },
        }
        );
        modalInstance.result.then(function (result) {
                $scope.config = angular.copy(result);
                $scope.redraw("reconfigured");
                circleGeneral.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
                circleFar.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
        })
    }

    /// OJO con esto
    $scope.$watchCollection('config.distanceslider', function(newConfig, oldConfig) {
        if(!angular.equals(newConfig,oldConfig)){
            $scope.distanceChanged()
        }
    });
    $scope.$watchCollection('config.timeslider', function(newConfig, oldConfig) {
        if(!angular.equals(newConfig,oldConfig)){
            $scope.timeChanged()
        }
    });
        $scope.$watchCollection('user', function(newConfig, oldConfig) {
            console.log($scope.user,"user")
    });

}]);

catalogueApp.controller('configController', ['$uibModalInstance','$scope', 'config', function($uibModalInstance,$scope, config) {


    $scope.config_aux = angular.copy(config);
    $scope.config = config


     $scope.ok = function() {
         $scope.$close($scope.config);
    };

     $scope.cancel = function() {
         $scope.config = $scope.config_aux;
         $scope.$dismiss("cancel");
    };
}]);

catalogueApp.controller('B3Controller', ['$scope', function($scope) {

    $scope.tab = 1;

    $scope.changeTab = function(value){
        $scope.tab = value;
    }

}]);