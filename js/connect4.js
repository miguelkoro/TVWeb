class Connect4{
    constructor(){
        //this.col=new array(7)
        this.player=1;
        this.numCol=7; //Numero columnas
        this.numRow=6;  //Numero filas
        this.board= new Array(this.numCol); //Tablero
        this.boardfull= new Array(this.numCol); //Array para indicar si la columna esta llena
        this.boardfull.forEach((column)=>{  //Declaramos todas las columnas como que estan vacias
            column=false;
        })
        for(var i=0;i<this.board.length;i++){   //Inicicializamos eel tablero y le ponemos cada casilla en 0
            this.board[i]=new Array(this.numRow);
            for(var j=0; j<this.board[i].length;j++){
                this.board[i][j]=0;
            }
        }
        /*this.board.forEach((column) =>{
            column.push(new array(6))
            column.forEach((index, row) =>{
                row=0;
                console.log(row+','+ index)
            })
        })*/

    }
    draw(){
        ctx.drawImage(imgConnect4Bg,border.position.x,border.position.y); 
        
        //console.log("Hola");
    }
    putPiece(col){
        //Que no te deje seleccionar una columna que esta llena en script.js
        for(var i=0;i<this.board[col].length;i++){
            if(this.board[col][i]==0){ //Si la celda de la columna esta vacia
                this.board[col][i]=this.player; //Ponemos una ficha del jugador
                if(i==this.board[col].length-1) //Si es la ultima fila ponemos la columna como completa
                    this.boardfull[col]=true;
                return
            }
        }        
    }
    check4Connected(){
        //Horizontal
        //Vertical
        //
    }
}