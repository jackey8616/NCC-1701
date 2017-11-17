var solar_system = {
	planet:[
		{
			id: 0,
			name:"Sun",
			m:1.989e30,
			x:0,
			y:0,
			r:6.955e5,
			xv:0,
			yv:0,
			color: "ORANGE",
			interact: {}
		},
		{
			id: 1,
			name:"Earth",
			m:5.972e24,
			x:1.496e8,
			y:0,
			r:6.371e3,
			xv:0,
			yv:-29.78567831,
			color: "BLUE",
			interact: {}
		},
		{
			id: 2,
			name:"Moon",
			m:7.36e22,
			x:1.496e8+3.844e5,
			y:0,
			r:1.737e3,
			xv:0,
			yv:-29.78567831-1.02396911,
			color: "WHITE",
			interact: {}
		}
		
	],
	user:{
		viewx:1.496e8,
		viewy:0,
		// Kilometer per pixel.
		scale: 2000,
		time_scale: 1
	}
}

for(var i = 0; i < solar_system.planet.length; i++)
	solar_system.planet[i].interact = {
				exists: false,
				anchorX1: 0,
				anchorY1: 0,
				anchorX2: 0,
				anchorY2: 0
			};
