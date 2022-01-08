const chatConsumer = require('./chatConsumer');
const userConsumer = require('./userConsumer');
const smartdialogConsumer = require('./smartdialogConsumer');

function consumer(connection) {
  connection.createChannel((err, channel) => {
    channel.on('error', channelError => {
      console.error('[RabbitMQ Channel ERROR]', channelError);
    });

    channel.on('close', () => {
      console.error('RabbitMQ Channel closed');
    });

    chatConsumer(channel);
    userConsumer(channel);
    smartdialogConsumer(channel);
  });
}

module.exports = consumer;
