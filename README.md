# Prometheus weave exporter

If Your prometheus is in docker container, and You want to collect metrics, You can use this exporter

#### Requirements
- nodejs 10+, npm 6+ available
- weave net running
- prometheus running in [docker container](https://prometheus.io/docs/prometheus/latest/installation/) in weave net
- prometheus push gateway running in [docker container](https://github.com/prometheus/pushgateway#using-docker)

#### Settings

You can customize some parameters of exporter, in .env file before installation

| NAME  | Desription  	| default |
|---	|---	| ---   |
| PROM_PUSHGATEWAY_HOSTNAME   	| name of pushgateway in weave net   	|   prom-pushgateway    |
| PROM_PUSHGATEWAY_HOSTNAME   	| port of pushgateway in weave net   	|   9091    |
| WEAVE_METRICS_HOST   	        | host of weave metrics   	            |   localhost:6782      |
| WEAVE_SCRAPE_INTERVAL   	    | scrape interval in sec               	|   15                  |
| INSTANCE_NAME   	            | instance tag for prometheus           |   output of ```sh -c hostname```              |

#### Installation

For ubuntu 16+

Just run
```shell script
sudo sh install.sh 
``` 

It will add service to systemd. To restart, run script one more time
