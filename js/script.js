var tvinterface= new TvInterface();
var startscreen= new StartScreen();
var bookaboutme = new BookAboutMe();
var spacescreen= new SpaceScreen();



var testtext='Lorem ipsum dolor sit amet consectetur adipiscing elit Sed felis lorem, rhoncus id accumsan id congue et justo. Fusce eget sem mollis';
var dialogtext=new WriteParagraph(textConvert(testtext, 36),6,position={x:64,y:82}, 121,25,'black',7,true) 
var dialog=false  
       



const backgroundstars= new BackgroundStars();


const backgroundPlanets = new BackgroundPlanets();



const keys = {right:{pressed:false},left:{pressed:false},down:{pressed:false},up:{pressed:false},space:{pressed:false}}
const mousemove={x:0, y:0}

/**NPC */
var oldmandialogbar= new AnimatedImage(this.position={x:23,y:77}, 32, 32,imgSpaceOldman,7,10,0)





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
    //Esto podria hacerlo dentro de la clase player, me quitaria la variable timer
    if(stage==1){
        if(timer>15){
            if(keys.space.pressed){
                projectiles.push(new Projectile(position={x:player.position.x+player.width/2, y:player.position.y},velocity={x:10, y:0}, 3, 1))
                timer=0
            }
        }
        timer++
    }
        
    
}

/**FUNCION QUE ME INDIQUE SI EL RATON ESTA EN UNA POSICION*/
function mousePosition(object){
    if(mousemove.x>object.position.x && mousemove.x<object.position.x+object.width
        &&mousemove.y>object.position.y && mousemove.y<object.position.y+object.height) return true
    else return false
}

/**EVENTOS DEL RATON, Movimiento y Click */
function Pointer(click){
    //if(mousePosition(border)){
    //PANTALLA DE INICIO
        if(stage==0){
        //TEXTO DE EMPEZAR
            if(mousePosition(startscreen.start)){
                startscreen.start.size=18*screenSize.multiplier
                if(click==1)startscreen.start.velocity.y=+2;
            }else startscreen.start.size=13*screenSize.multiplier
        }
    //PANTALLA DE SOBRE MI
        else if(stage==100){ 
        //SPIDER
            if(mousePosition(bookaboutme.spider)){  //Poneer que la arana vaya mas rapido si el puntero esta encima
                if(click==1)bookaboutme.spider.dead=true
            }
        //SIGUIENTE/ANTERIOR PAGINA
            if(mousePosition(bookaboutme.nextpageleft)){
                if(click==1 && bookaboutme.page>0)bookaboutme.page--
            }
            if(mousePosition(bookaboutme.nextpageright)){
                if(click==1 && bookaboutme.page<bookaboutme.maxpages[bookaboutme.section])bookaboutme.page++
            }
        //ANIMACION Y EVENTOS MARCAPAGINAS //REVISAR
            bookaboutme.markspages.forEach((mark, index)=>{
                if(mousePosition(mark)){
                    if(index<2)   mark.position.x=20*screenSize.multiplier
                    if(index>1)   mark.position.x=181*screenSize.multiplier
                    if(click==1){
                        bookaboutme.section=index
                        bookaboutme.page=0
                    }
                }else{
                    if(index!=bookaboutme.section){
                        if(index<2)   mark.position.x=19*screenSize.multiplier
                        if(index>1)   mark.position.x=182*screenSize.multiplier
                    }
                }                
            })
        }
    //}
//GENERAL
    //Hacer que solo realice esto cuando el puntero este en la zona de los botones para mas eficiencia
    tvinterface.colortvbuttons.forEach((button, index)=>{
        if(mousePosition(button)){
            if(button.column==2)button.column=0
            else if(button.column==3)button.column=1
            //console.log(tvinterface.tvbulbs[index].row)
            if(click==1){
                if(tvinterface.tvbulbs[index].row==index){  //Si la luz esta apagada
                    tvinterface.tvbulbs[index].row=3
                    button.column=2
                }else{                                      //Si la luz esta encendida
                    tvinterface.tvbulbs[index].row=index
                    button.column=3
                }
                //Que salgan particulas al darle a un boton en la zona de Empezar
                if(stage==0){
                    for(let i=0;i<20;i++){
                        particles.push(
                            new Particle(position={x:startscreen.birds[index].position.x+startscreen.birds[index].width/2,y:startscreen.birds[index].position.y+startscreen.birds[index].height/2}, 
                            Math.random()*screenSize.multiplier*4,
                            velocity={x:(Math.random()-0.5)*2, y:(Math.random()-0.5)*2}, startscreen.colors[index])
                        )
                    }
                }                
            }
        }else{                                              //Se pone el boton como no marcado
            if(button.column==0)button.column=2
            else if(button.column==1)button.column=3
        }
    })    

}


function dialogText(){    
    if(dialog){
        oldmandialogbar.draw()
        ctx.drawImage(imgSpaceDialog, 20*screenSize.multiplier, 73*screenSize.multiplier);
        dialogtext.write();        
    }
}

//#region animatefunction

/**DIBUJO POR PANTALLA */
function animate(){
    requestAnimationFrame(animate)  //Actualiza la pantalla continuamente
    ctx.clearRect(0,0,canvas.width, canvas.height); //Limpia toda la pantalla    
  
    if(stage==0)    //PANTALLA INICIO
        startscreen.draw()//startDraw();
    else if(stage==1) //ESPACIO
        spacescreen.draw()
    else if(stage==100) //SOBRE MI
        bookaboutme.draw() 

    if(stage!=newstage || transitionscreen.transition==true) //TRANSICION
        transitionStages();

    dialogText();//Quitar    
    
    showParticles();    //Poner en las zonas donde se utilice?
        
    keysControl();  //CONTROL EVENTOS TECLADO   

    //Detectar las colisiones del personaje 

    tvinterface.draw()  //TELEVISION
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


window.addEventListener("mousemove", function(e) { 
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    mousemove.x=(e.clientX - rect.left) * scaleX;
    mousemove.y=(e.clientY - rect.top) * scaleY;
    Pointer(0);
});

window.addEventListener("click", function(e) { 
    Pointer(1);
    
});

//#endregion