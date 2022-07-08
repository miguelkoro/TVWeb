class Connect4{
    constructor(){
        this.numCol=7; //Numero columnas
        this.numRow=5;  //Numero filas
        //this.col=new array(7)
        this.boardPosition={x:49*screenSize.multiplier,y:95*screenSize.multiplier};
        //this.SelectColPosition={x:54*screenSize.multiplier,y:20*screenSize.multiplier}
        this.select=true; //Para controlar cuando se puede seleccionar una columna
        this.player=1; //Para indicar el jugador activo

        //Muestra controles y cosas de la izquierda
        this.playerCoin= new ImageDraw(position={x:23,y:34},16,16,imgConnect4Piece) //Para dibujar que jugador esta activo en este momento
        this.playerText= new WriteText(position={x:31,y:43},15,12,'2',15);
        this.turnText= new WriteText(position={x:33,y:29},15,15,'Player',6,'white')

        //Muestra avisos de ganador o empate
        this.textbg= new ImageDraw(position={x:55,y:35},109,56,imgConnect4TextBg)
        this.resetButton= new ImageDraw(position={x:23,y:85},18,18,imgConnect4Reset)
        this.resetText = new WriteText(position={x:32,y:80},15,15,'Reset',6,'white')
        this.winner=0;
        this.tie=false;
        this.tieText= new WriteText(position={x:110,y:70},15,12,'Empate',16,'white');
        this.winnerText= new WriteText(position={x:110,y:58},15,12,'Ganador:',14,'white');
        this.winnerPlayerText= new WriteText(position={x:110,y:78},15,12,'',10,'white');
        

        this.piece= new ImageDraw(position={x:50,y:50},16,16,imgConnect4Piece) //Imagen de la ficha
        this.selectedCol = new ImageDraw(position={x:0,y:0},20,96,imgConnect4SelectedCol) //Recuadro de columna seleccionada
        //this.columnBorder = new Array(this.numCol); //Recuadros de cada columna para ver su posicion
        this.columnSelected= new Array(this.numCol); //Para saber si una columna esta siendo seleccionada
        this.boardfull= new Array(this.numCol); //Array para indicar si la columna esta llena
        this.board= new Array(this.numCol); //Tablero
        for(var i=0;i<this.numCol;i++){
            this.columnSelected[i]=new Array(2)
            this.columnSelected[i][0]=new Border(position={x:47+i*20,y:17},20,96)
            this.columnSelected[i][1]=false 

            this.boardfull[i]=0; //Declaramos todas las columnas como que estan vacias

            //Inicicializamos eel tablero y le ponemos cada casilla en 0
            this.board[i]=new Array(this.numRow);
            for(var j=0; j<this.numRow;j++){
                this.board[i][j]=0;
            }
        }

        this.pieceSpacecol = 4* screenSize.multiplier; //Espacio entre fichas
        this.pieceSpacerow = 3* screenSize.multiplier; //Espacio entre fichas
        
       // this.board[0][0]=1;
       // this.board[0][1]=1;
       // this.board[0][4]=2;
      
    }
    draw(){
        ctx.drawImage(imgConnect4Bg,border.position.x,border.position.y); 

        //Dibuja cosas de la barra de la izquierda
        this.playerCoin.row=this.player-1
        this.playerCoin.drawSprite() //Dibuja la moneda del jugador para indicar el turno
        this.playerText.text=this.player;
        this.playerText.write();
        this.turnText.write()
        this.resetButton.drawSprite();
        this.resetText.write()



        for(var i=0;i<this.numCol;i++){ //Dibujamos cada ficha
            for(var j=0; j<this.numRow;j++){
                if(this.board[i][j]!=0){
                    this.piece.position=position={x:this.boardPosition.x+this.piece.width*i+this.pieceSpacecol*i,
                                                y:this.boardPosition.y-this.piece.height*j-this.pieceSpacerow*j};
                    this.piece.row=this.board[i][j]-1; //Le ponemos la ficha del jugador
                    this.piece.drawSprite();
                }             
            }
            //Si una columna esta siendo seleccionada la mostramos el recuadro
            if(this.columnSelected[i][1]){ //Si esta siendo seleccionada mostramos la seleccion
                this.selectedCol.column=this.player-1 //Elegimos quien selecciona
                this.selectedCol.position=this.columnSelected[i][0].position; //Le ponemos la posicion que le corresponde
                this.selectedCol.drawSprite()
            }
        }
        
        //console.log(this.columnSelected)
        //Dibuja la pantalla de ganador o empate
        if(this.winner!=0){
            this.textbg.draw();
           
            this.winnerPlayerText.text='Jugador '+this.player;
            if(this.winner==1)this.winnerPlayerText.fontcolor='#d9d141'; else this.winnerPlayerText.fontcolor='#ed6868'
            this.winnerPlayerText.write()
            this.winnerText.write()
            //this.playAgainText.write()            
        }
        if(this.tie){
            this.textbg.draw();
            this.tieText.write()
        }

    }
    putPiece(col){
        //Que no te deje seleccionar una columna que esta llena en script.js
        this.board[col][this.boardfull[col]]=this.player //En la columna elegida en la fila que esta libre se añade el jugador
        //console.log(this.boardfull[col])
        this.boardfull[col]++;
        
        if(this.check4Connected(col, this.boardfull[col]-1)){ //Si hay 4 en raya pantalla de ganador
            //console.log('El jugador: ' + this.player + ' ha hecho 4 en raya!')
            this.winner=this.player;
            //Desmarca la seleccion
            this.select=false;
            for(var i=0;i<this.numCol;i++){ 
                this.columnSelected[i][1]=false;
            }
           
        }else{
            if(this.player==1){
                this.player=2
            }else{
                this.player=1
            }   
        }

        //Comprobamos que no este ya el tablero completo
        var complete=0
        for(var i=0;i<this.numCol;i++){
            if(this.boardfull[i]==this.numRow)complete++;
        }
        if(complete==this.numCol){
            this.tie=true;
            console.log('Empate')
            //Desmarca la seleccion
            this.select=false;
            for(var i=0;i<this.numCol;i++){ 
                this.columnSelected[i][1]=false;
            }
        }
    }
    check4Connected(col,row){
        var connected=0;
        //Horizontal
        for(var i=0; i<this.numCol;i++){
            if(this.board[i][row]==this.player){
                connected++;
                if(connected==4)return true;
            }else{
                connected=0;
            }
        }

        //Vertical
        connected=0;
        for(var j=0; j<this.numRow;j++){
            if(this.board[col][j]==this.player){
                connected++;
                if(connected==4)return true;
            }else{
                connected=0;
            }
        }


        //Diagonal Abajo hacia arriba /
        //console.log(col+' '+ row + ', ')
        if(col<=row){ //Si el numero de columna es menor que el de la fila
            var tempcolumn=0
            connected=0
            for(var i=row-col;i<this.numRow;i++){
                //console.log(column+' '+ i + ', ')
                if(this.board[tempcolumn][i]==this.player){
                    connected++;
                    if(connected==4)return true
                }else{
                    connected=0;
                }
                tempcolumn++;
            }    
        }else{
            var temprow=0;
            connected=0
            for(var i=col-row;i<this.numCol;i++){
                //console.log(i+' '+ row + ', ')
                if(this.board[i][temprow]==this.player){
                    connected++;
                    if(connected==4)return true
                    
                }else{ connected=0}
                temprow++;
            }
        }
        //Diagonal arriba hacia abajo \
        if(row+col>=this.numCol){ //34-61
            var tempcol=this.numCol-1;
            connected=0
            for(var i=row-(this.numCol-1-col);i<this.numRow;i++){ //Controlamos las filas
                if(this.board[tempcol][i]==this.player){
                    connected++;
                    if(connected==4)return true
                    
                }else{ connected=0}
                tempcol--;
            }

        }else if(row+col<this.numRow){ //04-40
            //console.log('5')
            var tempcol=0;
            connected=0
            for(var i=col+row; i>=0; i--){
                if(this.board[tempcol][i]==this.player){
                    connected++;
                    if(connected==4)return true
                    
                }else{ connected=0}
                tempcol++;
            }
        }else{ //Manejamos las filas
            var tempcol=col+row;
            connected=0;
            for(var i=0;i<this.numRow;i++){
                if(this.board[tempcol][i]==this.player){
                    connected++;
                    if(connected==4)return true
                    
                }else{ connected=0}
                tempcol--;
            }

        }
        //console.log(col+' '+ row + ', ')
       
    }
    reset(){
        //Reseteamos el tablero
        for(var i=0;i<this.numCol;i++){
            for(var j=0; j<this.numRow;j++){
                this.board[i][j]=0;
            }
            this.boardfull[i]=0;
            this.columnSelected[i][1]=false;
        }
        this.winner=0;
        this.select=true;
        this.tie=false;
        this.player=1
    }
    
}