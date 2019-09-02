import Point from "./elements/Point.js";
import { saveAs } from './util/file.js';

/**
* Returns the current script name.
*/
export function getScriptName( trimExtension = true ) : string {

  // Variables
  let error = new Error();
  let source: any[] | RegExpExecArray;
  let lastStackFrameRegex = new RegExp(/.+\/(.*?):\d+(:\d+)*$/)
  let currentStackFrameRegex = new RegExp(/getScriptName \(.+\/(.*):\d+:\d+\)/);
  let name;

  // Get the script name
  if((source = lastStackFrameRegex.exec(error.stack.trim())) && source[1] != "") {
    name = source[1];
  }
  else if ((source = currentStackFrameRegex.exec(error.stack.trim()))) {
    name = source[1];
  }
  else {
    return error.message;
  }

  // Return name
  if( trimExtension) {
    let position = name.lastIndexOf(".");
    return name.substr(0, position);
  } else {
    return name;
  }
}

/**
* Returns the point where two lines intersect. The first line is defined by the
* points p1 and p2. The second line is defined by the points p3 and p4.
*/
export function PointWhereTwoLinesIntersect( p1:Point, p2:Point, p3:Point, p4:Point ) : Point {
  let slope1 = (p2.y - p1.y)/(p2.x - p1.x);
  let slope2 = (p4.y - p3.y)/(p4.x - p3.x);
  let b1 = (p2.y - p2.x*slope1);
  let b2 = (p4.y - p4.x*slope2);
  let x = (b2 - b1)/(slope1 - slope2);
  let y;
  if( !isFinite(slope1)) {
    x = p1.x;
    y = p3.y + slope2*(x - p3.x);
  } else if ( !isFinite(slope2)) {
    x = p3.x;
    y = p1.y + slope1*(x - p1.x);
  } else {
    y = p1.y + slope1*(x - p1.x);
  }
  return {x:x, y:y};
}

/**
* Returns the next prime number after the given integer.
*/
export function nextPrime( n:number ) {
  if( !Number.isInteger(n)) {
    throw Error('Please pass an integer as a parameter');
  }

  // Search for the next prime until it is found
  while( !isPrime(++n)){
  }
  return n;
}

/**
* Returns true if the number is prime, false otherwise.
*/
export function isPrime( n:number) {
  if( !Number.isInteger(n) || n <= 1 ) {
    return false;
  }

  // Check if any of the numbers, up to the square root of the number, evenly
  // divide the number
  for( let i = 2; i <= Math.sqrt(n); i++ ) {
    if( n % i == 0 ) {
      return false;
    }
  }

  return true;
}

/**
* Downloads the current drawing as an svg file.
*/
export function download( id:string, filename:string ) {

  let svg = document.getElementById(id);
  console.log(id);
  let styleSheet = null;
  for( let i = 0; i < document.styleSheets.length; i++) {
    // TODO: there is a better way to do this
    if( document.styleSheets[i].href != null && document.styleSheets[i].href.includes("library.css")) {
      styleSheet = document.styleSheets[i];
      break;
    }
  }
  let style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
  style.type = "text/css";
  let css = "";
  for( let i = 0; i < styleSheet.rules.length; i++)
  {
    let rule = styleSheet.rules[i] as CSSRule;
    css  += rule.cssText + "\n";
  }

  style.innerHTML = css;
  svg.appendChild(style);
  // console.log(svg.outerHTML);
  // console.log(style);
  // console.log(svg);

  let data = svg.outerHTML.replace( "&gt;", ">").replace( "&lt;", "<");
  let blob = new Blob([data], {type: 'image/svg+xml'});
  saveAs(blob, filename, {});
}
