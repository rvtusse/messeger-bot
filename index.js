
'use strict';


const BootBot = require('bootbot');
const addUser = require('./utils');
const addIntent = require('./utils');




const bot = new BootBot({
	accessToken: 'EAAUeEh9AOpgBAKiqiqp5h6uWMtujxq7t9LUtRIyWlnLz7YpRgIHFmFhZB3TRMpvZAec3CiqU1zI8lOFtS0jS3WDWeo4rLcuDIB1WFk3IyGZAqKaZCCWRn8ZCaWoTK9HZB6rL4WLkU8UhAYDPb0DmOPzs4aVD830ZCpvmF0r1ZCqnXgZDZD',
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

bot.hear('convo', (payload, chat) => {

});



bot.hear(['hello', 'hi', /hey( there)?/i], (payload, chat) => {
	chat.getUserProfile().then((user) => {
		const text = payload.message.text;
		console.log(user.id)
		addUser.addUserDetails(user)
		chat.say(`Hello, ${user.first_name}! `, { typing: true }).then(() => {

			
			const askNumber = (convo => {
				convo.ask(`May you please type in your Phone number for registration?`, (payload, convo) => {
					const text = payload.message.text;
					convo.set('phone number', text);
					convo.say('Thanks got it!').then(() => {
						convo.ask({
							text: `Is this your number: ${text}?`,
							quickReplies: ['Yes', 'No']
						}, (payload, convo) => {
							const text = payload.message.text;
							convo.say(`Thanks for confirming..`);
							convo.end();
						}, [
								{
									event: 'quick_reply',
									callback: (payload, convo) => {
										const text = payload.message.text;
										convo.say(`Coolio, your number has been saved.`).then(() => askIntent(convo));

									}
								}
							]);
					});
				});
			});



			const askIntent = (convo => {
				convo.ask(`What would you like to do?`, (payload, convo) => {
					const text = payload.message.text;
					convo.set('intent', text)
					convo.say('Processing...').then(() => {
						convo.ask({
							text: `You sure you want to purchase "${convo.get('intent')}" ?`,
							quickReplies: ['Yup', 'Nop']
						}, (payload, convo) => {
							const text = payload.message.text;
							convo.say(`Thanks for confirming..`);
							convo.end();
						}, [
								{
									event: 'quick_reply',
									callback: (payload, convo) => {
										const text = payload.message.text;
										addIntent.addUserIntent(convo)
										console.log('user intent saved..')
										convo.say(`Sharp, your request has been processed`)
										convo.end();
		
									}
								}
							])
					});
				

				});
			});
			

			chat.conversation((convo) => {
				askNumber(convo);
				console.log('user details added...')
			});
		});




	});
}
);


bot.start();

