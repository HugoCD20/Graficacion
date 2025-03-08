
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
    this.rWidth = 6;
    this.rHeight= 4;
    this.maxX = canvas.width - 1
    this.maxY = canvas.height - 1;
    this.pixelSize = Math.max(this.rWidth / this.maxX, this.rHeight / this.maxY);
    this.centerX = this.maxX/2;
    this.centerY = this.maxY/2;
  }

  iX(x: number):number{return Math.round(this.centerX + x/this.pixelSize);}
  iY(y: number): number{ return Math.round(this.centerY - y / this.pixelSize); }
  
  drawLine(x1: number, y1: number, x2: number, y2:number) {
    this.graphics.beginPath();
    this.graphics.moveTo(x1, y1);
    this.graphics.lineTo(x2, y2);
    this.graphics.closePath();
    this.graphics.stroke();
  }

  fx(x:number):number {
    return Math.sin(x*2.5);
  }
//640x480

  paint() {
    this.drawLine(240, 160, 400, 160); 
    this.drawLine(400, 160, 400, 320); 
    this.drawLine(240, 320, 400, 320);
    this.drawLine(240, 160, 240, 320); 
    
    /*this.drawLine(245, 160, 400, 165); 
    this.drawLine(400, 165, 395, 320); 
    this.drawLine(240, 315, 395, 320); 
    this.drawLine(245, 160, 240, 315); */
    let xA=240;
    let yA=160;
    let xB=400;
    let yB=160;
    let xC=400;
    let yC=320;
    let xD=240;
    let yD=320;
    const n=5;

    for (let m = 0; m < 17; m++){
      xA+=n; yA+=n;
      xB-=n; yB+=n;
      xC-=n; yC-=n;
      xD+=n; yD-=n;
      this.drawLine(xA, 160, 400, yA); 
      this.drawLine(400, yB, xB, 320); 
      this.drawLine(240, yC, xC, 320); 
      this.drawLine(xD, 160, 240, yD); 
    }
    
  }

}