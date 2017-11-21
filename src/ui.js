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
		scale: user.scale,
		setScaleTime: 1500,
		target_object: {
			object: -1,
			type: NaN
		},
		fps: 0
	},
	computed: {  },
	methods: {
        handleScroll: function (event) {
			var wheelDelta = event.detail ? event.detail * -120 : event.wheelDelta;
			setscale *= Math.pow(1.3, (-wheelDelta) / 180);
			//console.log(setscale);
			//vm.scale = Math.round(setscale) ;
			vm.scale = setscale;
			sleekStep = 500;
			clearTrack();
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
			user.subCamPositionWithScale(event.pageX - mouseX, event.pageY - mouseY);
			mouseX = event.pageX;
			mouseY = event.pageY;
			clearTrack();
		},
		handleUp: function (event) {
			recordMouse = false;
		},
		handleKeyPress: (event) => {
			var keyCode = event.keyCode;
			switch(keyCode) {
				case 93: { // ']' Increase.
					user.timeScale *= 2;
					vm.setScaleTime = user.timeScale;
					break;
				}
				case 91: { // '[' Decrease.
					user.timeScale /= 2;
					vm.setScaleTime = user.timeScale;
					break;
				}
			}
		}
    },
    created: function () {
        window.addEventListener(mouseScrollEvent, this.handleScroll);
		window.addEventListener('mousedown', this.handleDown);
		window.addEventListener('mousemove', this.handleMove);
		window.addEventListener('mouseup', this.handleUp);
		window.addEventListener('keypress', this.handleKeyPress);
    },
    destroyed: function () {
        window.addEventListener(mouseScrollEvent, this.handleScroll);
		window.removeEventListener('mousedown', this.handleDown);
		window.removeEventListener('mousemove', this.handleMove);
		window.removeEventListener('mouseup', this.handleUp);
		window.removeEventListener('keypress', this.handleKeyPress);
    }
});

var sleekStep;
function scaleSleek(){
	user.incScale((setscale - user.scale) / 200);
	user.drawOrbit = false;
	if(sleekStep-- > 0){
		setTimeout(function(){ scaleSleek(sleekStep) },10);
	} else {
		user.drawOrbit = true;
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
				targetPlanet(solar_system.planet[i], 0);
				clearTrack();
			    return;
		}
	}
	for(var i = 0; i < solar_system.spaceship.length; i++) {
		var ships = solar_system.spaceship[i].interact;
		if(ships.exists == false) continue;
		if(ships.anchorX1 <= mouseX && mouseX <= ships.anchorX2 && 
		   ships.anchorY1 <= mouseY && mouseY <= ships.anchorY2) {
			    targeting = true;
				targetPlanet(solar_system.spaceship[i], 1);
				clearTrack();
			    return;
		}
	}
	vm.target_object = { object: -1, type: NaN };
}

function targetPlanet(object, type) {
	//console.log(object);
	vm.target_object = { object: object, type: type };
	user.setCamPosition(object.x, object.y);
	user.selected_id = object.id;
	user.selected_type = type;
}
