$(document).ready(function(){
  //initialize google map\\
  var map;
  function initialize(){
    map = new google.maps.Map(document.getElementById('map'), {
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
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      map.setCenter(pos)
      var marker = new google.maps.Marker({
        position: pos,
        map: map,
        title: 'You are here!'
      });
    })
  }
  getLocation()
});
