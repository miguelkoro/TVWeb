/**PROYECTILES */
class Projectile{
    constructor(position, velocity, damage, delay){
        this.position={x:position.x, y:position.y};//, y:positiony};
        this.velocity={x:velocity.x, y:velocity.y};
        this.radius=1*screenSize.multiplier;
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