
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