import { resolve, join } from 'path'
import {
  FuseBox,
  Sparky,
  EnvPlugin,
  CSSPlugin,
  WebIndexPlugin,
  QuantumPlugin,
} from 'fuse-box'
import * as express from 'express'

import transformCSS from 'ts-transform-css-modules-next'
import transformInferno from 'ts-transform-inferno'

let fuse, app;
let isProduction = false;

Sparky.task('config', _ => {
  fuse = new FuseBox({
    globals: { handler: "App" },
    homeDir: 'src',
    hash: false,
    output: 'dist/$name.js',
    cache: false,
    target: "server@es5",
    sourceMaps: false,
    transformers: {
      before: [transformCSS({
        preprocessor: 'sass',
        autoprefix: true,
        paths: [resolve(__dirname, 'src/styles')],
        output: resolve(__dirname, 'dist/assets'),
        globalPath: resolve(__dirname, 'src/styles/globals.scss')
      }), transformInferno()],
    },
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      isProduction &&
      QuantumPlugin({
        bakeApiIntoBundle: 'server',
        treeshake: true,
        uglify: true,
      }),
    ],
  });
  app = fuse.bundle('server').instructions('>server.tsx')
});

Sparky.task('env', _ => (isProduction = true));

Sparky.task('prod', ['env', 'config'], () => {
  return fuse.run();
});
