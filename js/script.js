class Size{constructor(name, multiplier, width, height){this.name=name; this.multiplier=multiplier; this.width=width; this.height=height;}}

const screenSize=new Size('',0,0,0);
//Instanciamos un array con las medidas (Empezamos por las mas pequeñas)
var sizes=[new Size('XS',2,512,256), new Size('S',3,768,384), new Size('M',4,1024,512), new Size('L',5,1280,640), new Size('XL',6,1536,768), new Size('XXL',7,1792,896), new Size('XXXL',8,2048,1024)];

/** Seleccionamos la resolucion, comparandola con el ancho de la pantalla */
function getResolution(){
      for(var i=0; i<sizes.length-1; i++){ //Hay que reducir a uno porque el ultimo no tiene limite de anchura
        if(innerWidth>sizes[i].width && innerWidth<sizes[i+1].width)
            Object.assign(screenSize,sizes[i]);
    }
    if(innerWidth>sizes[sizes.length-1].width)Object.assign(screenSize,sizes[sizes.length-1]);  //El ultimo se hace manualmente
}
getResolution(screenSize);

console.log(innerWidth);
console.log(screenSize);

/**Creamos el contexto del canvas */
var canvas = document.getElementById('canvas');
var ctx= canvas.getContext('2d');
/**Segun el tamaño de la pantalla seleccionado, configuramos el tamaño del canvas */
ctx.canvas.width=screenSize.width;
ctx.canvas.height=screenSize.height;


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




/**FUENTES */
var pixelFont= new FontFace('pixelFont', 'url(fonts/VPPixel-Simplified.otf)');
pixelFont.load().then(function(font){document.fonts.add(font); });
/**IMAGENES*/
function createImages(imagesrc){
    image=new Image()
    image.src=imagesrc+screenSize.name+'.png'
    return image;
}
var imgTvExt = createImages('img/tv/televisionSimp');//new Image();
var imgBackgroundSpace = createImages('img/bg/FondoEspacio');
var imgSpriteNaveFut = createImages('img/sprites/spaceships/SpriteNaveFuturama');
var imgPlayPanelOn= createImages('img/PanelPlay');
var imgSpaceStars= createImages('img/bg/EspacioFondoLargo');


/**PANEL DE PLAY */
class PlayPanel{
    constructor(){
        this.position={x:87*screenSize.multiplier, y:48*screenSize.multiplier}
        this.width=26*screenSize.multiplier;
        this.height=9*screenSize.multiplier;
        this.imageOn=imgPlayPanelOn;
        this.imageOff='';//imgPlayPanelOff;
    }
    draw(){
        ctx.drawImage(this.imageOn, this.position.x, this.position.y);
    }
}
const playpanel= new PlayPanel();

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
                console.log(this.counter)
            }
    }
}
const backgroundstars= new BackgroundStars();

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
    up:{pressed:false}
}
const mousemove={
    x:0, y:0
}

/** TEXTO */
function textWrite(){
    //ctx.fillStyle='red';
    //ctx.fillRect(playpanel.position.x, playpanel.position.y, playpanel.width,playpanel.height);

    ctx.fillStyle='white';
    ctx.textAlign="center"; 
    ctx.textBaseline = "middle";
    ctx.font=5*screenSize.multiplier+'px pixelFont';
    //ctx.textAlign='center';
    ctx.fillText('Play', playpanel.position.x+(playpanel.width/2), playpanel.position.y+(playpanel.height/2));
    
}


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
function keysControl(){
    if(keys.left.pressed)player.velocity.x=-3;
    else if (keys.right.pressed) player.velocity.x=3
    else player.velocity.x=0;

    if(keys.down.pressed)player.velocity.y=3;
    else if (keys.up.pressed) player.velocity.y=-3
    else player.velocity.y=0;
}

/**DIBUJO POR PANTALLA */
function animate(){
    requestAnimationFrame(animate)  //Actualiza la pantalla continuamente
    ctx.clearRect(0,0,canvas.width, canvas.height); //Limpia toda la pantalla

    ctx.drawImage(imgBackgroundSpace,border.position.x1,border.position.y1); //Fondo pequeño del espacio
    backgroundstars.update();
    //border.draw();
    //ctx.fillRect(19*screenSize.multiplier, 78*screenSize.multiplier, border.width,19*screenSize.multiplier+border.position.y2);
    //ctx.fillStyle='red'
    //ctx.fillRect(19*screenSize.multiplier, 78*screenSize.multiplier, 32*screenSize.multiplier,19*screenSize.multiplier+border.position.y2);

    player.update();
    playpanel.draw();

    ctx.drawImage(imgTvExt, 0, 0); 
    keysControl();     

    //Detectar las colisiones
    collitionBorder();
    textWrite();

    console.log('go')
}
animate(); 


/*LECTURA DE ENTRADAS (Falta el control para dispositivos moviles) */
window.addEventListener('keydown',({keyCode})=>   //Vemos que tecla se ha pulsado y le ponemos una accion
    {switch(keyCode){
        case 65: keys.left.pressed=true; break;
        case 83: keys.down.pressed=true; break;
        case 68: keys.right.pressed=true; break;
        case 87: keys.up.pressed=true; break;
    }});
window.addEventListener('keyup',({keyCode})=>   //Vemos que tecla se ha pulsado y le ponemos una accion
    {switch(keyCode){
        case 65: keys.left.pressed=false; break;
        case 83: keys.down.pressed=false; break;
        case 68: keys.right.pressed=false; break;
        case 87: keys.up.pressed=false; break;
    }});
/*window.addEventListener('keydown',(keycode)=>   //Permite ver que tecla has pulsado keycode - event
    console.log(event));*/
window.addEventListener("mousemove", function(e) { 
    console.log(e.screenX, e.screenY)
    //var cRect = canvas.getBoundingClientRect(); 
    mousemove.x=e.screenX;
    mousemove.y=e.screenY;
});