var cam_width = vm.mywidth;
var cam_height = vm.myheight;
// Bigger than screen
var display_distance = Math.sqrt(Math.pow(cam_width, 2) + Math.pow(cam_height, 2));

var timestamp = 0;
function draw() {
  var cam_center_x = solar_system.user.viewx;
  var cam_center_y = solar_system.user.viewy;
  var ctx = document.getElementById('canvas').getContext('2d');
  
  ctx.clearRect(0, 0, cam_width, cam_height); // clear canvas

  drawCamPlanet(ctx, cam_center_x, cam_center_y);
 
  ctx.restore(); 
  window.requestAnimationFrame(draw);
}

function drawCamPlanet(ctx, cam_center_x, cam_center_y) {
    for(var i = 0; i < solar_system.planet.length; i++) {
	  var distance = Math.sqrt(Math.pow(solar_system.planet[i].x - cam_center_x, 2) + Math.pow(solar_system.planet[i].y - cam_center_y, 2));
	  if(distance <= display_distance * solar_system.user.scale + solar_system.planet[i].r) {
		  var planet_x = cam_width  / 2 + (solar_system.planet[i].x - cam_center_x) / solar_system.user.scale;
		  var planet_y = cam_height / 2 + (solar_system.planet[i].y - cam_center_y) / solar_system.user.scale;
		  var planet_r = solar_system.planet[i].r / solar_system.user.scale;
		  
		  ctx.beginPath();
		  //ctx.arc(parseInt(planet_x), parseInt(planet_y), parseInt(planet_r + 3), 0, Math.PI * 2, true); // Planet need to display.
		  ctx.arc(planet_x, planet_y, planet_r + 2, 0, Math.PI * 2, true); // Planet need to display.
		  ctx.closePath();
		  ctx.fillStyle=solar_system.planet[i].color;
		  ctx.fill();
		  if(vm.target_planet.id != solar_system.planet[i].id) {
			ctx.font = "15px AGENT ORANGE";
			ctx.fillText(solar_system.planet[i].name, parseInt(planet_x + planet_r + 10), parseInt(planet_y - planet_r - 10));
			ctx.stroke();
		  }
		  ctx.save();
		  
		  solar_system.planet[i].interact.anchorX1 = planet_x + planet_r;
		  solar_system.planet[i].interact.anchorY1 = planet_y - planet_r - 15;
		  solar_system.planet[i].interact.anchorX2 = planet_x + planet_r + 60;
		  solar_system.planet[i].interact.anchorY2 = planet_y - planet_r + 40;
		  solar_system.planet[i].interact.exists = true;
	  } else {
		  solar_system.planet[i].interact.exists = false;
	  }
	  // Debug of In-Cam Planet.
	  // console.log(solar_system.planet[i].interact);
	}
    vm.fps = vm.fps * 0.95 + (1000 / (new Date().getTime()- timestamp)) * 0.05;
    timestamp = new Date().getTime() + 0;
}
