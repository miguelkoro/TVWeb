/**FONDO NEBULOSAS y ESTRELLAS */
class BackgroundStars{
    constructor(){
        this.position={x:border.position.x, y:border.position.y}
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
        if(this.position.x-this.velocity+(this.width*this.counter)<=border.position.x-this.width){
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
        this.position={x:border.position.x+border.width, y:border.position.y+border.height/2}  //Cambiar
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
            this.position.x=border.position.x+border.width;            
            this.position.y=Math.random() * (screenSize.height);
            this.image=this.arrayimages[Math.floor(Math.random()*3)]
            //console.log(this.array)
        }
    }
}

/**PROYECTILES */
class Projectile{
    constructor(position, velocity, damage, radius, color='white', linecolor='white'){
        this.position=position;//, y:positiony};
        this.velocity=velocity;
        this.radius=radius*screenSize.multiplier;
        this.width=this.radius;
        this.height=this.radius;
        this.damage=damage
        this.color=color
        this.linecolor=linecolor
        this.followvelocity=0.5
        //this.object=object
    }
    draw(){
        //ctx.beginPath()
        ctx.fillStyle=this.color;
        ctx.strokeStyle=this.linecolor;
        ctx.lineWidth = 5;
        ctx.beginPath()            
        ctx.arc(this.position.x, this.position.y,this.radius,0, Math.PI*2)        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
        //ctx.fillRect(this.position.x, this.position.y, 100, 100);
        //console.log(projectiles.length)
    }
    update(){
        this.draw();
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        //this.position.y=this.velocity.y;
    }

    autoFollow(){
        /*if(spacescreen.player.position.y+spacescreen.player.height/2>this.position.y)this.velocity.y=this.followvelocity
        else if(spacescreen.player.center.y+spacescreen.player.height/2<this.position.y)this.velocity.y=-this.followvelocity
        else this.velocity.y=0
        if(spacescreen.player.center.x>this.position.x)this.velocity.x=this.velocity.x=3
        else if(spacescreen.player.center.x<this.position.x && this.velocity>0)this.velocity.x=-3
        else this.velocity.x=0*/
        this.update()
    }
}


/**PERSONAJE */
class Player extends ImageDraw{
    constructor(health){
        this.super()
        this.health=health
    }
}
//var player = new Player();    //Instanciamos el jugador

class Enemy extends ImageDraw{
    constructor(position, width, height, image='', column=0,row=0, velocity={x:0,y:0}, maxframes=0, maxtimecounter=0, opacity=1, attack=0, health=0, shootspeed=90, shield=0){
        super(position, width, height, image, column,row, velocity, maxframes, maxtimecounter, opacity)
        this.health=health
        this.shield=shield
        this.attack=attack
        this.shoottimer=0
        this.shootspeed=shootspeed
        this.projectilespeed=3
        this.projectiles=[]
    }
    drawEnemy(){
        //this.velocity={x:1,y:0}
        this.showProjectiles()
        this.updateAnimatedSprite()
    }
    randomShot(){
        if(this.shoottimer<this.shootspeed)this.shoottimer++
        else{
            this.shoottimer=0
            this.projectiles.push(new Projectile(position={x:this.position.x+this.width/2, y:this.position.y+this.height/2},this.setInicialVelocity(), 0.3, 0.5, 'red', 'white'))
            
        }
        this.drawEnemy()
    }

    setInicialVelocity(){
        var velocity={x:0,y:0}
        if(spacescreen.player.position.y+spacescreen.player.height/2>this.position.y)velocity.y=this.projectilespeed
        else if(spacescreen.player.position.y+spacescreen.player.height/2<this.position.y)velocity.y=-this.projectilespeed
        else velocity.y=0
        if(spacescreen.player.position.x+spacescreen.player.width/2>this.position.x)velocity.x=this.projectilespeed
        else if(spacescreen.player.position.x+spacescreen.player.width/2<this.position.x)velocity.x=-this.projectilespeed
        else velocity.x=0
        console.log(velocity)
        return velocity

    }

    showProjectiles(){
        this.projectiles.forEach((projectile,index) =>{    
            if(offScreen(projectile)){
                setTimeout(()=>{
                    this.projectiles.splice(index, 1)   
                    //console.log(this.projectiles.length)
                },0)                
            }else{
                projectile.autoFollow()
            }
        })
    }
}

class SpaceScreen{
    constructor(){
        this.backgroundstars= new BackgroundStars();
        this.backgroundplanets = new BackgroundPlanets();
        this.player= new ImageDraw(position={x:50,y:50},40,20,imgSpriteNaveFut,0,0,'',7,1)//new AnimatedImage(position={x:50,y:50},40,20,imgSpriteNaveFut,7,2,0) //= new Player()
        this.projectiles=[]
        this.shoottimer=0
        this.arrayplanets=[imgSpacePlanetBlue, imgSpacePlanetRed, imgSpaceMeteores];
        this.enemy = new Enemy(position={x:195,y:53}, 13,10, imgSpaceEnemySmall, 0,0,velocity={x:-1.5,y:0},1,9,1,50)
        this.ready=false
    }
    draw(){
        ctx.drawImage(imgBackgroundSpace,border.position.x,border.position.y);
        this.backgroundstars.update()
        this.backgroundplanets.update()
        

        this.showProjectiles();
        //console.log(offScreen(this.player))
        
        this.keysControl();  //CONTROL EVENTOS TECLADO
        //this.player.update();
        this.player.updateAnimatedSprite();
        this.enemy.randomShot(this.enemy.position, this.projectiles)
        //this.player.position.x+=2
        //collitionBorder(this.player);
    }
    showProjectiles(){
        this.projectiles.forEach((projectile,index) =>{    
            if(offScreen(projectile)){
                setTimeout(()=>{
                    this.projectiles.splice(index, 1)   
                    //console.log(this.projectiles.length)
                },0)                
            }else{
                 projectile.update();
                }

        } )
    }
    keysControl(){
        if(keys.left.pressed)this.player.velocity.x=-3;
        else if (keys.right.pressed) this.player.velocity.x=3
        else this.player.velocity.x=0;

        if(keys.down.pressed)this.player.velocity.y=3;
        else if (keys.up.pressed) this.player.velocity.y=-3
        else this.player.velocity.y=0;

        if(this.player.position.y+this.player.height+this.player.velocity.y >= border.position.y+border.height)   
            this.player.velocity.y=0;
        if(this.player.position.y+this.player.velocity.y<=border.position.y)
            this.player.velocity.y=0;
        if(this.player.position.x+this.player.velocity.x<=border.position.x)
            this.player.velocity.x=0;
        if(this.player.position.x+this.player.width+this.player.velocity.x>=border.position.x+border.width)
            this.player.velocity.x=0

        //Control de disparo
        if(this.shoottimer>25){
            if(keys.space.pressed){
                this.projectiles.push(new Projectile(position={x:this.player.position.x+this.player.width-2*screenSize.multiplier, y:this.player.position.y+this.player.height/2},velocity={x:7, y:0}, 0.3, 0.7, 'brown', 'white'))
                this.shoottimer=0
            }
        }
        this.shoottimer++        
    }
    drawPlanets(){

    }
}