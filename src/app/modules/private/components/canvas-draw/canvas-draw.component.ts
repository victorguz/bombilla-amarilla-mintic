import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-canvas-draw',
  templateUrl: './canvas-draw.component.html',
  styleUrls: ['./canvas-draw.component.scss'],
})
export class CanvasDrawComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvasRef') canvasRef!: ElementRef;
  @Input() height: number | string = '100%';
  @Input() width: number | string = '100%';
  @Input() resetOnChange!: number;

  canvas!: HTMLCanvasElement;
  context!: CanvasRenderingContext2D;
  points: any[] = [];
  isMouseDown: boolean = false;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove = (evt: any) => {
    if (this.isDragging(evt)) {
      this.write({ x: evt.clientX, y: evt.clientY });
    } else {
      this.mouseUp();
    }
  };

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.render();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.onReset();
  }

  render() {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d')!;

    // Configuracion de linea dibujada
    this.context.lineWidth = 3; //grosor
    this.context.lineCap = 'round'; //bordes redondeados
    this.context.strokeStyle = 'blue'; //color
  }

  write(coord) {
    const canvasEl: HTMLCanvasElement = this.canvasRef.nativeElement;
    const rect = canvasEl.getBoundingClientRect();
    const prevPosition = {
      x: coord.x - rect.left,
      y: coord.y - rect.top,
    };
    this.writeSingle(prevPosition);
  }

  private writeSingle(prevPos) {
    this.points.push(prevPos);
    if (this.points.length > 3) {
      const prevPosition = this.points[this.points.length - 1];
      const currentPosition = this.points[this.points.length - 2];

      this.drawOnCanvas(prevPosition, currentPosition);
    }
  }

  private drawOnCanvas(prevPos: any, currentPosition: any) {
    if (!this.context) throw new Error('No existe el contexto');
    this.context.beginPath();

    if (prevPos) {
      this.context.moveTo(prevPos.x, prevPos.y);
      this.context.lineTo(currentPosition.x, currentPosition.y);
      this.context.stroke();
    }
  }

  isDragging(evt: any) {
    return evt.target.id == 'canvasId' && this.isMouseDown;
  }

  mouseDown() {
    this.isMouseDown = true;
  }

  mouseUp() {
    this.isMouseDown = false;
    this.points = []; //limpia los puntos para empezar un nuevo trazo
  }

  onReset() {
    if (this.context) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}
