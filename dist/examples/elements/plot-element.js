/**
* @title Plot Element
* @description This interactive demonstrates the plot element
* @tags [elements]
*/
import { Interactive } from '../../index.js';
/**
* Creates a graph of the sine function within the element with the provided id.
*/
export default function main(id) {
    let interactive = new Interactive(id);
    interactive.width = 700;
    interactive.height = 400;
    let plot = interactive.plot(600, 300, Math.sin, {
        x: 50,
        y: 50,
        originX: 0,
        originY: 150,
        scaleX: 300 / Math.PI,
        scaleY: 300 / Math.PI,
        zoomable: false,
        grid: true
    });
    let group = interactive.group();
    group.style.fontFamily = 'KaTeX_Main';
    group.style.fontSize = '22px';
    let title = group.text(interactive.width / 2, 25, 'sin(');
    let span = title.tspan('x');
    span.setAttribute('text-anchor', 'middle');
    span.setAttribute('alignment-baseline', 'middle');
    span.style.fontFamily = 'KaTeX_Math';
    title.contents += ')';
    title.setAttribute('alignment-baseline', 'middle');
    title.setAttribute('text-anchor', 'middle');
    let xPoints = plot.getXLabelPoints();
    let yPoints = plot.getYLabelPoints();
    for (let p of xPoints) {
        let point = plot.internalToAbsolute(p);
        let text = group.text(point.x + 50, 50 + 300 + 25, `${p.x}`);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
    }
    for (let p of yPoints) {
        let point = plot.internalToAbsolute(p);
        let text = group.text(point.x + 50 - 25, point.y + 50, `${p.y}`);
        text.setAttribute('alignment-baseline', 'middle');
        text.setAttribute('text-anchor', 'middle');
    }
}
//# sourceMappingURL=plot-element.js.map