class Arcade{
    constructor(){
        this.machines = [new ImageDraw(position={x:35,y:47},37,62,imgArcadeMachines,0,0),
                        new ImageDraw(position={x:79,y:47},37,62,imgArcadeMachines,1,0),
                        new ImageDraw(position={x:140,y:47},37,62,imgArcadeMachines,2,0)]
        this.machineSelected =[true,true,false]
        this.minigamesPreview=[new ImageDraw(position={x:46,y:64},15,10,imgArcadeMinigames,0,0,'',3,20),
                            new ImageDraw(position={x:90,y:64},15,10,imgArcadeMinigames,0,1,'',3,20),
                            new ImageDraw(position={x:151,y:64},15,10,imgArcadeMinigames,0,2,'',3,20)]
        this.ghosts= [new ImageDraw(position={x:117,y:25},19,16,imgArcadePacman,0,0,'',1,52),
                        new ImageDraw(position={x:137,y:25},19,16,imgArcadePacman,1,1,'',1,50),
                        new ImageDraw(position={x:157,y:25},19,16,imgArcadePacman,0,2,'',1,48)]
        this.arrowLeft = new ImageDraw(position={x:20,y:70},11,15,imgArcadeArrow,0,0)
        this.arrowRight = new ImageDraw(position={x:181,y:70},11,15,imgArcadeArrow,0,1)
        this.arcadeSign= new ImageDraw(position={x:50,y:25},57,16,imgArcadeSign,0,0,'',1,30)
    }
    draw(){
        ctx.drawImage(imgArcadeBg, border.position.x, border.position.y);
        this.arcadeSign.drawAnimatedSprite()
        this.machines.forEach((machine)=>{
            machine.drawSprite()
        })
        this.ghosts.forEach((ghost,index)=>{
            if(!colors[index]) ghost.row=3
            else    ghost.row=index
            ghost.drawAnimatedSprite();
        })
        this.minigamesPreview.forEach((preview, index)=>{
            if(this.machineSelected[index]){
                preview.drawAnimatedSprite()
            }
            else{
                preview.drawSprite()
            }
        })
        this.arrowRight.drawSprite()
        this.arrowLeft.drawSprite()
    }
}