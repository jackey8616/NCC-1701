var cam_width = vm.mywidth;
var cam_height = vm.myheight;
var display_distance = Math.sqrt(Math.pow(cam_width, 2) + Math.pow(cam_height, 2));

var timestamp = 0;
function draw() {
  computeRun();
  var cam_center_x = user.viewx;
  var cam_center_y = user.viewy;
  var ctx = document.getElementById('canvas').getContext('2d');
  var orbit_ctx = document.getElementById('orbit_canvas').getContext('2d');
  
  ctx.clearRect(0, 0, cam_width, cam_height);

  drawCamPlanet(ctx, orbit_ctx, cam_center_x, cam_center_y);
  
  drawShip(ctx, orbit_ctx, cam_center_x, cam_center_y);
 
  vm.fps = vm.fps * 0.95 + (1000 / (new Date().getTime()- timestamp)) * 0.05;
  timestamp = new Date().getTime() + 0;
  
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
		  if(user.scale >0.1){
			  ////ctx.arc(parseInt(planet_x), parseInt(planet_y), parseInt(planet_r + 3), 0, Math.PI * 2, true); // Planet need to display.
			  ctx.arc(planet_x, planet_y, planet_r + 2, 0, Math.PI * 2, true); // Planet need to display.
			  ctx.closePath();
			  ctx.fillStyle=value.color;
			  ctx.fill();
			  if(vm.target_object.object.id != value.id) {
				ctx.font = "15px AGENT ORANGE";
				ctx.fillText(value.name, parseInt(planet_x + planet_r + 10), parseInt(planet_y - planet_r - 10));
				ctx.stroke();
			  }
			  
			  value.interact.update(planet_x + planet_r, planet_y - planet_r - 15,
													planet_x + planet_r + 60,planet_y - planet_r + 40, true);	  
		  }else{
			var veterX = (cam_width  / 2 - planet_x)/Math.pow( Math.pow(planet_x - cam_width / 2,2) + Math.pow(planet_y - cam_height / 2,2),0.5) * planet_r;
			var veterY = (cam_height / 2 - planet_y)/Math.pow( Math.pow(planet_x - cam_width / 2,2) + Math.pow(planet_y - cam_height / 2,2),0.5) * planet_r;
		
			ctx.moveTo(planet_x + veterX + veterY, planet_y - veterX + veterY);
			ctx.lineTo(planet_x + veterX - veterY, planet_y + veterX + veterY);
			ctx.lineTo(planet_x - veterY, planet_y + veterX);
			ctx.lineTo(planet_x + veterY, planet_y - veterX);
			ctx.closePath();
			ctx.fillStyle = value.color;
			ctx.fill();
		  }
	  } else {
		  value.interact.exists = false;
	  }
	});
    orbit_ctx.save();
    ctx.save();
}

function drawShip(ctx, orbit_ctx, cam_center_x, cam_center_y) {
	var distance;
	solar_system.spaceship.forEach((value) => {
		distance = Math.sqrt(Math.pow(value.x - cam_center_x, 2) + Math.pow(value.y - cam_center_y, 2));
		if(distance <= display_distance * user.scale + 1000) {
			ship_x = cam_width  / 2 + (value.x - cam_center_x) / user.scale;
			ship_y = cam_height / 2 + (value.y - cam_center_y) / user.scale;
		  
			if(user.drawOrbit) {
				orbit_ctx.beginPath();
				orbit_ctx.fillRect(ship_x, ship_y, 1, 1);
				orbit_ctx.closePath();
				orbit_ctx.fillStyle = "#3C3C3C";
				orbit_ctx.fill();
			}
			
			if(user.scale < 0.01) { // Bigger than 5 Km
				value.componentList.forEach((points) => {
					var pointList = points.calculateRelativePoint(value.c, ship_x, ship_y);
					ctx.beginPath();
					ctx.moveTo(pointList[0].x, pointList[0].y);
					for(var i = 1; i < pointList.length; ++i) {
						ctx.lineTo(pointList[i].x, pointList[i].y);
					}
					ctx.lineTo(pointList[0].x, pointList[0].y);
					ctx.closePath();
					ctx.strokeStyle = "#E0E0E0";
					ctx.lineWidth = 0.001 / user.scale;
					ctx.stroke();
				});
			} else {
				ctx.beginPath();
				ctx.arc(ship_x, ship_y, 1.5, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = "WHITE";
				ctx.fill();
			}
			if(vm.target_object.object.id != value.id) {
				ctx.font = "15px AGENT ORANGE";
				ctx.fillText(value.name, parseInt(ship_x + 10), parseInt(ship_y - 10));
				ctx.stroke();
			}
			
			value.interact.update(ship_x + 10, ship_y  - 10 - 15,
									ship_x + 10 + 60,ship_y  - 10 + 40, true);	
		} else {
			value.interact.exists = false;
		}
	});
    orbit_ctx.save();
    ctx.save();
}

function clearTrack() {
	var orbit_ctx = document.getElementById('orbit_canvas').getContext('2d');
	orbit_ctx.clearRect(0, 0, cam_width, cam_height); // clear canvas
	orbit_ctx.restore();
}
