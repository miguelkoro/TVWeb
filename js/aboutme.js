class Spider{
    constructor(position, velocity){
        
        this.width=14*screenSize.multiplier
        this.height=10*screenSize.multiplier
        this.position={x:position.x,y:position.y}
        this.image=imgAboutMeSpider
        this.velocity={x:velocity.x,y:velocity.y}
        this.rotation=0
        this.opacity=1
        this.frames=0
        this.maxframes=4
        this.timer=0
        this.dead=false
    }
    draw(){
        if(this.frames!=5){
            if(this.timer<3)
                this.timer++
            else{
                if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 
                else this.frames++
                this.timer=0
            }
        }
        ctx.save();
        ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image,
            this.width*this.frames,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.restore();
            //ctx.drawImage(this.image,this.position.x,this.position.y);
        }
    update(){
        if(this.dead){
            this.frames=5
            this.opacity-=0.005
            console.log(this.opacity)
        }else{
            if(this.position.x+this.velocity.x+this.width>border.position.x2+this.width){
                this.velocity.x=-2
                this.velocity.y=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.x+this.velocity.x<border.position.x1-this.width){
                this.velocity.x=2
                this.velocity.y=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.y+this.velocity.y+this.height>border.position.y2+this.height){
                this.velocity.y=-2
                this.velocity.x=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.y+this.velocity.y<border.position.y1-this.height){
                this.velocity.y=2
                this.velocity.x=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
        }
        this.draw()
        
        //console.log('vel X: ' + this.velocity.x + ', vel Y: ' + this.velocity.y)
        //console.log(Math.floor(Math.random() * (2 - (-1))) + -1)
    }
    orientation(){
        if(this.velocity.x==2 && this.velocity.y==2) this.rotation=315
        else if(this.velocity.x==0 && this.velocity.y==2) this.rotation=0
        else if(this.velocity.x==2 && this.velocity.y==0) this.rotation=270
        else if(this.velocity.x==-2 && this.velocity.y==-2) this.rotation=135
        else if(this.velocity.x==0 && this.velocity.y==-2) this.rotation=180
        else if(this.velocity.x==-2 && this.velocity.y==0) this.rotation=90
        else if(this.velocity.x==-2 && this.velocity.y==2) this.rotation=45
        else if(this.velocity.x==2 && this.velocity.y==-2) this.rotation=225
    }
    frameXPosition(){
        return this.position.x+this.width/2
    }
    frameYPosition(){
        return this.position.y+this.height/2
    }
}

class BookLevel{
    constructor(position, level, text){
        this.position={x:position.x*screenSize.multiplier,y:position.y*screenSize.multiplier}
        this.level=level
        this.text=text
        this.levelposition={x:this.position.x+5*screenSize.multiplier,y:this.position.y-3.5*screenSize.multiplier}
        this.size=4*screenSize.multiplier
        this.font='px pixelFont'
        this.textBaseline="middle"
        this.textAlign="right"
    }
    draw(){
        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.size+this.font;
        ctx.fillStyle='#404040';
        ctx.fillText(this.text, this.position.x, this.position.y);

        ctx.fillStyle='#dfac6a';
        ctx.fillRect(this.levelposition.x, this.levelposition.y+4*screenSize.multiplier, 30*screenSize.multiplier, 1*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x, this.levelposition.y+1*screenSize.multiplier, (this.level*3)*screenSize.multiplier, 1*screenSize.multiplier);

        ctx.fillStyle='#ad7a42';
        ctx.fillRect(this.levelposition.x, this.levelposition.y+2*screenSize.multiplier, (this.level*3)*screenSize.multiplier, 2*screenSize.multiplier);

        ctx.fillStyle='#8c6337';
        ctx.fillRect(this.levelposition.x, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x+30*screenSize.multiplier, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x+(this.level*3)*screenSize.multiplier, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        
        
    }
}

class BookDecoration{
    constructor(position, image){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.separation=10*screenSize.multiplier
        this.image=image
        this.width=26*screenSize.multiplier
        this.height=15*screenSize.multiplier
    }
    draw(){
        ctx.drawImage(imgDecorationBook,
            0,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.drawImage(imgDecorationBook,
            this.width,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x+this.separation+this.width, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.drawImage(this.image,this.position.x+this.width,this.position.y+2*screenSize.multiplier);
    }

}

class BookAboutMe{
    constructor(){
        this.section=0
    }
    draw(){

    }
}