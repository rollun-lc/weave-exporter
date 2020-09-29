const {execSync} = require('child_process');
const axios = require('axios');

const prom_pushgateway_ip = execSync(`weave dns-lookup ${process.env.PROM_PUSHGATEWAY_HOSTNAME || 'prom-pushgateway'}`).toString().trim() + ':' + (process.env.PROM_PUSHGATEWAY_PORT || '9091');
const interval = +(process.env.WEAVE_SCRAPE_INTERVAL || '15');
const instance = `${(process.env.INSTANCE_NAME || execSync('hostname'))}`.trim();

console.log(`Starting exporter with: push_gateway_ip: ${prom_pushgateway_ip}, hostname: ${instance}, interval: ${interval}, metrics host: ${process.env.WEAVE_METRICS_HOST}`);

setInterval(() => {
  (async () => {
    try {
      console.log(new Date().toISOString(), 'requesting weave metrics...');
      const {data: metrics} = await axios.get(`http://${process.env.WEAVE_METRICS_HOST || 'localhost:6782'}/metrics`, {timeout: 5000});
      console.log(new Date().toISOString(), 'got metrics, sending to prometheus push gateway');
      await axios.post('http://' + prom_pushgateway_ip + '/metrics/job/weave_exporter/instance/' + instance, metrics, {timeout: 5000});
      console.log(new Date().toISOString(), 'metrics delivered to prometheus push gateway');
    } catch (err) {
      console.log('Scraping error', err.message);
      process.exit(1);
    }
  })();
}, interval * 1000);
