---
title: Vector.js
description: "A Javascript library for the creation of interactive graphics. The library uses the existing web standards: HTML, SVG, and CSS making it easy to use with other tools and libraries. At its core, the library is a minimalist tool for creating interactives."
blurb: A Javascript library for the creation of interactive graphics.
aside:
   - Getting Started
   - Input
   - Elements
   - Interaction
   - Animation
   - Maps
   - Coordinates
   - Styling
---

## Getting Started

Download the library or link to the CDN and import the library at the top of your Javascript file. After importing the library create an interactive object by passing the string identifier of a HTML container element. This interactive object contains function calls and helper methods for creating elements and the interactions between them.

<div class="filename">index.html</div>

{{< highlight html>}}
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Getting Started</title>
    <link rel="stylesheet" href="{{< baseURL >}}/Library.css">
  </head>
  <body>
    <div id="my-interactive"></div>
    <script type="module" src="getting-started.js"></script>
  </body>
</html>
{{< /highlight >}}

After including the script in the HTML file, the interactive will be created within the element with the corresponding id. Make sure to have attribute type="module" when including the script since we are using the ES6 import syntax.

<div class="filename">getting-started.js</div>

{{< highlight javascript>}}
import Interactive from "{{< baseURL >}}Interactive.js";
let interactive = new Interactive("my-interactive");
interactive.border = true;
let control = interactive.control( 100, 100);
{{< /highlight >}}

Serve the HTML page from a local folder over the network. <a href="https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en" target="_blank" rel="noopener">Web Server for Chrome</a> is a handy tool for doing this. The result is the following interactive: a blank SVG image with the default dimensions of 600 by 300 pixels. TODO: Download starter pack or watch the getting started tutorial.

<img src="/images/getting-started.svg" alt="">

## Input

User input drives the animations of these graphics and is the main focus of this library. These input elements are part of the SVG ecosystem and provide the end users with ways to manipulate and interact with the visual in front of them.

### Button

The button element has a position, label, and default style. Defining the "onclick" method handles when a user clicks the button.

{{< highlight javascript>}}
let button = interactive.button( 100, 75, "My Button");
{{< /highlight >}}

<div id="button-element"></div>

<script type="module" src="/examples/elements/button-element.js"></script>

### Check Box

A checkbox has two different states: checked and unchecked. When a user clicks the box the state changes.

{{< highlight javascript>}}
let checkBox = interactive.checkBox( 100, 75, "My Checkbox", false);
{{< /highlight >}}

<div id="check-box-element"></div>

<script type="module" src="/examples/elements/check-box-element.js"></script>

### Control Point

A control point is a two dimensional point that can be clicked and dragged by the user. The control has a (x,y) position as well as its change in position (dx, dy).

{{< highlight javascript>}}
let control = interactive.control( 150, 75);
{{< /highlight >}}

<div id="control-element"></div>

<script type="module" src="/examples/elements/control-element.js"></script>

<!-- TODO: drop down -->
<!-- TODO: input box -->

### Radio Control

The radio control elements allows the user to select from a list of options. Only one option can be selected at a time.

{{< highlight javascript>}}
let radio = interactive.radioControl(["red","green","blue"], 100, 50);
{{< /highlight >}}

<div id="radio-control-element"></div>

<script type="module" src="/examples/elements/radio-control-element.js"></script>

### Scrubber

The scrubber has a play and pause button that start and stop the animation. The position indicator can also be dragged to change the state of the scrubber.

{{< highlight javascript>}}
let scrubber = interactive.scrubber( 100, 75, 400);
{{< /highlight >}}

{{<example "scrubber-element">}}

### Slider

A slider has a position, width, and starting value.

{{< highlight javascript>}}
let slider = interactive.slider( 75, 75, 150, 20);
{{< /highlight >}}

<div id="slider-element"></div>

<script type="module" src="/examples/elements/slider-element.js"></script>

## Elements

Our library has basic visual elements that are used to create the graphics. All elements contain a root SVGElement that contains the visual part of the element. Basic element root's correspond directly to the visual aspect of the element, more complicated elements often contain many SVGElements that describe the graphic.

### Ellipse

{{< highlight javascript>}}
let ellipse = interactive.ellipse( 100, 75, 80, 40);
{{< /highlight >}}

<div id="ellipse-element"></div>

<script type="module" src="/examples/elements/ellipse-element.js"></script>

### Line

{{< highlight javascript>}}
let line = interactive.line( 50, 25, 150, 125);
{{< /highlight >}}

<div id="line-element"></div>

<script type="module" src="/examples/elements/line-element.js"></script>

### Path

{{< highlight javascript>}}
let line = interactive.path("M 50 50 Q 100 150 150 50");
{{< /highlight >}}

<div id="path-element"></div>

<script type="module" src="/examples/elements/path-element.js"></script>

### Rectangle

{{< highlight javascript>}}
let rectangle = interactive.rectangle( 50, 50, 100, 50);
{{< /highlight >}}

<div id="rectangle-element"></div>

<script type="module" src="/examples/elements/rectangle-element.js"></script>

### Text

{{< highlight javascript>}}
let text = interactive.text( 50, 75, "My Text");
{{< /highlight >}}

<div id="text-element"></div>

<script type="module" src="/examples/elements/text-element.js"></script>

### TSpan

A text span element allows for text to be styled and positioned differently within a body of text. In the example below, a word is randomly selected to be bolded.

{{< highlight javascript>}}
let text = interactive.text( 50, 75, '');
text.tspan('normal. ');
text.tspan('bold. ').style.fontWeight = '600';
text.tspan('normal again.');
{{< /highlight >}}

<div id="tspan-element"></div>

<script type="module" src="/examples/elements/tspan-element.js"></script>

## Interaction

