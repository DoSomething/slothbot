require('dotenv').config();

const { App } = require('@slack/bolt');
const logger = require('heroku-logger');

const { reply } = require('./lib/slack');
const config = require('./config/server');

const app = new App(config.bolt);

// Our Slack app is configured to listen for events that are direct messages to our bot. 
app.message('', async ({ message, client }) => {
  // Sends a message to the channel where the event was triggered.
  await reply({ message, client });
});

(async () => {
  await app.start(config.port);

  logger.info('⚡️ DS Bot is running! ⚡️');
})();
