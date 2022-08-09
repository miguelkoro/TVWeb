var tvinterface= new TvInterface();
var pcinterface = new PcInterface();
var startscreen= new StartScreen();
var arcade = new Arcade();
var bookaboutme = new BookAboutMe();
var spacescreen= new SpaceScreen();
var connect4 = new Connect4();

function hashGet(){
    switch(location.hash){
        case '#Arcade': newstage=2; stage=2; state=0; break;
        case '#SobreMi': newstage=100; stage=100; state=0; break;
        case '#Connected4': newstage=101; stage=101; state=0; break;
        case '#Space': newstage=1; stage=1; state=0; break;
        case '#Start': newstage=0; stage=0; state=0; break;
        case '#Pc': newstage=0; stage=0; state=1; break;
    }
    //console.log(location.hash)
}
hashGet();
function hashSet(){
    if(state==0){
        switch(stage){
            case 2: location.hash='#Arcade'; break;
            case 100: location.hash='SobreMi'; break;
            case 101: location.hash='Connected4'; break;
            case 1: location.hash='Space'; break;
            case 0: location.hash='Start'; break;
        }
    }else if(state==1){
        location.hash='Pc'
    }
    //console.log(location.hash)
}
hashSet();

var testtext='Lorem ipsum dolor sit amet consectetur adipiscing elit Sed felis lorem, rhoncus id accumsan id congue et justo. Fusce eget sem mollis';
var dialogtext=new WriteParagraph(textConvert(testtext, 36),6,position={x:64,y:82}, 121,25,'black',7,true) 
var dialog=false  
var colors=[true,true,true]; //Azul, Rojo, Amarillo
var stringcolors=['#292929','#274bd9','#ac3232','#ccc42d','#826fb3','#85c341','#f2a01f','#ffffff']  //Negro, Azul, Rojo, Amarillo, Morado, Verde, Naranja, Dorado?
var displaycolor=7;

function changeColor(){
    if(colors[0] && colors[1] && colors[2]){ //Estan todos los colores activados
        displaycolor=7
        //Color Dorado??
    }else if(colors[0] && colors[1]){ //Morado
        displaycolor=4
    }else if(colors[0] && colors[2]){ //Verde
        displaycolor=5
    }else if(colors[1] && colors[2]){ //Naranja
        displaycolor=6
    }else if(colors[0]){ //Azul
        displaycolor=1
    }else if(colors[1]){ //Rojo
        displaycolor=2
    }else if(colors[2]) { //Amarillo
        displaycolor=3
    }else{ //Negro
        displaycolor=0
    }
    //console.log(displaycolor)
}
changeColor()

/* VARIABLES PARA SONIDO
audio.pause();
audio.currentTime = 0;
audio.play();  
*/

/**NPC */
//var oldmandialogbar= new AnimatedImage(this.position={x:23,y:77}, 32, 32,imgSpaceOldman,7,10,0)


/**FUNCION QUE ME INDIQUE SI EL RATON ESTA EN UNA POSICION*/
function mousePosition(object){
    if(mousemove.x>object.position.x && mousemove.x<object.position.x+object.width
        &&mousemove.y>object.position.y && mousemove.y<object.position.y+object.height) return true
    else return false
}

