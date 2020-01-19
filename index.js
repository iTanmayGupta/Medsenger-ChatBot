const fs = require('fs');
const Wreck = require("@hapi/wreck");
const SendMessageQuery = fs.readFileSync('./graphql_requests/send_message.gql', 'utf-8');
const Medsenger = require('./medsenger');
// import Medsenger from './medsenger';
let medsenger = new Medsenger();
medsenger.disease_type('skin')
console.log(medsenger.dis_type, 'Disease type');

async function apiRequest(query, variables) {
	console.log({ query, variables }, 'Preparing for api request');
	const options = {
	    baseUrl: 'https://api-prod.hypercare.com',
	    payload: { query, variables },
	    headers: {
	    	"hypercare-scope": "eyAib3JnYW5pemF0aW9uSWQiOiA3MCB9Cg==",
	    	"Authorization": "Bearer 5a9d2364a6b55fc9a841266357963c6cf12d95ca"
	    }
	};

	const response = await Wreck.request("POST", "graphql/private", options);
	const body = await Wreck.read(response, { json: true });
	return body;
}

async function sendMessage(chatId, message) {
	const variables = {
		"chatId": chatId,
		"message": message,
		"type": "text",
		"priority": false
	}

	return apiRequest(SendMessageQuery, variables);
}

exports.handler = async (event) => {
	if(event.type === "message_sent" && event.message.userId !== '00e6545e-b003-4755-a627-c6e281bd232c') {
		let message = event.message.message;
		let chatId = event.chat.id;
		console.log({ message, chatId }, 'Extracted message features');

		await sendMessage(chatId, 'Hello!');
	} else {
		console.log({ type: event.type }, 'Was not message_sent');
	}

    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};