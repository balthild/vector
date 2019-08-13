import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 200;
interactive.border = true;

let control = interactive.control( 100, 100);
control.root.style.display = 'none';

interactive.svg.onmousemove = function( event ) {
  control.x = event.clientX - interactive.svg.getBoundingClientRect().left;
  control.y = event.clientY - interactive.svg.getBoundingClientRect().top;
  control._onchange();

}

interactive.svg.onmouseleave = interactive.svg.onmousemove;

let xline = interactive.line( interactive.minX, control.y, interactive.maxX, control.y);
xline.addDependency(control);
xline.update = function() {
  xline.y1 = control.y;
  xline.y2 = control.y;
}

let yline = interactive.line(  control.x, interactive.minY, control.x, interactive.maxY);
yline.addDependency(control);
yline.update = function() {
  yline.x1 = control.x;
  yline.x2 = control.x;
}

let opacity = 1;
let circle = interactive.circle( 0, 0, 3);
circle.root.style.display = 'none';
interactive.svg.onclick = function( event ) {
  opacity = 1;
  circle.r = 1;
  circle.root.style.opacity = 1;
  circle.cx = event.clientX - interactive.svg.getBoundingClientRect().left;
  circle.cy = event.clientY - interactive.svg.getBoundingClientRect().top;
  circle.root.style.display = '';

  // Start the animation cycle
  window.requestAnimationFrame(step);
}

// Animate this interactive by changing the angle and then updating elements
function step(timestamp) {

  circle.r += 1;
  circle.root.style.opacity = opacity;
  opacity -= .02;

  if (opacity > 0 ) {
    // set up the next animation frame
    window.requestAnimationFrame(step);
  }
}