/**EVENTOS DEL RATON, Movimiento y Click */
function tvClickEvents(click){
    if(mousePosition(border)){
        
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
            //PANTALLA ARCADE
            else if(stage==2){
                //Flechas de cambiar de sala
                if(mousePosition(arcade.arrowLeft)) arcade.arrowLeft.column=1
                else arcade.arrowLeft.column=0
                if(mousePosition(arcade.arrowRight)) arcade.arrowRight.column=1
                else arcade.arrowRight.column=0
                //Funcion de cada recreativa
                arcade.machines.forEach((machine,index)=>{
                    if(mousePosition(machine)){
                        if(index==0){
                            if(click==1){
                                connect4.select=false;
                                newstage=101
                                //Reset del 4 en raya, modo elegir jugador
                                
                                connect4.selectMode=true;
                                connect4.mode=0
                                connect4.reset()
                                
                            }
                        }
                    }
                })
                
            }
            // PANTALLA 4 EN RAYA
            else if(stage == 101){
                if (connect4.select){//Si esta permitido seleccionar
                    connect4.columnSelected.forEach((col,i)=>{
                        if(mousePosition(col[0])  && connect4.boardfull[i]<connect4.numRow){
                            col[1]=true;
                            if(click==1){
                                connect4.putPiece(i)
                                //console.log(i)
                            }
                        }else{
                            col[1]=false;
                        }
                    })
                }
                if(connect4.selectMode){ //Seleccion de modo de juego
                    if(mousePosition(connect4.twoplayer)){
                        if(click==1){
                            connect4.mode=1
                            connect4.selectMode=false
                            connect4.select=true;

                        }
                        connect4.twoplayer.column=1
                    }else{
                         connect4.twoplayer.column=0   
                    }
                    if(mousePosition(connect4.playervscpu)){
                        if(click==1){
                            connect4.mode=2
                            connect4.selectMode=false
                            connect4.select=true;
                        }
                        connect4.playervscpu.column=1
                    }else{
                         connect4.playervscpu.column=0   
                    }
                    
                }
                //Boton de reset
                if(mousePosition(connect4.resetButton)){
                    connect4.resetButton.column=1
                    if(click==1){
                        connect4.reset();
                    }
                }else{
                    connect4.resetButton.column=0
                }
                
            }
        }
    //GENERAL
        //Hacer que solo realice esto cuando el puntero este en la zona de los botones para mas eficiencia
        if(mousePosition(controlerborder)){
            //console.log('controlador')
            tvinterface.colortvbuttons.forEach((button, index)=>{
                if(mousePosition(button)){
                    if(button.column==2)button.column=0
                    else if(button.column==3)button.column=1
                    //console.log(tvinterface.tvbulbs[index].row)
                    if(click==1){
                        if(colors[index])colors[index]=false
                        else colors[index]=true

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
                        //cambio de color pricipal
                        changeColor()                
                    }
                }else{                                              //Se pone el boton como no marcado
                    if(button.column==0)button.column=2
                    else if(button.column==1)button.column=3
                }
            })
            tvinterface.downtvbutton.forEach((button, index)=>{
                if(mousePosition(button)){
                    //Poner aqui el que se remarquen los botones
                    if(button.column==0)button.column=2
                    else if(button.column==1)button.column=3
    
                    if(click==1){
                        if(index==0){   //Boton play/pause
                            newstage=0
                            button.column=1
                            tvinterface.downtvbutton[1].column=0
                            tvinterface.downtvbutton[2].column=0
                        }else if(index==1){ //Boton Sobre Mi
                            newstage=100
                            button.column=1
                            tvinterface.downtvbutton[0].column=0
                            tvinterface.downtvbutton[2].column=0
                        }else if(index==2){ //Boton Minijuegos
                            newstage=2
                            button.column=1
                            tvinterface.downtvbutton[0].column=0
                            tvinterface.downtvbutton[1].column=0
                        }else if(index==5){ // Boton Silenciar
                            if(button.column==0){
                                button.column=1
                                mute=false
                            }else{
                                button.column=0
                                mute=true
                            }
                        }else if(index==4){
                            /*if(button.column==1 || button.column==3){showgrid=false; button.column=0
                            }else{ showgrid=true; button.column=1 }*/
                            //button.column=0
                            document.body.style.backgroundColor = "#eae9e4";
                            state=1
                        }
                        
                    }
                }else{
                    if(button.column==2)button.column=0
                    else if(button.column==3)button.column=1
                }
            })
        }   
}

function pcClickEvents(click) {
    //PANTALLA
    if (mousePosition(border)) {
        if (mousePosition(pcinterface.startbutton)) {
            if (click == 1) {
                if (pcinterface.toolbar.row == 0){
                    pcinterface.toolbar.row = 1
                    //pcinterface.toolbar.toBlackAndWhite() //Poner blanco y negro
                    pcinterface.showtoolbarscreen=true
                }else{
                    pcinterface.toolbar.row = 0
                    pcinterface.showtoolbarscreen=false
                }
            }
        }
        
    }
    //PANEL CONTROL
    if (mousePosition(controlerpcborder)) {
        //console.log('Activo')
        //BOTON APAGADO
        if (mousePosition(pcinterface.button)) {            
            if (click == 1) {
                document.body.style.backgroundColor = "#733f29";
                state = 0                
            }
        }
        //Controlador ondas
        else if(mousePosition(pcinterface.pcwavebars[0].pointer)){  //amplitud ondas
            if(mousemove.mouseDown){
                pcinterface.pcwavebars[0].move()
                pcinterface.wave.amplitude=pcinterface.pcwavebars[0].value
            }
        }else if(mousePosition(pcinterface.pcwavebars[1].pointer)){ //longitud ondas
            if(mousemove.mouseDown){
                pcinterface.pcwavebars[1].move()
                pcinterface.wave.lenght=pcinterface.pcwavebars[1].value
                //console.log('fff')
            }
            //console.log('aaa')
        }else if(mousePosition(pcinterface.pcwavebars[2].pointer)){ //frecuencia ondas
            if(mousemove.mouseDown){
                pcinterface.pcwavebars[2].move()
                pcinterface.wave.frequency=pcinterface.pcwavebars[2].value
                //console.log('fff')
            }
            //console.log('aaa')
        }         
    }
}

