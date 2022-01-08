const amqp = require('amqplib/callback_api');
const consumer = require('./consumer');
const producer = require('./producer');
const { mqQueues } = require('../../config');

const {
  RABBITMQ_HOST,
  RABBITMQ_PORT,
  RABBITMQ_USERNAME,
  RABBITMQ_PASSWORD,
} = process.env;

const MQ_URI = `amqp://${RABBITMQ_USERNAME}:${RABBITMQ_PASSWORD}@${RABBITMQ_HOST}:${RABBITMQ_PORT}`;

amqp.connect(MQ_URI, (error, connection) => {
  if (error) {
    console.error('[RabbitMQ ERROR]', error);
    throw error;
  }

  console.log(`Connected to RabbitMQ ${MQ_URI}`);

  consumer(connection);
  producer(connection);
});

const syncAppToChatService = (type, app) => {
  PRODUCER.sendToQueue(
    mqQueues.CHAT_QUEUE,
    Buffer.from(
      JSON.stringify({
        type,
        responseQueue: mqQueues.RESPONSE_CHAT_QUEUE,
        data: app,
      }),
    ),
  );
};

const syncBotNameToChatService = (type, updateFields) => {
  PRODUCER.sendToQueue(
    mqQueues.CHAT_QUEUE,
    Buffer.from(
      JSON.stringify({
        type,
        responseQueue: mqQueues.RESPONSE_CHAT_QUEUE,
        data: updateFields,
      }),
    ),
  );
};

const syncAgentToChatService = (type, agent) => {
  PRODUCER.sendToQueue(
    mqQueues.CHAT_QUEUE,
    Buffer.from(
      JSON.stringify({
        type,
        responseQueue: mqQueues.RESPONSE_CHAT_QUEUE,
        data: agent,
      }),
    ),
  );
};

const syncBotToChatService = (type, bot) => {
  PRODUCER.sendToQueue(
    mqQueues.CHAT_QUEUE,
    Buffer.from(
      JSON.stringify({
        type,
        responseQueue: mqQueues.RESPONSE_CHAT_QUEUE,
        data: bot,
      }),
    ),
  );
};

const syncBroadcastToChatService = (type, broadcast) => {
  PRODUCER.sendToQueue(
    mqQueues.CHAT_QUEUE,
    Buffer.from(
      JSON.stringify({
        type,
        responseQueue: mqQueues.RESPONSE_CHAT_QUEUE,
        data: broadcast,
      }),
    ),
  );
};

module.exports = {
  syncAppToChatService,
  syncBotNameToChatService,
  syncAgentToChatService,
  syncBotToChatService,
  syncBroadcastToChatService,
};
