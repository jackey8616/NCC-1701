var user = new User(1.496e8, 0, 1500, 3600, 4);
//var user = new User(0, 0, 1500, 86400, 0); // For orbit tracking observe.
var solar_system = {
	planet: [
		new Planet(0, "Sun", 1.989e30, 0, 0, 6.955e5, 0, 0, "#FF8000"),
		new Planet(1, "Mercury", 3.3e23, 5.79e7, 0, 2.4395e3, 0, 47.4, "#E0FFFF"),
		new Planet(2, "Venus", 4.87e24, 1.082e8, 0, 6.052e3, 0, 35, "#CD7F32"),
		new Planet(3, "Moon", 7.36e22, 1.496e8+3.844e5, 0, 1.737e3, 0, -(-29.78567831-1.02396911), "#FFFFFF"),
		new Planet(4, "Earth", 5.972e24, 1.496e8, 0, 6.371e3, 0, 29.78567831, "#46A3FF"),
		new Planet(5, "Mars", 6.42e23, 2.279e8, 0, 3.396e3, 0, 24.1, "#8B0000"),
		new Planet(6, "Jupiter", 1.898e27, 7.786e8, 0, 7.1492e4, 0, 13.1, "#696969"),
		new Planet(7, "Saturn", 5.68e26, 1.4335e9, 0, 6.0268e4, 0, 9.7, "#CCAA00")
	],
	spaceship: [
		new Spaceship(
			108,
			"FuHong",
			1.496e8+4.044e5, 0, 0,
			0, -(-29.78567831-1.47396911), 0,
			-1
		),
		new Spaceship(
			109,
			"Clode",
			1.496e8+2.044e5, 0, 0,
			0, -(-29.78567831-1.396911), 0,
			-1
		),
		new Spaceship(
			110,
			"本丸1號",
			1.496e8-1.044e5, 0, 0,
			0, -(-29.78567831+0.97396911), 0,
			-1
		),
		new Spaceship(
			111,
			"StrongLin",
			1.496e8-1.044e4, 0, 0,
			0, -(-29.78567831+6.97396911), 0,
			-1
		),
		new Spaceship(
			112,
			"FuHong2",
			1.496e8-0.944e4, 0, 0,
			0, -(-29.78567831-7.27396911), 0,
			-1
		),
		new Spaceship(
			113,
			"Clode2",
			1.496e8, -6.371e3-0.033, 0,
			(-7.47396911), 29.78567831, Math.PI/20 * 1e-3,
			4
		),
	]
};

solar_system.spaceship.forEach((value) => {
	value.setComponentList(
		[
			new Component([new Point(-1, -4), new Point(1, -4), new Point(1, 0),   new Point(-1, 0)],  new Centroid(0, -2), 1000, 0, 0),
			new Component([new Point(-1, -5.5), new Point(-0.5, -6), new Point(0.5, -6), new Point(1, -5.5), new Point(1, -4), new Point(-1, -4)], new Centroid(0, -4.8), 500, 0, 0),
			new Component([new Point(-1, -1), new Point(-1 ,0), new Point(-2, 1 / 2)], new Centroid(-4 / 3, -1 / 3), 100, 0, 0),
			new Component([new Point(1, -1),  new Point(1, 0),  new Point(2, 1 / 2)],  new Centroid(4 / 3, -1 / 3), 100, 0, 0)
		]
	)
});