function Pointer(click){
    if (state == 0) tvClickEvents(click)
    else if (state == 1) pcClickEvents(click)
}


function dialogText(){    
    if(dialog){
        oldmandialogbar.draw()
        ctx.drawImage(imgSpaceDialog, 20*screenSize.multiplier, 73*screenSize.multiplier);
        dialogtext.write();        
    }
}

//#region animatefunction

/**DIBUJO TV POR PANTALLA */
function showTV(){
    if(stage==0)    //PANTALLA INICIO
        startscreen.draw()//startDraw();
    else if(stage==1) //ESPACIO
        spacescreen.draw()
    else if(stage==2)
        arcade.draw()
    else if(stage==100) //SOBRE MI
        bookaboutme.draw() 
    else if(stage==101)
        connect4.draw() //MINIJUEGO 4 EN RAYA
    if(newstage!=stage || onstagetransition) //TRANSICION
        transitionStages();

    showParticles();    //Poner en las zonas donde se utilice?


    tvinterface.draw()  //TELEVISION
    if(showgrid){
        controlerborder.drawGrid('Red')
        border.drawGrid('Blue')
        startscreen.birds.forEach((bird)=>{
            bird.drawGrid()
        })
        transitionscreen.forEach((screen)=>{
            screen.drawAnimatedSprite()
        })
    }
}

function showPC(){
    pcinterface.draw()
}

function animate(){
    requestAnimationFrame(animate)  //Actualiza la pantalla continuamente
    ctx.clearRect(0,0,canvas.width, canvas.height); //Limpia toda la pantalla    
  
    if(state==0) showTV();
    else if(state==1) showPC();
    //controlerpcborder.drawGrid()
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
            case 'A':
            case 'ArrowLeft':   keys.left.pressed=true;
                break;
            case 's':
            case 'S': 
            case 'ArrowDown':keys.down.pressed=true; 
                break;
            case 'd':
            case 'D': 
            case 'ArrowRight':keys.right.pressed=true; 
                break;
            case 'w':
            case 'W':
            case 'ArrowUp': keys.up.pressed=true; 
                break;
            case ' ': keys.space.pressed=true; 
                break;
            
        }
    });
window.addEventListener('keyup',({key})=>   //Vemos que tecla se ha pulsado y le ponemos una accion
    {switch(key){
        case 'a': 
        case 'A':
        case 'ArrowLeft':   keys.left.pressed=false;
            break;
        case 's': 
        case 'S': 
        case 'ArrowDown':keys.down.pressed=false; 
            break;
        case 'd': 
        case 'D': 
        case 'ArrowRight':keys.right.pressed=false; 
            break;
        case 'w': 
        case 'W':
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

window.addEventListener('mousedown', function(e){
   // getCursorPosition(canvas,e)
    mousemove.mouseDown=true
})
window.addEventListener('mouseup', function(e){
    mousemove.mouseDown=false
})
function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect() // abs. size of element
   
    mousemove.x = event.clientX - rect.left
    mousemove.y = event.clientY - rect.top
}
window.addEventListener('touchstart', function(e){
    mousemove.mouseDown=true
    
      
    
    console.log('start: '+mousemove.x + mousemove.y)
})
window.addEventListener('touchend', function(e){
    mousemove.mouseDown=false
    console.log('stop')
})
window.addEventListener('touchmove', function(e){
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y
    mousemove.x=(e.clientX - rect.left) * scaleX;
    mousemove.y=(e.clientY - rect.top) * scaleY;
    Pointer(0);
})
//#endregion