There are two forms of interaction within our system: dependencies and events.

The first form of interaction is dependencies. Elements can be related together using dependency functions, similar to how cells are related together in a spreadsheet application. These dependencies are explicit and give dependents access to the data of the elements they rely on. These dependencies also define how the interactive should update elements and in what order the update should happen when an element's state is changed.

The second, more tradditional, form of interaction is events. Events are typically utilized with input elements and the main interactive object. Events follow a design pattern common to the web - a user event happens and then the corresponding event handler is called.

### Dependency Functions

All elements contain the ability to define dependencies to other elements. An element declares what it is dependent on using the "addDependency" function and then defines an update function which describes how the element should update itself. Circular dependencies will cause an exception. By convention, an element should only use the data of the elements it has declared itself dependent on.

<!-- TODO: hopefully in the future this will be strictly enforced,  -->

{{< highlight javascript>}}
let control1 = interactive.control( 100, 100);
let control2 = interactive.control( 200, 200);
control2.addDependency(control1);
control2.update = function(){
  this.x += control1.dx;
};
{{< /highlight >}}

<div id="dependency-function"></div>

<script type="module" src="/examples/interaction/dependency-function.js">

</script>

### Keyboard Input

Key board input can be used to change the state of an interactive as well as control different elements within the interactive. The example below highlights the numbers one through five with the corresponding key on the keyboard when pressed.

<!-- TODO: make an interactive of the whole keyboard -->

{{< highlight javascript>}}
window.onkeydown = function( event ) {
  ...
}
{{< /highlight >}}

<div id="key-board-input"></div>

<script type="module" src="/examples/interaction/key-board-input.js"></script>

### Mouse Input

Mouse input can be used to change the state of an interactive. Mouse input consists of the mouse's position, when the users clicks the interactive, etc.

<!-- TODO: add mouse into the depdency eco-system? -->
<!-- TODO: show velocity vector of mouse? -->
<!-- TODO: count mouse leave, mouse enter? -->

{{< highlight javascript>}}
interactive.mouse ?
interactive.onclick ?
interactive.onmousemove ?
{{< /highlight >}}

<div id="mouse-interaction"></div>

<script type="module" src="/examples/interaction/mouse-interaction.js"></script>

## Animation

While animation isn't the main focus the library, some basic animations are supported.

### Transitions?

### Time Line

Adding a time-line to an interactive gives the user control over a basic animation. For beginner users, the scrubber is a great element to animate parts of an interactive. It allows the user to start, stop, and "scrub" to different parts of the animation.

<!-- TODO: temporarily stop the update when the scrubber element is grabbed -->
<!-- TODO: when the scrubber is "scrubbed" to the end, set the flag to true so the next time the user clicks the play button the animation restarts. -->

{{< highlight javascript>}}
let circle = interactive.circle( 75, 75, 20);
let path = interactive.path("...");
circle.animateAlongPath( path, true, SPEED);
{{< /highlight >}}

{{<example "animate-along-path">}}

## Maps

Wishful thinking (x,y) to lattitude longitude and vice versa.

### World Map

{{< highlight javascript>}}
import canada from './maps/canada.js';
let map = interactive.map(canada);
{{< /highlight >}}

<img src="/images/world-map.svg" class="center" alt="SVG World Map">

{{<example "map-element">}}

### United States

{{< highlight javascript>}}
let map = interactive.map("united-states.geojson");
{{< /highlight >}}

<img src="/images/united-states.svg" class="center" alt="SVG United States Map">

### Custom Maps

{{< highlight javascript>}}
import { getJSON } from 'Util.js';

getJSON('custom.geojson').then(function(geoData){

});

{{< /highlight >}}

## Coordinates

The coordinate system of the interactive image follows the SVG standard: the default origin is the top left corner of the image and the positive x direction is to the right and the positive y direction is down. This is visualized by the control point below.

<p>
  {{<example "svg-coordinate-system">}}
</p>

{{< highlight javascript>}}
// TODO: show changing the origin of the coordinate system
{{< /highlight >}}

{{< highlight javascript>}}
// TODO: mathmode -> changes positive direction of the y axis to be up
{{< /highlight >}}

Alternatively, the viewbox of the interactive can be changed

{{< highlight javascript>}}
// what happens when the dimensions of the interactive and the viewbox disagree?
{{< /highlight >}}

### Scaling

<img src="/images/cartesian-coordinate-system.svg" class="border center" alt="SVG Coordinate System">

{{< highlight javascript>}}
// TODO: Scaling example
{{< /highlight >}}

### Zooming and Panning

<div id="zoom-in-out"></div>

<script type="module" src="/examples/interaction/zoom-in-out.js"></script>


### Transforming

## Styling

The appearance of elements within this library can be styled using CSS. Styles can either be applied using a user defined style sheet or directly within the Javascript file. Helper classes are provided for the convenience of the user.

### Basic Styling

Basic geometric elements have two basic properties: fill and stroke. Fill is the area contained within the shape and stroke is the edge of the geometric shape. These styles can be accessed through the style property.

<img src="/images/fill-stroke.svg" alt="Fill and Stroke Element" width="320px" style="display:block; margin:auto;">

{{< highlight javascript>}}
let rectangle = interactive.rectangle( 50, 50, 100, 50);
rectangle.style.fill = 'blue';
rectangle.style.stroke = 'red';
rectangle.style.strokeWidth = '1px';
{{< /highlight >}}

### Custom Styling

Every element within the library has a root property which is a SVG element. This root element contains zero or more child elements all of which can have custom styling applied to them through CSS selectors or Javascript.

{{< highlight javascript>}}
// element.style ...
{{< /highlight >}}

{{< highlight javascript>}}
// TODO: how to load a custom style sheet
{{< /highlight >}}
