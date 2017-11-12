          var myCenter = new google.maps.LatLng(17.433053, 78.412172);
         var markers = [];
         var map ;
 var input;
 var searchBox;


          function loadMap(){
         
            var mapProp = {
               center:myCenter,
               zoom:4,
               mapTypeId:google.maps.MapTypeId.ROADMAP
            };
            
        var map = new google.maps.Map(document.getElementById("map"),mapProp);
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            google.maps.event.addListener(map, 'click', function(event) {
            addMarker(event.latLng, map);
        });

            map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

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
            
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
      




         function addMarker(location, map) {
        // Add the marker at the clicked location, and add the next-available label
        // from the array of alphabetical characters.
         var marker = new google.maps.Marker({
          position: location,
          label: 'A',
          map: map
        });
        var d = new Date();
        var n = d.getTime();
        var Title = document.getElementById("Title").value; 
        var Mensagem = document.getElementById("mensagem").value; 
          parseInfo =  '<h1 id="firstHeading" class="firstHeading">'+ Title + '</h1>' + '<h3>'+ Mensagem +'</h3>'
          document.getElementById("Title").value = "";
          document.getElementById("mensagem").value = "";

         var infowindow = new google.maps.InfoWindow({
          content: parseInfo
        });
         markers.push({index : n , Marcador : marker, Informacoes : infowindow });

    google.maps.event.addListener(marker, "click", function() {
    if (infowindow)
        infowindow.close();
    infowindow.open(map, marker);
});

      google.maps.event.addListener(marker, "rightclick", function(event) {
            for (var i = 0 ; i < markers.length; i++) {
              if (markers[i].Marcador == marker) {
                 markers.splice(i,1);
                  }
              }
            marker.setMap(null)
        });
      }
            
            
              
         };
       


        