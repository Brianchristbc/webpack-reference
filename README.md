All elements are edited in webpack.config.js
starting code
const path = require("path");

module.exports = {
mode: "development",
entry: "./src/entry-point.js",
output: {
filename: "main.js",
path: path.resolve(\_\_dirname, "dist"),
clean: true,
},
};

ENTRY
start with the entry point which is index.js (Webpack builds out internal dependency graph from here)

module.exports = {
entry: './src/index.js',
};

//

OUTPUT(in webpack.config.js)
the production ready output will be displayed in the dist directory "./dist/main.js"
const path = require('path');

module.exports = {
entry: './path/to/my/entry/file.js',
output: {
path: path.resolve(\_\_dirname, 'dist'),
filename: 'my-first-webpack.bundle.js',
},
};

//

LOADERS
for processing of non-js and non-JSON files into valid modules to be added onto the dependency graph
two important properties:
test - identifies which file should be transformed
use - identifies which loader should do the transforming
define rules under module.rules not just rules
do not enquote the regex instructions

const path = require('path');

module.exports = {
output: {
filename: 'my-first-webpack.bundle.js',
},
module: {
rules: [{ test: /\.txt$/, use: 'raw-loader' }],
},
};

//

PLUGINS
utilised to perform a wider range of tasks including bundle optimisation, asset management, and injection of environment variables
two important properties:
require() to add a plugin into the plugins array
new operator to add an instance of the plugin

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
module: {
rules: [{ test: /\.txt$/, use: 'raw-loader' }],
},
plugins: [new HtmlWebpackPlugin({ template: './src/index.html' })],
};

//

MODE
for enabling webpack's built in optimisations corresponding to each environment depending on the mode parameter's setting to development, production or none

module.exports = {
mode: 'production',
};

//

Steps for implementing webpack

1. Once in new directory, install webpack
   npm install --save-dev webpack webpack-cli
   will create node_modules directory, package-lock.json, package.json
   webpack only using during development (development dependencies) and will nto be in production ready browser code
2. create a src directory where websites source code lies (apart from configurations files in root of project)
3. create a webpack.config.js file which will contain all details for bundling in project root/outside of src (entry, output, loaders, plugins, mode)
4. run npx webpack to check if dist directory is created with main.js file (this file should be able to log and run in the client server as per production)
5. install HtmlWebpackPlugin with npm install --save-dev html-webpack-plugin to bundle Html, create template.html inside src and fill it with boilerplate less script tags, add in template.html path to plugin.template in webpack.config.js, run npx webpack, should add a index.html alongside main.js in dist
6. install style-loader and css-loader with npm install --save-dev style-loader css-loader add these loaders on webpack under module.rules (loader order for css must be style-loader then css-loader), add a styles.css to src folder, remember to import "./styles.css" into javascript source file (e.g. index.js), and run npx webpack to implement style changes into index.html
7. run npm install --save-dev html-loader to detect and load image file paths in html template i.e < img> within src, this does not apply to url() images which are loaded by css-loader, add object containing test and loader into webpack config, add asset/resource rule for images manipulated to appear on the DOM using javascript
8. run webpack-dev-server using npm install --save-dev webpack-dev-server to bundle code automatically without typing npx webpack, add in devtool and devserver into webpack config and run npx webpack serve, view site using http://localhost:8080/, if editing webpack config after starting webpack-dev-server, use ctrl+c in terminal to kill it then rerun npx webpack serve to apply new config
9. Deploy code through github pages by making a new branch to deploy from git branch gh-pages, then check if anything needs committing with git status, then run git checkout gh-pages && git merge main --no-edit, then run npx webpack to bundle application into dist, then run git add dist -f && git commit -m "Deployment commit then git subtree push --prefix dist origin gh-pages then git checkout main in order. Lastly, change source branch to gh-pages in repo settings.


Adding scripts to package.json:
{
  // ... other package.json stuff
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve",
    "deploy": "git subtree push --prefix dist origin gh-pages"
  },
  // ... other package.json stuff
}

npm run build = npx webpack
npm run dev = npx webpack serve
npm run deploy = git subtree push --prefix dist origin gh-pages
find starting template on webpack template repo
