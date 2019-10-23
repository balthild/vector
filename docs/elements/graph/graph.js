import Node from './node.js';
import Edge from './edge.js';
import Group from '../svg/group.js';
export default class Graph extends Group {
    /**
    * Constructs a graph
    */
    constructor(options) {
        super();
        this.nodes = [];
        this.options = options;
        let defs = this.defs();
        defs.root.innerHTML = `<marker id="arrow" refX="10" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" style="fill:#333333;"></path></marker>`;
        this.appendChild(defs);
    }
    /**
    * Clears all nodes and all edges from the graph, removes them from the dom.
    */
    clear() {
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].edges.forEach(function (item) {
                item.remove();
            });
            this.nodes[i].remove();
        }
        this.nodes = [];
    }
    /**
    * Adds a node at the given location with the given text. radius defaults to 20, 20
    */
    addNode(x, y, text, rx = 20, ry = 20) {
        let node = new Node(x, y, rx, ry, text);
        this.root.appendChild(node.root);
        this.nodes.push(node);
        return node;
    }
    /**
    * Adds an edge without direction between the two given nodes.
    */
    addEdge(from, to) {
        let edge = new Edge(from, to, false);
        if (this.options.directed) {
            edge.root.setAttribute('marker-end', `url(#arrow)`);
        }
        this.root.prepend(edge.root);
        from.addEdge(edge);
        to.addEdge(edge);
        return edge;
    }
    /**
    * Getter for the list of all nodes inside this graph.
    */
    getNodes() {
        return this.nodes;
    }
    /**
    * Returns the size of this graph
    */
    size() {
        return this.nodes.length;
    }
}
//# sourceMappingURL=graph.js.map