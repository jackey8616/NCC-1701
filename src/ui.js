var setscale = user.scale;
var recordMouse = false;
var mouseX;
var mouseY;

const mouseScrollEvent = (/FireFox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
var vm = new Vue({
	el: '#app',
	data: {
		mywidth: document.body.clientWidth -10,
		myheight: document.body.clientHeight - 30,
		scale: user.scale * 1,
		target_planet: {
			id: -1,
			name: '',
			color: ''
		},
		fps: 0
	},
	computed: {  },
	methods: {
        handleScroll: function (event) {
			// Debug in Chrome Mouse Wheel.
			var wheelDelta = event.detail ? event.detail * -120 : event.wheelDelta;
			setscale *= Math.pow(1.3, (-wheelDelta) / 180);
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
			user.sub_cam_position_with_scale(event.pageX - mouseX, event.pageY - mouseY);
			mouseX = event.pageX;
			mouseY = event.pageY;
		},
		handleUp: function (event) {
			recordMouse = false;
		}
    },
    created: function () {
        window.addEventListener(mouseScrollEvent, this.handleScroll);
		window.addEventListener('mousedown', this.handleDown);
		window.addEventListener('mousemove', this.handleMove);
		window.addEventListener('mouseup', this.handleUp);
    },
    destroyed: function () {
        window.addEventListener(mouseScrollEvent, this.handleScroll);
		window.removeEventListener('mousedown', this.handleDown);
		window.removeEventListener('mousemove', this.handleMove);
		window.removeEventListener('mouseup', this.handleUp);
    }
});

var sleekStep;
function scaleSleek(){
	user.inc_scale(setscale - user.scale / 200);
	sleekStep--;
	if(sleekStep > 0){
		setTimeout(function(){ scaleSleek(sleekStep) },10);
	}
}

var targeting = false;
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
				targetPlanet(i);
			    return;
		}
	}
	vm.target_planet = {
			id: -1,
			name: '',
			color: ''
		};
}

function targetPlanet(i, count) {
	vm.target_planet = { 
		id: solar_system.planet[i].id,
		name: solar_system.planet[i].name,
		color: solar_system.planet[i].color
	};
	user.set_cam_position(solar_system.planet[i].x, solar_system.planet[i].y);
	user.view_selected_planet = i;
}
