import Interactive from '../../Interactive.js';
import SVG from '../../SVG.js';
// Initialize the interactive
let id = 'svg-clip-path';
let interactive = new Interactive(id);
interactive.border = true;
interactive.width = 704;
interactive.height = 300;
interactive.originX = 0;
interactive.originY = 0;
// Draw a grid of squares
let size = 30;
let counter = 0;
for (let i = 0; i < interactive.width / size; i++) {
    for (let j = 0; j < interactive.height / size; j++) {
        let rectangle = interactive.rectangle(i * size, j * size, size, size);
        if (counter % 2 == 0) {
            rectangle.root.style.fill = 'lightgray';
        }
        counter++;
    }
    counter++;
}
// TODO: hide a smiley face in one of the squares (:
// Create a control circle and modify its dimensions, also hide the display point
// TODO: in the future it probably will be best to be able to make a basic element draggable
let control = interactive.controlCircle(interactive.width / 2, interactive.height / 2);
control.handle.r.baseVal.value = 50;
control.handle.style.strokeOpacity = '1';
control.point.style.display = 'none';
// Create a circle
let circle = interactive.circle(interactive.width / 2, interactive.height / 2, 50);
circle.addDependency(control);
circle.update = function () {
    this.cx = control.x;
    this.cy = control.y;
};
// TODO: this is hacky and should be replaced with a clip path element? or a wrapper or something?
let clipPath = SVG.ClipPath();
clipPath.id = 'test';
clipPath.appendChild(circle.root);
interactive.root.appendChild(clipPath);
interactive.root.firstChild.setAttribute('clip-path', `url(#${clipPath.id})`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ZnLWNsaXAtcGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS9leGFtcGxlcy9zdmcvc3ZnLWNsaXAtcGF0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLEdBQUcsTUFBTSxjQUFjLENBQUM7QUFFL0IsNkJBQTZCO0FBQzdCLElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQztBQUN6QixJQUFJLFdBQVcsR0FBRyxJQUFJLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0QyxXQUFXLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUMxQixXQUFXLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUN4QixXQUFXLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztBQUN6QixXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUN4QixXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUV4Qix5QkFBeUI7QUFDekIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxHQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUMvQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBRSxDQUFDLEdBQUMsSUFBSSxFQUFFLENBQUMsR0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25FLElBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUc7WUFDckIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztTQUN6QztRQUNELE9BQU8sRUFBRSxDQUFDO0tBQ2I7SUFDRCxPQUFPLEVBQUUsQ0FBQztDQUNYO0FBRUQsb0RBQW9EO0FBRXBELGlGQUFpRjtBQUNqRiw0RkFBNEY7QUFDNUYsSUFBSSxPQUFPLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBRSxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BGLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0FBQ3BDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDekMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUVyQyxrQkFBa0I7QUFDbEIsSUFBSSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBRSxXQUFXLENBQUMsS0FBSyxHQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNoRixNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzlCLE1BQU0sQ0FBQyxNQUFNLEdBQUc7SUFDZCxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQTtBQUVELGtHQUFrRztBQUNsRyxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDOUIsUUFBUSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUEwQixDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsUUFBUSxRQUFRLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyJ9