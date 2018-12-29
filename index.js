
'use strict';
const BootBot = require('../');
//const config = require('config');
const confirmationModule = require('./modules/confirmation');
const engineModule = require('./modules/engine');
const getIntentModule = require('./modules/getIntent');
const promoModule = require('./modules/promo');
const registerModule = require('./modules/register');
const defaultMenuModule = require('./modules/defaultMenu');
const savedIntentModule = require('./modules/savedIntent');



bot.module(confirmationModule);
bot.module(defaultMenuModule);
bot.module(engineModule);
bot.module(getIntentModule);
bot.module(promoModule);
bot.module(registerModule);
bot.module(savedIntentModule);



const bot = new BootBot({
  accessToken: 'EAAUeEh9AOpgBAI5HUkDWkT76GOZAtI9qEzeQcPhWPBsHahAG5qo1xLCRUKdmznrhvxo4iWIsToitI8dGAvySE7ITILHS4piWzN7cBwiVUwXZAVe3nP7YT8w9jJtNnabVmbEnFyGGbP7VRDLaqmnDvH3cnRkFJxSQO52RHXlgZDZD',
  verifyToken: 'chitchat-bot',
  appSecret: '21a5143ae019242c65d3d3f09202be45'
});

bot.hear('help me', (payload, chat) => {
  const text = payload.message.text;
  const buttons = [
    { type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
    { type: 'postback', title: 'Notifications', payload: 'HELP_NOTIFICATIONS' }
  ];
  chat.sendButtonTemplate(`Need help? Try one of these options`, buttons);
});



bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
  chat.getUserProfile().then((user) => {
    const text = payload.message.text;
    console.log(user)
    chat.say(`Hello, ${user.last_name}! How are you today?`, { typing: true });
  });
});



  bot.hear(['im good','Im well', 'im great', /Good( there)?/i], (payload, chat) => {
	// Send a text message with quick replies
	chat.say({
		text: 'im good,What do you want to do today?',
		quickReplies: ['Buy Airtime', 'Buy Data', 'Buy Social bundles', 'Call center']
	});
});

bot.hear(['Buy Airtime'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What would you like to buy?',
		quickReplies: ['R3', 'R5', 'R10', 'R15', 'R20']
	});
});

bot.hear(['R3', 'R5', 'R10', 'R15','R20'], (payload, chat) => {
  chat.say('Your request to buy airtime has been processed')
});



bot.hear(['Buy Data'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'Buy Data',
		buttons: [
			{ type: 'postback', title: 'daily', payload: 'Data_daily' },
			{ type: 'postback', title: 'weekly', payload: 'Data_weekly' },
			{ type: 'postback', title: 'montly', payload: 'Data_monthly' }
		]
	});
});
bot.on('postback:Data_daily', (payload, chat) => {
  chat.say({
		text: 'Daily data?',
		quickReplies: ['R3 : 20mb', 'R5 : 50mb', 'R10 : 100mb', 'R15 : 150mb']
	});
});
bot.hear(['R3 : 20mb', 'R5 : 50mb', 'R10 : 100mb ', 'R15 : 150mb'], (payload, chat) => {
  chat.say('Your request to buy daily data has been processed')
});

bot.on('postback:Data_weekly', (payload, chat) => {
	chat.say({
		text: 'Weekly data',
		quickReplies: ['R13 : 200mb', 'R25 : 350mb', 'R40 : 1000mb', 'R150 : 15000mb']
	});
});
bot.hear(['R13 : 200mb', 'R25 : 350mb', 'R40 : 1000mb', 'R150 : 15000mb'], (payload, chat) => {
  chat.say('Your request to buy weekly data has been processed')
});

bot.on('postback:Data_monthly', (payload, chat) => {
	chat.say({
		text: 'Monthly data',
		quickReplies: ['R13 : 100mb', 'R25 : 200mb', 'R40 : 500mb', 'R150 : 1000mb']
	});
});
bot.hear(['R13 : 100mb', 'R25 : 200mb', 'R40 : 500mb', 'R150 : 1000mb'], (payload, chat) => {
  chat.say('Your request to buy monthly data has been processed')
});


bot.hear(['Buy Social bundles'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What do you need?',
		buttons: [
			{ type: 'postback', title: 'Fb', payload: 'Social_fb' },
			{ type: 'postback', title: 'whatsapp', payload: 'Social_whatsapp' },
			{ type: 'postback', title: 'YOUtube', payload: 'Social_YOUtube' }
		]
	});
});
bot.on('postback:Airtime_daily', (payload, chat) => {
	console.log('The Airtime_daily button was clicked!');
});

bot.on('postback:Airtime_weekly', (payload, chat) => {
	console.log('The Airtime_weekly button was clicked!');
});

bot.on('postback:Airtime_monthly', (payload, chat) => {
	console.log('The Airtime_monthly button was clicked!');
});

bot.hear(['Call center'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What do you need?',
		buttons: [
			{ type: 'postback', title: 'daiy', payload: 'center_daily' },
			{ type: 'postback', title: 'weekly', payload: 'center_weekly' },
			{ type: 'postback', title: 'montly', payload: 'center_monthly' }
		]
	});
});
bot.on('postback:Airtime_daily', (payload, chat) => {
	console.log('The Airtime_daily button was clicked!');
});

bot.on('postback:Airtime_weekly', (payload, chat) => {
	console.log('The Airtime_weekly button was clicked!');
});

bot.on('postback:Airtime_monthly', (payload, chat) => {
	console.log('The Airtime_monthly button was clicked!');
});


bot.hear('registraction', (payload, chat) => {

	const askName = (convo) => {
		convo.ask(`What's your name?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('name', text);
			convo.say(`Oh, your name is ${text}`).then(() => askFavoriteFood(convo));
		});
	};

	const askFavoriteFood = (convo) => {
		convo.ask(`What's your number?`, (payload, convo) => {
			const text = payload.message.text;
			convo.set('phone number', text);
			convo.say(`Got it, your favorite food is ${text}`).then(() => sendSummary(convo));
		});
	};

	const sendSummary = (convo) => {
		convo.say(`Ok, here's what you told me about you:
	      - Name: ${convo.get('name')}
	      - phone number: ${convo.get('phone number')}`);
      convo.end();
	};

	chat.conversation((convo) => {
		askName(convo);
	});
});



bot.start();

