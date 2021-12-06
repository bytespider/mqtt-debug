const net = require('net');
const tls = require('tls');
const stream = require('stream');
const EventEmitter = require('events').EventEmitter;

class MQTTProxy extends EventEmitter {
  constructor({ server, upstream }) {
    super();

    this.port = server.port;
    this.server = this.createServerSocket(server);

    this.upstreamConfig = upstream;
  }

  createServerSocket(options, callback) {
    const { ca, cert, key } = options;

    if (cert && key) {
      return tls.createServer(
        {
          ca,
          cert,
          key,
        },
        (callback || this.#forwardPackets).bind(this)
      );
    }

    return net.createServer({}, (callback || this.#forwardPackets).bind(this));
  }

  createUpstreamSocket(options, callback) {
    const { host, ca, cert, key } = options;

    if (cert && key) {
      let { port = 8883 } = options;
      return tls.connect(
        {
          host,
          port,
          ca,
          cert,
          key,
        },
        callback
      );
    }

    let { port = 1883 } = options;
    return net.connect(
      {
        host,
        port,
      },
      callback
    );
  }

  #forwardPackets(serverSocket) {
    const upstreamSocket = this.createUpstreamSocket(this.upstreamConfig);

    serverSocket.pipe(upstreamSocket).pipe(serverSocket);

    const clientStream = new stream.PassThrough();
    const serverStream = new stream.PassThrough();

    serverSocket.pipe(clientStream);
    upstreamSocket.pipe(serverStream);

    const onclose = () => {
      serverSocket.destroy();
      upstreamSocket.destroy();
      clientStream.end();
      serverStream.end();
    };

    serverSocket.on('close', onclose);
    serverSocket.on('error', onclose);
    upstreamSocket.on('close', onclose);
    upstreamSocket.on('error', onclose);

    this.emit('connection', { client: clientStream, server: serverStream });
  }

  listen(callback) {
    this.server.listen(this.port, callback);
  }
}

module.exports.MQTTProxy = MQTTProxy;
module.exports.createProxy = function (options) {
  return new MQTTProxy(options);
};
