import SVG from './SVG.js';
import Control from './elements/Control.js';
import Ellipse from './elements/Ellipse.js';
import Path from './elements/Path.js';
import Circle from './elements/Circle.js';
import Text from './elements/Text.js';

/**
* This class exposes the high level functionality of our library. Elements can
* created and related together.
*/
export default class Interactive  {

  /**
  * The container element for this interactive.
  */
  root:HTMLElement;

  /**
  * The main svg that elements are created within
  */
  svg:SVGElement;

  /**
  * The controls groups sits on top of the background group and ensures that
  * control elements will always visually appear above background elements.
  */
  private controls:SVGGElement;

  /**
  * The background is where everything that is not a primary control is drawn.
  */
  private background:SVGGElement;

  // internal variables
  private _width:number = 0;
  private _height:number = 0;
  private _originX:number = 0;
  private _originY:number = 0;

  /**
  * Constructs a new interactive object within the HTML element corresponding
  * to the id. If no element is found throws an error.
  */
  constructor( id:string ) {

    // store a reference to the container element
    this.root = document.getElementById(id);
    this.root.classList.add('interactive');

    // create and append the svg elements
    this.svg = this.root.appendChild(SVG.SVG(id));
    this.background = this.svg.appendChild(SVG.Group());
    this.controls = this.svg.appendChild(SVG.Group());

    // default configuration
    this.width = 600;
    this.height = 300;
    this.window = true;
  }

  /**
  * Sets the width of this interactive area.
  */
  set width( value:number ){
    this._width = value;
    this.svg.setAttribute('width', value.toString());
  }

  /**
  * Returns the width of this interactive area.
  */
  get width():number {
    return this._width;
  }

  /**
  * Sets the height of this interactive area.
  */
  set height( value:number ){
    this._height = value;
    this.svg.setAttribute('height', value.toString());
  }

  /**
  * Returns the height of this interactive area.
  */
  get height():number {
    return this._height;
  }

  /**
  * Sets the x coordinate of the origin.
  */
  set originX( value:number) {
    this._originX = value;
    this.setViewBox( this.minX, this.minY, this.width, this.height);
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originX():number {
    return this._originX;
  }

  /**
  * Sets the y coordinate of the origin.
  */
  set originY( value:number) {
    this._originY = value;
    this.setViewBox( this.minX, this.minY, this.width, this.height);
  }

  /**
  * Returns the value of the x-coordinate of the origin.
  */
  get originY():number {
    return this._originY;
  }

  /**
  * If set to true, styles the interactive to float on top of the background.
  * This feature is good for interactives where elements can be dragged out of
  * the bounds of the container element.
  */
  set window( value:boolean ) {
    if( value ){
      this.svg.classList.add('window');
    } else {
      this.svg.classList.remove('window');
    }
  }

  // TODO: yikes that didn't work as expected
  // set flipCoordinateSystem( value:boolean ) {
  //   if( value ) {
  //     this.svg.style.transform = 'scale(1,-1)';
  //   } else {
  //     this.svg.style.transform = '';
  //   }
  // }

  /**
  * Returns the minimum x-coordinate of this interactive.
  */
  get minX() : number {
    return this.originX - this.width;
  }

  /**
  * Returns the minimum y-coordinate of this interactive.
  */
  get minY() : number {
    return this.originY - this.height;
  }

  // TODO: look into css transform-origin
  setViewBox( minX:number, minY:number, width:number, height:number ) {
    this.svg.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
  }

  path( d: string ): Path {
    let path = new Path(d);
    this.background.appendChild(path.root);
    return path;
  }

  ellipse( cx:number, cy:number, rx:number, ry:number) : Ellipse {
    let ellipse = new Ellipse( cx, cy, rx, ry);
    this.background.appendChild(ellipse.root);
    return ellipse;
  }

  circle( cx:number, cy:number, r:number) : Circle {
    let circle = new Circle( cx, cy, r);
    this.background.appendChild(circle.root);
    return circle;
  }

  control( x:number, y:number ) : Control {
    let control = new Control( x, y);
    this.controls.appendChild(control.root);
    return control;
  }

  text( x:number, y:number, contents:string ) : Text {
    let text = new Text( x, y, contents);
    this.background.appendChild(text.root);
    return text;
  }
}
