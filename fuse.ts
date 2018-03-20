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
    homeDir: 'src',
    hash: isProduction,
    output: 'dist/$name.js',
    cache: false,
    sourceMaps: !isProduction,
    target: "browser",
    transformers: {
      before: [transformCSS({
        preprocessor: 'sass',
        autoprefix: true,
        paths: [resolve(__dirname, 'src/styles')],
        output: resolve(__dirname, 'dist'),
        globalPath: resolve(__dirname, 'src/styles/globals.scss')
      }), transformInferno()],
    },
    plugins: [
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      WebIndexPlugin({
        title: 'Etherno',
        template: 'src/index.html',
      }),
      isProduction &&
      QuantumPlugin({
        bakeApiIntoBundle: 'app',
        treeshake: true,
        uglify: true,
      }),
    ],
  });
  app = fuse.bundle('app').instructions('>index.tsx');
});

Sparky.task('clean', _ => Sparky.src('dist/').clean('dist/'));
Sparky.task('env', _ => (isProduction = true));
Sparky.task('dev', ['clean', 'config'], async () => {
  fuse.dev({ root: false }, server => {
    const dist = resolve("./dist");
    const app = server.httpServer.app;
    app.use(express.static(dist))
    app.get("*", function(req, res) {
        res.sendFile(join(dist, "index.html"));
    });
  })

  app.hmr().watch();

  await Sparky.watch('src/**/**.*', undefined, (event, file) => {
    setTimeout(() => fuse.sendPageReload(), 100)
  }).exec()
  await fuse.run()
});

Sparky.task('prod', ['clean', 'env', 'config'], () => {
  fuse.dev({ root: false }, server => {
    const dist = resolve("./dist");
    const app = server.httpServer.app;
    app.use(express.static(dist))
    app.get("*", function(req, res) {
        res.sendFile(join(dist, "index.html"));
    });
  })

  return fuse.run();
});
