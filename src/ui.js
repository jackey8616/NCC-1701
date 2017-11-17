var setscale = solar_system.user.scale;
var recordMouse = false;
var mouseX;
var mouseY;
var vm = new Vue({
	el: '#app',
	data: {
		mywidth: document.body.clientWidth -10,
		myheight: document.body.clientHeight - 30,
		scale: solar_system.user.scale * 100,
		target_planet: {
			id: -1,
			name: '',
			color: ''
		}
	},
	computed: {  },
	methods: {
        handleScroll: function (event) {
			// Debug in Chrome Mouse Wheel.
			// console.log(event.wheelDelta);
			setscale *= Math.pow(1.3, (-event.wheelDelta) / 180);
			vm.scale = Math.round(setscale * 100) ;
			sleekStep = 1000;
			scaleSleek();
        },
		handleDown: function (event) {
			if(event.which !== 1) return;
			recordMouse = true;
			mouseX = event.pageX;
			mouseY = event.pageY;
			iteratePlanet(mouseX, mouseY);
		},
		handleMove: function (event) {
			if(!recordMouse || targeting) return;
			solar_system.user.viewx -= (event.pageX - mouseX) * solar_system.user.scale;
			solar_system.user.viewy -= (event.pageY - mouseY) * solar_system.user.scale;
			mouseX = event.pageX;
			mouseY = event.pageY;
		},
		handleUp: function (event) {
			recordMouse = false;
		}
    },
    created: function () {
        window.addEventListener('mousewheel', this.handleScroll);
		window.addEventListener('mousedown', this.handleDown);
		window.addEventListener('mousemove', this.handleMove);
		window.addEventListener('mouseup', this.handleUp);
    },
    destroyed: function () {
        window.removeEventListener('mousewheel', this.handleScroll);
		window.removeEventListener('mousedown', this.handleDown);
		window.removeEventListener('mousemove', this.handleMove);
		window.removeEventListener('mouseup', this.handleUp);
    }
});

var sleekStep;
function scaleSleek(){
	solar_system.user.scale = solar_system.user.scale + (setscale-solar_system.user.scale) / 200;
	sleekStep--;
	if(sleekStep > 0){
		setTimeout(function(){ scaleSleek(sleekStep) },10);
	}
}


var targeting = false;
var targetCount = 0;
function iteratePlanet(mouseX, mouseY) {
	mouseX -= 5;
	mouseY -= 5;
	targeting = false;
	for(var i = 0; i < solar_system.planet.length; i++) {
		var planet = solar_system.planet[i].interact;
		if(planet.exists == false) continue;
		if(planet.anchorX1 <= mouseX && mouseX <= planet.anchorX2 && 
		   planet.anchorY1 <= mouseY && mouseY <= planet.anchorY2) {
			    targeting = true;
				targetCount++;
			    targetPlanet(i, targetCount);
			    return;
		}
	}
}

function targetPlanet(i, count) {
	vm.target_planet = { 
		id: solar_system.planet[i].id,
		name: solar_system.planet[i].name,
		color: solar_system.planet[i].color
	};
	solar_system.user.viewx = solar_system.planet[i].x;
	solar_system.user.viewy = solar_system.planet[i].y;
	if(targeting && count == targetCount)
		setTimeout(function(){ targetPlanet(i, count) }, 10);
	else
		vm.target_planet = {
			id: -1,
			name: '',
			color: ''
		};
}