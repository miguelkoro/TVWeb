class Program{
    constructor(name){
        this.name=name;
        this.show=true;
        this.minimized=false;
        this.closeButton;
        this.icon = new ImageDraw(position={x:70,y:21}, 15,13, imgPcIcons,0,1)
        this.backGround= new ImageDraw(position={x:19,y:17},174,87, imgPcWindow)
        this.optionsMenu= new Border(position={x:150,y:26},40,75)
        this.optionsMenu.lineWidth=sizeConverter(0.2)

        this.iconText= new WriteText(position={x:78,y:36}, 15,13, this.name, 2.5, 'black','bold')
        this.iconText.textalign='center'
        //Hacer el motodo del click para cuando se pulsa el icono
    }
}

class SortAlgorithms extends Program{
    constructor(name){
        super(name)

    }

    drawProgram(){
        if(this.show){
            this.backGround.draw()
            //Linea
            this.optionsMenu.drawRectangle();
        }else{
            this.icon.drawSprite();
            this.iconText.write()
        }
    }

    showArray(){

    }

    createArray(){

    }

    seleccion(){

    }

    inserccion(){

    }

    burbuja(){

    }

    combsort(){

    }

    heapsort(){

    }

}