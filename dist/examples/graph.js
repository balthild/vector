import Interactive from '../Interactive.js';
import { getScriptName } from '../Util.js';
// Initialize the interactive
let interactive = new Interactive(getScriptName());
interactive.width = 600;
interactive.height = 300;
interactive.border = true;
let functionText = '(x) => { return Math.sin(x); }';
// Create a new graph object
let graph = interactive.graph();
graph.function = eval(functionText);
graph.originX = 0;
graph.originY = interactive.height / 2;
graph.scale(2 * Math.PI / interactive.width, interactive.width / (2 * Math.PI));
// Function input
let functionInput = document.createElement('input');
functionInput.type = 'text';
functionInput.name = 'function';
functionInput.value = functionText;
functionInput.style.width = '584px';
functionInput.style.fontSize = '16px';
functionInput.style.border = '1px solid grey';
functionInput.style.fontFamily = 'monospace';
functionInput.style.height = '32px';
functionInput.style.marginBottom = '8px';
functionInput.style.padding = '0 .5rem';
functionInput.onchange = function () {
    graph.function = eval(functionInput.value);
    graph.draw();
};
interactive.container.prepend(functionInput);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zb3VyY2UvZXhhbXBsZXMvZ3JhcGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxXQUFXLE1BQU0sbUJBQW1CLENBQUM7QUFDNUMsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUzQyw2QkFBNkI7QUFDN0IsSUFBSSxXQUFXLEdBQUcsSUFBSSxXQUFXLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUNuRCxXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4QixXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN6QixXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUUxQixJQUFJLFlBQVksR0FBRyxnQ0FBZ0MsQ0FBQztBQUVwRCw0QkFBNEI7QUFDNUIsSUFBSSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLEtBQUssQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7QUFDckMsS0FBSyxDQUFDLEtBQUssQ0FBRSxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFekUsaUJBQWlCO0FBQ2pCLElBQUksYUFBYSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEQsYUFBYSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7QUFDNUIsYUFBYSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7QUFDaEMsYUFBYSxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUM7QUFDbkMsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ3BDLGFBQWEsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztBQUN0QyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQztBQUM5QyxhQUFhLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7QUFDN0MsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3BDLGFBQWEsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUN6QyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUM7QUFFeEMsYUFBYSxDQUFDLFFBQVEsR0FBRztJQUN2QixLQUFLLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsQ0FBQyxDQUFDO0FBRUYsV0FBVyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMifQ==