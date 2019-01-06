# Wrapping Paper

Stub project with Webpack configuration to develop a simple static interface.
Supports Babel, Sass and Autoprefixer. Convenient work with customization
Bootstrap 4.

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

## Folder stucture

Describe all `.html` files in `webpack.config.js` in the same way as
`index.html` is specified.

```
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
