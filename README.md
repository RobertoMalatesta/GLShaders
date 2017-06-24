# GLShaders

  WIP - GLSHADERS experiments and testing as I learn three.js. More info to come soon [WIP]

  Each render.js file is a mutation or experiment that can be pointed to in index.js

  /src/Three.js is the import file that combines all required Three.js package files..

  ```
  import * as THREE from 'three'; // build/three.js from node_module/three
  window.THREE = THREE;
  require('three/examples/js/controls/OrbitControls.js');
  require('three/examples/js/shaders/FresnelShader');
  // ...etc for other items like Render Passes and Shaders
  ```

  Current Mapping..
  index.js points to => ObjectRender.js


## Run the example
  Requires Node v7.0.0 or greater

```bash
$ yarn install
$ yarn dev & open http://localhost:2020
```

## License

[MIT]
