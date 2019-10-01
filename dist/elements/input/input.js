import Group from '../svg/group.js';
/**
* An object that takes in user input in the form of user events.
*/
export default class Input extends Group {
    /**
    * Constructs a new input group.
    */
    constructor() {
        super();
        // set the default behavior of the onchange function
        let input = this;
        input._onchange = function () {
            input.updateDependents();
        };
    }
    /**
    * This function is called whenever the state of an input element changes. The
    * default behavior of this function is to update the dependents of this
    * element. WARNING: changing this function can have un-intented side effects,
    * but may produce a desirable outcome.
    */
    set onchange(func) {
        this._onchange = func;
    }
    get onchange() {
        return this._onchange;
    }
}
//# sourceMappingURL=input.js.map