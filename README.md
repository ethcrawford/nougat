<img src="https://image.flaticon.com/icons/svg/375/375614.svg" alt="Nougat" width="200">

# Nougat

Stub project with Webpack configuration to develop a simple static interface.

## Supported:

- Babel - @babel/preset-env
- Sass - SCSS syntax
- Autoprefixer - bootstrap 4 browserslist in package.json
- Bootstrap 4 customization

## Features

- The names of the output files contain a _hash_, the manifest of matching the
  old names is attached.
- Linters are not installed, as it is assumed
  that they are integrated into the code editor.
- Image and sprite processors are
  not present so as not to clutter up the project, they can be used separately.

## Scripts

- `yarn start` - Start webpack-dev-server
- `yarn build` - Run production build

## Examples

### Adding an HTML template to the Webpack configuration

`webpack.config.js`

```js
...
plugins: [
  ...
  new HtmlWebpackPlugin({
    template: resolve(__dirname, "src/index.html"),
    filename: "index.html",
    title: "",
  }),
  // First place
  new HtmlWebpackPlugin({
    template: resolve(__dirname, "src/another-template.html"),
    filename: "another-template.html",
    title: "",
  }),
  ...
],
...
plugins: [
  new HtmlWebpackPlugin({
    template: resolve(__dirname, "src/index.html"),
    filename: "index.html",
    title: "",
    minify: setHtmlProcessMode(shouldUseSoftHtmlProcessMode),
  }),
  // Second place
  new HtmlWebpackPlugin({
    template: resolve(__dirname, "src/another-template.html"),
    filename: "another-template.html",
    title: "",
    minify: setHtmlProcessMode(shouldUseSoftHtmlProcessMode),
  }),
  ...
],
```

### Requiring things

*Stylesheets are resolved automatically.*

#### Example 1

`template.html`

Requiring:

```html
<img class="img-fluid" src="<%= require('./path/to/image.jpg') %>" alt="example">
```

Result after production build:

```html
<img class="img-fluid" src="./static/media/image.[hash].jpg" alt="example">
```

#### Example 2
```html
<div style="background: center center url(<%= require('./path/to/image.png') %>) no-repeat"></div>
```

compiles to:

```html
<div style="background: center center url(./static/media/image.[hash].png) no-repeat"></div>
```

## Folder stucture

Describe all `.html` files in `webpack.config.js` in the same way as
`index.html` is specified.

```txt
+-- build
|   +-- static
|   |   +-- css
|   |   |   +-- main.[hash:8].css
|   |   |   +-- main.[hash:8].css.map
|   |   +-- js
|   |   |   +-- main.[hash:8].js
|   |   |   +-- main.[hash:8].js.map
|   |   +-- media
|   |   |   +-- filename.[hash:8].png (example)
|   |   |   +-- filename.[hash:8].woff (example)
|   |   |   +-- *.[hash:8].*
|   +-- assets-manifest.json
|   +-- index.html
|   +-- *.html
+-- node_modules
+-- src
|   +-- **
|   |   +-- *.*
|   +-- index.js (entry point)
|   +-- index.html (index)
|   +-- *.html
|   +-- *.css
|   +-- *.scss
|   +-- *.*
```

## License

MIT License

Copyright (c) 2019 Ethan Crawford

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
