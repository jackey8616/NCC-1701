class Interact {
	constructor() {
		this.exists = false;
		this.anchorX1 = 0;
		this.anchorY1 = 0;
		this.anchorX2 = 0;
		this.anchorY2 = 0;
	}
	
	update(anchorX1, anchorY1, anchorX2, anchorY2, exists) {
		this.anchorX1 = anchorX1;
		this.anchorYl = anchorY1;
		this.anchorX2 = anchorX2;
		this.anchorY2 = anchorY2;
		this.exists = exists;
	}
};

class Planet {
	constructor(id, name, m, x, y, r, xv, yv, color) {
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
	}
	
	inc_position(x, y) {
		this.x += x;
		this.y += y;
	}
	
	inc_speed(xv, yv) {
		this.xv += xv;
		this.yv += yv;
	}
};

class User {
	constructor(viewx, viewy, scale, time_scale, view_selected_planet) {
		this.viewx = viewx;
		this.viewy = viewy;
		this.scale = scale;
		this.time_scale = time_scale;
		this.view_selected_planet = view_selected_planet;
		this.selected_planet = new Planet(-1, "", 0, 0, 0, 0, 0, 0, "#000000");
	}
	
	inc_scale(scale) {
		this.scale += scale;
	}
	
	set_cam_position(viewx, viewy) {
		this.viewx = viewx;
		this.viewy = viewy;
	}
	
	inc_cam_position(viewx, viewy) {
		this.viewx += viewx;
		this.viewy += viewy;
	}
	
	sub_cam_position_with_scale(viewx, viewy) {
		this.viewx -= viewx * this.scale;
		this.viewy -= viewy * this.scale;
	}
}