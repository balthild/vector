import SVG from '../SVG.js';
import Element from './Element.js';

/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Element {

  // make the type of the root to be more specific
  root:SVGPathElement;

  /**
  * Construct a new path element with a string of commands.
  */
  constructor( d:string ) {
    super();
    this.root = SVG.Path(d);
    this.root.classList.add('default');
    this.root.id = this.id;
  }

  /**
  * Returns the d attribute
  */
  get d():string {
    return this.root.getAttribute('d');
  }

  /**
  * Sets the d attribute
  */
  set d( d:string ) {
    this.root.setAttribute('d', d);
  }
}
