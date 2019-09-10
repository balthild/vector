import SVG from '../SVG.js';
import Element from './Element.js';
/**
* A path element allows for the creation of complicated shapes and curves.
*/
export default class Path extends Element {
    /**
    * Construct a new path element with a string of commands.
    */
    constructor(d) {
        super(SVG.Path(d));
    }
    /**
    * Returns the d attribute
    */
    get d() {
        return this.root.getAttribute('d');
    }
    /**
    * Sets the d attribute
    */
    set d(d) {
        this.root.setAttribute('d', d);
    }
}
//# sourceMappingURL=Path.js.map