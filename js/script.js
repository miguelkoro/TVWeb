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

//console.log(innerWidth);
//console.log(screenSize);
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
const border = new Border();
//#endregion

//Funcion que me diga cuando un objeto se ha salido de la pantalla
function offScreen(position,height,width){
    if(position.x>border.position.x2 ||
        position.x+width<border.position.x1 ||
        position.y>border.position.y2 ||
        position.y+height<border.position.y1)
        return true
        else
        return false
}


//#region loadmusic
/**MUSICA */
var audio = new Audio('sounds/audio.mp3');
//#endregion

//#region fonts
/**FUENTES */
var pixelFont= new FontFace('pixelFont', 'url(fonts/VPPixel-Simplified.otf)');
pixelFont.load().then(function(font){document.fonts.add(font); });
//#endregion 
//#region loadimages
/**IMAGENES*/
function createImages(imagesrc){
    image=new Image()
    image.src=imagesrc+screenSize.name+'.png'
    return image;
}
var imgTvExt = createImages('img/tv/televisionSimp');//new Image();
var imgBackgroundSpace = createImages('img/bg/space/back/FondoEspacio');
var imgSpriteNaveFut = createImages('img/sprites/spaceships/SpriteNaveFuturama');
var imgPlayPanelOn= createImages('img/interface/playbutton/PanelPlay');
var imgSpaceStars= createImages('img/bg/space/stars/EspacioFondoLargo');
var imgSpacePlanetBlue= createImages('img/bg/space/planets/PlanetBlue');
var imgSpaceDialog= createImages('img/interface/Dialog/BarraAbajo');
var imgSpaceOldman= createImages('img/sprites/npc/SpriteViejo');
var imgbuttons= createImages('img/tv/SpriteBotones');
var imgTvBulb= createImages('img/tv/SpriteFusibles')
var imgMuteButton= createImages('img/tv/SpriteSonido')
//#endregion

/**PANEL DE PLAY */
/*class PlayPanel{
    constructor(){
        
        this.imageOn=imgPlayPanelOn;
        this.imageOff='';//imgPlayPanelOff;
    }
    draw(){
        ctx.drawImage(this.imageOn, this.position.x, this.position.y);
    }
}
const playpanel= new PlayPanel();*/

