const { syncUserActions } = require('../../../config');

const exchange = 'user';

module.exports = channel => {
  channel.assertQueue('', { exclusive: true }, (error, q) => {
    if (error) throw error;
    channel.bindQueue(q.queue, exchange, '');
    channel.consume(
      q.queue,
      async msg => {
        const { type, user } = JSON.parse(msg.content.toString('utf8'));
        switch (type) {
          case syncUserActions.CREATE_USER: {
            await require('../../../services/auth').createUser(user);
            break;
          }
          default:
            break;
        }
      },
      { noAck: true },
    );
  });
};
