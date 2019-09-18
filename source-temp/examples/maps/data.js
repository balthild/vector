
let data = {
  "name": "@interactive-svg/library",
  "version": "0.0.9",
  "description": "A library for creating interactive vector graphics.",
  "dependencies": {},
  "devDependencies": {
    "@types/chai": "^4.1.7",
    "@types/mocha": "^5.2.7",
    "chai": "^4.2.0",
    "http-server": "^0.11.1",
    "mocha": "^6.1.4",
    "rollup": "^1.17.0",
    "typescript": "^3.5.3",
    "directory-tree": "^2.2.4",
    "jsonfile": "^5.0.0",
    "tree-flatten": "^1.0.0"
  },
  "scripts": {
    "build": "tsc",
    "clean": "rm -rf ./dist/ && rm -rf ./docs/",
    "website": "tsc && cd hugo && hugo",
    "watch": "tsc -w",
    "start": "http-server .",
    "package": "tar --exclude=\"*.js.map\" -czvf ./dist/library.tar.gz ./dist/ ./css/Library.css",
    "rollup": "rollup --config"
  },
  "files": [
    "dist"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/vector-js/vector.git"
  },
  "keywords": [
    "svg",
    "interactive",
    "visualization",
    "dom",
    "vector-graphics",
    "animation",
    "vector"
  ],
  "contributors": [
    "Kurt Bruns",
    "Derek Castillo",
    "Zach Cutler",
    "Josh Homer"
  ],
  "license": "ISC",
  "main": "dist/Library.bundle.js",
  "module": "dist/Interactive.js",
  "modules.root": "dist"
};
export default data;
