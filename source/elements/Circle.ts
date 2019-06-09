import Ellipse from './Ellipse.js';


export default class Circle extends Ellipse {

 root: SVGEllipseElement;

 /**
 * Constructs a rectangle element at the position (x,y)
 */
 constructor( cx:number, cy:number, r:number ) {
   super(cx, cy, r, r);
 }

 /**
 * Sets the value of the radius of this circle.
 */
 set r( value:number ) {
   this.rx = value;
   this.rx = value;
 }

 /**
 * Returns the radius of this circle.
 */
 get r():number {
   return this.rx;
 }
}
