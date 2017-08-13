/* eslint no-console: "off" */
const HttpClient = require('./lib/http/client');
const Gateway = require('./lib/go/gateway');
const Go = require('./lib/go/go');
const config = require('./.config.json');

const httpClient = new HttpClient(config);
const gateway = new Gateway(httpClient);
const go = new Go(gateway);

const prettyPrint = pipeline => {
  console.log(`Pipeline: ${pipeline.name}`);
  pipeline.history.forEach(instance => {
    console.log(`  Label: ${instance.label}\n  Result: ${instance.result}`);
  });
  console.log();
};

go.pipelines((err, pipelines) => {
  if (err) {
    throw err;
  }
  pipelines.forEach(prettyPrint);
});
