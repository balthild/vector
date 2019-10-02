/**
* @title Unit Circle Sine
* @tags [math]
* @date May 3, 2019
* @author Kurt Bruns
*/

import {Interactive, getScriptName} from '../../index.js';

// Initialize the interactive
let id = 'unit-circle-sine';
let angleInteractive = new Interactive(id);
let margin = 18;
let radius = 80;
// angleInteractive.width = 2*radius + 2*margin;
angleInteractive.root.style.border = '1px solid #aaaaaa';
angleInteractive.width = 250;
angleInteractive.height = 250;
angleInteractive.originX = angleInteractive.width/2;
angleInteractive.originY = angleInteractive.height/2;
angleInteractive.root.style.display = 'inline';

// Create a circle
let circle = angleInteractive.circle( 0, 0, 80);

// Create a control
let angleControl = angleInteractive.control( circle.r*Math.cos(-1), circle.r*Math.sin(-1));
angleControl.constrainToCircle( circle.cx, circle.cy, circle.r);

let triangle = angleInteractive.path('');
triangle.addDependency(angleControl);
triangle.update = function() {
  this.d = `M ${angleControl.x} 0 L 0 0 L ${angleControl.x} ${angleControl.y}`;
};
triangle.update();

let opposite = angleInteractive.path('');
opposite.root.style.stroke = 'red';
opposite.addDependency(angleControl);
opposite.update = function() {
  this.d = `M ${angleControl.x} 0 L ${angleControl.x} ${angleControl.y}`;
};
opposite.update();

// Create a point at the origin
let anglePoint = angleInteractive.circle( 0, 0, 3);
anglePoint.fill = 'black';

let circumference = circle.r*2*Math.PI;
let interactive = new Interactive(id);
interactive.width = circumference;
interactive.height = 250;
// interactive.originX = margin;
// interactive.originY = interactive.height/2;
interactive.window = false;
interactive.root.style.display = 'inline';

let scale = circumference/(2*Math.PI);
let graph = interactive.plot(interactive.width, interactive.height, Math.sin, {
  scaleX: scale,
  scaleY: scale,
  originX: 0,
  originY: interactive.height/2,
  zoomable: false,
  displayPoint: false,
  border: false
});
interactive.root.style.border = '1px solid #aaaaaa';

let y = graph.staticGroup.line(0,0,0,0);
y.root.style.stroke = 'red';
let control = interactive.control( 0, 0);

function getAngle() : number {
  if( angleControl.y <= 0 ) {
    return Math.abs(Math.atan2( angleControl.y, angleControl.x));
  } else {
    return Math.PI*2 - Math.atan2( angleControl.y, angleControl.x);
  }
}

graph.staticGroup.appendChild(control);
control.addDependency(angleControl);
control.update = function() {
  this.x = circle.r*getAngle();
  this.y = angleControl.y;

};
control.update();
control.constrain = function( o, n) {
  return { x:n.x, y:graph.call(n.x) };
};
control.onchange = function() {
  angleControl.x = circle.r*Math.cos(control.x/circle.r);
  angleControl.y = -control.y;
  angleControl.updateDependents();
};

y.addDependency(control);
y.update = function() {
  this.x1 = control.x;
  this.y1 = 0;
  this.x2 = control.x;
  this.y2 = control.y;
};
y.update();

graph.staticGroup.line(0*circumference/4,-4,0*circumference/4,4);
graph.staticGroup.line(1*circumference/4,-4,1*circumference/4,4);
graph.staticGroup.line(2*circumference/4,-4,2*circumference/4,4);
graph.staticGroup.line(3*circumference/4,-4,3*circumference/4,4);
graph.staticGroup.line(4*circumference/4,-4,4*circumference/4,4);

graph.staticGroup.text(0*circumference/4 + 8,-10, `0`).root.style.textAnchor = 'middle';
graph.staticGroup.text(2*circumference/4 + 0,-10, `π`).root.style.textAnchor = 'middle';
graph.staticGroup.text(4*circumference/4 - 8,-10, `τ`).root.style.textAnchor = 'middle';

// let text = interactive.text(interactive.width/2, - interactive.height/2 + 30, 'y = sin(θ)');
// text.root.style.textAnchor = 'middle';
