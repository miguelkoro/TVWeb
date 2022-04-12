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

//TEXTO 
var startstagetext= 'Empezar'

//CLASE ZONA DE EMPEZAR PARTIDA
class StartScreen{
    constructor(){
        this.birds=[new InteractiveImage(position={x:159,y:41},10,10,imgStartBirds,0,0,velocity={x:0,y:0}),
                    new InteractiveImage(position={x:148,y:24},10,10,imgStartBirds,1,0,velocity={x:0,y:0}),
                    new InteractiveImage(position={x:53,y:36},10,10,imgStartBirds,2,0,velocity={x:0,y:0})]        
        this.start=new Text(startstagetext,13, 'white', position={x:95,y:85},'gothicFont', 'center')
        this.author=new Text('Miguelkoro', 4, 'white', position={x:155, y:103}, 'pixelFont', 'center');
        this.leaves=[]
        this.colors=['#1170a8','#db512e','#9cab3a']
    }
    draw(){
        if(offScreen(this.start)){  //Si le hemos dado a empezar y el texto se ha salido de la pantalla, que pase a la siguiente zona
            newstage=1
        }
        ctx.drawImage(imgStartTrees,border.position.x1,border.position.y1); 
        this.randomLeaves()
        ctx.drawImage(imgStartBush,border.position.x1,border.position.y1); 
        //PAJAROS
        this.birds.forEach((bird, index)=>{
            if(tvinterface.tvbulbs[index].row!=3)   //Si la bombilla esta apagada que no los muestre
                bird.draw()
        })
        this.start.update()
        
    }
    randomLeaves(){
        if(Math.floor(Math.random()*100<4)){
            this.leaves.push(new Leaf(Math.floor(Math.random()*border.position.x2)+border.position.x1-10*screenSize.multiplier, imgStartLeaves, Math.floor(Math.random()*9)))
        }
        this.leaves.forEach((leaf, index)=>{
            if(leaf.position.y>border.position.y2/2){ //Si la hoja se sale del borde que se borre
                this.leaves.splice(index, 1)
            }else{
                leaf.update()
            }
        })
    }
}