/** BOTON SONIDO */
class MuteButton{
    constructor(){
        this.position={x:210*screenSize.multiplier, y:108*screenSize.multiplier}
        this.width=19*screenSize.multiplier;
        this.height=12*screenSize.multiplier;
        this.image=imgMuteButton;
        this.pulsed=1
    }
    draw(){
        ctx.drawImage(this.image,
            this.width*this.pulsed,0,//*this.pulsed+this.width*this.selected,this.height*this.color,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
}
const mutebutton= new MuteButton();
function muteController(pulsed){
    if(mousemove.x>mutebutton.position.x && mousemove.x<mutebutton.position.x+mutebutton.width
        &&mousemove.y>mutebutton.position.y && mousemove.y<mutebutton.position.y+mutebutton.height){           
            if(pulsed==1){
                switch(mutebutton.pulsed){
                    case 0: mutebutton.pulsed=1; 
                            audio.pause();
                            audio.currentTime = 0;
                                break;
                    case 1: mutebutton.pulsed=0;
                            audio.play() ;break;                
                }
            }
    }
    //else
    //mutebutton.selected=1    
}

/** FUSIBLES */

class TvBulb{
    constructor(color,place){
        this.width=32*screenSize.multiplier
        this.height=16*screenSize.multiplier
        this.color=color;
        this.place=place
        this.position={x:214*screenSize.multiplier,y:13*screenSize.multiplier+this.height*place}
        this.image=imgTvBulb;
        this.frames=0;  //Indica el frame de la imagen en el que esta actualmente
        this.maxframes=2;
        this.animationtime=10
        this.timer=0;
        this.origcolor=color;
        this.off=false;
    }
    draw(){
        //ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.drawImage(this.image,
            this.width*this.frames,this.height*this.color,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
    update(){
        if(this.timer<this.animationtime)
            this.timer++;
        else{
            this.timer=0;
            this.frames++;
            if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 
        }
        if(this.off){
            this.color=3;
        }else this.color=this.origcolor;
        this.draw();
    }
}

var tvbulbs=[new TvBulb(0,0),new TvBulb(1,1), new TvBulb(2,2)]

function showTvBulb(){
        tvbulbs.forEach((tvbulb) =>{    
            tvbulb.update();         
        })

}


/**BOTONES TELEVISION */
class TvButton{
    constructor(color,place){ 
            
        this.width=13*screenSize.multiplier;
        this.height=14*screenSize.multiplier
        this.pulsed=1;
        this.image=imgbuttons;
        this.selected=1;
        this.color=color;
        this.place=place
        this.position={x:210*screenSize.multiplier+this.width*place, y:67*screenSize.multiplier}   

    }

    draw(){
        //ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.drawImage(this.image,
            this.width*this.selected*2+this.width*this.pulsed,this.height*this.color,//*this.pulsed+this.width*this.selected,this.height*this.color,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
}
//const tvbuttons = new TvButton();
function buttonController(tbutton,pulsed){
    if(mousemove.x>tbutton.position.x && mousemove.x<tbutton.position.x+tbutton.width
        &&mousemove.y>tbutton.position.y && mousemove.y<tbutton.position.y+tbutton.height){
            console.log('tbutton'+ tbutton.color)
            tbutton.selected=0;
            if(pulsed==1){
                switch(tbutton.pulsed){
                    case 0: tbutton.pulsed=1; 
                             break;
                    case 1: tbutton.pulsed=0;break;                
                }
            //Cambiar el color de los fusibles con el boton pulsado
                tvbulbs.forEach((tvbulb) =>{    
                    if(tbutton.place==tvbulb.place){
                        switch(tbutton.pulsed){
                            case 0: tvbulb.off=true;
                                     break;
                            case 1: tvbulb.off=false; break;                
                        }
                    }                              
                })
            }
    }
    else
        tbutton.selected=1    
}

var tvbuttons=[new TvButton(0,0),new TvButton(1,1), new TvButton(2,2)]//,new TvButton(1,1),new TvButton(2,2)]
function showTvButtons(pulsed){
        tvbuttons.forEach((tvbutton) =>{    
            tvbutton.draw();
            buttonController(tvbutton,pulsed);
        })

}

/** Pantalla Principal */



/**BARRA DE ABAJO */

class DialogBar{
    constructor(){
        this.position={x:20*screenSize.multiplier, y:73*screenSize.multiplier}
        this.width=172*screenSize.multiplier;
        this.height=39*screenSize.multiplier;
        this.image=imgSpaceDialog;
    }
    draw(){
        ctx.drawImage(this.image, this.position.x, this.position.y);
    }
}
const dialogbar= new DialogBar();

class DialogText{
    constructor(text,size){
        this.position={x:64*screenSize.multiplier, y:83*screenSize.multiplier}
        this.width=121*screenSize.multiplier;
        this.height=25*screenSize.multiplier;
        this.timecounter=0;    
        this.color='black'
        this.textAlign='left';
        this.textBaseline='up';
        this.fontsize=size*screenSize.multiplier;
        this.slowtext=true;
        this.linespace=this.height/4;
        this.textstring=text;
        this.textarray=[]
        this.maxchars=36

        //this.linesarray=''
        //this.phrasearray=[]
       

        this.counter=0;
        this.timer=0;
        this.line=0;
        this.chars=0;
        
        this.textConvert()
    }
    write(){
        ctx.fillStyle=this.color;
       // ctx.fillRect(playpanel.position.x, playpanel.position.y, playpanel.width,playpanel.height);

        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.fontsize+'px pixelFont';
        if(this.slowtext){
            var chars=0;
            //this.line=0;
            //this.counter=0;
            //this.timer=0;
            this.textarray.forEach((line,index)=>{

                if(index<this.line)
                    ctx.fillText(line, this.position.x, this.position.y+(this.linespace*(index)));
                else if(index==this.line){

                    ctx.fillText(line.substr(0, this.counter), this.position.x, this.position.y+(this.linespace*(index)));
                    if(this.timer<3){
                        this.timer++;
                        //console.log(this.counter);
                    }else{
                        this.counter++;
                        this.timer=0;
                        chars++;
                        //console.log(this.counter);
                    }
                    console.log(line.length + ' ' + this.counter )
                    if(this.counter==line.length){
                        this.line++;
                        this.counter=0
                        //console.log('igual',this.line)
                        //console.log('igual',this.line)
                        
                    }
                }
                
                //console.log(line)     
                //chars+=line.length          
            })

        }else{
            this.textarray.forEach((line,index)=>{
                ctx.fillText(line, this.position.x, this.position.y+(this.linespace*(index)));
                //console.log(line)
            })
            }          
    }  
    textConvert(){
        var line=0
         this.textarray=this.textstring.split(' ')   
         this.textstring=''
         this.textarray.forEach((word,index)=>{ 
            if(index!=this.textarray.length-1)
                word+=' '
            if(this.textstring.length>=this.maxchars*(line+1)){
                this.textstring+='/n'
                line++           
            }
            if(index==0)
                this.textstring=word//.push(word)[this.lineS];
            else
                this.textstring+=word      
        }) 
        this.textarray=this.textstring.split('/n')
        line=0;
        console.log('string: '+this.textarray[0])
    }
}

//textFit('Lorem Ipsum is simply dummy Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum  text of th',6)
var text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed felis lorem, rhoncus id accumsan id, congue et justo. Fusce eget sem mollis';
var dialogtext=new DialogText(text,6) 
var dialog=false  
            


/**FONDO NEBULOSAS y ESTRELLAS */
class BackgroundStars{
    constructor(){
        this.position={x:border.position.x1, y:border.position.y1}
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
        if(this.position.x-this.velocity+(this.width*this.counter)<=border.position.x1-this.width){
            this.counter++;
            //console.log(this.counter)
        }
    }
}
const backgroundstars= new BackgroundStars();
/**FONDO PLANETAS
 * Añadirle un array de imagenes y que vaya escogiendo una imagen random cada vez, y en una posicion random de Y
 */
class BackgroundPlanets{
    constructor(){
        this.position={x:border.position.x2, y:border.position.y2/2}  //Cambiar
        //this.width=border.width;   //Cambiar
        //this.height=96*screenSize.multiplier;   //Cambiar
        this.velocity=1;
        this.image=imgSpacePlanetBlue;   //Cambiar
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
            this.position.x=border.position.x2;            
            this.position.y=Math.random() * (screenSize.height - 0);
            //console.log(this.counter)
        }
    }
}
const backgroundPlanets = new BackgroundPlanets();

/**PERSONAJE */
class Player{
    constructor(){
        this.position={x:border.position.x1+(border.width/8),y:border.position.y1+(border.height/2.5)};
        this.velocity={x:0,y:0};  //Dividirlo por el multiplicador y multiplicarlo por un numero fijo
        this.width=40*screenSize.multiplier;
        this.height=20*screenSize.multiplier;
        this.image=imgSpriteNaveFut;
        this.frames=0;  //Indica el frame de la imagen en el que esta actualmente
        this.maxframes=8;
        this.health=0;
    }
    draw(){
        ctx.fillStyle='red';
        //ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(this.image,
            this.width*this.frames,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
    update(){
        this.frames++;
        if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 

        this.draw();
        this.position.y += this.velocity.y; //a la posicion actual le suma la velocidad //Hacia abajo, arriba
        this.position.x += this.velocity.x; //Hacia la derecha, izquierda
    }
}
const player = new Player();    //Instanciamos el jugador
const keys = {  //Creamos e instanciamos el objeto keys para saber que boton esta pulsado
    right:{pressed:false},
    left:{pressed:false},
    down:{pressed:false},
    up:{pressed:false},
    space:{pressed:false}
}
const mousemove={
    x:0, y:0
}

/**NPC */
class Npc{
    constructor(){
        this.position={x:23*screenSize.multiplier,y:77*screenSize.multiplier};
        this.width=32*screenSize.multiplier;
        this.height=32*screenSize.multiplier;
        this.image=imgSpaceOldman;
        this.frames=0;  //Indica el frame de la imagen en el que esta actualmente
        this.maxframes=8;
        this.animationtime=10
        this.timer=0;
    }
    draw(){
        //ctx.drawImage(this.image, this.position.x, this.position.y);
        ctx.drawImage(this.image,
            this.width*this.frames,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
    }
    update(){
        if(this.timer<this.animationtime)
            this.timer++;
        else{
            this.timer=0;
            this.frames++;
            if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 
        }
        this.draw();
    }
}
const npc=new Npc();




/** TEXTO */
class PlayButton{
    constructor(){
        this.size=20
        this.style='white'
        this.textBaseline="middle"
        this.textAlign="center"
        this.position={x:87*screenSize.multiplier, y:48*screenSize.multiplier}
        this.velocity={x:0,y:0}
        this.width=26*screenSize.multiplier;
        this.height=9*screenSize.multiplier;
        this.mouse=false
        this.offscreen=false;
    }
    draw(){
        ctx.fillStyle=this.style;
        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.size*screenSize.multiplier+'px pixelFont';
        ctx.fillText('Play', this.position.x+(this.width/2), this.position.y+(this.height/2));
    }
    update(){
        if(!this.offscreen){
            this.position.y+=this.velocity.y
        }
        if(!offScreen(this.position,this.width,this.height))
            this.draw()
    }
}
const playbutton=new PlayButton();



//COLISIONES CON EXTERIOR con el exterior de la pantalla
function collitionBorder(){
    if(player.position.y+player.height+player.velocity.y >= border.position.y2)   
        player.velocity.y=0;
    if(player.position.y+player.velocity.y<=border.position.y1)
        player.velocity.y=0;
    if(player.position.x+player.velocity.x<=border.position.x1)
        player.velocity.x=0;
    if(player.position.x+player.width+player.velocity.x>=border.position.x2)
        player.velocity.x=0
}

//CONTROLES TECLADO
var timer=0;
function keysControl(){
    if(keys.left.pressed)player.velocity.x=-3;
    else if (keys.right.pressed) player.velocity.x=3
    else player.velocity.x=0;

    if(keys.down.pressed)player.velocity.y=3;
    else if (keys.up.pressed) player.velocity.y=-3
    else player.velocity.y=0;

    //Si se pulsa la barra espaciadora que añada un disparo a la lista
    //if(keys.spacebar.pressed)
    if(timer>15){
        if(keys.space.pressed){
            projectiles.push(new Projectile(player.position, velocity={x:10, y:0}, 3, 1))
            timer=0
        }
    }
    timer++
        
    
}

/**FUNCION QUE DIBUJE EL NIVEL DEL ESPACIO */
function spaceDraw(){
    ctx.drawImage(imgBackgroundSpace,border.position.x1,border.position.y1); //Fondo pequeño del espacio
    backgroundstars.update();
    backgroundPlanets.update();
    showProjectiles();
    player.update();
}

/**Pruebas raton */


function Pointer(click){
    
    if(mousemove.x>playbutton.position.x && mousemove.x<playbutton.position.x+playbutton.width
        &&mousemove.y>playbutton.position.y && mousemove.y<playbutton.position.y+playbutton.height){
            playbutton.size=22
            if(click==1)playbutton.velocity.y=-2;
        }
        else
            playbutton.size=13
}

/*function pruebas(){
    if(mousemove.x>playpanel.position.x && mousemove.x<playpanel.position.x+playpanel.width
    &&mousemove.y>playpanel.position.y && mousemove.y<playpanel.position.y+playpanel.height){
        //('play')   
        //audio.play()
    }
}*/

function dialogText(){    
    if(dialog){
        npc.update();
        dialogbar.draw();
        dialogtext.write();        
    }
}

function tvDraw(){
    ctx.drawImage(imgTvExt, 0, 0);
    showTvButtons(0)
    showTvBulb()
    mutebutton.draw()
}

//#region animatefunction

/**DIBUJO POR PANTALLA */
function animate(){
    requestAnimationFrame(animate)  //Actualiza la pantalla continuamente
    ctx.clearRect(0,0,canvas.width, canvas.height); //Limpia toda la pantalla    
    //border.draw();
    //ctx.fillRect(19*screenSize.multiplier, 78*screenSize.multiplier, border.width,19*screenSize.multiplier+border.position.y2);
    //ctx.fillStyle='red'
    //ctx.fillRect(19*screenSize.multiplier, 78*screenSize.multiplier, 32*screenSize.multiplier,19*screenSize.multiplier+border.position.y2);
    spaceDraw();//Dibuja todo lo del espacio
    //playpanel.draw();

    
    dialogText();//.write();
    
    
    
    
    
    playbutton.update()
    keysControl();     

    //Detectar las colisiones
    collitionBorder();
    //textWrite();
    tvDraw()
    //console.log('go')
}
animate(); 
//#endregion
//#region eventslisteners
/*LECTURA DE ENTRADAS (Falta el control para dispositivos moviles) */
window.addEventListener('keydown',({key})=>   //Vemos que tecla se ha pulsado y le ponemos una accion
    {
        //audio.play()
        //console.log(key);
        switch(key){
            case 'a': 
            case 'ArrowLeft':   keys.left.pressed=true;
                break;
            case 's': 
            case 'ArrowDown':keys.down.pressed=true; 
                break;
            case 'd': 
            case 'ArrowRight':keys.right.pressed=true; 
                break;
            case 'w':
            case 'ArrowUp': keys.up.pressed=true; 
                break;
            case ' ': keys.space.pressed=true; 
                break;
            
        }
    });
window.addEventListener('keyup',({key})=>   //Vemos que tecla se ha pulsado y le ponemos una accion
    {switch(key){
        case 'a': 
        case 'ArrowLeft':   keys.left.pressed=false;
            break;
        case 's': 
        case 'ArrowDown':keys.down.pressed=false; 
            break;
        case 'd': 
        case 'ArrowRight':keys.right.pressed=false; 
            break;
        case 'w': 
        case 'ArrowUp':keys.up.pressed=false; 
            break;
        case ' ': keys.space.pressed=false; 
                break;
    }
});

/*window.addEventListener('keydown',(keycode)=>   //Permite ver que tecla has pulsado keycode - event
    console.log(event));*/
window.addEventListener("mousemove", function(e) { 
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    mousemove.x=(e.clientX - rect.left) * scaleX;
    mousemove.y=(e.clientY - rect.top) * scaleY;
    //console.log(BBoffsetX, BBoffsetY)
    //console.log(getMousePos(canvas, e))
    Pointer();
});

window.addEventListener("click", function(e) { 
    //console.log(e)
    showTvButtons(1)
    muteController(1)
    Pointer(1);
    
});

//#endregion