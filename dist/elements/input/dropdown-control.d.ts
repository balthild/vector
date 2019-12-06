import Group from '../svg/Group.js';
import Rectangle from '../svg/Rectangle.js';
import Text from '../svg/Text.js';
import Input from '../input/Input.js';
/**
*  Dropdown with menu item labels that can be selected.
*/
export default class DropdownControl extends Input {
    optionLabels: string[];
    currentIndex: number;
    textWidth: number;
    expanded: boolean;
    currSelection: Group;
    currSelectionBox: Rectangle;
    currSelectionText: Text;
    collapsedView: Group;
    expandedView: Group;
    x: number;
    y: number;
    /**
     * Constructs a dropdown control with given option labels at the given (x,y) position
     * and with the default selection as the label at the given default index.
     */
    constructor(x: number, y: number, optionLabels: string[], defaultIndex: number);
    /**
    *  Updates the expanded view of menu options.
    */
    updateExpandedView(): void;
    /**
    * Returns the text of the current selection in from the dropdown menu.
    */
    getCurrentSelection(): string;
    /**
    * Returns the longest string in the given string array.
    */
    getLongestString(list: string[]): string;
}
