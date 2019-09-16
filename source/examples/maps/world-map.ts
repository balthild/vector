/**
* @title Interactive World Map
* @description
* @tags [maps]
* @weight 1
*/

import Interactive from '../../Interactive.js';
import data from './data.js';
data["version"];

let myInteractive = new Interactive('library-hello-world');
myInteractive.window = true;

let control = myInteractive.control(100,100);
