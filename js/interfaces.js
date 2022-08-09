//#region TvInterfaceClass
class TvInterface{
    constructor(){
        
        this.tvbulbs=[  new ImageDraw(position={x:214,y:13},32,16,imgTvBulb,0,0,'',1,10),//new AnimatedImage(position={x:214,y:13},32,16,imgTvBulb,1,10,0),
                        new ImageDraw(position={x:214,y:29},32,16,imgTvBulb,0,1,'',1,10),//new AnimatedImage(position={x:214,y:29},32,16,imgTvBulb,1,10,1),
                        new ImageDraw(position={x:214,y:45},32,16,imgTvBulb,0,2,'',1,10)]//new AnimatedImage(position={x:214,y:45},32,16,imgTvBulb,1,10,2)]
        this.tvscrews=[ new ImageDraw(position={x:213,y:12},4,4,imgTVScrew),
                        new ImageDraw(position={x:213,y:58},4,4,imgTVScrew),
                        new ImageDraw(position={x:243,y:12},4,4,imgTVScrew),
                        new ImageDraw(position={x:243,y:58},4,4,imgTVScrew)]
        this.downtvbutton=[new ImageDraw(position={x:210, y:80},19,13,imgTVButton,1,0),
                            new ImageDraw(position={x:231, y:80}, 19,13,imgTVButton,0,1),
                            new ImageDraw(position={x:210, y:94}, 19,13,imgTVButton,0,2),
                            new ImageDraw(position={x:231, y:94}, 19,13,imgTVButton,0,3),
                            new ImageDraw(position={x:210, y:108}, 19,13,imgTVButton,0,5),
                            new ImageDraw(position={x:231, y:108}, 19,13,imgTVButton,1,4)
                            ]
        this.colortvbuttons=[new ImageDraw(position={x:209, y: 65},13,14,imgTvColorButtons,3,0),
                            new ImageDraw(position={x:223, y: 65},13,14,imgTvColorButtons,3,1),
                            new ImageDraw(position={x:237, y: 65},13,14,imgTvColorButtons,3,2)]
    }
    draw(){
        ctx.drawImage(imgTvExt, 0, 0);
        this.tvbulbs.forEach((bulb)=>{
            bulb.drawAnimatedSprite()
        })
        this.colortvbuttons.forEach((button)=>{
            button.drawSprite()
        })
        this.tvscrews.forEach((screw)=>{
            screw.draw()
        })
        this.downtvbutton.forEach((button)=>{
            button.drawSprite()
        })
        ctx.drawImage(imgTVCover, 211*screenSize.multiplier, 10*screenSize.multiplier);
    }
}

class PcWindowExplorer extends ImageDraw{
    constructor(position, width, height, image){
        super(position,width,height, image)
        this.optionbarborder= new Border(position={x:position.x+1,y:position.y+7},130,9)
        this.minimizedborder= new Border(position={x:41,y:105},24,6)
        this.showoptionbar=true
    }
    showWindow(){
        this.update()
    }
    showOptions(){
        this.update()       
        ctx.fillStyle='#ece9d8'//'#ece9d8'
        ctx.fillRect(this.optionbarborder.position.x, this.optionbarborder.position.y, this.optionbarborder.width,this.optionbarborder.height); 
    }
    showMinimized(){
        ctx.fillStyle='#619ff0'//'#ece9d8'
        ctx.fillRect(this.minimizedborder.position.x, this.minimizedborder.position.y-1*screenSize.multiplier, this.minimizedborder.width,1*screenSize.multiplier); 
        ctx.fillStyle='#377ede'//'#ece9d8'
        ctx.fillRect(this.minimizedborder.position.x, this.minimizedborder.position.y, this.minimizedborder.width,this.minimizedborder.height); 
    }
}


class PcWave extends Border{
    constructor(position, width, height){
        super(position, width, height)
        this.lenght=0.15
        this.frequency=0.1
        this.amplitude=80
        //this.color='red'
        this.increment=this.frequency;
        this.size=0.8*screenSize.multiplier
    }

    draw(){
        ctx.beginPath();
        ctx.moveTo(this.position.x+this.width/2,this.position.y);
        ctx.strokeStyle=stringcolors[displaycolor];
       // console.log(displaycolor)
        //console.log('Azul: ' + colors[0] + ' Rojo: ' + colors[1] + ' Amarillo: ' + colors[2])
        ctx.lineWidth = this.size;
        for(let i=0; i<this.position.y+this.height;i++){
            
            ctx.lineTo(this.position.x+this.width /2 + Math.sin(i * this.lenght + this.increment) * this.amplitude,this.position.y+i);
            
        }
        //ctx.lineTo(this.position.x+this.width,this.position.y+this.height/2);
        ctx.stroke();
        this.increment+=this.frequency
    }
    drawPortrait(){
        ctx.beginPath();
        ctx.moveTo(this.position.x,this.position.y+this.height/2);
        ctx.strokeStyle=stringcolors[displaycolor];
        ctx.lineWidth = this.size;
        for(let i=0; i<this.position.x+this.width;i++){
            
            ctx.lineTo(this.position.x+i, this.position.y+this.height /2 + Math.sin(i * this.lenght + this.increment) * this.amplitude);
            
        }
        //ctx.lineTo(this.position.x+this.width,this.position.y+this.height/2);
        ctx.stroke();
        this.increment+=this.frequency
    }
}

