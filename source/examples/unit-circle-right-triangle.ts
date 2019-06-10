/**
* An interactive to demonstrate how the radius of a circle can be used to
* measure the angle between two rays.
*
* @title Unit Circle Right Triangle
* @date June 9, 2019
* @author Kurt Bruns
*/

import Interactive from '../Interactive.js';

// Initialize the interactive
let id = 'unit-circle-right-triangle';
let interactive = new Interactive(id);
interactive.window = true;
interactive.width = 320;
interactive.height = 320;
interactive.originX = interactive.width/2;
interactive.originY = interactive.height/2;

// Create a circle
let circle = interactive.circle( 0, 0, 100);

// Create a control
let control = interactive.control( circle.r*Math.cos(-1), circle.r*Math.sin(-1));
control.constrainToCircle( circle.cx, circle.cy, circle.r);

// Create a path
let path = interactive.path('');
path.root.style.fill = 'gray';
path.root.style.fillOpacity = '.3';
path.update = function() {
  path.d = `M 0 0
            L ${control.x} 0
            L ${control.x} ${control.y}
            z`;
};
path.update();
path.addDependency(control);

// Create a point at the origin
let point = interactive.circle( 0, 0, 3);
point.fill = 'black';

// Gets the normalized angle between zero and tau. TODO: Maybe transform the
// coordinate system so that the positive y-direction is up instead of down.
// UPDATE: transform = 'scale(1,-1)' applied to the main svg  didn't quite work
// as expected: the text element was upside down, but maybe that could be
// reversed? bleh.
function getAngle() {
  if( control.y <= 0 ) {
    return Math.abs(Math.atan2( control.y, control.x));
  } else {
    return Math.PI*2 - Math.atan2( control.y, control.x);
  }
}

// Create text to display the current angle. TODO: add a check-box to change
// between radians and degrees
let text = interactive.text( 0, 130, "test");
text.addDependency(control);
text.update = function() {
  text.contents = `angle = ${getAngle().toFixed(3)}`;
};
text.update();
text.x = -text.root.textLength.baseVal.value/2;
