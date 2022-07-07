class Connect4{
    constructor(){
        this.numCol=7; //Numero columnas
        this.numRow=5;  //Numero filas
        //this.col=new array(7)
        this.boardPosition={x:55*screenSize.multiplier,y:95*screenSize.multiplier};
        //this.SelectColPosition={x:54*screenSize.multiplier,y:20*screenSize.multiplier}
        this.select=true; //Para controlar cuando se puede seleccionar una columna
        this.player=1; //Para indicar el jugador activo
        this.piece= new ImageDraw(position={x:50,y:50},16,16,imgConnect4Piece) //Imagen de la ficha
        this.selectedCol = new ImageDraw(position={x:0,y:0},20,96,imgConnect4SelectedCol) //Recuadro de columna seleccionada
        //this.columnBorder = new Array(this.numCol); //Recuadros de cada columna para ver su posicion
        this.columnSelected= new Array(this.numCol); //Para saber si una columna esta siendo seleccionada
        this.boardfull= new Array(this.numCol); //Array para indicar si la columna esta llena
        this.board= new Array(this.numCol); //Tablero
        for(var i=0;i<this.numCol;i++){
            this.columnSelected[i]=new Array(2)
            this.columnSelected[i][0]=new Border(position={x:53+i*19,y:17},20,96)
            this.columnSelected[i][1]=false 

            this.boardfull[i]=0; //Declaramos todas las columnas como que estan vacias

            //Inicicializamos eel tablero y le ponemos cada casilla en 0
            this.board[i]=new Array(this.numRow);
            for(var j=0; j<this.numRow;j++){
                this.board[i][j]=0;
            }
        }

        this.pieceSpace = 3* screenSize.multiplier; //Espacio entre fichas
        
       // this.board[0][0]=1;
       // this.board[0][1]=1;
       // this.board[0][4]=2;
      
    }
    draw(){
        ctx.drawImage(imgConnect4Bg,border.position.x,border.position.y); 
        for(var i=0;i<this.numCol;i++){ //Dibujamos cada ficha
            for(var j=0; j<this.numRow;j++){
                if(this.board[i][j]!=0){
                    this.piece.position=position={x:this.boardPosition.x+this.piece.width*i+this.pieceSpace*i,y:this.boardPosition.y-this.piece.height*j-this.pieceSpace*j};
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

    }
    putPiece(col){
        //Que no te deje seleccionar una columna que esta llena en script.js
        this.board[col][this.boardfull[col]]=this.player //En la columna elegida en la fila que esta libre se añade el jugador
        console.log(this.boardfull[col])
        this.boardfull[col]++;
        
        /*if(this.check4Connected(col, this.boardfull[col]-1)){ //Si hay 4 en raya pantalla de ganador

        }    */  
    }
    check4Connected(col,row){
        var connected=0;
        //Horizontal
        for(var i=0; i<this.numCol;i++){
            if(this.board[i][row]==this.player){
                connected++;
                if(connected==3)return true;
            }else{
                connected=0;
            }
        }
        //Vertical
        //Diagonal


    }
}