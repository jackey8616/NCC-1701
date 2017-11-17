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
			yv:29.78567831,
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
			yv:-(-29.78567831-1.02396911),
			color: "WHITE",
			interact: {}
		},
		{
			id: 3,
			name:"Mercury",
			m:3.3e23,
			x:5.79e7,
			y:0,
			r:2.4395e3,
			xv: 0,
			yv: 47.4,
			color: "#E0FFFF",
			interact: {}
		},
		{
			id: 4,
			name:"Venus",
			m:4.87e24,
			x:1.082e8,
			y:0,
			r:6.052e3,
			xv: 0,
			yv: 35,
			color: "#CD7F32",
			interact: {}
		},
		{
			id: 5,
			name:"Mars",
			m:6.42e23,
			x:2.279e8,
			y:0,
			r:3.396e3,
			xv: 0,
			yv: 24.1,
			color: "#8b0000",
			interact: {}
		},
		{
			id: 6,
			name:"Jupiter",
			m:1.898e27,
			x:7.786e8,
			y:0,
			r:7.1492e4,
			xv: 0,
			yv: 13.1,
			color: "#696969",
			interact: {}
		},
		{
			id: 7,
			name:"Saturn",
			m:5.68e26,
			x:1.4335e9,
			y:0,
			r:6.0268e4,
			xv: 0,
			yv: 9.7,
			color: "#ccaa00 ",
			interact: {}
		}
	],
	user:{
		viewx:1.496e8,
		viewy:0,
		// Kilometer per pixel.
		scale: 2000,
		time_scale: 300,
		view_selected_planet: 1
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
