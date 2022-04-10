class Bird{
    constructor(position, image, type, color){
        this.position={x:position.x*screenSize.multiplier+border.position.x1, y:position.y*screenSize.multiplier+border.position.y1}
        this.show=true;
        this.width=10*screenSize.multiplier;
        this.height=10*screenSize.multiplier;
        this.image=image;
        this.type=type;
        this.color=color;
    }
    draw(){
        if(this.show){
            ctx.drawImage(this.image,
                this.width*this.type,0,  //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
                this.width, this.height,    //Coordenadas de recorte finales
                this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
                this.width, this.height);   //Tamaño de la imagen
        }
            //console.log('pio')
            //ctx.drawImage(this.image,this.position.x,this.position.y);
    }
}

class Leaf{
    constructor(positionX, image,  type){
        this.width=3*screenSize.multiplier;
        this.height=3*screenSize.multiplier;
        this.position={x:positionX, y:border.position.y1-this.height}
        this.velocity={x:1, y:1}        
        this.image=image;
        this.type=type;
    }
    draw(){
        ctx.drawImage(this.image,
            this.width*this.type,0,  //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);
    }
    update(){
        this.position.x+=this.velocity.x;
        this.position.y+=this.velocity.y;
        this.draw()
    }
}