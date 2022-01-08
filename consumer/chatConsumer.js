const { mqQueues, mqTypes } = require('../../../config');
const broadcastService = require('../../broadcast');

module.exports = channel => {
  channel.assertQueue(mqQueues.RESPONSE_CHAT_QUEUE, { durable: false });
  channel.prefetch(1);

  channel.consume(mqQueues.RESPONSE_CHAT_QUEUE, async message => {
    channel.ack(message);
    const content = JSON.parse(message.content.toString('utf8'));
    console.log(mqQueues.RESPONSE_CHAT_QUEUE, content);

    const { type, responseQueue, data } = content;
    switch (type) {
      case mqTypes.UPDATE_BROADCAST: {
        const { appId, broadcastId, updateFields } = data;
        await broadcastService.updateBroadcast({
          appId,
          broadcastId,
          updateFields,
          from: 'CHAT',
        });
        break;
      }
      default:
        break;
    }
  });
};
