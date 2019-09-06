import * as data from "../mapsJson.js";
import Element from '../elements/Element.js';
/**
* Map class for displaying geographic maps of the world and its different parts.
*/
export default class GeoMap extends Element {
    /*
    * interactive: the object that called map()
    * mapName: the name of the map you wish to render
    * width: width of the map
    * height: height of the map
    */
    constructor(interactive, mapName, width, height) {
        super();
        this.mapName = mapName;
        this.interactive = interactive;
        this.interactive.width = width;
        this.interactive.height = height;
        this.generatePaths();
        let bbox = this.interactive.background.getBBox();
        this.interactive.root.setAttribute('transform', 'scale(1,-1)');
        this.interactive.setViewBox(bbox.x, bbox.y, bbox.width, bbox.height);
    }
    /*
    * Get the json for the selected map name
    */
    getJson(mapName) {
        if (mapName == 'united-states') {
            return data.usData;
        }
        return data.globalData;
    }
    /*
    * Process the geo json and create all paths
    */
    generatePaths() {
        let json = this.getJson(this.mapName);
        var k = 0;
        var c = 0;
        var i = 1;
        for (let c = 0; c < json.features.length; c++) {
            for (let k = 0; k < json.features[c].geometry.coordinates.length; k++) {
                if (json.features[c].geometry.coordinates[k].length == 1) {
                    let path = this.interactive.path('M 0 0');
                    path.root.classList.add('country');
                    path.root.classList.remove("default");
                    path.root.setAttribute("name", json.features[c].properties.name);
                    path.style.stroke = '#333333';
                    path.style.fill = 'ffffff';
                    path.style.strokeWidth = '.1px';
                    let startX = json.features[c].geometry.coordinates[k][0][0][0];
                    let startY = json.features[c].geometry.coordinates[k][0][0][1];
                    // draw the path of the country
                    path.d = `M ${startX} ${startY}  `;
                    for (i = 1; i < json.features[c].geometry.coordinates[k][0].length; i++) {
                        let x = json.features[c].geometry.coordinates[k][0][i][0];
                        let y = json.features[c].geometry.coordinates[k][0][i][1];
                        path.d += `L ${x} ${y} `;
                    }
                }
                else {
                    let path = this.interactive.path('M 0 0');
                    path.root.classList.add('country');
                    path.root.classList.remove("default");
                    path.root.setAttribute("name", json.features[c].properties.name);
                    path.style.stroke = '#333333';
                    path.style.fill = 'ffffff';
                    path.style.strokeWidth = '.1px';
                    let startX = json.features[c].geometry.coordinates[k][0][0];
                    let startY = json.features[c].geometry.coordinates[k][0][1];
                    path.d = `M ${startX} ${startY} `;
                    for (i = 1; i < json.features[c].geometry.coordinates[k].length; i++) {
                        let x = json.features[c].geometry.coordinates[k][i][0];
                        let y = json.features[c].geometry.coordinates[k][i][1];
                        path.d += `L ${x} ${y} `;
                    }
                }
            }
        }
    }
    generateAllPaths() {
        this.paths = new Map();
    }
    /**
    * The default behavior is to update its dependents on change.
    */
    onchange() {
        this.updateDependents();
    }
}
//# sourceMappingURL=GeoMap.js.map