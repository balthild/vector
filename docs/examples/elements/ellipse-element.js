import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 150;
interactive.root.style.border = "1px solid grey";
let ellipse = interactive.ellipse(100, 75, 80, 40);
//# sourceMappingURL=ellipse-element.js.map