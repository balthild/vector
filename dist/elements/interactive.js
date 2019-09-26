// util
import { getURL } from '../util/file.js';
import { parseSVG } from '../util/svg.js';
// basic elements
import Element from '../elements/element.js';
import Input from '../elements/input/input.js';
// svg elements
import SVG from '../elements/svg/svg.js';
import Group from '../elements/svg/group.js';
// visual elements
import Icon from '../elements/visual/icon.js';
// input elements
import Button from '../elements/input/button.js';
import CheckBox from '../elements/input/check-box.js';
import Control from '../elements/input/control.js';
import ControlCircle from '../elements/input/control-circle.js';
import RadioControl from '../elements/input/radio-control.js';
import Scrubber from '../elements/input/scrubber.js';
import Slider from '../elements/input/slider.js';
// graph elements
import Node from '../elements/graph/node.js';
import Edge from '../elements/graph/edge.js';
import Graph from '../elements/graph/graph.js';
import DirectedGraph from '../elements/graph/directed-graph.js';
// map elements
import Map from '../elements/maps/map.js';
// math elements
import Plot from '../elements/math/plot.js';
/**
* This class exposes the high level functionality of our library. Elements can
* created and related together
*
* By default input elements are added to a SVG "controls" group and visual
* elements are added to the "background" group. This ensures that controls will
* alwaysbe focusable, despite the order in which elements are created.
*/
export default class Interactive extends SVG {
    /**
    * Constructs a new interactive object and appends it into the DOM. If the
    * provided argument is an HTMLElement appends the interactive within that
    * element. If the provided a value is a string, appends the interactive within
    * the HTML element with the corresponding ID. If no element is found throws an
    * error.
    */
    constructor(value) {
        super();
        // internal variables
        this._width = 0;
        this._height = 0;
        this._originX = 0;
        this._originY = 0;
        // If the user passes in a string identifier check to see if such an
        // element exists in the current document.
        if (typeof value == "string") {
            this.container = document.getElementById(value);
            if (this.container === null || this.container === undefined) {
                throw new Error(`There is no HTML element with the id: ${value}`);
            }
        }
        else {
            this.container = value;
        }
        this.container.classList.add('interactive-container');
        // create and append the root svg element and group elements
        this.container.appendChild(this.root);
        this.root.classList.add('interactive');
        this.background = new Group();
        this.input = new Group();
        this.root.appendChild(this.background.root);
        this.root.appendChild(this.input.root);
        // default configuration
        this._originX = 0;
        this._originY = 0;
        this._width = 600;
        this._height = 300;
        this.root.setAttribute('width', this._width.toString());
        this.root.setAttribute('height', this._height.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
        this.window = false;
        // prevent the default behavior of selecting text
        this.container.addEventListener('mousedown', function (event) {
            event.preventDefault();
        });
    }
    /**
    * Sets the width of this interactive area.
    */
    set width(value) {
        this._width = value;
        this.root.setAttribute('width', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the width of this interactive area.
    */
    get width() {
        return this._width;
    }
    /**
    * Sets the height of this interactive area.
    */
    set height(value) {
        this._height = value;
        this.root.setAttribute('height', value.toString());
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the height of this interactive area.
    */
    get height() {
        return this._height;
    }
    /**
    * Sets the x coordinate of the origin.
    */
    set originX(value) {
        this._originX = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originX() {
        return this._originX;
    }
    /**
    * Sets the y coordinate of the origin.
    */
    set originY(value) {
        this._originY = value;
        this.setViewBox(-this._originX, -this._originY, this._width, this._height);
    }
    /**
    * Returns the value of the x-coordinate of the origin.
    */
    get originY() {
        return this._originY;
    }
    /**
    * If set to true, styles the interactive to float on top of the background.
    * This feature is good for interactives where elements can be dragged out of
    * the bounds of the container element.
    */
    set window(value) {
        if (value) {
            this.root.classList.add('window');
        }
        else {
            this.root.classList.remove('window');
        }
    }
    /**
    * If set to true, draws a minimal border around the interactive.
    */
    set border(value) {
        if (value) {
            this.root.classList.add('border');
        }
        else {
            this.root.classList.remove('border');
        }
    }
    /**
    * Returns the minimum x-coordinate of this interactive.
    */
    get minX() {
        return -this.originX;
    }
    /**
    * Returns the minimum y-coordinate of this interactive.
    */
    get minY() {
        return -this.originY;
    }
    /**
    * Returns the maximum x-coordinate of this interactive.
    */
    get maxX() {
        return this.minX + this._width;
    }
    /**
    * Returns the maximum y-coordinate of this interactive.
    */
    get maxY() {
        return this.minY + this._height;
    }
    /**
    * Appends the element within the interactive. If the element is an "input"
    * element, places the element in the input group so that visually the element
    * is always placed above other graphical elements.
    */
    appendChild(child) {
        if (child instanceof Input) {
            this.input.appendChild(child);
        }
        else {
            this.background.appendChild(child);
        }
        return child;
    }
    /**
    * Creates a nested interactive within this interactive
    */
    interactive(x, y) {
        let obj = new Interactive(this.id);
        obj.root.setAttribute('x', x.toString());
        obj.root.setAttribute('y', y.toString());
        return obj;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    button(x, y, label) {
        return this.appendChild(new Button(x, y, label));
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    checkBox(x, y, label, value) {
        return this.appendChild(new CheckBox(x, y, label, value));
    }
    icon(x, y, str) {
        // create a new icon element
        let icon = new Icon(x, y);
        this.appendChild(icon);
        // check to see if we have loaded the symbols svg, if not load it
        let id = 'vector-js-symbols';
        let svg;
        let svgElement = document.getElementsByClassName(id)[0];
        if (svgElement === undefined || svgElement === null) {
            svg = new SVG();
            svg.style.display = 'none';
            svg.root.classList.add(id);
            document.body.appendChild(svg.root);
        }
        else {
            svg = Element.controller.get(svgElement.id);
        }
        // check to see if we have loaded this icon before
        let symbol = svg.root.querySelector(`#${str}`);
        if (!symbol) {
            getURL(`/resources/icons/${str}.svg`).then(function (response) {
                let symbol = svg.symbol();
                symbol.root.id = str;
                let symbolSVG = parseSVG(response);
                while (symbolSVG.childNodes.length > 0) {
                    symbol.root.appendChild(symbolSVG.childNodes[0]);
                }
                let use = icon.use();
                use.setAttribute('href', `#${str}`);
                icon.appendChild(use);
            }).catch(function (error) {
                throw error;
            });
        }
        return icon;
    }
    /**
    * Creates a checkbox input at the position (x,y) within this interactive.
    */
    radioControl(labels, x, y, index = 0) {
        let radioControl = new RadioControl(labels, x, y, index);
        this.appendChild(radioControl);
        return radioControl;
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    control(x, y) {
        return this.appendChild(new Control(x, y));
    }
    /**
    * Creates a control point within this interactive at the position (x,y).
    */
    controlCircle(x, y) {
        return this.appendChild(new ControlCircle(x, y));
    }
    /**
    * Creates a plot within this interactive at the position (x,y).
    */
    plot(userEvents = true) {
        return this.appendChild(new Plot(userEvents));
    }
    /**
    * Creates a graph element within this interactive
    */
    graph() {
        return this.appendChild(new Graph());
    }
    /**
    * Creates a graph element within this interactive
    */
    map(mapName, width, height, externalData = null) {
        let map = new Map(this, mapName, width, height, externalData);
        return map;
    }
    /*
    * Creates a directed graph element within this interactive
    */
    directedGraph() {
        return this.appendChild(new DirectedGraph());
    }
    /**
    * Creates a slider input within this interactive
    */
    slider(x, y, width, value) {
        return this.appendChild(new Slider(x, y, width, value));
    }
    /**
    * Creates a scrubber with a play and pause button at the position (x,y).
    */
    scrubber(x, y, width) {
        return this.appendChild(new Scrubber(x, y, width));
    }
    /**
    * Creates a node within this interactive.
    */
    node(x, y, rx, ry, contents) {
        return this.appendChild(new Node(x, y, rx, ry, contents));
    }
    /**
    * Creates an edge connecting two nodes within this interactive.
    */
    edge(nodeFrom, nodeTo, directed) {
        return this.appendChild(new Edge(nodeFrom, nodeTo, directed));
    }
    /**
    *
    */
    async loadSVG(url) {
        let group = new Group();
        this.appendChild(group);
        getURL(url).then(function (response) {
            group.root.appendChild(parseSVG(response));
        }).catch(function (error) {
            throw error;
        });
        return group;
    }
}
//# sourceMappingURL=interactive.js.map