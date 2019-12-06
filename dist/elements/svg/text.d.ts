import Element, { CoreAttributes } from './element.js';
import TSpan from './t-span.js';
import { Typography } from './content-model.js';
/**
* These attributes control the text position.
*/
export declare type TextAttributes = 'baseline-shift' | 'text-anchor' | 'alignment-baseline';
/**
* Text is a basic element containing string contents
*/
export default class Text extends Element implements Typography {
    root: SVGTextElement;
    /**
    * Constructs text at the position (x,y) with the provided string
    */
    constructor(x: number, y: number, str?: string);
    setAttribute(name: TextAttributes | CoreAttributes, value: string): Text;
    getAttribute(name: TextAttributes | CoreAttributes): string;
    /**
    * Sets the contents of this element
    */
    /**
    * Sets the contents of this element
    */
    contents: string;
    /**
    * Gets the x position of this element
    */
    /**
    * Sets the x position of this element
    */
    x: number;
    /**
    * Gets the y position of this element
    */
    /**
    * Sets the y position of this element
    */
    y: number;
    /**
    * Returns the length of the text
    */
    readonly length: number;
    text(x: number, y: number, str: string): Text;
    tspan(text: string): TSpan;
}
