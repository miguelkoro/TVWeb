//#region ScreenSize
/**SELECCIONAR TAMAÑO DE LA PANTALLA */
class Size{constructor(name, multiplier, width, height){this.name=name; this.multiplier=multiplier; this.width=width; this.height=height;}}

const screenSize=new Size('',0,0,0);
//Instanciamos un array con las medidas (Empezamos por las mas pequeñas)
var sizes=[new Size('XS',2,512,256), new Size('S',3,768,384), new Size('M',4,1024,512), new Size('L',5,1280,640), new Size('XL',6,1536,768), new Size('XXL',7,1792,896), new Size('XXXL',8,2048,1024)];

/** Seleccionamos la resolucion, comparandola con el ancho de la pantalla */
function getResolution(){
    sizes.forEach((size)=>{
        if(innerWidth>size.width )
            Object.assign(screenSize,size);
    })
}
getResolution();
//#endregion
//#region CanvasContext
/**Creamos el contexto del canvas */
var canvas = document.getElementById('canvas');
var ctx= canvas.getContext('2d');
/**Segun el tamaño de la pantalla seleccionado, configuramos el tamaño del canvas */
ctx.canvas.width=screenSize.width;
ctx.canvas.height=screenSize.height;
//#endregion
//#region borderclass
/** LIMITES */
function sizeConverter(size){
    return size*screenSize.multiplier
}
function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min) ) + min;
}
class Border{
    constructor(position,width,height){
        this.position={x:sizeConverter(position.x), y:sizeConverter(position.y)}
        this.width=sizeConverter(width);   //La altura y la anchura seran la diferencia de los puntos
        this.height=sizeConverter(height);
        this.center={x:this.position.x+this.width/2,y:this.position.y+this.height/2}
    }

    drawGrid(color){
        ctx.fillStyle=color;
        for(let i=0;i<=50;i++){            
            ctx.fillRect(this.position.x+i*(this.width/50), this.position.y, 1,this.height);  //Verticales
        }
        for(let i=0;i<=50;i++){            
            ctx.fillRect(this.position.x, this.position.y+i*(this.height/50), this.width,1);   //Horizontales
        }
    }
    collition(object){
        if(object.position.x>this.position.x+this.width ||
            object.position.x+object.width<this.position.x ||
            object.position.y>this.position.y+this.height ||
            object.position.y+object.height<this.position.y)
            return true
        else
            return false
    }
}
var border = new Border(position={x:19,y:17},174,95);
var controlerborder =new Border(position={x:207,y:63},46,60);
//Funcion que me diga cuando un objeto se ha salido de la pantalla
function offScreen(object){
    if(object.position.x>border.position.x+border.width ||
        object.position.x+object.width<border.position.x ||
        object.position.y>border.position.y+border.height ||
        object.position.y+object.height<border.position.y)
        return true
    else
        return false
}

