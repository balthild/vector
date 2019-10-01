/**
* @title Load External SVG
* @description This interactive demonstrates how to load and use an external svg.
* @tags [svg]
*/
import { Interactive, getScriptName } from '../../index.js';
import { getURL } from '../../util/file.js';
import { parseSVG } from '../../util/svg.js';
let myInteractive = new Interactive(getScriptName());
// let svg = myInteractive.loadSVG('/resources/maps/united-states.svg');
// svg.then(function(data){
//   console.log(data.root);
//   let bbox = (data.root.firstElementChild as SVGGraphicsElement).getBBox();
//   myInteractive.setViewBox( bbox.x, bbox.y, bbox.width, bbox.height);
// })
getURL('/resources/maps/united-states.svg').then(function (response) {
    let svg = myInteractive.background.root.appendChild(parseSVG(response));
    let bbox = svg.getBBox();
    myInteractive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
}).catch(function (error) {
    throw error;
});
//# sourceMappingURL=load-external-svg.js.map