# Prometheus weave exporter

If Your prometheus is in docker container, and You want to collect metrics, You can use this exporter

#### Requirements
- weave net running
- prometheus running in docker image in weave net
- prometheus push gateway running in [docker container](https://github.com/prometheus/pushgateway#using-docker)

#### Settings

You can customize some parameters of exporter, in .env file before installation

| NAME  | Desription  	| default |
|---	|---	| ---   |
| PROP_PUSHGATEWAY_HOSTNAME   	| name of pushgateway in weave net   	|   prom-pushgateway    |
| WEAVE_METRICS_HOST   	        | host of weave metrics   	            |   localhost:6782      |
| WEAVE_SCRAPE_INTERVAL   	    | scrape interval in sec               	|   15                  |
| INSTANCE_NAME   	            | instance tag for prometheus           |   output of ```sh hostname```              |
