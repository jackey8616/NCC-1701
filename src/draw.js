var cam_width = vm.mywidth;
var cam_height = vm.myheight;
var display_distance = Math.sqrt(Math.pow(cam_width, 2) + Math.pow(cam_height, 2));

var timestamp = 0;
function draw() {
  var cam_center_x = user.viewx;
  var cam_center_y = user.viewy;
  var ctx = document.getElementById('canvas').getContext('2d');
  var orbit_ctx = document.getElementById('orbit_canvas').getContext('2d');
  
  ctx.clearRect(0, 0, cam_width, cam_height);

  drawCamPlanet(ctx, orbit_ctx, cam_center_x, cam_center_y);
 
  ctx.restore(); 
  orbit_ctx.restore();
  window.requestAnimationFrame(draw);
}

function drawCamPlanet(ctx, orbit_ctx, cam_center_x, cam_center_y) {
	var distance;
	var planet_x;
	var planet_y;
	var planer_r;
	solar_system.planet.forEach((value) => {
	  distance = Math.sqrt(Math.pow(value.x - cam_center_x, 2) + Math.pow(value.y - cam_center_y, 2));
	  if(distance <= display_distance * user.scale + value.r) {
		  planet_x = cam_width  / 2 + (value.x - cam_center_x) / user.scale;
		  planet_y = cam_height / 2 + (value.y - cam_center_y) / user.scale;
		  planet_r = value.r / user.scale;
		  
		  if(user.drawOrbit) {
			orbit_ctx.beginPath();
			orbit_ctx.fillRect(planet_x, planet_y, 1, 1);
			orbit_ctx.closePath();
			orbit_ctx.fillStyle = "#3C3C3C";
			orbit_ctx.fill();
		  }
		  
		  ctx.beginPath();
		  ////ctx.arc(parseInt(planet_x), parseInt(planet_y), parseInt(planet_r + 3), 0, Math.PI * 2, true); // Planet need to display.
		  ctx.arc(planet_x, planet_y, planet_r + 2, 0, Math.PI * 2, true); // Planet need to display.
		  ctx.closePath();
		  ctx.fillStyle=value.color;
		  ctx.fill();
		  if(vm.target_planet.id != value.id) {
			ctx.font = "15px AGENT ORANGE";
			ctx.fillText(value.name, parseInt(planet_x + planet_r + 10), parseInt(planet_y - planet_r - 10));
			ctx.stroke();
		  }
		  
		  value.interact.update(planet_x + planet_r, planet_y - planet_r - 15,
												planet_x + planet_r + 60,planet_y - planet_r + 40, true);
		  
	  } else {
		  value.interact.exists = false;
	  }
	});
	orbit_ctx.save();
	ctx.save();
    vm.fps = vm.fps * 0.95 + (1000 / (new Date().getTime()- timestamp)) * 0.05;
    timestamp = new Date().getTime() + 0;
}

function clearTrack() {
	var orbit_ctx = document.getElementById('orbit_canvas').getContext('2d');
	orbit_ctx.clearRect(0, 0, cam_width, cam_height); // clear canvas
	orbit_ctx.restore();
}