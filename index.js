const {exec, execSync} = require('child_process');
const axios = require('axios');

exec(`weave dns-lookup ${process.env.PROP_PUSHGATEWAY_HOSTNAME || 'prom-pushgateway:9091'}`, (error, stdout, stderr) => {
    console.log('prom-pushgateway ip:', stdout);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
    const prom_pushgateway_ip = stdout.trim();
    const interval = +(process.env.WEAVE_SCRAPE_INTERVAL || '15');
    const instance = `${(process.env.INSTANCE_NAME || execSync('hostname'))}`.trim();
    console.log(`starting exporter: proppush: ${prom_pushgateway_ip}, hostname: ${instance}, interval: ${interval}, metrics host: ${process.env.WEAVE_METRICS_HOST}`);
    // scrape every 10s
    setInterval(() => {
      (async () => {
        try {
          console.log(new Date().toISOString(), 'request weave metrics...');
          const {data: metrics} = await axios.get(`http://${process.env.WEAVE_METRICS_HOST || 'localhost:6782'}/metrics`, {timeout: 5000});
          console.log(new Date().toISOString(), 'got metrics');
          const {data: prom_response} = await axios.post('http://' + prom_pushgateway_ip + '/metrics/job/weave_exporter/instance/' + instance, metrics, {timeout: 5000});
          console.log(new Date().toISOString(), 'got prom response', prom_response);
        } catch (err) {
          console.log('Scraping error', err);
        }
      })();
    }, interval * 1000);
  });

//console.log('out', out);
