/**FONDO NEBULOSAS y ESTRELLAS */
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
/**FONDO PLANETAS
 * Añadirle un array de imagenes y que vaya escogiendo una imagen random cada vez, y en una posicion random de Y
 */
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
        this.width=this.radius;
        this.height=this.radius;
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
        if(offScreen(projectile)){//projectile.position.x+projectile.radius>=border.width){ //Va eliminando los proyectiles que se salen del mapa
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
        //console.log('tamaño array: '+ projectiles.length)
    //}
}

/**PERSONAJE */
class Player{
    constructor(){
        this.position={x:border.position.x1+(border.width/8),y:border.position.y1+(border.height/2.5)};
        this.velocity={x:0,y:0};  //Dividirlo por el multiplicador y multiplicarlo por un numero fijo
        this.width=40*screenSize.multiplier;
        this.height=20*screenSize.multiplier;
        this.image=imgSpriteNaveFut;
        this.frames=0;  //Indica el frame de la imagen en el que esta actualmente
        this.maxframes=7;
        this.health=0;
        this.timer=0
    }
    draw(){
        if(this.timer<2)
            this.timer++
        else{
            if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 
            else this.frames++
            this.timer=0
        }
        ctx.drawImage(this.image,
            this.width*this.frames,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
    update(){      

        this.draw();
        this.position.y += this.velocity.y; //a la posicion actual le suma la velocidad //Hacia abajo, arriba
        this.position.x += this.velocity.x; //Hacia la derecha, izquierda
    }
}
var player = new Player();    //Instanciamos el jugador


class SpaceScreen{
    constructor(){
        this.backgroundstars= new BackgroundStars();
        this.backgroundplanets = new BackgroundPlanets();
    }
    draw(){
        ctx.drawImage(imgBackgroundSpace,border.position.x1,border.position.y1);
        this.backgroundstars.update()
        this.backgroundplanets.update()
        

        showProjectiles();
        
        collitionBorder(player);
        player.update();
    }
}