class PcWaveBar {
    constructor(bar, pointer, min, max){
        this.pointer= pointer
        this.bar=bar
        this.min=min
        this.max=max
        this.value=0
    }
    draw(){
        this.bar.drawSprite()
        this.pointer.drawSprite()
    }
    move(){
        if(mousemove.x>this.bar.position.x && mousemove.x<this.bar.position.x+this.bar.width){
            this.pointer.position.x=mousemove.x-this.pointer.width/2
            this.value = (this.max-this.min)*((mousemove.x-this.bar.position.x)/this.bar.width)
            this.value += this.min
           // console.log(this.value)

            //this.pointerposition=

        }
    }

}

class PcInterface{
    constructor(){        
        //this.button = new ImageDraw(position = { x: 210, y: 108 }, 19, 13, imgTVButton, 1, 5)
        //BOTONES E INTERFAZ DEL PC
        this.button= new ImageDraw(position = {x:210,y:107},13,14, imgPcButton,0,1)
        this.pcdisk= new ImageDraw(position={x:209,y:90}, 42,16,imgPcDisk)
        this.lights=[]
        for(let i=0;i<3;i++){
            this.lights.push(new ImageDraw(position={x:233,y:107+5*i}, 4,4,imgPcLight,0,i,'',1,50))
            this.lights[i].timecounter=getRndInteger(5,this.lights[i].maxtimecounter)
            this.lights[i].random.min=5; this.lights[i].random.max=50;
            this.lights[i].randomframechange=true
        }
       // this.pcselectbar = [,
     //                       ]
     //   this.pcselectpointer = [,
    //                            ]
        this.pcdisplay= new ImageDraw(position={x:211,y:10},38,55,imgPcWave)

        this.wave= new PcWave(position={x:211,y:10.5},36,34.5)
        //Array de las barras para modificar la onda
        this.pcwavebars=[new PcWaveBar(new ImageDraw(position={x:212,y:59}, 36,5,imgPcSelectorBar), //Amplitud
                                        new ImageDraw(position={x:220,y:57}, 6,10,imgPcSelectorButton,0),
                                        20,100),
                        new PcWaveBar(new ImageDraw(position={x:212,y:70}, 36,5,imgPcSelectorBar),  //Longitud
                                        new ImageDraw(position={x:235,y:68}, 6,10,imgPcSelectorButton,1),
                                        0.05,0.25),
                        new PcWaveBar(new ImageDraw(position={x:212,y:81}, 36,5,imgPcSelectorBar),  //Frecuencia
                                        new ImageDraw(position={x:220,y:79}, 6,10,imgPcSelectorButton,2),
                                        0.1,0.8)
                        ]

        this.wave.amplitude= ((this.pcwavebars[0].max-this.pcwavebars[0].min)*((this.pcwavebars[0].pointer.position.x-this.pcwavebars[0].bar.position.x)/this.pcwavebars[0].bar.width))+this.pcwavebars[0].min
        this.wave.lenght= ((this.pcwavebars[1].max-this.pcwavebars[1].min)*((this.pcwavebars[1].pointer.position.x-this.pcwavebars[1].bar.position.x)/this.pcwavebars[1].bar.width))+this.pcwavebars[1].min
        this.wave.frequency= ((this.pcwavebars[2].max-this.pcwavebars[2].min)*((this.pcwavebars[2].pointer.position.x-this.pcwavebars[2].bar.position.x)/this.pcwavebars[2].bar.width))+this.pcwavebars[2].min
         

        this.toolbar= new ImageDraw(position={x:19,y:104},175,8,imgPcToolBar)
        this.startbutton = new Border(position = {x:19,y:104}, 19,16)
        this.toolbarscreen = new ImageDraw(position={x:19,y:41},53,63,imgPcToolBarScreen)
        this.wavedisplay= new ImageDraw(position={x:211,y:10}, 38,54,)
        this.showtoolbarscreen=false;
        this.programs=[]

       

        //ESCRITORIO
        this.desktopicons=[]

        this.windowexplorer= new PcWindowExplorer(position={x:43,y:19},175,96,imgPcWindow)
        this.windowinternet= new PcWindowExplorer(position={x:43,y:19},175,96,imgPcWindow)


        this.trashicon = new ImageDraw(position={x:23,y:21},15,13,imgPcIcons,0,3)
        this.foldericon = new ImageDraw(position={x:45,y:21}, 15,13, imgPcIcons,0,0)
        this.date=new Date()
        this.clock= new WriteText(position={x:186,y:108},50,100,'',4,'bold')
    }
    draw(){        
        ctx.drawImage(imgPcWall, border.position.x, border.position.y);
        this.toolbar.drawSprite()
        ctx.fillStyle='white'
        this.clock.write()
        this.clock.text=this.getDate()
        this.date=new Date();

        this.trashicon.drawSprite()
        this.foldericon.drawSprite()
       

        this.programs.forEach((program)=>{

        })
        this.windowexplorer.showMinimized()

        if(this.showtoolbarscreen)this.toolbarscreen.draw()
        ctx.drawImage(imgPcExt, 0, 0);

        //this.pcselectbars.forEach((bar)=>{
        //    bar.drawSprite()
       // })
        this.pcwavebars.forEach((bar)=>{
            bar.draw()
        }) 
        this.pcdisk.draw()
        this.button.drawSprite()

        this.wave.draw()
        this.pcdisplay.drawSprite()
        /*this.lights.forEach((light)=>{
            light.drawAnimatedSprite()
        })*/
        this.showLights()
       // this.wave.drawGrid()
        

        
    }
    showLights(){
        this.lights.forEach((light,index)=>{
            if(colors[index]){
                light.row=index
                light.drawAnimatedSprite()
            }else{
                light.row=3
                light.drawAnimatedSprite()
            }
        })
    }
    getDate(){
        //if(this.date.getMinutes() < 10) 
        return (this.date.getHours()+':'+(this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes());
    }
}
//#endregion