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

class PcInterface{
    constructor(){        
        //this.button = new ImageDraw(position = { x: 210, y: 108 }, 19, 13, imgTVButton, 1, 5)
        this.button= new ImageDraw(position = {x:210,y:106},13,14, imgPcButton,0,1)
        this.pcdisk= new ImageDraw(position={x:209,y:87}, 42,17,imgPcDisk)
        this.lights=[]
        for(let i=0;i<3;i++){
            this.lights.push(new ImageDraw(position={x:233,y:106+5*i}, 4,4,imgPcLight,0,i,'',1,50))
            this.lights[i].timecounter=i*Math.floor(Math.random()*10)
        }
        this.pcselectbar = [new ImageDraw(position={x:212,y:67}, 36,5,imgPcSelectorBar),
                            new ImageDraw(position={x:212,y:78}, 36,5,imgPcSelectorBar)]
        this.pcselectpointer = [new ImageDraw(position={x:229,y:65}, 6,10,imgPcSelectorButton,0),
                                new ImageDraw(position={x:215,y:76}, 6,10,imgPcSelectorButton,1)]
        this.pcdisplay= new ImageDraw(position={x:211,y:10},38,55,imgPcWave)


        this.toolbar= new ImageDraw(position={x:19,y:104},175,8,imgPcToolBar)
        this.startbutton = new Border(position = {x:19,y:104}, 19,16)
        this.toolbarscreen = new ImageDraw(position={x:19,y:41},53,63,imgPcToolBarScreen)
        this.wavedisplay= new ImageDraw(position={x:211,y:10}, 38,54,)
        this.showtoolbarscreen=false;
        this.programs=[]

        this.windowexplorer= new PcWindowExplorer(position={x:43,y:19},175,96,imgPcWindow)
        this.windowinternet= new PcWindowExplorer(position={x:43,y:19},175,96,imgPcWindow)


        this.trashicon = new ImageDraw(position={x:23,y:21},15,13,imgPcIcons,0,3)
        this.foldericon = new ImageDraw(position={x:45,y:21}, 15,13, imgPcIcons,0,0)
        this.date=new Date()
        this.clock= new WriteText(position={x:186,y:108},50,100,'',15,'bold')
    }
    draw(){        
        ctx.drawImage(imgPcWall, border.position.x, border.position.y);
        this.toolbar.drawSprite()
        ctx.fillStyle='white'
        this.clock.write()
        this.clock.text=this.getDate()
        

        this.trashicon.drawSprite()
        this.foldericon.drawSprite()
       

        this.programs.forEach((program)=>{

        })
        this.windowexplorer.showMinimized()

        if(this.showtoolbarscreen)this.toolbarscreen.draw()
        ctx.drawImage(imgPcExt, 0, 0);

        this.pcselectbar.forEach((bar)=>{
            bar.drawSprite()
        })
        this.pcselectpointer.forEach((button)=>{
            button.drawSprite()
        }) 
        this.pcdisk.draw()
        this.button.drawSprite()
        this.pcdisplay.drawSprite()
        this.lights.forEach((light)=>{
            light.drawAnimatedSprite()
        })
        

        
    }
    getDate(){
        //if(this.date.getMinutes() < 10) 
        return (this.date.getHours()+':'+(this.date.getMinutes() < 10 ? '0' : '') + this.date.getMinutes());
    }
}
//#endregion