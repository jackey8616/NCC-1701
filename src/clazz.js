function Interact(){
	this.exists = false;
	this.anchorX1 = 0;
	this.anchorY1 = 0;
	this.anchorX2 = 0;
	this.anchorY2 = 0;
	
	this.update = function(anchorX1, anchorY1, anchorX2, anchorY2, existsa) {
		this.anchorX1 = anchorX1;
		this.anchorYl = anchorY1;
		this.anchorX2 = anchorX2;
		this.anchorY2 = anchorY2;
		this.exists = existsa;
	}
};

function Centroid(x, y) {
	this.x = x;
	this.y = y;
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function Component(pointList, c, m, linkX, linkY) {
	this.c = c;
	this.m = m;
	this.linkX = linkX;
	this.linkY = linkY;
	this.pointList = pointList;
	
	this.calculateRelativePoint = (shipC, x, y) => {
		var newPointList = new Array(this.pointList.length);
		for(var i = 0; i < this.pointList.length; i++) {
			newPointList[i] = new Point(((this.pointList[i].x - shipC.x) / user.scale/100 + x) , ((this.pointList[i].y - shipC.y) / user.scale/100 + y));
		}
		return newPointList;
	}; 
}

function Spaceship(id, name, x, y, a, xv, yv, av, landPlanet) {
	this.id = id;
	this.name = name;
	this.x = x;
	this.y = y;
	this.a = a;
	this.xv = xv;
	this.yv = yv;
	this.av = av;
	this.landPlanet = landPlanet;
	this.componentList = [];
	this.c = 0;
	this.interact = new Interact();
		
	this.setComponentList = (componentList) => {
		var sumMass = 0;
		var xSumMass = 0;
		var ySumMass = 0;
		componentList.forEach((value) => {
			sumMass += value.m;
			xSumMass += value.m * value.c.x;
			ySumMass += value.m * value.c.y;
		});
		this.c = new Centroid(xSumMass / sumMass, ySumMass / sumMass);
		this.componentList = componentList;
	};
	
	this.incSpeed = (xv, yv) => {
		this.xv += xv;
		this.yv += yv;
	};
	
	this.incPosition = (x, y) => {
		this.x += x;
		this.y += y;
	};
}

function Planet(id, name, m, x, y, r, xv, yv, color){
	this.id = id;
	this.name = name;
	this.m = m;
	this.x = x;
	this.y = y;
	this.r = r;
	this.xv = xv;
	this.yv = yv;
	this.color = color;
	this.interact = new Interact();
	
	this.incPosition = function(x, y) {
		this.x += x;
		this.y += y;
	}
	
	this.incSpeed = function(xv, yv) {
		this.xv += xv;
		this.yv += yv;
	}
};

function User(viewx, viewy, scale, timeScale, selected_id){
	this.viewx = viewx;
	this.viewy = viewy;
	this.scale = scale;
	this.timeScale = timeScale;
	this.selected_id = selected_id;
	this.selected_type = 0;
	this.drawOrbit = true;
	
	this.incScale = function(scale) {
		this.scale += scale;
	}
	
	this.setCamPosition = function(viewx, viewy) {
		this.viewx = viewx;
		this.viewy = viewy;
	}
	
	this.incCamPosition = function(viewx, viewy) {
		this.viewx += viewx;
		this.viewy += viewy;
	}
	
	this.subCamPositionWithScale = function(viewx, viewy) {
		this.viewx -= viewx * this.scale;
		this.viewy -= viewy * this.scale;
	}
}