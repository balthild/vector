import Interactive from '../../Interactive.js';
import { getScriptName } from '../../Util.js';
let interactive = new Interactive(getScriptName());
interactive.width = 768;
interactive.height = 200;
interactive.border = true;
let control1 = interactive.control(100, 50);
let control2 = interactive.control(200, 150);
control2.addDependency(control1);
control2.update = function () {
    this.x += control1.dx;
};
//# sourceMappingURL=dependency-function.js.map