//COLISIONES CON EXTERIOR con el exterior de la pantalla
/*function collitionBorder(obj){
    if(obj.position.y+obj.height+obj.velocity.y >= border.position.y2)   
        obj.velocity.y=0;
    if(obj.position.y+obj.velocity.y<=border.position.y1)
        obj.velocity.y=0;
    if(obj.position.x+obj.velocity.x<=border.position.x1)
        obj.velocity.x=0;
    if(obj.position.x+obj.width+obj.velocity.x>=border.position.x2)
        obj.velocity.x=0
    console.log(obj.position.x+obj.width+obj.velocity.x>=border.position.x2)
}*/
//#endregion
//#region ImageCommonClass
/** IMAGEN PARA INTERACTUAR */
class ImageDraw extends Border{ 
    constructor(position, width, height, image='', column=0,row=0, velocity={x:0,y:0}, maxframes=0, maxtimecounter=0, opacity=1){
        //this.position={x:sizeConverter(position.x), y:position.y*screenSize.multiplier}
        //this.width=width*screenSize.multiplier
        //this.height=height*screenSize.multiplier
        super(position, width, height)
        this.image=image

        this.velocity={x:velocity.x,y:velocity.y}
        this.radius=0
        this.column=column
        this.row=row
        this.opacity=opacity
        this.opacityspeed=0
        this.maxtimecounter=maxtimecounter
        this.timecounter=0
        this.maxframes=maxframes
        this.rotation=0
        this.rotationspeed=0
        this.blackandwhite=false
        this.random={min:0,max:0}
        this.randomframechange=false
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
    update(){
        //this.velocity=velocity
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y        
        this.draw()
    }
    drawSprite(){
        if(this.blackandwhite)this.toBlackAndWhite()
        ctx.drawImage(this.image,
            this.width*this.column,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen 
    }
    updateSprite(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //this.opacity+=this.opacitySpeed
        //this.draw()
        this.drawSprite()
    }

    frameChange(){
        if(this.randomframechange){
            if(this.maxtimecounter!=0){
                if(this.timecounter<this.maxtimecounter)
                    this.timecounter++
                else{
                    if(this.column==this.maxframes)this.column=0
                    else this.column++  
                    this.timecounter=getRndInteger(this.random.min,this.random.max); 
                }
            }
        }else{
            if(this.maxtimecounter!=0){
                if(this.timecounter<this.maxtimecounter)
                    this.timecounter++
                else{
                    if(this.column==this.maxframes)this.column=0
                    else this.column++  
                    this.timecounter=0; 
                }
            }
        }
    }

 
    drawAnimatedSprite(){
        this.frameChange()
        ctx.save();
        ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image,
            this.width*this.column,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen  
        ctx.restore();
    }

    updateAnimatedSprite(){
        //this.velocity=velocity
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //this.opacity+=this.opacitySpeed
        this.rotation+=this.rotationspeed
        this.drawAnimatedSprite()
    }

    drawCircle(radius, color){
        this.radius=radius
        ctx.fillStyle=color;
        ctx.strokeStyle=color;
        ctx.lineWidth = radius;
        ctx.beginPath()            
        ctx.arc(this.position.x, this.position.y,radius,0, Math.PI*2)        
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
   
    visible(){
        this.drawAnimatedSprite()
        //this.updateAnimatedSprite()
        if(this.opacity+this.opacityspeed>=1){
            
            this.opacity=1
            return true
       }else{
           this.opacity+=this.opacityspeed
           
           return false
       }   
       
       //console.log('ff')
    }
    invisible(){
        //this.updateAnimatedSprite()
        this.drawAnimatedSprite()
        if(this.opacity-this.opacityspeed<=0){
            this.opacity=0
            
            return true
       }else{
           this.opacity-=this.opacityspeed
           
           return false
       }
    }
    toBlackAndWhite(){
        //this.draw()
        var imgData = ctx.getImageData(this.position.x, this.position.y, this.width, this.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            let count = imgData.data[i] + imgData.data[i + 1] + imgData.data[i + 2];
            let colour = 0;
            if (count > 510) colour = 255;
            else if (count > 255) colour = 127.5;

            imgData.data[i] = colour;
            imgData.data[i + 1] = colour;
            imgData.data[i + 2] = colour;
            imgData.data[i + 3] = 255;
        }
        ctx.putImageData(imgData, 0, 0);
    }

}
/*class InteractiveImage extends ImageDraw{
    constructor(position,width,height,image,column,row=0,velocity={x:0,y:0}){
        super(position,width,height,image)
        //this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.velocity={x:velocity.x, y:velocity.y}  
        //this.width=width*screenSize.multiplier
        //this.height=height*screenSize.multiplier
        
        //this.image=image
        this.column=column
        this.row=row

    }
    draw(){        
        ctx.drawImage(this.image,
            this.width*this.column,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen  
    }
    update(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.draw()
    }
}*/
/*class AnimatedImage extends ImageDraw{
    constructor(position,width,height,image,frames,maxtimecounter,row=0,opacity=1){
        super(position,width,height,image)
        //this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        //this.width=width*screenSize.multiplier
        //this.height=height*screenSize.multiplier
        //this.image=image
        this.frames=frames
        this.framecounter=0
        this.timecounter=0
        this.maxtimecounter=maxtimecounter
        this.row=row
        this.velocity={x:0,y:0}
        this.opacity=opacity
        this.opacityspeed=0
        this.ontransition=false
        //this.visible=false
        this.makevisible=true
        this.rotation=0
    }
    draw(){
        if(this.timecounter<this.maxtimecounter)
            this.timecounter++
        else{
            if(this.framecounter==this.frames)this.framecounter=0
            else this.framecounter++  
            this.timecounter=0; 
        }
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image,
            this.width*this.framecounter,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen  
        ctx.restore();
    }
    update(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        //if(this.ontransition)
            //this.opacity+=this.opacityspeed
        this.draw()
        
    }
    visible(){
        this.update()
        if(this.opacity+this.opacityspeed>=1){
            this.opacity=1
            return true
       }else{
           this.opacity+=this.opacityspeed
           return false
       }   
       
       //console.log('ff')
    }
    invisible(){
        this.update()
        if(this.opacity-this.opacityspeed<=0){
            this.opacity=0
            return true
       }else{
           this.opacity-=this.opacityspeed
           return false
       }
    }
    rotate(){
        ctx.save();
        ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2);
        this.update()
    }

}
*/


//#endregion
//#region TextCommonClass
class WriteText extends Border{
    constructor(position, width,height,text='', fontsize=12,fontcolor='black', fontstyle='normal',fonttype='pixelFont',textalign='left',textbaseline='up',velocity={x:0,y:0}){
        super(position, width,height)
        this.text=text
        this.fontsize=fontsize
        this.fontcolor=fontcolor
        this.fontstyle=fontstyle
        this.fonttype=fonttype
        this.textalign=textalign
        this.textbaseline=textbaseline
        this.velocity=velocity
    }

    write(){
        ctx.fillStyle=this.fontcolor;
        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.fontsize*screenSize.multiplier+'px '+this.fonttype;
        ctx.fillText(this.text, this.position.x, this.position.y);
    }
}


function textConvert(text, maxchars){
    var string=''
    var charcounter=0
    var textarray=text.split(' ')   
    textarray.forEach((word)=>{ 
        //if(index!=textarray.length-1)
        word+=' '
        if(charcounter+word.length>=maxchars){
            string+='/n'       
            charcounter=0
        }
        charcounter+=word.length        
        string+=word      
   }) 
   return string.split('/n')
   
}
class WriteParagraph{
    constructor(text,fontsize, position, width, height, color, linespace, slowtext){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.width=width*screenSize.multiplier;
        this.height=height*screenSize.multiplier;  
        this.color=color
        this.textAlign='left';
        this.textBaseline='up';
        this.fontsize=fontsize*screenSize.multiplier;
        this.slowtext=slowtext;
        this.linespace=linespace*screenSize.multiplier
        this.textarray=text

        this.counter=0;
        this.timer=0;
        this.line=0;
        this.chars=0;
    }
    write(){
        ctx.fillStyle=this.color;

        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.fontsize+'px pixelFont';
        if(this.slowtext){
            var chars=0;
            this.textarray.forEach((line,index)=>{
                if(index<this.line)
                    ctx.fillText(line, this.position.x, this.position.y+(this.linespace*(index)));
                else if(index==this.line){
                    ctx.fillText(line.substr(0, this.counter), this.position.x, this.position.y+(this.linespace*(index)));
                    if(this.timer<3){
                        this.timer++;
                    }else{
                        this.counter++;
                        this.timer=0;
                        chars++;
                    }
                    if(this.counter==line.length){
                        this.line++;
                        this.counter=0                        
                    }
                }      
            })
        }else{
            this.textarray.forEach((line,index)=>{
                ctx.fillText(line, this.position.x, this.position.y+(this.linespace*(index)));
            })
        }          
    }      
}
class Text{
    constructor(text, size, color, position, font, textalign){
        this.size=size*screenSize.multiplier
        this.style=color
        this.textBaseline="middle"
        this.textAlign=textalign
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.velocity={x:0,y:0}
        this.width=26*screenSize.multiplier;
        this.height=9*screenSize.multiplier;
        this.text=text
        this.font='px '+font
    }
    draw(){
        ctx.fillStyle=this.style;
        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.size+this.font;
        ctx.fillText(this.text, this.position.x+(this.width/2), this.position.y+(this.height/2));
    }
    update(){
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.draw()
    }
}
//#endregion
//#region ParticlesClass
/** PARTICULAS */
class Particle{
    constructor(position, radius, velocity, color){
        this.position=position
        this.velocity=velocity
        this.radius=radius;
        this.color=color
        this.opacity=1
    }
    draw(){
        ctx.save();
        ctx.globalAlpha= this.opacity;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y,this.radius, 0, Math.PI*2)
        ctx.fillStyle=this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    update(){
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.opacity -= 0.01
    }
}
var particles=[]
function showParticles(){
    particles.forEach((particle, index)=>{
        if(particle.opacity<=0){    //Si la opacidad de la particula es 0, que la quite del array
            setTimeout(()=>{    //Para que no parpadee al desaparecer
                particles.splice(index, 1)
            },0)            
        }else
            particle.update()
    })
}
//#endregion
//#region loadimages
/**IMAGENES*/
function createImages(imagesrc){
    image=new Image()
    image.src=imagesrc+screenSize.name+'.png'
    return image;
}
//PC
var imgPcExt = createImages('img/pc/PC');
var imgPcWall = createImages('img/pc/windowswallpaper');
var imgPcToolBar = createImages('img/pc/BarraTareas');
var imgPcScreen = createImages('img/pc/PantallaWindows');
var imgPcToolBarScreen = createImages('img/pc/InicioWindows');
var imgPcIcons = createImages('img/pc/IconosPc');
var imgPcWindow = createImages('img/pc/PantallaWindows');
var imgPcExplorerIcon = createImages('img/pc/explorerIcons');
var imgPcDisk = createImages('img/pc/Disquetera');
var imgPcLight = createImages('img/pc/PcLights');
var imgPcWave = createImages('img/pc/PcOnda');
var imgPcSelectorBar = createImages('img/pc/pcScrollBar');
var imgPcSelectorButton = createImages('img/pc/pcScrollPoint');
var imgPcButton = createImages('img/pc/BotonPC');
//TV
var imgTvExt = createImages('img/tv/televisionSimp');
var imgTvColorButtons = createImages('img/tv/SpriteBotones');
var imgTvBulb = createImages('img/tv/SpriteFusibles')
var imgMuteButton = createImages('img/tv/SpriteSonido')
var imgTVButton = createImages('img/tv/SpriteBoton')
var imgTVCover = createImages('img/tv/TapaFusibles')
var imgTVScrew = createImages('img/tv/Tornillo')
//TRANSITION
var imgSnowEffect = createImages('img/sprites/transition/NieblaTv')
var imgLinesEffect = createImages('img/sprites/transition/rayasTV')
//SPACE
var imgBackgroundSpace = createImages('img/bg/space/back/FondoEspacio');
var imgSpriteNaveFut = createImages('img/sprites/spaceships/SpriteNaveFuturama');
var imgSpaceStars = createImages('img/bg/space/stars/EspacioFondoLargo');
var imgSpacePlanetBlue = createImages('img/bg/space/planets/PlanetBlue');
var imgSpacePlanetRed = createImages('img/bg/space/planets/Planetarojo');
var imgSpaceMeteores = createImages('img/bg/space/planets/meteoritos');
var imgSpaceDialog = createImages('img/interface/Dialog/BarraAbajo');
var imgSpaceOldman = createImages('img/sprites/npc/SpriteViejo');
var imgSpaceEnemySmall= createImages('img/sprites/space/enemysmall/SpriteEnemyShipsSmall')
//START
var imgStartBush = createImages('img/bg/start/bush/FondoArbustos')
var imgStartTrees = createImages('img/bg/start/trees/FondoPrincipal')
var imgStartLeaves = createImages('img/bg/start/leaves/Hojas')
var imgStartBirds = createImages('img/bg/start/birds/Pajaros')
//ABOUT ME
var imgBgBook = createImages('img/bg/aboutme/Libro')
var imgAboutMeSpider = createImages('img/sprites/aboutme/SpriteArana')
var imgDecorTitle = createImages('img/interface/book/AdornoTitulo')
var imgDecorationBook = createImages('img/interface/book/SeparadorLibro')
var imgDecorSeparation1=  createImages('img/book/separator2/SeparadorLibro2')
var imgPaperBook = createImages('img/interface/book/Papiro')
var imgNextPage = createImages('img/sprites/nextpage/SpritePagina')
var imgMarkPage = createImages('img/interface/book/SpriteMarcadores')
var imgBookSocialMedia = createImages('img/book/socialmedia/SpriteSocialMedia')
//4 EN RAYA
var imgConnect4Bg = createImages('img/bg/connect4/4enraya')
var imgConnect4Piece = createImages('img/sprites/connect4/fichas4enraya')
var imgConnect4SelectedCol = createImages('img/sprites/connect4/fichaSeleccionada')
var imgConnect4Reset = createImages('img/sprites/connect4/4enrayaReset')
var imgConnect4TextBg = createImages('img/sprites/connect4/4enrayaAviso')
//ARCADE
var imgArcadeBg = createImages('img/bg/arcade/fondorecreativa')
var imgArcadeMachines = createImages('img/sprites/arcade/recreativas')
var imgArcadeArrow = createImages('img/sprites/arcade/flechasarcade')
var imgArcadePacman = createImages('img/sprites/arcade/comecocosSprite')
var imgArcadeSign = createImages('img/sprites/arcade/cartelarcade')
var imgArcadeMinigames = createImages('img/sprites/arcade/SpriteMinigames')

//#endregion
//#region loadmusic
/**MUSICA */
var audio = new Audio('sounds/audio.mp3');
//#endregion
//#region fonts
/**FUENTES */
var pixelFont= new FontFace('pixelFont', 'url(fonts/VPPixel-Simplified.otf)');
pixelFont.load().then(function(font){document.fonts.add(font); });
var gothicFont= new FontFace('gothicFont', 'url(fonts/GothicPixels.ttf)');
gothicFont.load().then(function(font){document.fonts.add(font); });
//#endregion 
//#region var
/** VARIABLES DE TECLADO Y RATON */
const keys = {right:{pressed:false},left:{pressed:false},down:{pressed:false},up:{pressed:false},space:{pressed:false}}
const mousemove={x:0, y:0}
/** VARIABLE ENTRE PC Y TV */
var state=0 //0->TV, 1->PC
/** VARIABLE DE ETAPAS DE LA TV*/
var stage=0;
var newstage=0
/** VARIABLES DE LENGUAJE */
var languaje=0 //0 español, 1 ingles
/** VARIABLE DE SONIDO */
var mute=false
var showgrid=false
//#endregion
//#region transitionClass
/**EFECTO DE TRANSICION */

var transitionscreen = [ new ImageDraw(position={x:19,y:17},175,96,imgSnowEffect,0,0,'',1,3,0),//new AnimatedImage(position={x:19,y:17},175,96,imgSnowEffect,1,4,0,0),//position={x:border.position.x, y:border.position.y}, 175, 96)//, [imgSnowEffect, imgLinesEffect])
                        new ImageDraw(position={x:19,y:17},175,96,imgLinesEffect,0,0,'',1,5,0)]//new AnimatedImage(position={x:19,y:17},175,96,imgLinesEffect,1,4,0,0)]//position={x:border.position.x, y:border.position.y}, 175, 96)//, [imgSnowEffect, imgLinesEffect])
var onstagetransition=false
function transitionStages(){
    onstagetransition=true    
    transitionscreen.forEach((screen)=>{
        
        screen.opacityspeed=0.03
       if(stage!=newstage){
            if(screen.visible())stage=newstage
       }else if(screen.invisible())onstagetransition=false
       
       

    })
}
//#endregion
