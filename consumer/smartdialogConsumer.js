const { mqQueues, mqTypes } = require('../../../config');

module.exports = channel => {
  channel.assertQueue(mqQueues.SMARTDIALOG_LIVECHAT_QUEUE, { durable: false });
  channel.prefetch(1);

  channel.consume(mqQueues.SMARTDIALOG_LIVECHAT_QUEUE, async message => {
    channel.ack(message);
    const content = JSON.parse(message.content.toString('utf8'));
    console.log(mqQueues.SMARTDIALOG_LIVECHAT_QUEUE, content);

    const { type, data } = content;
    switch (type) {
      case mqTypes.UPDATE_BOT_NAME: {
        const { botId, botName } = data;
        const appService = require('../../app');
        await appService.updateBotName({
          botId,
          botName,
        });
        break;
      }
      default:
        break;
    }
  });
};
