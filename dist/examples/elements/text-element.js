import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.svg.style.border = "1px solid grey";
let line = interactive.text(50, 75, "My Text");
//# sourceMappingURL=text-element.js.map