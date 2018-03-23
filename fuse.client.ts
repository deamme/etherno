import { resolve, join } from 'path'
import {
  FuseBox,
  Sparky,
  EnvPlugin,
  CSSPlugin,
  WebIndexPlugin,
  QuantumPlugin,
  JSONPlugin,
} from 'fuse-box'
import * as express from 'express'

import transformCSS from 'ts-transform-css-modules-next'
import transformInferno from 'ts-transform-inferno'

import * as App from './dist/server'

let fuse, app;
let isProduction = false;

Sparky.task('config', _ => {
  fuse = new FuseBox({
    homeDir: 'src',
    hash: isProduction,
    output: 'dist/$name.js',
    cache: false,
    sourceMaps: !isProduction,
    target: "browser@es3",
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
      JSONPlugin(),
      EnvPlugin({ NODE_ENV: isProduction ? 'production' : 'development' }),
      isProduction &&
      QuantumPlugin({
        bakeApiIntoBundle: 'assets/app',
        treeshake: true,
        uglify: true,
      }),
    ],
  });
  app = fuse.bundle('assets/app').splitConfig({ dest: "/assets" }).instructions('>client.tsx')
});

Sparky.task('clean', _ => Sparky.src('dist/').clean('dist/assets'));
Sparky.task('env', _ => (isProduction = true));
Sparky.task('dev', ['clean', 'config'], async () => {
  fuse.dev({ root: false }, server => {
    const dist = resolve("./dist");
    const app = server.httpServer.app;
    app.use(express.static(dist))
    app.get("*", function(req, res) {
        App.handler({ path: req.url }, {}, (err, result) => {
          res.status(result.statusCode)
          res.set(result.headers)
          res.send(result.body)
        })
    });
  })

  app.hmr().watch();

  await Sparky.watch('src/**/**.*', undefined, (event, file) => {
    setTimeout(() => fuse.sendPageReload(), 100)
  }).exec()
  await fuse.run()
});

Sparky.task('prod', ['clean', 'env', 'config'], () => {
  return fuse.run();
});
