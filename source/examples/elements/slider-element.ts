/**
* @title Slider Element
* @description This interactive demonstrates the slider element.
* @tags [elements, input]
*/

import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let slider = interactive.slider( 100, 75, 150, 20);
