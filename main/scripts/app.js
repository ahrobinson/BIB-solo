$(document).ready(function(){
  //initialize google map\\
  var map;
  function initialize(){
    map = new google.maps.Map(document.getElementById('map'), {
      //initial center is New Orleans, LA
      center: {lat: 29.9500, lng: -90.0667},
      zoom: 14
    })
  }
  initialize();

  //HTML5 geolocation\\
  var getLocation = function(){
    if(!navigator.geolocation){
      throw new Error('No support for geolocation in your browser!');
    }
    //watchposition tracks location IRT
    navigator.geolocation.watchPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }

      //reset map center as you move
      map.setCenter(pos)
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        draggable: true,
        title: 'You are here!'
      });
      //listen for position change and calculate distance between points
      marker.addListener('position_changed', function(){
        //lat and lng must be google LatLng object
        var myPos = new google.maps.LatLng(marker.position.lat(), marker.position.lng())
        //only calculate dist if user has added destination
        if(markers[0] !== undefined){
          var yoPos = new google.maps.LatLng(markers[0].internalPosition.lat(), markers[0].internalPosition.lng())
          var dist = Math.round10(google.maps.geometry
                         .spherical
                         .computeDistanceBetween(myPos,yoPos)
                         * 0.00062, -1);
          $('#distLeft').html(dist + ' miles away')
          if(dist < 0.5){
            console.log('You"re almost there!')
          }
        }
        //end of marker addListener function
      });
      //end of watchPosition function
    })
    //end of gelolocation function
  }
  getLocation()

  //add Google-powered searchbox!
  var searchBox = new google.maps.places.SearchBox(document.getElementById('input'));


  // Makes predictive search show results in your area
  map.addListener('bounds_changed', function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener('places_changed', function() {
    var places = searchBox.getPlaces();
    console.log(places)
    if (places.length == 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {

      // Create a marker for each place.
      markers.push(new google.maps.Marker({
        map: map,
        title: place.name,
        position: place.geometry.location
      }));

      //DON'T REMOVE DOES SOME CRAZY STUFF!
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
      //DON'T REMOVE DOES SOME CRAZY STUFF! ^^
    });
    map.fitBounds(bounds);
  });




});
