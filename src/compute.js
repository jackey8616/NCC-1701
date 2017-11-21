const G =  6.674215e-20;
var lastcomputetime = new Date().getTime();

const speed_a = (mass,x1,x2)=>{
    let result=0;
    let divisor	=(G*mass);
    let dividend = (x2-x1)*Math.abs(x2-x1);
    if(dividend == 0)
        result = 0;
    else
   	result = divisor/dividend;
    return result
}

const speed_a_improve =(mass,x1,x2,y1,y2)=>{
    let divisor=G*mass;
    let dividend= Math.pow((Math.pow((x2-x1),2)+Math.pow((y2-y1),2)),1.5);
    let result = divisor/dividend;
    let x_a = result*(x2-x1);
    let y_a = result*(y2-y1);
    return {x:x_a,y:y_a}
}

const computerun=()=>{
	var nowtime = new Date().getTime();
	if(nowtime - lastcomputetime >100){lastcomputetime = nowtime -100;}
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
			a = speed_a_improve(planet[j].m,planet[i].x,planet[j].x,planet[i].y,planet[j].y);
			x_a += a.x;
			y_a += a.y;
			}
		}
		solar_system.planet[i].incSpeed(x_a * time, y_a * time);
    }

	
	let ships = solar_system.spaceship;
    for(let i=0;i<ships.length;i++){
        let x_a =0;
        let y_a =0;
        let a =0;
		for(let j=0;j<planet_num;j++){
			if(ships[i].landPlanet == -1){
				a = speed_a_improve(planet[j].m,ships[i].x,planet[j].x,ships[i].y,planet[j].y);
				x_a += a.x;
				y_a += a.y;
			}
		}
		ships[i].incSpeed(x_a * time, y_a * time);
    }
	
	
    for(let i=0;i<planet_num;i++){
		if(i==user.selected_id && user.selected_type == 0){
			user.incCamPosition(solar_system.planet[i].xv * time, solar_system.planet[i].yv * time);
		}
		solar_system.planet[i].incPosition(solar_system.planet[i].xv * time, solar_system.planet[i].yv * time);
    }
	
    for(let i=0;i<ships.length;i++){
		if(ships[i].landPlanet != -1){
			ships[i].xv = solar_system.planet[ships[i].landPlanet].xv;
			ships[i].yv = solar_system.planet[ships[i].landPlanet].yv;
		}
		if(solar_system.spaceship[i].id==user.selected_id && user.selected_type == 1){
			user.incCamPosition(ships[i].xv * time, ships[i].yv * time);
		}
		ships[i].incPosition(ships[i].xv * time, ships[i].yv * time);
    }
	
    //setTimeout(run ,5);
}

