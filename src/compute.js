const G =  6.674215e-20;
let lastcomputetime = new Date().getTime();

const speed_a =(mass,x1,x2,y1,y2)=>{

    let divisor=G*mass;
    let dividend= Math.pow((Math.pow((x2-x1),2)+Math.pow((y2-y1),2)),1.5);
    let result = divisor/dividend;

	let x_a = result*(x2-x1);
    let y_a = result*(y2-y1);

	return {x:x_a,y:y_a}

}

const computeRun=()=>{
	let nowtime = new Date().getTime();

	if(nowtime - lastcomputetime >100){
		lastcomputetime = nowtime -100;
	}

    let time = user.timeScale * (nowtime - lastcomputetime)/1000; 
	lastcomputetime = nowtime;
	
    let planet = solar_system.planet;
    let planet_num = planet.length;
    for(let i=0;i<planet_num;i++){
        let x_a =0;
        let y_a =0;
        let a =0;
		for(let j=0;j<planet_num;j++){
			if(i!=j){
				a = speed_a(planet[j].m,planet[i].x,planet[j].x,planet[i].y,planet[j].y);
				x_a += a.x;
				y_a += a.y;
			}
		}
		planet[i].incSpeed(x_a * time, y_a * time);
    }
	
	let ships = solar_system.spaceship;
    for(let i=0;i<ships.length;i++){
		let x_a =0;
		let y_a =0;
 		let a =0;
		for(let j=0;j<planet_num;j++){
			if(ships[i].landPlanet == -1){
				a = speed_a(planet[j].m,ships[i].x,planet[j].x,ships[i].y,planet[j].y);
				x_a += a.x;
				y_a += a.y;
			}
		}
		if(ships[i].acceleratorStatus == true){
			x_a += ships[i].accelerator * Math.sin(ships[i].a);
			y_a += -ships[i].accelerator * Math.cos(ships[i].a);
		}
		ships[i].incSpeed(x_a * time, y_a * time);
    }
	
	
    for(let i=0;i<planet_num;i++){
		if(i==user.selected_id && user.selected_type == 0){
			user.incCamPosition(planet[i].xv * time, planet[i].yv * time);
		}
		planet[i].incPosition(planet[i].xv * time, planet[i].yv * time);
    }
	
    for(let i=0;i<ships.length;i++){
		if(ships[i].landPlanet != -1){
			ships[i].xv = planet[ships[i].landPlanet].xv;
			ships[i].yv = planet[ships[i].landPlanet].yv;
		}
		if(ships[i].id==user.selected_id && user.selected_type == 1){
			user.incCamPosition(ships[i].xv * time, ships[i].yv * time);
		}
		ships[i].incPosition(ships[i].xv * time, ships[i].yv * time);
		solar_system.spaceship[i].setAngle(ships[i].a + ships[i].av * time);
    }
	
}

