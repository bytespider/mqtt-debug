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
