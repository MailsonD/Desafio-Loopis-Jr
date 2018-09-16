//Utilizando Geolocalização
 if(navigator.geolocation){
 	var latlon= "-6.578874"+","+"-38.596639";
 	var img_url="http://maps.googleapis.com/maps/api/staticmap?center="
  	+latlon+"&zoom=14&size=400x300&sensor=false";
  	geo.innerHTML="<img src='"+img_url+"'/>";
 }
 else{
 	geo.innerHTML = "SORRY: But seu navigator não have suport to the geolocalização!";
 }