const HttpClient = require('./lib/http/client');
const Gateway = require('./lib/go/gateway');
const Go = require('./lib/go/go');
const config = require('./.config.json');

const httpClient = new HttpClient(config);
const gateway = new Gateway(httpClient);
const go = new Go(gateway);

go.pipelines(console.log);
