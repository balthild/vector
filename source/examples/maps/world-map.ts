/**
* @title Interactive World Map
* @description Every country in the world displayed in an interactive.
* @input Input the name of the map you want to see, and the size of the map.
* @tags [maps]
* @weight 1
*/

import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';

let myInteractive = new Interactive(getScriptName());
let map = myInteractive.map("world",768,300);
