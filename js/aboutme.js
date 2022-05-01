class Spider{
    constructor(position, velocity){
        
        this.width=14*screenSize.multiplier
        this.height=10*screenSize.multiplier
        this.position={x:position.x,y:position.y}
        this.image=imgAboutMeSpider
        this.velocity={x:velocity.x,y:velocity.y}
        this.rotation=0
        this.opacity=1
        this.frames=0
        this.maxframes=4
        this.timer=0
        this.dead=false
    }
    draw(){
        if(this.frames!=5){
            if(this.timer<3)
                this.timer++
            else{
                if(this.frames>=this.maxframes)this.frames=0;    //Para reiniciar el sprite 
                else this.frames++
                this.timer=0
            }
        }
        ctx.save();
        ctx.translate(this.position.x+this.width/2, this.position.y+this.height/2);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.translate(-this.position.x-this.width/2, -this.position.y-this.height/2);
        ctx.globalAlpha = this.opacity;
        ctx.drawImage(this.image,
            this.width*this.frames,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.restore();
            //ctx.drawImage(this.image,this.position.x,this.position.y);
        }
    update(){
        if(this.dead){
            this.frames=5
            this.opacity-=0.005
            //console.log(this.opacity)
        }else{
            if(this.position.x+this.velocity.x+this.width>border.position.x+border.width+this.width){
                this.velocity.x=-2
                this.velocity.y=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.x+this.velocity.x<border.position.x-this.width){
                this.velocity.x=2
                this.velocity.y=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.y+this.velocity.y+this.height>border.position.y+border.height+this.height){
                this.velocity.y=-2
                this.velocity.x=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }else if(this.position.y+this.velocity.y<border.position.y-this.height){
                this.velocity.y=2
                this.velocity.x=2*(Math.floor(Math.random() * (2 - (-1))) + -1)
                this.orientation()
            }
            this.position.x+=this.velocity.x
            this.position.y+=this.velocity.y
        }
        this.draw()
        
        //console.log('vel X: ' + this.velocity.x + ', vel Y: ' + this.velocity.y)
        //console.log(Math.floor(Math.random() * (2 - (-1))) + -1)
    }
    orientation(){
        if(this.velocity.x==2 && this.velocity.y==2) this.rotation=315
        else if(this.velocity.x==0 && this.velocity.y==2) this.rotation=0
        else if(this.velocity.x==2 && this.velocity.y==0) this.rotation=270
        else if(this.velocity.x==-2 && this.velocity.y==-2) this.rotation=135
        else if(this.velocity.x==0 && this.velocity.y==-2) this.rotation=180
        else if(this.velocity.x==-2 && this.velocity.y==0) this.rotation=90
        else if(this.velocity.x==-2 && this.velocity.y==2) this.rotation=45
        else if(this.velocity.x==2 && this.velocity.y==-2) this.rotation=225
    }
    frameXPosition(){
        return this.position.x+this.width/2
    }
    frameYPosition(){
        return this.position.y+this.height/2
    }
}
class BookLevel{
    constructor(position, level, text){
        this.position={x:position.x*screenSize.multiplier,y:position.y*screenSize.multiplier}
        this.level=level
        this.text=text
        this.levelposition={x:this.position.x+5*screenSize.multiplier,y:this.position.y-3.5*screenSize.multiplier}
        this.size=4*screenSize.multiplier
        this.font='px pixelFont'
        this.textBaseline="middle"
        this.textAlign="right"
    }
    draw(){
        ctx.textAlign=this.textAlign; 
        ctx.textBaseline = this.textBaseline;
        ctx.font=this.size+this.font;
        ctx.fillStyle='#404040';
        ctx.fillText(this.text, this.position.x, this.position.y);

        ctx.fillStyle='#dfac6a';
        ctx.fillRect(this.levelposition.x, this.levelposition.y+4*screenSize.multiplier, 30*screenSize.multiplier, 1*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x, this.levelposition.y+1*screenSize.multiplier, (this.level*3)*screenSize.multiplier, 1*screenSize.multiplier);

        ctx.fillStyle='#ad7a42';
        ctx.fillRect(this.levelposition.x, this.levelposition.y+2*screenSize.multiplier, (this.level*3)*screenSize.multiplier, 2*screenSize.multiplier);

        ctx.fillStyle='#8c6337';
        ctx.fillRect(this.levelposition.x, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x+30*screenSize.multiplier, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        ctx.fillRect(this.levelposition.x+(this.level*3)*screenSize.multiplier, this.levelposition.y, 1*screenSize.multiplier, 6*screenSize.multiplier);
        
        
    }
}

//Hacer Superclase de IntercativeImage e incluir esta clase como extends
class BookDecoration{
    constructor(position, width, height, image, separation){
        this.position={x:position.x*screenSize.multiplier, y:position.y*screenSize.multiplier}
        this.separation=separation*screenSize.multiplier
        this.image=image
        this.width=width*screenSize.multiplier
        this.height=height*screenSize.multiplier
    }
    draw(){
        ctx.drawImage(imgDecorationBook,
            0,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.drawImage(imgDecorationBook,
            this.width,0,    //Coordenadas de recorte iniciales, multiplicamos el ancho cada vez
            this.width, this.height,    //Coordenadas de recorte finales
            this.position.x+this.separation+this.width, this.position.y,   //Posicion de la imagen en la pantalla
            this.width, this.height);   //Tamaño de la imagen
        ctx.drawImage(this.image,this.position.x+this.width,this.position.y+2*screenSize.multiplier);
    }

}

class Bookpage extends Text{
    constructor(){

    }
}

var spidervelocity=[velocity={x:0,y:2},velocity={x:0,y:-2},velocity={x:2,y:0},velocity={x:-2,y:0}]
var spiderposition=[position={x:Math.floor(border.position.x+border.width/2),y:border.position.y-10*screenSize.multiplier},
                    position={x:Math.floor(border.position.x+border.width/2),y:border.position.y+border.height+10*screenSize.multiplier},
                    position={x:Math.floor(border.position.x-14*screenSize.multiplier),y:border.position.y+border.height/2},
                    position={x:Math.floor(border.position.x+border.width+14*screenSize.multiplier),y:border.position.y+border.height/2}]
//Declarar variables de texto segun idioma                    
var aboutmeTittlesText=[]
var aboutmeCertificateText=[]
var aboutmeCertificateExtendText=[]
var aboutmeTitleDescriptionText=''
if(languaje==0){
    //TITULOS TEXTO
    aboutmeTittlesText=['Sobre Mí', 'Agradecimientos', 'Programación', 'oóuúíiÑñeéáa']
    aboutmeTitleDescriptionText='Lorem ñññ áÁ,É,Í,ÚÓ, é, v¿hhh?v _ v¡fdfdf!v ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. 25'
    aboutmeCertificateText=['Grado Superior: ASIR', 'Administracion de Sistemas Informaticos y Redes',
                            'Grado Superior: DAM', 'Diseno de Aplicaciones Multiplataforma', 
                            'C#', 'Titulo en .NET',
                            'Carrera Universitaria', 'Ingenieria de Software']
    aboutmeCertificateExtendText=[  'Lorem dolor sit consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus ',
                                    'Lorem sit amet, consecteestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna.',
                                    'Lorem amet/n, consectetur elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in ',
                                    'Lorem consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar']
    //SOBRE MI TEXTO

}else if(languaje==1){
    aboutmeTittlesText=['About Me', 'Gratitude', 'Programing','Titles']
    aboutmeTitleDescriptionText='Lorem ipsum dolor sit amet consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. '
    aboutmeCertificateText=['Grado Superior: ASIR', 'Administration of Informatic Sistems and Network',
                            'Grado Superior: DAM', 'Diseno de Aplicaciones Multiplataforma', 
                            'C#', 'Titulo en .NET',
                            'Carrera Universitaria', 'Ingenieria de Software']
    aboutmeCertificateExtendText=[  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. ',
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna.',
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. ',
                            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. ']
}
aboutmeTitleDescriptionText=textConvert(aboutmeTitleDescriptionText,29)
var aboutmeCertificateExtendArray=[]
aboutmeCertificateExtendText.forEach((text)=>{
    aboutmeCertificateExtendArray.push(textConvert(text,29))
})
//var texttest='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum placerat ultricies bibendum. interdum urna vel ipsum convallis, ut maximus augue elementum. Quisque eget cursus ligula, venenatis accumsan lectus. Aliquam massa libero, auctor at neque in, pulvinar faucibus magna. Cras lacus nunc,'



/**CLASE GLOBAL**/
class BookAboutMe{
    constructor(){
        this.section=0  //Seccion del libro, Moverlo con los marcapaginas, titulos, sobremi, nivel programacion, agradecimientos
        this.page=0 // pagina de esa seccion

        this.pagtextright= new Text('', 2.5, '#404040', position={x:156, y:100.5}, 'pixelFont', 'center')
        this.pagtextleft= new Text('', 2.5, '#404040', position={x:29, y:100.5}, 'pixelFont', 'center')
        this.nextpageright= new ImageDraw(position={x:174,y:99},8,8,imgNextPage,0,0,'',5,9)//new AnimatedImage(position={x:174,y:99},8,8,imgNextPage,5,9,0)//new NextPage(position={x:174,y:99},0)
        this.nextpageleft= new ImageDraw(position={x:31,y:99},8,8,imgNextPage,0,1,'',5,9)//new AnimatedImage(position={x:31,y:99},8,8,imgNextPage,5,9,1)//new NextPage(position={x:31,y:99},1)
        //MARCAPAGINAS
        this.markspages=[new ImageDraw(position={x:20,y:46},12,13,imgMarkPage, 1),
                        new ImageDraw(position={x:19,y:60},12,13,imgMarkPage, 0),                        
                        new ImageDraw(position={x:182,y:55},12,13,imgMarkPage, 2),
                        new ImageDraw(position={x:182,y:69},12,13,imgMarkPage, 3)]

    //Seccion TITULOS/DIPLOMAS
        this.maxpages=[0,1,3,2]
        this.numberpages=[2,3,6,5]  //Para mostrar o no el poder pasar pagina
        this.titlestext= new Text('', 12, '#404040', position={x:55, y:31}, 'gothicFont', 'center') //Titulos
        this.titledescrtext= new WriteParagraph(aboutmeTitleDescriptionText,3.5,position={x:42, y:55},30,15,'#404040',4,false)
        this.titlesProf = [ new Text('', 5, '#404040',   position={x:132, y:44}, 'pixelFont', 'center'), 
                            new Text('', 2.5, '#404040', position={x:132, y:48}, 'pixelFont', 'center'),
                            new Text('', 5, '#404040',   position={x:55, y:44}, 'pixelFont', 'center'), 
                            new Text('', 2.5, '#404040', position={x:55, y:48}, 'pixelFont', 'center')]
        this.titlesparagraphs = [new WriteParagraph('',3.5,position={x:119, y:59},30,15,'#404040',4,false),
                                 new WriteParagraph('',3.5,position={x:42, y:59},30,15,'#404040',4,false)]
        this.bookdecorationright = new BookDecoration(position={x:114, y: 30},26,15, imgPaperBook,10)
        this.bookdecorationleft = new BookDecoration(position={x:37, y: 30},26,15, imgPaperBook,10)
    //Seccion NIVEL DE PROGRAMACION
        this.programlevels=[new BookLevel(position={x:137,y:45}, 8, 'MySQL'),
                            new BookLevel(position={x:137,y:53}, 6, 'XAML'),
                            new BookLevel(position={x:137,y:61}, 3, 'Python'),
                            new BookLevel(position={x:137,y:69}, 8, 'C#'),
                            new BookLevel(position={x:137,y:77}, 5, 'PHP'),
                            new BookLevel(position={x:137,y:85}, 8, 'JavaScript'), 
                            new BookLevel(position={x:137,y:93}, 6, 'Java')]
    //Seccion AGRADECIMIENTOS
    //Seccion SOBRE MI
    //Seccion SPIDER     
        this.spidertimer=0
        this.startspider= Math.floor((Math.random()*5000)+1000)
        this.spider=new Spider(spiderposition[Math.floor(Math.random()*4)], spidervelocity[Math.floor(Math.random()*4)])
        this.spidermaxtimer= this.startspider
    }
    draw(){
        //DIBUJAR LIBRO
        ctx.drawImage(imgBgBook,border.position.x,border.position.y);
        //DIBUJAR MARCAPAGINAS
        this.markspages.forEach((mark)=>{
            mark.drawSprite()
        })
        //Ajustar tamaño titulo
        if(this.section==2) this.titlestext.size=9*screenSize.multiplier
        else if(this.section==1) this.titlestext.size=7.5*screenSize.multiplier
        else this.titlestext.size=12*screenSize.multiplier   
        //DIBUJAR PASAR PAGINA
        if(this.page>0)this.nextpageleft.drawAnimatedSprite()
        if(this.page<this.maxpages[this.section])this.nextpageright.drawAnimatedSprite()   
    //Seccion SOBRE MI
        if(this.section==0){
            if(this.page==0){
                ctx.drawImage(imgDecorTitle,37*screenSize.multiplier,39*screenSize.multiplier);
                this.titlestext.text=aboutmeTittlesText[0]
                this.titlestext.draw()
 
                this.pagtextleft.text='1/5'
                this.pagtextright.text='2/5'
            }
        }  
    //Seccion AGRADECIMIENTOS
        else if(this.section==1){
            if(this.page==0){
                ctx.drawImage(imgDecorTitle,37*screenSize.multiplier,39*screenSize.multiplier);
                this.titlestext.text=aboutmeTittlesText[1]
                this.titlestext.draw()
 
                this.pagtextleft.text='1/5'
                this.pagtextright.text='2/5'
            }
        }
    //Seccion NIVELES DE PROGRAMACION
        else if(this.section==2){
            if(this.page==0){
                ctx.drawImage(imgDecorTitle,37*screenSize.multiplier,39*screenSize.multiplier);
                this.titlestext.text=aboutmeTittlesText[2]
                this.titlestext.draw()

                this.programlevels.forEach((level) =>{
                    level.draw()
                })
                this.pagtextleft.text='1/5'
                this.pagtextright.text='2/5'
            }
        }
    //Seccion TITULOS/CERTIFICADOS
        else if(this.section==3){
            if(this.page==0){            
                ctx.drawImage(imgDecorTitle,37*screenSize.multiplier,39*screenSize.multiplier);
                this.titlestext.text=aboutmeTittlesText[3]
                this.titlestext.draw()
                this.titledescrtext.write()

                this.titlesProf[0].text=aboutmeCertificateText[0]
                this.titlesProf[1].text=aboutmeCertificateText[1]
                this.titlesProf[0].draw()
                this.titlesProf[1].draw()
                this.titlesparagraphs[0].textarray=aboutmeCertificateExtendArray[0]
                this.titlesparagraphs[0].write()
                this.bookdecorationright.draw()

                this.pagtextleft.text='1/5'
                this.pagtextright.text='2/5'
            }else if(this.page==1){
                this.bookdecorationright.draw()
                this.bookdecorationleft.draw()
                this.titlesProf[2].text=aboutmeCertificateText[2]
                this.titlesProf[3].text=aboutmeCertificateText[3]
                this.titlesProf[2].draw()
                this.titlesProf[3].draw()
                this.titlesparagraphs[1].textarray=aboutmeCertificateExtendArray[1]
                this.titlesparagraphs[1].write()

                this.titlesProf[0].text=aboutmeCertificateText[4]
                this.titlesProf[1].text=aboutmeCertificateText[5]
                this.titlesProf[0].draw()
                this.titlesProf[1].draw()
                this.titlesparagraphs[0].textarray=aboutmeCertificateExtendArray[2]
                this.titlesparagraphs[0].write()

                this.pagtextleft.text='3/5'
                this.pagtextright.text='4/5'
            }else if(this.page==2){
                this.bookdecorationleft.draw()
                this.titlesProf[2].text=aboutmeCertificateText[6]
                this.titlesProf[3].text=aboutmeCertificateText[7]
                this.titlesProf[2].draw()
                this.titlesProf[3].draw()
                this.titlesparagraphs[1].textarray=aboutmeCertificateExtendArray[3]
                this.titlesparagraphs[1].write()

                this.pagtextleft.text='5/5'
            }
        }
        this.pagtextleft.draw()
        if(this.page*2+2<this.numberpages[this.section])this.pagtextright.draw() 
        //Seccion ARANA
        if(this.startspider<=0){
            if(this.spider.dead==true && this.spider.opacity<=0.01){
                if(this.spidertimer<this.spidermaxtimer){
                    this.spidertimer++
                }else{
                    this.spidertimer=0
                    this.spider=new Spider(spiderposition[Math.floor(Math.random()*4)], spidervelocity[Math.floor(Math.random()*4)])
                    this.spidermaxtimer= Math.floor((Math.random()*5000)+1000)
                }
            }
            if(this.spider.opacity>0.01)
                this.spider.update()
  
                
        }else this.startspider-- 

    }
}