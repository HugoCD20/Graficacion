
export class CanvasLocal {
  //atributos
  protected graphics: CanvasRenderingContext2D;
  protected rWidth:number;
  protected rHeight:number;
  protected maxX: number;
  protected maxY: number;
  protected pixelSize: number;
  protected centerX: number;
  protected centerY: number;
  
      
  public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement){
    this.graphics = g;
    this.rWidth = 12;
    this.rHeight= 8;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/12;
    this.centerY = this.maxY/8*7;
  }
  coloresRGB: number[][] = [
    [173, 255, 47],   // Verde limón
    [128, 0, 128],    // Morado
    [0, 0, 255],      // Azul
    [255, 0, 0],      // Rojo
    [255, 255, 0]     // Amarillo
  ];

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number):number{return Math.round(this.centerY - y / this.pixelSize); }
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }
  drawRmboide(x1: number, y1: number, x2: number, y2: number,
  x3:number, y3:number, x4:number, y4:number, color:string) {
  
    // Color de relleno
    this.graphics.fillStyle = color;
    // Comenzamos la ruta de dibujo, o path
    this.graphics.beginPath();
    // Mover a la esquina superior izquierda
    this.graphics.moveTo(x1, y1);
    // Dibujar la línea hacia la derecha
    this.graphics.lineTo(x2, y2);
    // Ahora la que va hacia abajo
    this.graphics.lineTo(x3, y3); // A 80 porque esa es la altura
    // La que va hacia la izquierda
    this.graphics.lineTo(x4, y4);
    // Y dejamos que la última línea la dibuje JS
    this.graphics.closePath();
    // Hacemos que se dibuje
    this.graphics.stroke();
    // Lo rellenamos
    this.graphics.fill();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }

  maxH(h: number[]): number{
    let max = h[0];
    for (let i = 1; i < h.length; i++) {
      if (max < h[i])
        max = h[i];
    }
    //
    let res:number;
    let pot: number = 10;
    //se calcula la potencia de 10 mayor al max para redondear el maximo de la grafica.
    while (pot<max) {
      pot *= 10;
    }
    pot /= 10;
    res = Math.ceil(max / pot) * pot;
    return res;
  }
  porcen(y:number):number{
    if(y>100){
      y=100;
    }
    if(y<0){
      y=0;
    }
    return y*6/100
  }

  coloreado(x:number,y:number):void{
    const z:number=0.5;
    let rgb = this.coloresRGB.pop();
    let r = rgb[0];
    let g = rgb[1];
    let b = rgb[2];
    //colorear arriba
    this.drawRmboide(this.iX(x-z),this.iY(7),this.iX(x),this.iY(6.8+z),this.iX(x+z), this.iY(7), this.iX(x), this.iY(7.2-z),'rgb(159, 159, 159)')
    //colorear abajo
    this.drawRmboide(this.iX(x-z),this.iY(y+0.2-z),this.iX(x),this.iY(y),this.iX(x+z), this.iY(y+0.2-z), this.iX(x), this.iY(y-0.1-z),'rgb('+r+','+ g+',' +b +')')
    this.drawRmboide(this.iX(x-z),this.iY(y+0.2-z), this.iX(x), this.iY(y-0.1-z),this.iX(x), this.iY(0),this.iX(x-z),this.iY(z),'rgb('+r*0.7+','+ g*0.7+',' +b*0.7 +')')
    this.drawRmboide(this.iX(x+z),this.iY(y+0.2-z), this.iX(x), this.iY(y-0.1-z),this.iX(x), this.iY(0),this.iX(x+z),this.iY(z),'rgb('+r/0.7+','+ g/0.7+',' +b/0.7 +')')
    this.drawRmboide(this.iX(x+z),this.iY(7), this.iX(x), this.iY(7.2-z),this.iX(x), this.iY(0),this.iX(x+z),this.iY(z),'rgba('+196*0.8+','+ 196*0.8+',' +196*0.8 +',0.4)')
    this.drawRmboide(
      this.iX(x - z), this.iY(7),
      this.iX(x), this.iY(7.2 - z),
      this.iX(x), this.iY(0),
      this.iX(x - z), this.iY(z),
      'rgba(' + 196 * 0.6 + ',' + 196 * 0.6 + ',' + 196 * 0.6 + ', 0.5)'
    );
    
  }
  
  barra(x:number, y:number):void{
    this.graphics.strokeStyle = 'gray';
    this.graphics.strokeText(y+"%", this.iX(x-0.2), this.iY(7.5));
    y=this.porcen(y);
    this.coloreado(x,y);
    const z:number=0.5;
    this.graphics.strokeStyle = 'black ';

  }


  paint() {
    this.drawLine(this.iX(0), this.iY(0), this.iX(0), this.iY(this.maxX));
    this.drawLine(this.iX(0), this.iY(0), this.iX(this.maxY), this.iY(0));
    let porcentajes=[25,100,50,75,22]
    
    let bandera:number = 0;
    for(let i=1.5; i<9; i+=1.5){
      this.barra(i,porcentajes[bandera])
      bandera++;
    }

  
    
  }

}