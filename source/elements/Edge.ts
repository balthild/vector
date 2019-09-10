import Node from './Node.js';
import Element from './Element.js';
import SVG from '../SVG.js';

//Make the function static and extend from Line

/**
* Creates a line connecting two edges, with an arrow if directed.
*/
export default class Edge extends Element {

  directed:boolean;
  nodeFrom : Node;
  nodeTo : Node;
  root: SVGLineElement;

  /**
  * Constructs a line frmo the edge of the two circle elements.
  */
  constructor(nodeFrom: Node, nodeTo: Node, directed: boolean) {
    let arr = Edge.calculateLinePosition(nodeFrom, nodeTo);
    super(SVG.Line(arr[0], arr[1], arr[2], arr[3]));

    this.directed = directed;
  }

  /**
  * Function to find where the line connecting two circles should go. return an Array
  * containing [x1, y1, x2, y2] of the line.
  */
  static calculateLinePosition(nodeFrom: Node, nodeTo:Node)
  {
    let y1 = nodeFrom.nodeCircle.cy;
    let y2 = nodeTo.nodeCircle.cy;

    let x1 = nodeFrom.nodeCircle.cx;
    let x2 = nodeTo.nodeCircle.cx;

    let deltaY = y2 - y1;
    let deltaX = x2 - x1;

    let L = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    let r1Lx = nodeFrom.nodeCircle.r / L * deltaX;
    let r1Ly = nodeFrom.nodeCircle.r / L * deltaY;

    let r2Lx = nodeTo.nodeCircle.r / L * deltaX;
    let r2Ly = nodeTo.nodeCircle.r / L * deltaY;


    let y1Prime = y1 + r1Ly;
    let y2Prime = y2 - r2Ly;

    let x1Prime = x1 + r1Lx;
    let x2Prime = x2 - r2Lx;

    return new Array(x1Prime, y1Prime, x2Prime, y2Prime);
  }
}
