const mosca = require('mosca')

var ascoltatore = {
  //using ascoltatore
  type: 'mongo',
  url: process.env.DATABASE_DSN,
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

var settings = {
  http: {
    port: 3001,
    bundle: true,
    static: './'
  },
  port: 1883,
  backend: ascoltatore,
  persistence: {
    factory: mosca.persistence.Mongo,
    url: process.env.DATABASE_DSN,
  }
};

const server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet) {
  console.log('Published', Buffer.from(packet.payload).toString());
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
  console.log('Mosca server is up and running');
  // var message = {
  //   topic: 'hello/world',
  //   payload: 'abcde', // or a Buffer
  //   qos: 0, // 0, 1, or 2
  //   retain: false // or true
  // };
}
