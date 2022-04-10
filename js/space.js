class BackgroundStars{
    constructor(){
        this.position={x:border.position.x1, y:border.position.y1}
        this.width=350*screenSize.multiplier;
        this.height=96*screenSize.multiplier;
        this.velocity=2;
        this.image=imgSpaceStars;
        this.counter=0; //Contador para ver cuando le toca a cada imagen dibujarse
    }
    draw(){
        ctx.drawImage(this.image, this.position.x+(this.width*this.counter), this.position.y);
        ctx.drawImage(this.image, this.position.x+(this.width*(this.counter+1)), this.position.y);
    }
    update(){
        this.draw();
        this.position.x-=this.velocity;
        if(this.position.x-this.velocity+(this.width*this.counter)<=border.position.x1-this.width){
            this.counter++;
            //console.log(this.counter)
        }
    }
}

class BackgroundPlanets{
    constructor(){
        this.position={x:border.position.x2, y:border.position.y2/2}  //Cambiar
        //this.width=border.width;   //Cambiar
        //this.height=96*screenSize.multiplier;   //Cambiar
        this.velocity=1;
        this.image=imgSpacePlanetBlue
        this.arrayimages=[imgSpacePlanetBlue, imgSpacePlanetRed, imgSpaceMeteores];   //Cambiar
        this.counter=0; //Contador para ver cuando le toca a cada imagen dibujarse
    }
    draw(){
        //ctx.fillRect(this.position.x, this.position.y-border.height/2,32*screenSize.multiplier, 32*screenSize.multiplier);
        ctx.drawImage(this.image,this.position.x, this.position.y);
    }
    update(){
        this.draw();
        this.position.x-=this.velocity;
        if(this.position.x+border.width/2<=0){
            this.position.x=border.position.x2;            
            this.position.y=Math.random() * (screenSize.height);
            this.image=this.arrayimages[Math.floor(Math.random()*3)]
            //console.log(this.array)
        }
    }
}

/**PROYECTILES */
class Projectile{
    constructor(position, velocity, damage){
        this.position={x:position.x, y:position.y};//, y:positiony};
        this.velocity={x:velocity.x, y:velocity.y};
        this.radius=0.7*screenSize.multiplier;
    }
    draw(){
        //ctx.beginPath()
        ctx.fillStyle='white';
        ctx.strokeStyle='white';
        ctx.lineWidth = 5;
        ctx.beginPath()            
        ctx.arc(this.position.x+player.width/2, this.position.y+player.height/2,this.radius,0, Math.PI*2)        
        ctx.stroke();
        ctx.fill();
        //ctx.closePath();
        //ctx.fillRect(this.position.x, this.position.y, 100, 100);
        //console.log(projectiles.length)
    }
    update(){
        this.draw();
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        //this.position.y=this.velocity.y;
    }
}


var projectiles=[]
function showProjectiles(){
        projectiles.forEach((projectile,index) =>{    
        if(offScreen(projectile.position,projectile.radius, projectile.radius)){//projectile.position.x+projectile.radius>=border.width){ //Va eliminando los proyectiles que se salen del mapa
            setTimeout(()=>{
                projectiles.splice(index, 1)   
            },0)                
        }else{
                projectile.update();}
            /*if(projectile[i].position.x>border.width){
                console.log('tamaño array: '+ projectile.length)
                projectile.splice(projectile[i],1);
                console.log('projectil: '+ (i+1))
                console.log('tamaño array: '+ projectile.length)
            }*/
        } )
        
    //}
}