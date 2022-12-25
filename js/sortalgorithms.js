class Program{
    constructor(name){
        this.name=name;
        this.show=true;
        this.minimized=false;
        this.closeButton;
        this.icon = new ImageDraw(position={x:70,y:21}, 15,13, imgPcIcons,0,1)
        this.backGround= new ImageDraw(position={x:19,y:17},174,87, imgPcWindow)

        
    }
}

class SortElement{
    constructor(position, width,  height,value, color){
        this.position={x:position.x, y:position.y}
        this.width=width
        this.value=value
        this.height= height
        this.color = color
    }

    draw(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.position.x, this.position.y+this.height, this.width,-this.height);
    }

    
}


class SortAlgorithms extends Program{
    constructor(name){
        super(name)

        this.sortDisplay= new Border(position={x:30,y:26},110,60)
        this.sortDisplay.lineWidth=sizeConverter(0.3)

        this.arrayLength=100
        this.sortArray= []
        for(var i=0;i<this.arrayLength;i++){
            this.sortArray[i]=new SortElement(i, this.convertWidth, this.convertHeight, i+1, 'red')
        }
        this.randomArray()
       // console.log(this.sortArray)



       this.optionsMenu= new Border(position={x:148,y:26},40,75)
        this.optionsMenu.lineWidth=sizeConverter(0.3)

        

        

        this.iconText= new WriteText(position={x:78,y:36}, 15,13, this.name, 2.5, 'black','bold')
        this.iconText.textalign='center'
        //Hacer el motodo del click para cuando se pulsa el icono
    }

    drawProgram(){
        if(this.show){
            this.backGround.draw()
            //Linea
            this.optionsMenu.fillBorder('#b1c2de');
            this.optionsMenu.drawRectangle();
            this.sortDisplay.fillBorder('#b1c2df');
            this.sortDisplay.drawRectangle();
            
            this.sortArray.forEach((element)=>{
                element.draw()
            })
            
        }else{
            this.icon.drawSprite();
            this.iconText.write()
        }
    }

    showArray(){

    }

    randomArray(){
        var numChanges=100
        var oldPos=0
        var newPos=0
        var oldVal=0
        for(var i=0;i<numChanges;i++){
            oldPos=getRndInteger(0,100)
            newPos=getRndInteger(0,100)
            oldVal=this.sortArray[oldPos]
            this.sortArray[oldPos]=this.sortArray[newPos]
            this.sortArray[newPos]=oldVal
        }
    }

    invertArray(){
        var j=1
        for(var i=this.arrayLength-1; i>=0;i--){
            this.sortArray[i]=j
            j++
        }
    }

    seleccion(){

    }

    insercion(){

    }

    burbuja(){

    }

    combsort(){

    }

    heapsort(){

    }

    convertHeight(){
        return this.sortDisplay.height/this.arrayLength
    }
    convertWidth(){
        return this.sortDisplay.width/this.arrayLength
    }

}