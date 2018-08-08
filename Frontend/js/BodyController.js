catalogueApp.controller('BodyController', ['$scope', function($scope) {
    // #667f00 verde institucional claro

    $scope.tab = 1;
    $scope.changeTab = function(value){
        $scope.tab = value;
    }
}]);

catalogueApp.controller('MapTabController', ['$scope', 'uiGmapLogger', 'uiGmapGoogleMapApi', '$uibModal', '$document', function($scope, $log, GoogleMapApi, $uibModal, $document) {

    $scope.tab = 1;
    $scope.loading = false;
    $scope.user = "";
    $scope.tab = 1;
    $scope.enableConsolidate = true//false;
    $scope.selectedMarker = null;
    $scope.sismosConsolidar = {
        activo: true,
        lista: [],
    };
    var EarthquakeCount = 0;
    var stationCount = 0;
    var gpsStationCount = 0;
    var swarmCount = 0;
    var intensityCount = 0;
    var intensityFeltCount = 0;
    var mechaCount = 0;
    var velModelCount = 0;
    var massMovementCount = 0;
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

    $scope.filtro = {
        activo: false,
        sliderMagnitud: {
            minValue: 0,
            value : 3,
            maxValue: 8,
              options: {
                floor: 0,
                ceil: 8,
                step: 0.1,
                  precision: 1,
                draggablerange: true,
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
            denominacion: '',
            tipo_denominacion: 0,
            multiplier: 1,
        },
        sliderIntensidad: {
            minValue: 1,
            value : 3,
            maxValue: 10,
              options: {
                floor: 0,
                ceil: 8,
                step: 0.1,
                  precision: 1,
                draggablerange: true,
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
            denominacion: '',
            tipo_denominacion: 0,
            multiplier: 1,
        },

    };

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
        minValue: 10,
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
        denominacion: 'Segundos',
        tipo_denominacion: 7,
        multiplier: 0.1,
        enableConsolidate :false,
    };

    $scope.config.distanceslider = {
      value : 1,
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
    enableConsolidate: false,
    }

    $scope.config.timeDChanged = function(){
        switch($scope.config.selectedTime){
            case '0':
                $scope.config.timeslider.denominacion = "Años";
                break;
            case '1':
                $scope.config.timeslider.denominacion = "Decadas";
                break;
            case '2':
                $scope.config.timeslider.denominacion = "Años";
                break;
            case '3':
                $scope.config.timeslider.denominacion = "Meses";
                break;
            case '4':
                $scope.config.timeslider.denominacion = "Semanas";
                break;
            case '5':
                $scope.config.timeslider.denominacion = "Días";
                break;
            case '6':
                $scope.config.timeslider.denominacion = "Horas";
                break;
            case '7':
                $scope.config.timeslider.denominacion = "Segundos";
                break;
        }
        $scope.timeChanged();
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
    $scope.distanceChanged();
    }

    $scope.config.selectedTime = 7;
    $scope.config.selectedDistance = 0;

    $scope.config.timeTypes = [
        {
            id:0,
            nombre:'Rango de tiempo',
            activo: false,
        },
        {
            id:1,
            nombre: 'Decadas',
            activo: false,
        },
        {
            id:2,
            nombre: 'Años',
            activo: false,
        },
        {
            id:3,
            nombre: 'Meses',
            activo: false,
        },
        {
            id:4,
            nombre: 'Semanas',
            activo: false,
        },
        {
            id:5,
            nombre: 'Días',
            activo: false,
        },
        {
            id:6,
            nombre: 'Horas',
            activo: false,
        },
        {
            id:7,
            nombre: 'Segundos',
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
        nombre:'Unidades de información',
        'activo': 1,
        'recursos':[
            {
                nombre:'Sismos',
                activo: true,
                tipo : 1,
                icono: "/Frontend/static/earthquake.png",
                filtro: {
                }
            },
            {
                nombre:'Estaciones',
                activo: true,
                tipo : 2,
                icono: "/Frontend/static/station.png",
            },
            {
                nombre:'Mecanismos focales',
                icono: "/Frontend/static/mecanismo_f.png",
                activo: false,
                tipo : 3,
            },
            {
                nombre:'Intesidad instrumental',
                icono: "/Frontend/static/intensidad_m.png",
                activo: false,
                tipo : 4,
            },
            {
                nombre:'Intensidades percibidas',
                icono: "/Frontend/static/intensidad_p.png",
                activo: false,
                tipo : 5,
            },
            {
                nombre:'Modelo de velocidades',
                icono: "/Frontend/static/modelo_v.png",
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
                icono: "/Frontend/static/mov_masa.png",
            },
            {
                nombre:'Enjambres',
                activo: false,
                tipo : 9,
                icono: "/Frontend/static/enjambre.png",
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
    externalConfig.areas[0].recursos[1].activo = false;
    externalConfig.areas[0].recursos[6].activo = false;
    externalConfig.leftShowable = false;
    externalConfig.leftHiding = true;

    // configuración para usuario interno
    var internalConfig = angular.copy($scope.config);
    $scope.configs.push(externalConfig);
    $scope.configs.push(internalConfig);

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


      circleGeneral.addListener('rightclick', function(event) {
            circleFar.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
            circleGeneral.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
            $scope.redraw('moved');
        console.log('Right click was captured cirlce.', event.latLng.lat())
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

      $scope.generalMap.addListener('rightclick', function(event) {
           circleFar.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
           circleGeneral.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
           $scope.redraw('moved');
        console.log('Right click was captured map.', event)
      });
      $scope.generalMap.addListener('drag', function(event) {
        console.log('dragended.', event)
      });
    //////////////
    $scope.timeChanged = function(){
        if($scope.config.timeslider.denominacion == "Segundos" &&
            $scope.config.timeslider.tipo_denominacion == '7' &&
            $scope.config.timeslider.minValue <= 30  &&
            $scope.config.timeslider.maxValue <= 30){
            $scope.config.timeslider.enableConsolidate = true;
        }else{
            $scope.sismosConsolidar.lista = [];
            $scope.config.timeslider.enableConsolidate = false;
        }
        $scope.redraw('time');
    }

    $scope.distanceChanged = function(){
        if($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier <= 1000 &&
            $scope.config.distanceslider.value > 0){
            $scope.config.distanceslider.enableConsolidate = true;
        }else{
            $scope.sismosConsolidar.lista = [];
            $scope.config.distanceslider.enableConsolidate = false;
        }
        circleGeneral.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
        circleFar.setRadius($scope.config.distanceslider.value * $scope.config.distanceslider.multiplier) ;
        $scope.redraw('distance');
    }

    function getMarkerName(type){
        switch(type){
            case 1:
                EarthquakeCount++;
                return "Sismo " + EarthquakeCount;
                break;
            case 2:
                stationCount++;
                return "Estación " + stationCount;
                break;
            case 3:
                mechaCount++;
                return "Mecanismo focal " + mechaCount;
                break;
            case 4:
                intensityCount++;
                return "Intensidad instrumental" + intensityCount;
                break;
            case 5:
                intensityFeltCount++;
                return "Intensidad percibida " + intensityFeltCount;
                break;
            case 6:
                velModelCount++;
                return "Modelo de velocidades " + velModelCount;
                break;
            case 7:
                gpsStationCount++;
                return "Estación GPS " + gpsStationCount;
                break;
            case 8:
                massMovementCount++;
                return "Movimiento en masa " +massMovementCount;
                break;
            case 9:
                swarmCount++;
                return "Enjambre " + swarmCount;
                break;
            case 10:
                return "10";
                break;
        }
        return "Error";
    };

    function getMarkerType(flag){
        if(!flag){
        return Math.floor(chance.floating({min:1.1,max:9.9}));
        }else{
            return 1;
        }
    }

    function getMarkerImage(type){
        switch(type){
            case 1:
                return "/Frontend/static/earthquake.png";
                break;
            case 2:
                return "/Frontend/static/station.png";
                break;
            case 3:
                return "/Frontend/static/mecanismo_f.png";
                break;
            case 4:
                return "/Frontend/static/intensidad_m.png";
                break;
            case 5:
                return "/Frontend/static/intensidad_p.png";
                break;
            case 6:
                return "/Frontend/static/modelo_v.png";
                break;
            case 7:
                return "/Frontend/static/gpsstation.png";
                break;
            case 8:
                return "/Frontend/static/mov_masa.png";
                break;
            case 9:
                return "/Frontend/static/enjambre.png";
                break;
            case 10:
                return "/Frontend/static/gpsstation.png";
                break;
        }
        return null;
    }

    function arePointsNear(checkPoint, centerPoint, km) {
       var ky = 40000 / 360;
       var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
       var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
       var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
       return Math.sqrt(dx * dx + dy * dy) <= km;
    }

    // lat: 1.2218581, lng: -77.3679451
    function getRandomPos(x, y, dx, dy){
        var pos = {
            lat: chance.floating({min: x - dx,max:x + dx}),//getRndInteger(1.15156,1.221865),
            lng: chance.floating({min:y - dy, max:y + dy}),//getRndInteger(-77.4679440,-77.3579470)
        };
        return pos;
    };

    function getMarkerData(name, type, pos){
        var aux = {};
        aux.name = name;
        aux.type = type;
        aux.pos = pos;
        aux.fecha = randomDate(new Date(2000, 0, 1), new Date());
        switch(type){
            case 1:
                aux.magnitud = chance.floating({min:1,max:6.9});
                aux.estaciones = Math.floor(chance.floating({min:4,max:15.9}));
                aux.intensidades_p = Math.floor(chance.floating({min:0,max:1000.9}));
                aux.profundidad = Math.floor(chance.floating({min:0,max:100.9})) + 'km';
                break;
            case 2:
                aux.config = aux.name + "_config.dat";
                break;
            case 3:
                aux.sismo_as = Math.floor(chance.floating({min:1,max:EarthquakeCount + 2}));
                break;
            case 4:
                aux.valor = Math.floor(chance.floating({min:1,max: 10.9}));
                aux.sismo_as = Math.floor(chance.floating({min:1,max:EarthquakeCount + 2}));
                aux.autor = "Lorem ipsum";
                break;
            case 5:
                aux.sismo_as = Math.floor(chance.floating({min:1,max:EarthquakeCount + 2}));
                break;
            case 6:
                aux.sismo_as = Math.floor(chance.floating({min:1,max:EarthquakeCount + 2}));
                break;
            case 7:
                aux.config = aux.name + "_config.dat";
                break;
            case 8:
                aux.informe = "Informe_" + aux.name + ".pdf";
                break;
            case 9:
                aux.sismos = Math.floor(chance.floating({min:500,max:15000}))
                break;
        }
        return aux;
    }
    $scope.visibleItemsCount = 0;
    var visibility = false;
    $scope.redraw = function(condition){
        var aux;
        $scope.visibleItemsCount = 0;
        visibility = false;
        for(i = 1; i < markers.length;i++){
            if(markers[i].timeEnd > markers[i].timeStart ){
                aux = markers[i].timeEnd;
                markers[i].timeEnd  = markers[i].timeStart;
                markers[i].timeStart = aux;
            }
            if(markers[i].timeEnd < 20 || markers[i].type == 1)
                markers[i].timeEnd = 0;

            if(markers[i].timeEnd <= $scope.config.timeslider.minValue &&  $scope.config.timeslider.minValue <= markers[i].timeStart){
                switch(markers[i].type){
                    case 1:
                        if($scope.config.areas[0].recursos[0].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 2:
                        if($scope.config.areas[0].recursos[1].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 3:
                        if($scope.config.areas[0].recursos[2].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 4:
                        if($scope.config.areas[0].recursos[3].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 5:
                        if($scope.config.areas[0].recursos[4].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 6:
                        if($scope.config.areas[0].recursos[5].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 7:
                        if($scope.config.areas[0].recursos[6].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 8:
                        if($scope.config.areas[0].recursos[7].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                    case 9:
                        if($scope.config.areas[0].recursos[8].activo == true){
                            visibility = $scope.getMarkerVisibility(markers[i].position);
                            markers[i].marker.setVisible(visibility);
                            if(visibility){
                                $scope.visibleItemsCount++;
                            }
                        }else{
                            markers[i].marker.setVisible(false);
                        }
                        break;
                }
            }else{
                markers[i].marker.setVisible(false);
            }
        }
        //console.log($scope.visibleItemsCount)
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
        return Math.floor(chance.floating({min:0,max:100.9}));
    }

    function randomDate(start, end) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    var lastSelectedMarker = null;
    var auxMarker = {};
    var randomMarkers = function(number, x, y, dx, dy, flag){
        for(i = 0; i < number; i++) {
        auxMarker.type = getMarkerType(flag);
        auxMarker.name = getMarkerName(auxMarker.type);
        auxMarker.image = getMarkerImage(auxMarker.type);
        auxMarker.position = getRandomPos(x, y, dx, dy);
        auxMarker.timeStart = setTime();
        auxMarker.timeEnd = setTime();
        auxMarker.data = getMarkerData(auxMarker.name, auxMarker.type, auxMarker.position);
        auxMarker.activo = true;
        auxMarker.children = [];
        auxMarker.parentMarker = null;
        auxMarker.marker = new google.maps.Marker({
                  map: $scope.generalMap,
                  icon: getMarkerImage(auxMarker.type),
                  title: auxMarker.name,
                  position: auxMarker.position,
                  visible : false,
                });
        auxMarker.marker.parent = auxMarker;
        auxMarker.marker.addListener('click', function() {
            //console.log(this.parent, lastSelectedMarker);

            $scope.selectedMarker = this.parent;

            if($scope.selectedMarker.children.length != 0){
                for( i = 0; i < $scope.selectedMarker.children.length; i++){
                    visibility = $scope.getMarkerVisibility($scope.selectedMarker.children[i].position);
                    $scope.selectedMarker.children[i].marker.setVisible(visibility)//
                    if(visibility){
                    $scope.visibleItemsCount++;
                    }
                }
            }
            /// revisar el cambio de seleccion de hijos a otro aparte
            if(lastSelectedMarker != null) {
                if (lastSelectedMarker.children.length != 0){
                    if (lastSelectedMarker.children.indexOf(this.parent) == -1 && lastSelectedMarker != $scope.selectedMarker) {
                        for (i = 0 ; i < lastSelectedMarker.children.length; i++) {
                            lastSelectedMarker.children[i].marker.setVisible(false)//
                        }
                        lastSelectedMarker = this.parent
                    }else{
                    }
                }else{
                    lastSelectedMarker = this.parent
                }
            //}
            //revisar
            }else{
                lastSelectedMarker = this.parent
            }

            console.log($scope.visibleItemsCount)
            $scope.$apply();
        });
        auxMarker.marker.addListener('rightclick', function() {
           circleFar.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
           circleGeneral.setCenter({lat: event.latLng.lat(), lng: event.latLng.lng()})
           $scope.redraw('moved');
        });

        markers.push(auxMarker);
        auxMarker = {};
        }
        $scope.redraw("start");
    }

// IMPORTANTE PARA TEST
    randomMarkers(1000, 1.25, -77.5019455, 0.25, 0.3659985, false);

    // lat: 1.2218581, lng: -77.3679451
    randomMarkers(3, 1.2218581, -77.3679451, 0.006, 0.006, true);

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

    function setEarthquakes(){
        for(i = 0; i < markers.length; i++){
            if(markers[i].type == 1 && markers[i].marker.visible == true){
                markers[i].incluido = true;
                $scope.sismosConsolidar.lista.push(markers[i]);
            }
        }
    }
    setEarthquakes();
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

    $scope.consolidarSismos = function(size){
     var modalInstance = $uibModal.open({
        animation: false,
        templateUrl: '/Frontend/templates/sismosConsolidar.html',
        controller: 'consolidarController',
        backdrop: true,
        scope: $scope,
        size: size,
        resolve: {
            sismosConsolidar : function () {
                return $scope.sismosConsolidar;
            }
        },
        }
        );
        modalInstance.result.then(function (result) {
            var indexParent = 0;
            var index = 0;
            var otherMarkers = [];
            for( i = 0 ;i < $scope.sismosConsolidar.lista.length; i++){
                if(i != result){
               index = markers.indexOf($scope.sismosConsolidar.lista[i]);
               markers[index].marker.setVisible(false);
                otherMarkers.push(markers.splice(index, 1)[0]);
                }else{
                    indexParent = i;
                }
            }
            indexParent = markers.indexOf($scope.sismosConsolidar.lista[indexParent]);
            if(indexParent > -1){
                markers[indexParent].marker.setIcon("/Frontend/static/earthquakeParent.png")
                markers[indexParent].children = otherMarkers;
                for( i = 0 ; i< markers[indexParent].children.length; i++){
                    markers[indexParent].children[i].marker.setIcon("/Frontend/static/earthquakeSon.png");
                    markers[indexParent].children[i].marker.parentMarker = markers[indexParent];
                }
            }
            $scope.sismosConsolidar.lista = [];
            $scope.redraw("consolidated");
        })
    }

    /// OJO con esto
    $scope.$watchCollection('config.distanceslider', function(newConfig, oldConfig) {
        if(!angular.equals(newConfig,oldConfig)){
            $scope.sismosConsolidar.lista = [];

            if($scope.config.distanceslider.options.ceil - $scope.config.distanceslider.options.floor <= 10){
                $scope.config.distanceslider.options.step = 0.5;
                $scope.config.distanceslider.options.precision = 1;
            }
            if($scope.config.distanceslider.options.ceil - $scope.config.distanceslider.options.floor <= 5){
                $scope.config.distanceslider.options.step = 0.2;
                $scope.config.distanceslider.options.precision = 1;
            }
            $scope.distanceChanged()
            $scope.enableConsolidate = $scope.config.timeslider.enableConsolidate &&
                $scope.config.distanceslider.enableConsolidate;
            if($scope.enableConsolidate == true){
                setEarthquakes();
            }
        }
    });
    $scope.$watchCollection('config.timeslider', function(newConfig, oldConfig) {

        if(!angular.equals(newConfig,oldConfig)){

            // if(isNaN(newConfig.options.ceil) || isNaN(newConfig.minValue) ||
            //     isNaN(newConfig.options.floor) || isNaN(newConfig.options.maxValue)){
            //     $scope.config.timeslider = oldConfig;
            //     //return;
            // }
            $scope.sismosConsolidar.lista = [];
            $scope.timeChanged();
            $scope.enableConsolidate = $scope.config.timeslider.enableConsolidate &&
                $scope.config.distanceslider.enableConsolidate;
            if($scope.enableConsolidate == true){
                setEarthquakes();
            }
        }
    });
    $scope.$watchCollection('user', function(newConfig, oldConfig) {

            if($scope.user != undefined && $scope.user == "interno"){
                $scope.config = $scope.configs[1];
            }else{
                $scope.config = $scope.configs[0];
            }
            $scope.config.distanceslider.value = 1;
            $scope.config.distanceslider.options.floor = 0;
            $scope.config.distanceslider.options.ceil = 30;
            $scope.config.timeslider.minValue = 1;
            $scope.config.timeslider.maxValue = 30;
            $scope.config.timeslider.options.floor = 0;
            $scope.config.timeslider.options.ceil = 100;
            $scope.redraw("user charged");
            $scope.loading = false;
    });
    $scope.$watchCollection('config.selectedTime', function(newConfig, oldConfig) {
        $scope.config.timeslider.tipo_denominacion = $scope.config.selectedTime;
    });


}]);

catalogueApp.controller('configController', ['$uibModalInstance','$scope', 'config', function($uibModalInstance,$scope, config) {

    $scope.config_aux = angular.copy(config);
    $scope.config = config;

     $scope.ok = function() {
         $scope.$close($scope.config);
    };

     $scope.cancel = function() {
         $scope.config = $scope.config_aux;
         $scope.$dismiss("cancel");
    };
}]);

catalogueApp.controller('consolidarController', ['$uibModalInstance','$scope', 'sismosConsolidar', function($uibModalInstance,$scope, sismosConsolidar) {

    $scope.sismosConsolidar = sismosConsolidar;
    $scope.selectedEarthquake = null;

    $scope.selectedRadio = function(){
        console.log($scope.selectedEarthquake)
    }

     $scope.ok = function() {
         $scope.$close($scope.selectedEarthquake);
    };

     $scope.cancel = function() {
         $scope.$dismiss("cancel");
    };
}]);





