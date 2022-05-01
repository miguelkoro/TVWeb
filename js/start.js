
//TEXTO 
var startstagetext= 'Empezar'

//CLASE ZONA DE EMPEZAR PARTIDA
class StartScreen{
    constructor(){
        this.birds=[new ImageDraw(position={x:159,y:41},10,10,imgStartBirds,0),//new InteractiveImage(position={x:159,y:41},10,10,imgStartBirds,0,0,velocity={x:0,y:0}),
                    new ImageDraw(position={x:148,y:24},10,10,imgStartBirds,1),//new InteractiveImage(position={x:148,y:24},10,10,imgStartBirds,1,0,velocity={x:0,y:0}),
                    new ImageDraw(position={x:53,y:36},10,10,imgStartBirds,2)]//new InteractiveImage(position={x:53,y:36},10,10,imgStartBirds,2,0,velocity={x:0,y:0})]        
        this.start=new Text(startstagetext,13, 'white', position={x:95,y:85},'gothicFont', 'center')
        this.author=new Text('Miguelkoro', 4, 'white', position={x:155, y:103}, 'pixelFont', 'center');
        this.leaves=[]
        this.colors=['#1170a8','#db512e','#9cab3a']
    }
    draw(){
        if(offScreen(this.start)){  //Si le hemos dado a empezar y el texto se ha salido de la pantalla, que pase a la siguiente zona
            newstage=1
        }
        ctx.drawImage(imgStartTrees,border.position.x,border.position.y); 
        this.randomLeaves()
        ctx.drawImage(imgStartBush,border.position.x,border.position.y); 
        //PAJAROS
        this.birds.forEach((bird, index)=>{
            bird.opacityspeed=0.02
            if(tvinterface.tvbulbs[index].row!=3){   //Si la bombilla esta apagada que no los muestre
                //bird.draw()
                //bird.drawSprite()
                bird.visible()
            }else bird.invisible()
        })
        this.start.update()
        this.author.draw()
        //console.log(this.leaves.length)
    }
    randomLeaves(){
        if(Math.floor(Math.random()*100<4)){
            this.leaves.push(new ImageDraw(position={x:Math.floor((Math.random()*180)+7),y:12},
            3,3,imgStartLeaves,Math.floor(Math.random()*9),0,velocity={x:1,y:1}))
           // new InteractiveImage(position={x:Math.floor((Math.random()*180)+7),y:12},3,3,imgStartLeaves,Math.floor(Math.random()*9),0,velocity={x:1,y:1}))//new Leaf(Math.floor(Math.random()*border.position.x2)+border.position.x1-10*screenSize.multiplier, imgStartLeaves, Math.floor(Math.random()*9)))
        }
        this.leaves.forEach((leaf, index)=>{
            if(leaf.position.y>border.position.y+border.height/2){ //Si la hoja se sale del borde que se borre
                this.leaves.splice(index, 1)
            }else{
                //leaf.update()
                leaf.updateSprite()
                
            }
        })
    }
}
