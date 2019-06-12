/**
* This file exposes the functionality of this library in one place. It exports
* modules and defines a global variable for non-module use (This maybe should
* get moved to another file).
*/

// input
import Control from './input/Control.js';
import CheckBox from './input/CheckBox.js';
import Slider from './input/Slider.js';

// elements
import Ellipse from './elements/Ellipse.js';
import Element from './elements/Element.js';
import Line from './elements/Line.js';
import Path from './elements/Path.js';
import Rectangle from './elements/Rectangle.js';
import Text from './elements/Text.js';

// top level modules
import Interactive from './Interactive.js';
import SVG from './SVG.js';

// add interactive object to global variables
(window as any).Interactive = Interactive;

// export modules
export {
  Control,
  CheckBox,
  Slider,
  Element,
  Ellipse,
  Interactive,
  Line,
  Path,
  Rectangle,
  SVG,
  Text
};
