$(document).ready(function(){
  //initialize google map\\
  function initialize(){
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 29.9500, lng: -90.0667},
      zoom: 12
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
        lat: position.coordinates.latitude,
        lng: position.coordinates.longitude
      }
      console.log(pos)
    })
  }
  getLocation()
});
