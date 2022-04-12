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
class Border{
    constructor(){
        this.position={
            x1:19*screenSize.multiplier, y1:17*screenSize.multiplier,   //19,16
            x2:193*screenSize.multiplier, y2:112*screenSize.multiplier
        }
        this.width=this.position.x2-this.position.x1;   //La altura y la anchura seran la diferencia de los puntos
        this.height=this.position.y2-this.position.y1;
    }

    draw(){
        ctx.fillStyle='blue';
        ctx.fillRect(this.position.x1, this.position.y1, this.width,1);
        ctx.fillRect(this.position.x1, this.position.y2, this.width,1);
        ctx.fillRect(this.position.x1, this.position.y1, 1,this.height);
        ctx.fillRect(this.position.x1+this.width, this.position.y1, 1,this.height);
    }
}
var border = new Border();
//Funcion que me diga cuando un objeto se ha salido de la pantalla
function offScreen(object){
    if(object.position.x>border.position.x2 ||
        object.position.x+object.width<border.position.x1 ||
        object.position.y>border.position.y2 ||
        object.position.y+object.height<border.position.y1)
        return true
    else
        return false
}
//COLISIONES CON EXTERIOR con el exterior de la pantalla
function collitionBorder(obj){
    if(obj.position.y+obj.height+obj.velocity.y >= border.position.y2)   
        obj.velocity.y=0;
    if(obj.position.y+obj.velocity.y<=border.position.y1)
        obj.velocity.y=0;
    if(obj.position.x+obj.velocity.x<=border.position.x1)
        obj.velocity.x=0;
    if(obj.position.x+obj.width+obj.velocity.x>=border.position.x2)
        obj.velocity.x=0
}
//#endregion
//#region ImageCommonClass
/** IMAGEN PARA INTERACTUAR */
class ImageDraw{
    constructor(position, width, height, image){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.width=width*screenSize.multiplier
        this.height=height*screenSize.multiplier
        this.image=image
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
class InteractiveImage{
    constructor(position,width,height,image,column,row,velocity){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.velocity={x:velocity.x, y:velocity.y}  
        this.width=width*screenSize.multiplier
        this.height=height*screenSize.multiplier
        this.image=image
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
}
class AnimatedImage{
    constructor(position,width,height,image,frames,maxtimecounter,row){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.width=width*screenSize.multiplier
        this.height=height*screenSize.multiplier
        this.image=image
        this.frames=frames
        this.framecounter=0
        this.timecounter=0
        this.maxtimecounter=maxtimecounter
        this.row=row
    }
    draw(){
        if(this.timecounter<this.maxtimecounter)
            this.timecounter++
        else{
            if(this.framecounter==this.frames)this.framecounter=0
            else this.framecounter++  
            this.timecounter=0; 
        }
        ctx.drawImage(this.image,
            this.width*this.framecounter,this.height*this.row,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen  
    }
}
//#endregion
//#region TextCommonClass
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
var imgPaperBook = createImages('img/interface/book/Papiro')
var imgNextPage = createImages('img/sprites/nextpage/SpritePagina')
var imgMarkPage = createImages('img/interface/book/SpriteMarcadores')

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
/** VARIABLE DE ETAPAS */
var stage=0;
var newstage=0
//#region transitionClass
/**EFECTO DE TRANSICION */
class Transition{
    constructor(position, width, height, imagesnow, imagelines){
        this.position=position
        this.opacity=0
        this.imagelines=imagelines
        this.imagesnow=imagesnow
        this.side=0
        this.timer=0
        this.width=width
        this.height=height
        this.transition=false
    }
    draw(){
        ctx.save();
        if(this.timer<10)
            this.timer++
        else{
            if(this.side==0)
                this.side=1
            else
                this.side=0
            this.timer=0
        }

        ctx.globalAlpha = this.opacity;
        //ctx.beginPath();
        ctx.drawImage(this.imagesnow,
            this.width*this.side,0,//*this.pulsed+this.width*this.selected,this.height*this.color,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        //ctx.closePath();
       
        ctx.drawImage(this.imagelines,
            this.width*this.side,0,//*this.pulsed+this.width*this.selected,this.height*this.color,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen

        ctx.restore();
    }
    update(opacity){
        this.draw();
        this.opacity += opacity
        //console.log(this.opacity)
    }
}
var transitionscreen = new Transition(position={x:border.position.x1, y:border.position.y1}, border.position.x2-border.position.x1, border.position.y2-border.position.y1, imgSnowEffect, imgLinesEffect)
function transitionStages(){
    transitionscreen.transition=true
    if(transitionscreen.opacity<1 && stage!=newstage)
        transitionscreen.update(0.03)
    else
        stage=newstage;
    if(transitionscreen.opacity>0 && stage==newstage)
        transitionscreen.update(-0.03)        
    if(transitionscreen.opacity<0 && stage==newstage){
        transitionscreen.transition=false
        transitionscreen.opacity=0
    }
    //console.log('En trasicion')
}
//#endregion
var languaje=0 //0 español, 1 ingles

//#region TvInterfaceClass
class TvInterface{
    constructor(){
        
        this.tvbulbs=[  new AnimatedImage(position={x:214,y:13},32,16,imgTvBulb,1,10,0),
                        new AnimatedImage(position={x:214,y:29},32,16,imgTvBulb,1,10,1),
                        new AnimatedImage(position={x:214,y:45},32,16,imgTvBulb,1,10,2)]
        this.tvscrews=[ new ImageDraw(position={x:213,y:12},4,4,imgTVScrew),
                        new ImageDraw(position={x:213,y:58},4,4,imgTVScrew),
                        new ImageDraw(position={x:243,y:12},4,4,imgTVScrew),
                        new ImageDraw(position={x:243,y:58},4,4,imgTVScrew)]
        this.downtvbutton=[new InteractiveImage(position={x:210, y:80},19,13,imgTVButton,1,0,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:231, y:80}, 19,13,imgTVButton,0,1,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:210, y:94}, 19,13,imgTVButton,1,2,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:231, y:94}, 19,13,imgTVButton,0,3,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:210, y:108}, 19,13,imgTVButton,0,4,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:231, y:108}, 19,13,imgTVButton,0,5,velocity={x:0,y:0})]
        this.colortvbuttons=[new InteractiveImage(position={x:209, y: 65},13,14,imgTvColorButtons,3,0,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:223, y: 65},13,14,imgTvColorButtons,3,1,velocity={x:0,y:0}),
                            new InteractiveImage(position={x:237, y: 65},13,14,imgTvColorButtons,3,2,velocity={x:0,y:0})]
    }
    draw(){
        ctx.drawImage(imgTvExt, 0, 0);
        this.tvbulbs.forEach((bulb)=>{
            bulb.draw()
        })
        this.colortvbuttons.forEach((button)=>{
            button.draw()
        })
        this.tvscrews.forEach((screw)=>{
            screw.draw()
        })
        this.downtvbutton.forEach((button)=>{
            button.draw()
        })
        ctx.drawImage(imgTVCover, 211*screenSize.multiplier, 10*screenSize.multiplier);
    }
}

//#endregion