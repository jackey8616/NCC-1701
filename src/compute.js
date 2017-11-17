const G =  6.674215e-20;

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

const run=(callback)=>{
    let time = solar_system.user.time_scale; 
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
	solar_system.planet[i].xv += x_a*time;
	solar_system.planet[i].yv += y_a*time;

    }

    for(let i=0;i<planet_num;i++){
	if(i==solar_system.user.view_selected_planet){
		setCamRelativeMovement(solar_system.planet[i].xv * time, solar_system.planet[i].yv * time);
	}
        solar_system.planet[i].x+=solar_system.planet[i].xv*time;
        solar_system.planet[i].y+=solar_system.planet[i].yv*time;	
    }
	callback();
    setTimeout(function() { run(callback) } ,5);
}

run(function(){});
