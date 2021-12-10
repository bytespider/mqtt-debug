# mqtt-debug

> Eavesdrop on communication between an MQTT client and broker

[![Node.js Package](https://github.com/bytespider/mqtt-debug/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/bytespider/mqtt-debug/actions/workflows/npm-publish.yml)

MQTT-Debug leans heavily on the work of [mqtt-spy](https://github.com/jdiamond/mqtt-spy), but it's raw packet packet output wasn't enough.

## Install

```
npm install --global mqtt-debug
```

## Run

```
mqtt-debug 3883 mqtt.example.com 1883
```

## TLS Example

```
mqtt-debug --cert path/to/crt --key path/to/key --up-cert path/to/crt --up-key path/to/key 8883 mqtt.example.com 8883
```

## Docker

If you want to use docker, you can. Inside the repo:

### Build

```shell
docker build . -t mqtt-debug
```

### Run

#### Using the built in certificates:

The following self-signed certificates are provided for you:

- /certs/ca.pem
- /certs/cert.pem
- /certs/key.pem

```shell
docker run --rm -it -p 8883:8883 mqtt-debug --ca certs/ca.pem --cert certs/cert.pem --key certs/key.pem --up-cert certs/cert.pem --up-key certs/key.pem 8883 mqtt.example.com 8883
```

#### Using custom certificates:

Mount a custom /certs directory.

```shell
docker run --rm -it -p 8883:8883 -v $(pwd)/local-certs:/certs mqtt-debug mqtt-debug --ca certs/myca.pem --cert certs/myserver.pem --key certs/myserver-key.pem --up-cert certs/myclient.pem --up-key certs/myclient-key.pem 8883 mqtt.example.com 8883
```
